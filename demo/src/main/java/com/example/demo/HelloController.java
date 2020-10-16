package com.example.demo;


import com.example.demo.sm4conffig.SM4Utils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
/**
 * descripiton:
 * helloworld
 * 小石潭记
 */
@Controller
public class HelloController {

    /**
     * 返回页面
     * @return
     */
    @GetMapping(value = "/")
    public String hello() {
        return "test" ;
    }

    /**
     * @ResponseBody 就会返回字符串
     * @return
     */
    @GetMapping(value = "/say")
    @ResponseBody
    public String say() {
        return "say hello world!" ;
    }
    
    @RequestMapping("/test")
    @ResponseBody
    public Object test(Test test) throws Exception {
        SM4Utils.decryptT(test, "com.example.demo.Test");
        System.out.println("解密： " + test.toString());
        SM4Utils.encryptT(test, "com.example.demo.Test");
        System.out.println("加密： " + test.toString());
        return test;
    }
}
