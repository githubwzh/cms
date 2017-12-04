package com.cdj.cms;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/****
 * spring Interceptor 请求拦截器，对所有的请求进行拦截 
 * 两种实现方式：
 * 1：实现WebRequestInterceptor 接口
 * 2：实现HandlerInterceptor  接口
 * @author shichuang  
 * 20140813 
 */
public class SpringMVCInterceptor implements HandlerInterceptor  {
	
	 /** 
     * preHandle方法是进行处理器拦截用的，顾名思义，该方法将在Controller处理之前进行调用，
     * SpringMVC中的Interceptor拦截器是链式的，可以同时存在 
     * 多个Interceptor，然后SpringMVC会根据声明的前后顺序一个接一个的执行，而且所有的Interceptor中的preHandle方法都会在 
     * Controller方法调用之前调用。SpringMVC的这种Interceptor链式结构也是可以进行中断的，这种中断方式是令preHandle的返 
     * 回值为false，当preHandle的返回值为false的时候整个请求就结束了。 
     */  
    @Override
    public boolean preHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler) throws Exception {
    	
    	/***
		 * 拦截器的两种原理
		 * 1：服务端生成一个唯一标示符 UUID并保持到session中 ，同时吧这个UUID也带到客户端页面，然后页面提交，
		 * 判断客户端页面中UUID和服务器端的UUID进行匹配，匹配成功表明是非重复提交，否则视为重复提交
		 * 
		 * 2：服务端生成一个唯一标示符 UUID(不存入session，只是用于客户端的存储) ，把这个UUID也带到客户端页面，然后页面提交，
		 * 如果服务器的token为null，把客户端页面中UUID存入session中的token中,并允许提交，
		 * 在整个流程结束后，把该token值从session移除(在SpringMVCInterceptor->afterCompletion方法中移除)
		 */
    	
    	/*** 第一种原理实现方式  **/
    	//  防止重复提交    获得输入框中的值   token
		String tokenName = request.getParameter("tokenName");
		// 获得session中的值  把token值存入map中，防止打开多个修改页面的时候，无法保存提交
		// String sessionToken = (String) request.getSession().getAttribute("token");
		Map<String,String> tokenMap = (Map<String, String>) request.getSession().getAttribute("tokenMap");
		
		// 判断当前请求 是form 提交还是 ajax 提交 
		// 如果requestType能拿到值，
		// 并且值为XMLHttpRequest,表示客户端的请求为异步请求，那自然是ajax请求了，反之如果为null,则是普通的请求
		String requestType = request.getHeader("X-Requested-With");
		
		// synchronized 锁定 session 
		if(tokenName != null){
			synchronized(request.getSession()) {
				if (tokenMap.containsKey(tokenName)) {
					// 为了保证session中的值不重复，所以移除
					// request.getSession().removeAttribute("token");
					tokenMap.remove(tokenName);
				} else {
					// 流程中断的话需要我们进行响应的处理
					// 判断当前的请求方式 ，根据请求方式不同，处理也不同   
					response.setContentType("text/html;charset=UTF-8");
					if("XMLHttpRequest".equals(requestType)){ // ajax请求直接返回提示结果
						response.getWriter().print("对不起不能重复提交") ;
					}else{ // form请求返回提示结果,并可以跳转到上一页面
                        String url = request.getRequestURL().toString();
						response.getWriter().print("对不起不能重复提交,<a href='#' onclick='javascript:history.back(-1);'>返回上一页</a>");
					}
					return false;
				}
			}
		}
        return true;  
        
    	
        /*** 第二种原理实现方式  
        // request.getHeader(arg0)
        // 3秒钟后 调整到指定的页面
    	// response.setHeader("refresh", "3;URL=www.baidu.com");
    	System.out.println("url=====" + request.getRequestURI());
    	// 判断当前请求 是form 提交还是 ajax 提交 
		// 如果requestType能拿到值，并且值为XMLHttpRequest,表示客户端的请求为异步请求，那自然是ajax请求了，反之如果为null,则是普通的请求
		String requestType = request.getHeader("X-Requested-With");  
    	//  防止重复提交    获得输入框中的值   token
		String tokenName = request.getParameter("tokenName");
		if(request.getSession().getAttribute("tokenID") == null){
			System.out.println("preHandle---------true---------");
			request.getSession().setAttribute("tokenID", tokenName);
			return true;
		}else{
			// 流程中断的话需要我们进行响应的处理
			// 判断当前的请求方式 ，根据请求方式不同，处理也不同   
			response.setContentType("text/html;charset=UTF-8");
			if("XMLHttpRequest".equals(requestType)){ // ajax请求直接返回提示结果
				response.getWriter().print("对不起不能重复提交") ;
			}else{ // form请求返回提示结果,并可以跳转到上一页面
				response.getWriter().print("对不起不能重复提交,  点击 <input type='button' name='Submit' onclick='javascript:history.back(-1);' value='返回上一页'>");
			}
			System.out.println("preHandle---------false---------");
			return false;
		}
		**/
    }  
      
    /** 
     * 这个方法只会在当前这个Interceptor的preHandle方法返回值为true的时候才会执行。postHandle是进行处理器拦截用的，它的执行时间是在处理器进行处理之 
     * 后，也就是在Controller的方法调用之后执行，但是它会在DispatcherServlet进行视图的渲染之前执行，也就是说在这个方法中你可以对ModelAndView进行操 
     * 作。这个方法的链式结构跟正常访问的方向是相反的，也就是说先声明的Interceptor拦截器该方法反而会后调用，这跟Struts2里面的拦截器的执行过程有点像， 
     * 只是Struts2里面的intercept方法中要手动的调用ActionInvocation的invoke方法，Struts2中调用ActionInvocation的invoke方法就是调用下一个Interceptor 
     * 或者是调用action，然后要在Interceptor之前调用的内容都写在调用invoke之前，要在Interceptor之后调用的内容都写在调用invoke方法之后。 
     */  
    @Override
    public void postHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        // TODO Auto-generated method stub  
    	// System.out.println("postHandle------------------");
    }  
  
    /** 
     * 该方法也是需要当前对应的Interceptor的preHandle方法的返回值为true时才会执行。该方法将在整个请求完成之后，也就是DispatcherServlet渲染了视图执行， 
     * 这个方法的主要作用是用于清理资源的，当然这个方法也只能在当前这个Interceptor的preHandle方法的返回值为true时才会执行。 
     */  
    @Override
    public void afterCompletion(HttpServletRequest request,  
            HttpServletResponse response, Object handler, Exception ex)   throws Exception {
        // TODO Auto-generated method stub  
    	/*** 第二种原理实现方式  **/
    	// request.getSession().removeAttribute("tokenID");
    	// System.out.println("afterCompletion------------------tokenID=" + request.getSession().getAttribute("tokenID"));
    }  
	
}
