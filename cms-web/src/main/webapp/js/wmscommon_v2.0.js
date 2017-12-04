/**
 * Created by cofco on 14-12-29.
 */

//var grid_width = $(window).width() - 4;
//var grid_width_left = grid_width - 165;
//var grid_height = $(window).height() - $("#o-serch").height() - $("#o-breadcrumb").height() - 120;
//var grid_height = $(window).height() - 124 - $("#o-serch").height();


//function resizing(width) {
//    $("#myTab").jqGrid('setGridParam','autowidth',false);
//    $("#myTab").jqGrid('setGridWidth',width);
//    $("#myTab").jqGrid('setGridHeight', grid_height);
//}

//function resizeTableWidth() {
//    // 获取窗口宽度
//    $("#myTab").jqGrid('setGridParam','autowidth',false);
//    $("#myTab").jqGrid('setGridWidth',window.innerWidth - 4);
//}
//window.onresize=resizeTableWidth;

/**
 * 提示信息对话框
 * @param message
 */
function alertMessage(message) {
    var divhtml = "<div id='div_alert' title='提示' style='display:none;'>" +message + "</div>";
    $("body").append(divhtml);

    $("#div_alert").dialog({
        autoOpen:true,
        minWidth:150,
        minHeight:150,
        modal:true,
        resizable:true,
        bgiframe:true,
        buttons: {
            "关闭": function() {
                $( this ).dialog( "close" );
            }
        },
        close:function(evt,ui) {
            $("#div_alert").dialog("destroy");
            $("#div_alert").html("").remove();
        }
    });

}

//确认信息对话框的回调函数
var confirmCallback;

/**
 * 确认信息对话框
 * @param message
 * @param callback
 */
function confirmMessage(message, callback) {

    if(callback == null) {
        alertMessage(message);
    } else {
        confirmCallback = callback;


        var divhtml = "<div id='div_confirm' title='提示' style='display:none;'>" + message + "</div>";

        $("body").append(divhtml);
        var div=$("#div_confirm");

        div.dialog({
            autoOpen:true,
            minWidth:150,
            minHeight:150,
            modal:true,
            resizable:true,
            bgiframe:true,
            buttons: {
                "确定": function() {
                    confirmCallback(true);
                    $( this ).dialog( "close" );
                },
                "取消": function() {

                    confirmCallback(false);
                    $( this ).dialog( "close" );
                }
            },
            close:function(evt,ui) {
                div.dialog("destroy");
                $("#div_confirm").html("").remove();
            }
        });
    }

}

var confirmCallbackWithParam;
/**
 * 确认信息对话框，回调函数可带参数
 * @param message
 * @param callback
 */
function confirmMessageWithParam(message, callback,param) {

    if(callback == null) {
        alertMessage(message);
    } else {
        confirmCallbackWithParam = callback;


        var divhtml = "<div id='div_confirm' title='提示' style='display:none;'>" + message + "</div>";

        $("body").append(divhtml);
        var div=$("#div_confirm");

        div.dialog({
            autoOpen:true,
            minWidth:150,
            minHeight:150,
            modal:true,
            resizable:true,
            bgiframe:true,
            buttons: {
                "确定": function() {
                    confirmCallbackWithParam(true,param);
                    $( this ).dialog( "close" );
                },
                "取消": function() {

                    confirmCallbackWithParam(false);
                    $( this ).dialog( "close" );
                }
            },
            close:function(evt,ui) {
                div.dialog("destroy");
                $("#div_confirm").html("").remove();
            }
        });
    }

}


var confirmCallbackWithDivParam;
/**
 * 确认信息对话框，回调函数可带参数
 * @param message
 * @param callback
 */
