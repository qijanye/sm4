package com.example.demo;

public class Test {
    private String test;

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    @Override
    public String toString() {
        return "Test{" +
                "test='" + test + '\'' +
                '}';
    }
}
