package com.cdj.cms;


import com.cdj.cms.util.CredentialsVO;
import com.cdj.cms.util.StringParse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: jiazy
 * Date: 14-12-11
 * To change this template use File | Settings | File Templates.
 */
@Controller
@Scope("prototype")
public abstract class BaseExcController {

    Log logger = LogFactory.getLog("web-error");
    @Autowired
    private HttpServletRequest request;

    /*异常信息统一处理
     * 可按要求将exception分类 返回处理
     */
    @ExceptionHandler({Exception.class})
    public String handleException(HttpServletRequest request, Exception ex) {

        request.setAttribute("detail", ex.getMessage());

        if (ex instanceof RuntimeException) {
            return "/error";
        } else {
            return "/error";
        }
    }

    /**
     * 前台页面传递后台格式化
     *
     * @param binder
     */
    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd"), true));
    }

    public Long getPassportId() {
        return StringParse.parseLong((String) request.getAttribute("X-Passport-UserId"));

    }

    public String getPassportName() {
        return (String) (request.getAttribute("X-Passport-UserName"));
    }

    public int getPassportType() {
        return StringParse.parseInt((String) request.getAttribute("X-Passport-UserType"));
    }

    public String getCurrentSite() {
        return ((String) request.getAttribute("X-Passport-currentSite")).trim();
    }

    public String getRealName() {
        return (String) request.getAttribute("X-Passport-realName");
    }
    /**
     * 获取接口传送的验证信息
     * @return
     */
    public CredentialsVO getCredentialsVO() {
        CredentialsVO credentialsVO = new CredentialsVO();
        credentialsVO.setUserId(getPassportId());
        credentialsVO.setLoginname(getPassportName());
        //修改此处为真实姓名
        credentialsVO.setUsername(getRealName());
        credentialsVO.setWorktype(1);
        credentialsVO.setCurrentSite(getCurrentSite());
        return credentialsVO;
    }



}