function confirmMessageWithDivParam(message, divparam, divid, callback) {

    if(callback == null) {
        alertMessage(message);
    } else {
        confirmCallbackWithDivParam = callback;

        var divhtml = "<div id='div_confirm' title='提示' style='display:none;'>" + message
            +divparam+ "</div>";

        $("body").append(divhtml);
        var div=$("#div_confirm");

        div.dialog({
            autoOpen:true,
            minWidth:150,
            minHeight:150,
            modal:true,
            resizable:true,
            bgiframe:true,
            buttons: {
                "确定": function() {
                    var param = $("select[id='"+divid+"']").val();
                    confirmCallbackWithDivParam(true,param);
                    $( this ).dialog( "close" );
                },
                "取消": function() {

                    confirmCallbackWithDivParam(false);
                    $( this ).dialog( "close" );
                }
            },
            close:function(evt,ui) {
                div.dialog("destroy");
                $("#div_confirm").html("").remove();
            }
        });
    }

}

/**
 * 带回调参数的对话框
 * @param url
 * @param params
 * @param undestroy
 * @param refreshflag
 * @param callback var cbfun=functioon(){}    xxx(cbfun,"abc")
 */
function openUrlDlgWithCallBack(url, params, undestroy, refreshflag,callback) {
    if(undestroy) {
        openSnQueryDlg(url, params);
    } else {
        //div销毁
        if(refreshflag){//刷新父页面
            openRefreshDlgDestroyWithCallBack(url, params,callback);
        }else{
            openDlgDestroyWithCallBack(url, params,callback);
        }
    }
}
function openRefreshDlgDestroyWithCallBack(url, params,callback) {
    var iframe = "<iframe src=\'" + url + "\' width='100%' height='" + (params.height-55) + "px' scrolling='auto' frameborder=0 marginheight=0 marginwidth=0></iframe>";
    var divhtml = "<div id='div_" + params.dlgid + "' title='" + params.title + "' style='display:none;padding:5px;'>" + iframe + "</div>";
    $("body").append(divhtml);
    var div=$("#div_" + params.dlgid);
    var tableID = params.tableID;
    div.dialog({
        autoOpen:true,
        width:params.width,
        height:params.height,
        modal:true,
        resizable:true,
        bgiframe:true,
        close:function(evt,ui) {
            callback();
            div.dialog("destroy");
            div.remove();
            jQuery("#"+tableID).trigger('reloadGrid');
        }
    });
}

function openDlgDestroyWithCallBack(url, params,callback) {
    var iframe = "<iframe src=\'" + url + "\' width='100%' height='" + (params.height-55) + "px' scrolling='auto' frameborder=0 marginheight=0 marginwidth=0></iframe>";
    var divhtml = "<div id='div_" + params.dlgid + "' title='" + params.title + "' style='display:none;padding:5px;'>" + iframe + "</div>";
    $("body").append(divhtml);
    var div=$("#div_" + params.dlgid);
    div.dialog({
        autoOpen:true,
        width:params.width,
        height:params.height,
        modal:true,
        resizable:true,
        bgiframe:true,
        close:function(evt,ui) {
            callback();
            div.dialog("destroy");
            div.remove();
        }
    });
}

function openDlgDestroy1(url, params,callback) {
    var iframe = "<iframe src=\'" + url + "\' width='100%' height='" + (params.height-55) + "px' scrolling='auto' frameborder=0 marginheight=0 marginwidth=0></iframe>";
    var divhtml = "<div id='div_" + params.dlgid + "' title='" + params.title + "' style='display:none;padding:5px;'>" + iframe + "</div>";
    $("body").append(divhtml);
    var div=$("#div_" + params.dlgid);
    div.dialog({
        autoOpen:true,
        width:params.width,
        height:params.height,
        modal:true,
        resizable:true,
        bgiframe:true,
        close:function(evt,ui) {

            callback();
            div.dialog("destroy");
            div.remove();
        }
    });
}


/**
 * 打开url对话框
 * @param url
 * @param params
 * @param refreshflag true 刷新 false不刷新
 */
