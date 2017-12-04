/**
 * Created by cofco on 15-4-27.
 */

var tabs = $( "#tabs" ).tabs({
    activate : function( event, ui ) {
        var divid = ui.newTab.find("a").attr("href");
        setTabsDivHeight(divid);
    }
});

$(function() {
    //设置页签可以移动
//    tabs.find( ".ui-tabs-nav" ).sortable({
//        axis: "x",
//        stop: function() {
//            tabs.tabs( "refresh" );
//        }
//    });

    // 页签关闭
    $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
        var deleteIdx = $( this ).closest( "li").attr("tabindex");
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        $( "#tabs" ).tabs( "refresh" );

        if(deleteIdx == -1) { //如果删除的标签不为激活状态，则重置激活状态的高度
            var activeIdx = $( "#tabs" ).tabs( "option", "active" );
            var divid = $( "#tabs" ).find( ".ui-tabs-nav").find("li:eq(" + activeIdx+ ")").find("a").attr("href");
            setTabsDivHeight(divid);
        }

    });

    $("#o-right").width($(window).width() - 175); //计算右边的高度


    $("#o-left").on("click", "li", function() {
        addTab(this);
    });

    //二级菜单伸缩
    $(".i-menu1").click(function(){

        var obj = $(this).find("div");
        var className = obj.attr("class");

        if(className == "i-menu1-pic-right") {
            obj.removeClass("i-menu1-pic-right").addClass("i-menu1-pic-down");
        } else {
            obj.removeClass("i-menu1-pic-down").addClass("i-menu1-pic-right");
        }

        $(this).siblings().find(".i-menu1-pic-down").removeClass("i-menu1-pic-down").addClass("i-menu1-pic-right");

        $(this).next("div").slideToggle("slow")
            .siblings(".i-menu2:visible").slideUp("slow");
    });

    //三级及三级目录以上样式
    $(".menu2-sub").each(function() {
        var ul = $(this).find("ul");
        if(ul.length > 0) {
            ul.each(function() {
                $(this).parent().addClass("sub-arrow");
                $(this).parent().find("span:first").click(function() {
                    var dis = $(this).siblings("ul").css("display");
                    if(dis == "none") {
                        $(this).siblings("ul").css("display", "block");
                    } else {
                        $(this).siblings("ul").css("display", "none");
                    }
                });
            });
        }
    });

});

var tabLi = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var tabDiv = "<iframe id='#{framename}' name='#{framename}' src='#{href}' frameborder='0' scrolling='auto' width='100%' height='100%'></iframe>";
//var tabCounter = 2;

//打开页面，增加标签
function addTab(obj) {
    var id = "tabs-" + $(obj).attr("name");

    var label = $(obj).html(); //菜单名称

    //判断当前选中的菜单和页签上的标题是否相同，用于菜单选中定位
    var index = -1;
    var counter = 0;
    var tabid = "";
    $( "#tabs" ).find( ".ui-tabs-nav li").each(function(idx, el) {
        var tabname = $(el).find("a").html();

        if(label == tabname) {
            index = idx;
            tabid = $(el).find("a").attr("href");
            return false;
        }
        counter++
    });

    //判断所选中的标签页是否存在
    if(index > -1 ) { //若存在，则直接显示该标签页
        $( "#tabs" ).tabs({ active: index }); //激活选项卡
        var frameObj = $(tabid).find("iframe");
        frameObj.attr("src", frameObj.attr("src")); //从左边菜单点击进入后，自带刷新功能，直接点击页签是不带刷新的
    } else { //若不存在则创建标签页
        var li = $( tabLi.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
        $( "#tabs" ).find( ".ui-tabs-nav" ).append( li );

        var tabDivP = tabDiv.replace(/#\{framename\}/g, id + "-frame").replace(/#\{href\}/g, $(obj).attr("url"));
        $( "#tabs" ).append( "<div id='" + id + "' style='height:84%'>" + tabDivP + "</div>" );

        $( "#tabs" ).tabs( "refresh" );

        $( "#tabs" ).tabs({ active: counter }); //激活当前添加的选项卡

        setTabsDivHeight("#" + id);
    }
}

//显示or隐藏左侧菜单
function switchSysBar() {
    if ($("#o-left").css("display") == "none") {
        $("#o-switch").addClass("picBox_show").removeClass("picBox_hide");
        $("#o-left").show();
        $("#o-right").css("margin-left", "175px");
        $("#o-right").width(winWidth - 175);

    } else {
        $("#o-switch").addClass("picBox_hide").removeClass("picBox_show");
        $("#o-left").hide();
        $("#o-right").css("margin-left", "10px");
        $("#o-right").width(winWidth - 10);
    }
}

function setTabsDivHeight(divid) {
    var tabheight = $("#tabs").find("ul:eq(0)").height();
    $(divid).height($(window).height() - tabheight - $("#header").height() - $("#footer").height()-20);
}

//重置右侧div大小
var winWidth = $(window).width();
function resizeRightWidth() {

    // 获取窗口宽度
    winWidth = $(window).width();

    if ($("#o-left").css("display") == "none") {
        $("#o-right").width(winWidth - 10);
    } else {
        $("#o-right").width(winWidth - 175);
    }

    var  divid = $( "#tabs").find("ul:eq(0)").find(".ui-state-active").attr("aria-controls");
    setTabsDivHeight("#" + divid);

}

window.onresize=resizeRightWidth;