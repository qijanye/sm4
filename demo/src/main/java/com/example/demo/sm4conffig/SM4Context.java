package com.example.demo.sm4conffig;

public class SM4Context {
	public int mode;
    
    public int[] sk;
    
    public boolean isPadding;

    public SM4Context() 
    {
        this.mode = 1;
        this.isPadding = true;
        this.sk = new int[32];
    }
}
