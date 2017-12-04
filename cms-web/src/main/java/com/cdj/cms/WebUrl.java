package com.cdj.cms;

/**
 * ClassDescribe:
 * Author :wangzhanhua
 * Date: 2017-06-01
 * Since
 * To change this template use File | Settings | File Templates.
 */

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class WebUrl implements Cloneable {
    private static final Log log = LogFactory.getLog(WebUrl.class);
    private String username;
    private String password;
    private String protocol = "http";
    private String host;
    private int port = -1;
    private String path;
    private String contextPath;
    private boolean reset;
    private boolean filter = true;
    private Map<String, Object> query = new LinkedHashMap();
    private WebUrl webUrl;
    private WebUrlIntercept intercept;
    private String charsetName = "utf-8";

    public WebUrl() {
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProtocol() {
        return this.protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getHost() {
        return this.host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return this.port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public boolean isFilter() {
        return this.filter;
    }

    public void setFilter(boolean filter) {
        this.filter = filter;
    }

    public void setWebUrl(WebUrl webUrl) {
        this.webUrl = webUrl;
    }

    public String getContextPath() {
        return this.contextPath;
    }

    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }

    public void setIntercept(WebUrlIntercept intercept) {
        this.intercept = intercept;
    }

    public String getCharsetName() {
        return this.charsetName;
    }

    public void setCharsetName(String charsetName) {
        this.charsetName = charsetName;
    }

    public void setQuery(Map<String, Object> query) {
        this.query = query;
    }

    public Map<String, Object> getQuery() {
        return this.query;
    }

    public WebUrl addQueryData(String name, String value) {
        this.query.put(name, value);
        return this;
    }

    public WebUrl addQueryData(String name, Object value) {
        this.query.put(name, value);
        return this;
    }

    public WebUrl addQueryData(String name, int value) {
        this.query.put(name, Integer.valueOf(value));
        return this;
    }

    public WebUrl addQueryData(String name, long value) {
        this.query.put(name, Long.valueOf(value));
        return this;
    }

    public WebUrl addQueryData(String name, float value) {
        this.query.put(name, Float.valueOf(value));
        return this;
    }

    public WebUrl getTarget(String target) {
        this.path = target;
        return this;
    }

    public String render() {
        WebUrl url = null;

        String var2;
        try {
            if(this.intercept != null) {
                url = new WebUrl();
                url.query = new LinkedHashMap();
                if(this.query != null) {
                    url.query.putAll(this.query);
                }

                this.setWebUrlValue(url, this);
            }

            var2 = this.doIt();
        } finally {
            if(this.intercept != null && url != null) {
                this.setWebUrlValue(this, url);
                if(url.query != null) {
                    this.query.putAll(url.query);
                }
            }

        }

        return var2;
    }

    private String doIt() {
        String str;
        try {
            if(this.intercept != null) {
                this.intercept.doIntercept(this);
            }

            String builder = this.prefixPath(this.contextPath, this.path);
            URL url = new URL(this.protocol, this.host, this.port, builder);
            if(url.getDefaultPort() == url.getPort()) {
                url = new URL(this.protocol, this.host, -1, builder);
            }

            str = url.toString();
        } catch (Exception var12) {
            str = "/";
        }

        StringBuilder var13 = new StringBuilder(str);
        if(this.query.isEmpty()) {
            return str;
        } else {
            Iterator i$ = this.query.keySet().iterator();

            while(true) {
                while(i$.hasNext()) {
                    String key = (String)i$.next();
                    Object obj = this.query.get(key);
                    Iterator var16;
                    Object var17;
                    if(obj instanceof List) {
                        List var15 = (List)obj;
                        var16 = var15.iterator();

                        while(var16.hasNext()) {
                            var17 = var16.next();
                            this.setValue(var13, key, var17);
                        }
                    } else if(obj instanceof Map) {
                        Map var14 = (Map)obj;
                        var16 = var14.keySet().iterator();

                        while(var16.hasNext()) {
                            var17 = var16.next();
                            this.setValue(var13, var17 == null?"":var17.toString(), var14.get(var17));
                        }
                    } else if(obj != null && obj.getClass().isArray()) {
                        Object[] arrays = (Object[])((Object[])obj);
                        Object[] arr$ = arrays;
                        int len$ = arrays.length;

                        for(int i$1 = 0; i$1 < len$; ++i$1) {
                            Object o = arr$[i$1];
                            this.setValue(var13, key, o);
                        }
                    } else {
                        this.setValue(var13, key, obj);
                    }
                }

                return var13.replace(str.length(), str.length() + 1, "?").toString();
            }
        }
    }

    public String prefixPath(String contextPath, String path) {
        String returnPath;
        if(path != null && contextPath != null) {
            if(contextPath.endsWith("/") && path.startsWith("/")) {
                returnPath = contextPath + path.substring(1);
            } else {
                returnPath = contextPath + path;
            }
        } else if(path == null && contextPath == null) {
            returnPath = "/";
        } else if(contextPath == null) {
            returnPath = path;
        } else {
            returnPath = contextPath;
        }

        return returnPath;
    }

    public void setValue(StringBuilder builder, String key, Object o) {
        String value = o == null?"":o.toString();
        if(value.length() > 0) {
            String str1 = this.encodeUrl(value);
            builder.append("&").append(key).append("=").append(str1);
        } else if(!this.filter) {
            builder.append("&").append(key).append("=");
        }

    }

    public String encodeUrl(String value) {
        String str1;
        if(StringUtils.isNotBlank(this.charsetName)) {
            try {
                str1 = URLEncoder.encode(value, this.charsetName);
            } catch (UnsupportedEncodingException var4) {
                str1 = value;
            }
        } else {
            str1 = URLEncoder.encode(value);
        }

        return str1;
    }

    public String toString() {
        String s = this.render();
        if(!this.reset) {
            this.reset = true;
            this.reset();
        }

        this.reset = false;
        return s;
    }

    public void reset() {
        try {
            this.reset = true;
            this.query.clear();
            if(this.webUrl != null) {
                if(this.webUrl.query != null) {
                    this.query.putAll(this.webUrl.query);
                }

                this.webUrl.setWebUrlValue(this, this.webUrl);
            }
        } catch (Exception var2) {
            log.error("copyProperties error!", var2);
        }

    }

    public void setUrl(String url) throws MalformedURLException {
        URL a = new URL(url);
        this.protocol = a.getProtocol();
        this.host = a.getHost();
        this.port = a.getPort();
        this.contextPath = a.getPath();
        String queryString = a.getQuery();
        if(!StringUtils.isEmpty(queryString)) {
            this.query.putAll(this.getQueryMap(queryString));
        }

    }

    private Map<String, Object> getQueryMap(String query) {
        String[] params = query.split("&");
        LinkedHashMap map = new LinkedHashMap();
        String[] arr$ = params;
        int len$ = params.length;

        for(int i$ = 0; i$ < len$; ++i$) {
            String param = arr$[i$];
            String[] strings = param.split("=");
            String name = strings[0];
            String value = null;
            if(strings.length > 1) {
                value = strings[1];
            }

            map.put(name, value);
        }

        return map;
    }

    public WebUrl clone() {
        WebUrl clone = new WebUrl();
        this.setWebUrlValue(clone, this);
        clone.query = new LinkedHashMap();
        clone.query.putAll(this.query);
        return clone;
    }

    private void setWebUrlValue(WebUrl dest, WebUrl src) {
        dest.username = src.username;
        dest.password = src.password;
        dest.protocol = src.protocol;
        dest.host = src.host;
        dest.port = src.port;
        dest.contextPath = src.contextPath;
        dest.path = src.path;
        dest.intercept = src.intercept;
    }

    public void cleanQueryMap() {
        if(this.query != null && !this.query.isEmpty()) {
            this.query.clear();
        }

    }
}

