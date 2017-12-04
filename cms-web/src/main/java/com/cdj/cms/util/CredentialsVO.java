package com.cdj.cms.util;
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

import java.io.Serializable;
public class CredentialsVO implements Serializable {
    private Long userId;
    private String loginname;
    private String username;
    private String currentSite;
    private Integer worktype;

    public CredentialsVO() {
    }

    public CredentialsVO(String username, Long userId) {
        this.username = username;
        this.userId = userId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCurrentSite() {
        return this.currentSite;
    }

    public void setCurrentSite(String currentSite) {
        this.currentSite = currentSite;
    }

    public Integer getWorktype() {
        return this.worktype;
    }

    public void setWorktype(Integer worktype) {
        this.worktype = worktype;
    }

    public String getLoginname() {
        return this.loginname;
    }

    public void setLoginname(String loginname) {
        this.loginname = loginname;
    }
}
