package com.cdj.cms.util;//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//


import java.io.ByteArrayOutputStream;

public class StringParse {
    public StringParse() {
    }

    public static Long parseLong(String str) {
        return parseLong(str, 0L);
    }

    public static Long parseLong(String str, long defaultValue) {
        Long value = Long.valueOf(defaultValue);
        if(str == null) {
            return value;
        } else {
            str = str.trim();
            str = str.replaceAll("\n", "");
            str = str.replaceAll("\r", "");

            try {
                value = new Long(Long.parseLong(str));
            } catch (NumberFormatException var5) {
                ;
            }

            return value;
        }
    }

    public static int parseInt(String str) {
        int value = 0;

        try {
            value = Integer.parseInt(str);
        } catch (NumberFormatException var3) {
            ;
        }

        return value;
    }

    public static int parseInt(String str, int defaultValue) {
        int value = defaultValue;

        try {
            value = Integer.parseInt(str);
        } catch (NumberFormatException var4) {
            ;
        }

        return value;
    }

    public static int parseIntByForce(String str) {
        byte[] bs = str.getBytes();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        boolean isstart = false;

        for(int i = 0; i < bs.length; ++i) {
            if(bs[i] >= 48 && bs[i] <= 57) {
                isstart = true;
                baos.write(bs[i]);
            } else if(isstart) {
                break;
            }
        }

        return parseInt(baos.toString());
    }

    public static boolean parseBoolean(String str) {
        boolean value = false;

        try {
            value = Boolean.parseBoolean(str);
        } catch (NumberFormatException var3) {
            ;
        }

        return value;
    }

    public static boolean parseBoolean(String str, boolean defaultValue) {
        boolean value = defaultValue;

        try {
            value = Boolean.parseBoolean(str);
        } catch (NumberFormatException var4) {
            ;
        }

        return value;
    }
}