function openUrlDlg(url, params, undestroy, refreshflag) {
    if(undestroy) {
        openSnQueryDlg(url, params);
    } else {
        //div销毁
        if(refreshflag){//刷新父页面
            openRefreshDlgDestroy(url, params);
        }else{
            openDlgDestroy(url, params);
        }
    }
}

function openRefreshDlgDestroy(url, params) {
    var iframe = "<iframe src=\'" + url + "\' width='100%' height='" + (params.height-55) + "px' scrolling='auto' frameborder=0 marginheight=0 marginwidth=0></iframe>";
    var divhtml = "<div id='div_" + params.dlgid + "' title='" + params.title + "' style='display:none;padding:5px;'>" + iframe + "</div>";
    $("body").append(divhtml);
    var div=$("#div_" + params.dlgid);
    var tableID = params.tableID;
    div.dialog({
        autoOpen:true,
        width:params.width,
        height:params.height,
        modal:true,
        resizable:true,
        bgiframe:true,
        close:function(evt,ui) {
            //V3.1 zrq add fix ie下div remove不会关闭iframe的bug
            $("iframe",div).remove();
            div.dialog("destroy");
            div.remove();
            jQuery("#"+tableID).trigger('reloadGrid');
        }
    });
}

function openDlgDestroy(url, params) {
    var iframe = "<iframe src=\'" + url + "\' width='100%' height='" + (params.height-55) + "px' scrolling='auto' frameborder=0 marginheight=0 marginwidth=0></iframe>";
    var divhtml = "<div id='div_" + params.dlgid + "' title='" + params.title + "' style='display:none;padding:5px;'>" + iframe + "</div>";
    $("body").append(divhtml);
    var div=$("#div_" + params.dlgid);
    div.dialog({
        autoOpen:true,
        width:params.width,
        height:params.height,
        modal:true,
        resizable:true,
        bgiframe:true,
        close:function(evt,ui) {
            div.dialog("destroy");
            div.remove();
        }
    });
}
//高级查询对话框，与上面对话框的区别是，在关闭对话框时并不销毁对话框，只是隐藏
function openSnQueryDlg(url, params) {
    var div=$("#div_" + params.dlgid);

    if(div.attr("id") == undefined) {
        var iframe = "<iframe src=\'" + url + "\' width='100%' height='" + (params.height-55) + "px' scrolling='auto' frameborder=0 marginheight=0 marginwidth=0></iframe>";
        var divhtml = "<div id='div_" + params.dlgid + "' title='" + params.title + "' style='display:none;padding:5px;'>" + iframe + "</div>";
        $("body").append(divhtml);
        div = $("#div_" + params.dlgid);
    }
    div.dialog({
        autoOpen:true,
        width:params.width,
        height:params.height,
        modal:true,
        resizable:true,
        bgiframe:true
    });
}

function closeUrlDlg(dlgid) {
    $("#div_" + dlgid).dialog("close");
}

function closeUrlDlgAndRefresh(divID,tableID) {
    $("#div_"+divID).dialog("close");
    jQuery("#"+tableID).trigger('reloadGrid');
}

function ajaxformsubmit(tourl,formId,divID,tableID){
    $.ajax({
        type: "POST",
        url:tourl,
        data:$('#'+formId).serialize(),
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#errormsg").html(textStatus);
        },
        success: function(data) {
            if("success"!=data){
                $("#errormsg").html(data);
            }else{
                parent.window.closeUrlDlgAndRefresh(divID,tableID);
            }
        }
    });
}

function ajaxformsubmit1(tourl,formId,divID,divID1,description){
    $.ajax({
        type: "POST",
        url:tourl,
        data:$('#'+formId).serialize(),
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#errormsg").html(textStatus);
        },
        success: function(data) {
            var datas = data.split("|");
            if("success"!=datas[0]){
                $("#errormsg").html(datas[0]);
            }else{
                var id = datas[1];
                var lidata = "<li id='"+id+"'>"+description+"</li>";
                parent.window.$("#"+divID1).append(lidata);
                parent.window.resetALL();
                parent.window.closeUrlDlg(divID);
            }
        }
    });
}

