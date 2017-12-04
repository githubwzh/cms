///-------------------------------------------------------------------------
//jQuery��������
//--------------------------------------------------------------------------
/*����[��ѡ�����ڵ���ʱ��д�ɲ�д,����Ϊ��д]
 ----------------------------------------------------------------------------
 title:	���ڱ���
 content:  ����(��ѡ����Ϊ){ text | id | img | url | iframe }
 width:	���ݿ��
 height:	���ݸ߶�
 drag:  �Ƿ�����϶�(tureΪ��,falseΪ��)
 time:	�Զ��رյȴ��ʱ�䣬Ϊ�������Զ��ر�
 showbg:	[��ѡ����]�����Ƿ���ʾ���ֲ�(0Ϊ����ʾ,1Ϊ��ʾ)
 cssName:  [��ѡ����]����class���
 ------------------------------------------------------------------------*/
//ʾ��:
//------------------------------------------------------------------------
//simpleWindown("����","text:����","500","400","true","3000","0","exa")
//------------------------------------------------------------------------
var showWindown = true;
var templateSrc = ""; //����loading.gif·��
function tipsWindown(title,content,width,height,drag,time,showbg,cssName,backcall) {
    $("#windown-box").remove(); //�������
    var width = width>= 950?this.width=950:this.width=width;	    //������󴰿ڿ��
    var height = height>= 527?this.height=527:this.height=height;  //������󴰿ڸ߶�
    if(showWindown == true) {
        var simpleWindown_html = new String;
        simpleWindown_html = "<div id=\"windownbg\" style=\"height:"+$(document).height()+"px;filter:alpha(opacity=0);opacity:0;z-index: 999901\"></div>";
        simpleWindown_html += "<div id=\"windown-box\">";
        simpleWindown_html += "<div id=\"windown-title\"><h2></h2></div>";
        simpleWindown_html += "<div id=\"windown-content-border\"><div id=\"windown-content\"></div></div>";
        simpleWindown_html += "</div>";
        $("body").append(simpleWindown_html);
        show = false;
    }
    contentType = content.substring(0,content.indexOf(":"));
    content = content.substring(content.indexOf(":")+1,content.length);
    switch(contentType) {
        case "text":
            $("#windown-content").html(content);
            break;
        case "id":
            $("#windown-content").html($("#"+content+"").html());
            break;
        case "img":
            $("#windown-content").ajaxStart(function() {
                $(this).html("<img src='"+templateSrc+"/images/loading.gif' class='loading' />");
            });
            $.ajax({
                error:function(){
                    $("#windown-content").html("<p class='windown-error'>������ݳ���...</p>");
                },
                success:function(html){
                    $("#windown-content").html("<img src="+content+" alt='' />");
                }
            });
            break;
        case "url":
            var content_array=content.split("?");
            $("#windown-content").ajaxStart(function(){
                $(this).html("<img src='"+templateSrc+"/images/loading.gif' class='loading' />");
            });
            $.ajax({
                type:content_array[0],
                url:content_array[1],
                data:content_array[2],
                error:function(){
                    $("#windown-content").html("<p class='windown-error'>������ݳ���...</p>");
                },
                success:function(html){
                    $("#windown-content").html(html);
                    if(backcall)
                        backcall();
                }
            });
            break;
        case "iframe":
            $("#windown-content").ajaxStart(function(){
                $(this).html("<img src='"+templateSrc+"/images/loading.gif' class='loading' />");
            });
            $.ajax({
                error:function(){
                    $("#windown-content").html("<p class='windown-error'>������ݳ���...</p>");
                },
                success:function(html){
                    $("#windown-content").html("<iframe src=\""+content+"\" width=\"100%\" height=\""+parseInt(height)+"px"+"\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
                }
            });
    }
    $("#windown-title h2").html(title);
    if(showbg == "true") {$("#windownbg").show();}else {$("#windownbg").remove();};
    $("#windownbg").animate({opacity:"0.5"},"normal");//����͸����
    $("#windown-box").show();
    if( height >= 527 ) {
        $("#windown-title").css({width:(parseInt(width)+22)+"px"});
        $("#windown-content").css({width:(parseInt(width)+17)+"px",height:height+"px"});
    }else {
        $("#windown-title").css({width:(parseInt(width)+10)+"px"});
        $("#windown-content").css({width:width+"px",height:height+"px"});
    }
    var	cw = document.documentElement.clientWidth,ch = document.documentElement.clientHeight,est = document.documentElement.scrollTop;
    var _version = $.browser.version;
    if ( _version == 6.0 ) {
        $("#windown-box").css({left:"50%",top:(parseInt((ch)/2)+est)+"px",marginTop: -((parseInt(height)+53)/2)+"px",marginLeft:-((parseInt(width)+32)/2)+"px",zIndex: "999999"});
    }else {
        $("#windown-box").css({left:"50%",top:"50%",marginTop:-((parseInt(height)+53)/2)+"px",marginLeft:-((parseInt(width)+32)/2)+"px",zIndex: "999999"});
    };
    var Drag_ID = document.getElementById("windown-box"),DragHead = document.getElementById("windown-title");

    var moveX = 0,moveY = 0,moveTop,moveLeft = 0,moveable = false;
    if ( _version == 6.0 ) {
        moveTop = est;
    }else {
        moveTop = 0;
    }
    var	sw = Drag_ID.scrollWidth,sh = Drag_ID.scrollHeight;
    DragHead.onmouseover = function(e) {
        if(drag == "true"){DragHead.style.cursor = "move";}else{DragHead.style.cursor = "default";}
    };
    DragHead.onmousedown = function(e) {
        if(drag == "true"){moveable = true;}else{moveable = false;}
        e = window.event?window.event:e;
        var ol = Drag_ID.offsetLeft, ot = Drag_ID.offsetTop-moveTop;
        moveX = e.clientX-ol;
        moveY = e.clientY-ot;
        document.onmousemove = function(e) {
            if (moveable) {
                e = window.event?window.event:e;
                var x = e.clientX - moveX;
                var y = e.clientY - moveY;
                if ( x > 0 &&( x + sw < cw) && y > 0 && (y + sh < ch) ) {
                    Drag_ID.style.left = x + "px";
                    Drag_ID.style.top = parseInt(y+moveTop) + "px";
                    Drag_ID.style.margin = "auto";
                }
            }
        }
        document.onmouseup = function () {moveable = false;};
        Drag_ID.onselectstart = function(e){return false;}
    }
    $("#windown-content").attr("class","windown-"+cssName);
    if( time == "" || typeof(time) == "undefined") {
        $("#windown-close").bind('click',function() {
            showselect('t123_')
            $("#windownbg").remove();
            $("#windown-box").fadeOut("slow",function(){$(this).remove();});
            javascript:history.go(-1);
            location.reload();
        });
    }else {
        setTimeout(closeWindown,time);
    }
    hideselect('t123_');
}
var closeWindown = function() {
    alert("dddd");
    showselect('t123_');
    $("#windownbg").remove();
    $("#windown-box").fadeOut("slow",function(){$(this).remove();});
}
function hideselect(per)
{
    var _version = $.browser.version;
    if ( _version == 6.0 ) {
        $("select",document).each(function(){
            if($(this).attr('name'))
            {
                if($(this).attr('name').substring(0,5)==per)
                {
                    name = $(this).attr('name').substring(5);
                    $(this).attr('name',name);
                    $(this).css('display','');
                }
                if($(this).css('display')!='none')
                {
                    name = per+$(this).attr('name');
                    $(this).attr('name',name);
                }
                $(this).css('display','none');
            }
        });
    }
}
function showselect(per)
{
    var _version = $.browser.version;
    if ( _version == 6.0 ) {
        $("select",document).each(function(){
            if($(this).attr('name'))
            {
                if($(this).attr('name').substring(0,5)==per)
                {
                    name = $(this).attr('name').substring(5);
                    $(this).attr('name',name);
                    $(this).css('display','');
                }
            }
        });
    }
}