package com.example.demo.sm4conffig;


import org.apache.commons.lang3.StringUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class SM4Utils {
    private static String secretKey = "11HDESaAhiHHugDz";
    private String iv = "";
    private boolean hexString = false;

    public SM4Utils() {
    }
    public static String encrypt(String plainText) {
        //原来sm4加密方法
        return StringUtils.isEmpty(plainText) ? null : encryptDataECB(plainText);
        //修改为sm2
//        return StringUtils.isEmpty(plainText) ? null : sm2EncryptDataECB(plainText);
    }


    public static String encryptDataECB(String plainText) {
        try {
            SM4Context ctx = new SM4Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_ENCRYPT;

            byte[] keyBytes;
            keyBytes = secretKey.getBytes();
            SM4 sm4 = new SM4();
            sm4.sm4_setkey_enc(ctx, keyBytes);
            byte[] encrypted = sm4.sm4_crypt_ecb(ctx, plainText.getBytes("UTF-8"));
            String cipherText = new BASE64Encoder().encode(encrypted);
            if (cipherText != null && cipherText.trim().length() > 0) {
                Pattern p = Pattern.compile("\\s*|\t|\r|\n");
                Matcher m = p.matcher(cipherText);
                cipherText = m.replaceAll("");
            }
            return cipherText;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String decrypt(String plainText) {
        //原来的sm4
        return StringUtils.isEmpty(plainText) ? null : decryptDataECB(plainText);
        //现在改成sm2
//        return StringUtils.isEmpty(plainText) ? null : sm2DecryptDataECB(plainText);
    }



    public static String decryptDataECB(String cipherText) {
        try {
            SM4Context ctx = new SM4Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_DECRYPT;

            byte[] keyBytes;
            keyBytes = secretKey.getBytes();
            SM4 sm4 = new SM4();
            sm4.sm4_setkey_dec(ctx, keyBytes);
            byte[] decrypted = sm4.sm4_crypt_ecb(ctx, new BASE64Decoder().decodeBuffer(cipherText));
            return new String(decrypted, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 加密bean
     *
     * @param t
     * @return
     * @throws Exception
     */
    @SuppressWarnings("rawtypes")
    public static Object encryptT(Object obj, String className) throws Exception {
        Class t = Class.forName(className);
        Field[] field = t.cast(obj).getClass().getDeclaredFields();
        for (int j = 0; j < field.length; j++) { // 遍历所有属性
            String name = field[j].getName(); // 获取属性的名字
            name = name.substring(0, 1).toUpperCase() + name.substring(1); // 将属性的首字符大写，方便构造get，set方法
            String type = field[j].getGenericType().toString(); // 获取属性的类型
            if (type.equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
                Method m = t.cast(obj).getClass().getMethod("get" + name);
                String value = (String) m.invoke(t.cast(obj)); // 调用getter方法获取属性值
                //如果值不为null，将值进行加密并返回至bean
                if (value != null) {
                    m = t.cast(obj).getClass().getMethod("set" + name, String.class);
                    m.invoke(t.cast(obj), encrypt(value));
                }
            }
        }
        return t;
    }

    /**
     * 解密bean
     *
     * @param obj
     * @param className
     * @return
     * @throws Exception
     */
    @SuppressWarnings("rawtypes")
    public static Object decryptT(Object obj, String className) throws Exception {
        Class t = Class.forName(className);
        Field[] field = t.cast(obj).getClass().getDeclaredFields();
        for (int j = 0; j < field.length; j++) { // 遍历所有属性
            String name = field[j].getName(); // 获取属性的名字
            name = name.substring(0, 1).toUpperCase() + name.substring(1); // 将属性的首字符大写，方便构造get，set方法
            String type = field[j].getGenericType().toString(); // 获取属性的类型
            if (type.equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
                Method m = t.cast(obj).getClass().getMethod("get" + name);
                String value = (String) m.invoke(t.cast(obj)); // 调用getter方法获取属性值
                if (value != null) {
                    m = t.cast(obj).getClass().getMethod("set" + name, String.class);
                    m.invoke(t.cast(obj), decrypt(value));
                }
            }
        }
        return t;
    }

    public String encryptDataCBC(String plainText) {
        try {
            SM4Context ctx = new SM4Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_ENCRYPT;

            byte[] keyBytes;
            byte[] ivBytes;

            keyBytes = secretKey.getBytes();
            ivBytes = iv.getBytes();

            SM4 sm4 = new SM4();
            sm4.sm4_setkey_enc(ctx, keyBytes);
            byte[] encrypted = sm4.sm4_crypt_cbc(ctx, ivBytes, plainText.getBytes("UTF-8"));
            String cipherText = new BASE64Encoder().encode(encrypted);
            if (cipherText != null && cipherText.trim().length() > 0) {
                Pattern p = Pattern.compile("\\s*|\t|\r|\n");
                Matcher m = p.matcher(cipherText);
                cipherText = m.replaceAll("");
            }
            return cipherText;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String decryptDataCBC(String cipherText) {
        try {
            SM4Context ctx = new SM4Context();
            ctx.isPadding = true;
            ctx.mode = SM4.SM4_DECRYPT;

            byte[] keyBytes;
            byte[] ivBytes;
            if (hexString) {
                keyBytes = Util.hexStringToBytes(secretKey);
                ivBytes = Util.hexStringToBytes(iv);
            } else {
                keyBytes = secretKey.getBytes();
                ivBytes = iv.getBytes();
            }

            SM4 sm4 = new SM4();
            sm4.sm4_setkey_dec(ctx, keyBytes);
            byte[] decrypted = sm4.sm4_crypt_cbc(ctx, ivBytes, new BASE64Decoder().decodeBuffer(cipherText));
            return new String(decrypted, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public static void main(String[] args) {
        String s = decryptDataECB("Vz/G2KWnCFeXJlzBkdEGEA==");
        System.out.println(s);
    }
}