//主页面执行修改操作
function ajaxformupdate(tourl,tableID,errorid){
    $.ajax({
        type: "POST",
        url:tourl,
        dataType:"json",
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+errorid).html(textStatus);
        },
        success: function(data) {
            if("N"==data.status){
                $("#"+errorid).html(data.info);
            }else{
                $("#"+errorid).html(data.info);
                jQuery("#"+tableID).trigger('reloadGrid');
            }
        }
    });
}

//已post的方式提交数据
function ajaxPostSubmit(tourl,tableID,errorid, jsonData){
    $.ajax({
        type: "POST",
        url:tourl,
        dataType:"json",
        data: jsonData,
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+errorid).html(textStatus);
        },
        success: function(data) {
            if("N"==data.status){
                $("#"+errorid).html(data.info);
            }else{
                $("#"+errorid).html(data.info);
                jQuery("#"+tableID).trigger('reloadGrid');
            }
        }
    });
}

//已post的方式提交数据
function ajaxPostParamsSubmit(tourl,tableID,errorid, jsonData, loadImgUrl){
    if(!loadImgUrl) {
        loadImgUrl = "../images/loading.gif"
    }
    $.ajax({
        type: "POST",
        url:tourl,
        dataType:"json",
        data: jsonData,
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src=' + '"' + loadImgUrl + '"' + 'width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+errorid).html(textStatus);
        },
        success: function(data) {
            if("N"==data.status){
                $("#"+errorid).html(data.info);
            }else{
                $("#"+errorid).html(data.info);
                jQuery("#"+tableID).trigger('reloadGrid');
            }
        }
    });
}

//已post的方式提交数据,增加回调函数
function ajaxPostSubmitWithCallback(tourl,errorid, jsonData,callback, params){

    $.ajax({
        type: "POST",
        url:tourl,
        dataType:"json",
        data: jsonData,
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+errorid).html(textStatus);
        },
        success: function(data) {
            callback(data,params);
        }
    });
}

// 此方法与ajaxPostSubmitWithCallback，但params必传，params可以传""
function ajaxPostSubmitParamsWithCallback(tourl,errorid, jsonData,callback, params, loadImgUrl){

    if(!loadImgUrl) {
        loadImgUrl = "../images/loading.gif"
    }
    $.ajax({
        type: "POST",
        url:tourl,
        dataType:"json",
        data: jsonData,
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src=' + '"' + loadImgUrl + '"' + 'width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+errorid).html(textStatus);
        },
        success: function(data) {
            callback(data,params);
        }
    });
}

//已post的方式提交数据,增加回调函数
function ajaxPostSubmitWithPrint(tourl,errorid, jsonData,callback){
    $.ajax({
        type: "POST",
        url:tourl,
        dataType:"json",
        data: jsonData,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+errorid).html(textStatus);
        },
        success: function(data) {
            callback(data);
        }
    });
}
//在当前页以Div模式创建的对话框，而非，页面创建嵌入对话框
function ajaxForDivSubmit(url, jsonData, showErrortableId, showErrorId, reloadUrl, dlgId) {
    $.ajax({
        type: "POST",
        url: url,
        dataType:"json",
        data: jsonData,
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus=='error'){
                textStatus='刷新页面后重试或者联系管理员';
            }else{
                textStatus="数据库操作异常！";
            }
            $("#"+showErrorId).html(textStatus);
        },
        success: function(data) {
            if(data.status == "Y") { //保存成功后，关闭对话框并刷新表格
                reloadGrid(showErrortableId, reloadUrl);
                $("#"+showErrorId).html(data.info);
            } else {
                $("#"+showErrorId).html(data.info);
            }
            $("#" + dlgId).dialog( "close" );
        }
    });
}

