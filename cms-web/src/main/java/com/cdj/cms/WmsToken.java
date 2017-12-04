package com.cdj.cms;

import org.apache.velocity.context.InternalContextAdapter;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.runtime.directive.Directive;
import org.apache.velocity.runtime.parser.node.Node;
import org.apache.velocity.tools.view.ViewToolContext;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 * User: jiazy
 * Date: 14-12-11
 * To change this template use File | Settings | File Templates.
 */
public class WmsToken extends Directive {
    @Override
    public String getName() {
        return "token";
    }

    @Override
    public int getType() {
        return LINE;
    }

    @Override
    public boolean render(InternalContextAdapter internalContextAdapter, Writer writer, Node node) throws IOException, ResourceNotFoundException, ParseErrorException, MethodInvocationException {
        //获取context对象
        ViewToolContext context = (ViewToolContext)internalContextAdapter.getInternalUserContext();
        //得到session
        HttpSession session = context.getRequest().getSession();
        //获得唯一id
        String uuid = UUID.randomUUID().toString().replace("-","");
        //取得session范围的tokenMap
        Map<String,String> tokenMap = (Map<String, String>) session.getAttribute("tokenMap");
        if(tokenMap == null || tokenMap.size() == 0 ){
            tokenMap = new HashMap<String,String>();
        }
        //把唯一id放入session范围tokenMap中
        tokenMap.put(uuid, uuid);
        session.setAttribute("tokenMap",tokenMap);
        //把token写入页面
        String html="<input type='hidden' id='tokenName' name='tokenName' readonly='readonly' value="+uuid+">";
        writer.write(html);
        return false;
    }
}
