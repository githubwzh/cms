package com.cdj.cms.controller;

import com.cdj.cms.BaseExcController;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 出库
 * Created by Pactera on 15-10-15.
 */
@Controller
@Scope("prototype")
public class UserController extends BaseExcController {

    /**
     * 跳转出库主页面
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/index", method = {RequestMethod.POST, RequestMethod.GET})
    public ModelAndView toCancelOrder(HttpServletRequest request,HttpServletResponse response){
        ModelAndView modelAndView = new ModelAndView("/index");
        modelAndView.addObject("userName","wangzhanhua-one");
        return modelAndView;
    }




}