//浮点数直接相乘
function accMul(num1,num2){
    var m=0,s1=num1.toString(),s2=num2.toString();
    if(s1.indexOf(".")>0){
        m+=s1.split(".")[1].length;
    }
    if(s2.indexOf(".")>0){
        m+=s2.split(".")[1].length;
    }
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

//删除左右两端的空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
jQuery.extend({
    browser: function()
    {
        var
            rwebkit = /(webkit)\/([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            browser = {},
            ua = window.navigator.userAgent,
            browserMatch = uaMatch(ua);

        if (browserMatch.browser) {
            browser[browserMatch.browser] = true;
            browser.version = browserMatch.version;
        }
        return { browser: browser };
    }
});

function uaMatch(ua)
{
    ua = ua.toLowerCase();

    var match = rwebkit.exec(ua)
        || ropera.exec(ua)
        || rmsie.exec(ua)
        || ua.indexOf("compatible") < 0 && rmozilla.exec(ua)
        || [];

    return {
        browser : match[1] || "",
        version : match[2] || "0"
    };
}

function tabTableInput(tableId, inputType) {
    var rowInputs = [];
    var trs = $("#"+ tableId).find("tr");
    var inputRowIndex = 0;

    $.each(trs, function(i, obj) {
        if ($(obj).find("th").length > 0) { //跳过表头
            return true;
        }
        var rowArray = [];
        var thisRowInputs;
        if (!inputType) { //所有的input
            thisRowInputs = $(obj).find("input:not(:disabled):not(:hidden):not([readonly])");
        } else {
            thisRowInputs = $(obj).find("input:not(:disabled):not(:hidden):not([readonly])[type="+ inputType +"]");
        }
        if (thisRowInputs.length == 0) {
            return true;
        }
        thisRowInputs.each(function(j) {
            $(this).attr("_r_", inputRowIndex).attr("_c_", j);
            rowArray.push( {"c": j,"input": this});

            $(this).keydown(function(evt) {
                var r = $(this).attr("_r_");
                var c = $(this).attr("_c_");
                var tRow
                if (evt.which == 38) { //上
                    if (r == 0)
                        return;
                    r--; //向上一行
                    tRow = rowInputs[r];
                    if (c > tRow.length - 1) {
                        c = tRow.length - 1;
                    }
                } else if (evt.which == 40) { //下
                    if (r == rowInputs.length - 1) { //已经是最后一行
                        return;
                    }
                    r++;
                    tRow = rowInputs[r];
                    if (c > tRow.length - 1) {
                        c = tRow.length - 1;
                    }
                } else if (evt.which == 37) { //左
                    if (r == 0 && c == 0) { //第一行第一个,则不执行操作
                        return;
                    }
                    if (c == 0) { //某行的第一个,则要跳到上一行的最后一个,此处保证了r大于0
                        r--;
                        tRow = rowInputs[r];
                        c = tRow.length - 1;
                    } else { //否则只需向左走一个
                        c--;
                    }
                } else if (evt.which == 39) { //右
                    tRow = rowInputs[r];
                    if (r == rowInputs.length - 1 && c == tRow.length - 1) { //最后一个不执行操作
                        return;
                    }
                    if (c == tRow.length - 1) { //当前行的最后一个,跳入下一行的第一个
                        r++;
                        c = 0;
                    } else {
                        c++;
                    }
                }
                $(rowInputs[r].data[c].input).focus();
            });
        });
        rowInputs.push( {
            "length": thisRowInputs.length,
            "rowindex": inputRowIndex,
            "data": rowArray
        });
        inputRowIndex++;
    });
}


// 根据权限隐藏按钮
function disableButton(url){
    $.ajax({
        url: url,
        context: document.body,
        success: function(data, textStatus){
            var anObject = eval('(' + data + ')');
            for (key in anObject){
                var val = anObject[key];
                if(val=="0"){//将查到的没有权限的按钮元素移除
                    if($("#"+key).length >0){
                        $("#"+key).remove();
                    }
                }
            }
        },
        error: function(data, textStatus){
            alertMessage("请求错误！");
        }
    });
}


