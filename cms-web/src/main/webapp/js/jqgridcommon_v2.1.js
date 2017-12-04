/**
 * Created by rongss on 15-1-4.
 */


var time = "0";
var id= "";

var grid_width = $(window).width() - 4;

var dialog_width = $(window).width() - 100;
var dialog_height = $(window).height() - 100;

function resizeTableWidth() {
    // 获取窗口宽度
    $("#myTab").jqGrid('setGridParam','autowidth',false);

    var newHeight = $(window).height() - 95 - $("#o-serch").height();
    $("#myTab").jqGrid('setGridHeight', newHeight);

    var newWidth = $(window).width();
    $("#myTab").jqGrid('setGridWidth', newWidth - 4);

    newHeight = $(window).height() - 95 - $("#o-serch").height();
    $("#myTab").jqGrid('setGridHeight', newHeight);


}
window.onresize=resizeTableWidth;

/**
 * jqGrid表格
 * @param colNames 列名称
 * @param colModel 表格内容
 * @param url 服务器地址
 * @param tableID 添加表格table的id
 * @param captionName 表头名称
 * @param paperID 工具栏div的id
 * @param gridComplete 操作（如果没有操作选项，可以传null）
 * @param autowidth，shrinkToFit都为true，表示列整体宽度固定100%，都为false，表示整体宽度不固定
 */
function gridUI(colNames,colModel,url,tableID,captionName,sortName,sortOrder,paperID,gridComplete,autowidth,shrinkToFit,errorid){

    $("#"+tableID).jqGrid({   //myTab:装在数据的table id
        sortable: true,//支持鼠标拖动列排序
        datatype: "json", //将这里改为使用JSON数据
        url:url, //这是数据的请求地址
        colNames:colNames,
        colModel:colModel,
        gridComplete: gridComplete,
        loadComplete:function(xhr) {if(xhr && xhr.status && "N"==xhr.status)$("#"+errorid).html(xhr.info); if(xhr && xhr.ids)$("#ids").val(xhr.ids);},
        autowidth: autowidth,
        shrinkToFit:shrinkToFit,
        height:"100%",
        pgfirst : "首页",
        pglast : "末页",
        pgnext : "下一页",
        pgprev : "上一页",
        sortname: sortName,
        sortorder:sortOrder,
        recordtext: "{0} - {1}\u3000共 {2} 条数据",
        pager: "#"+paperID, //分页工具栏，pager:分页DIV的id
        rowNum:20, //每页显示记录数
        viewrecords: true, //是否显示行数
        rowList:[10,20,50,100,200], //可调整每页显示的记录数
        multiselect: true, //是否支持多选
        caption: captionName,
        altRows:true,//设置斑马
        altclass:'i-altclass'
    }).navGrid("#"+paperID, { add: false, edit: false, del: false,search:false,refresh:true,
            afterRefresh:function(){
                document.getElementById(errorid).innerHTML= " ";
            }}
    );


    resizingtable(grid_width,tableID);
}
/**
 * jqGrid表格
 * @param colNames 列名称
 * @param colModel 表格内容
 * @param url 服务器地址
 * @param tableID 添加表格table的id
 * @param captionName 表头名称
 * @param paperID 工具栏div的id
 * @param gridComplete 操作（如果没有操作选项，可以传null）
 * @param autowidth，shrinkToFit都为true，表示列整体宽度固定100%，都为false，表示整体宽度不固定
 */
function summaryGridUI(colNames,colModel,url,tableID,captionName,sortName,sortOrder,paperID,gridComplete,autowidth,shrinkToFit,errorid){

    $("#"+tableID).jqGrid({   //myTab:装在数据的table id
        sortable: true,//支持鼠标拖动列排序
        datatype: "json", //将这里改为使用JSON数据
        url:url, //这是数据的请求地址
        loadComplete:function(xhr) {if(xhr && xhr.status && "N"==xhr.status)$("#"+errorid).html(xhr.info);},
        colNames:colNames,
        colModel:colModel,
        gridComplete: gridComplete,
        autowidth: autowidth,
        shrinkToFit:shrinkToFit,
        height:"100%",
        pgfirst : "首页",
        pglast : "末页",
        pgnext : "下一页",
        pgprev : "上一页",
        sortname: sortName,
        sortorder:sortOrder,
        recordtext: "{0} - {1}\u3000共 {2} 条数据",
        pager: "#"+paperID, //分页工具栏，pager:分页DIV的id
        rowNum:20, //每页显示记录数
        viewrecords: true, //是否显示行数
        rowList:[10,20,50,100,200], //可调整每页显示的记录数
        multiselect: true, //是否支持多选
        caption: captionName,
        altRows:true,//设置斑马
        footerrow : true,
        altclass:'i-altclass'
    }).navGrid("#"+paperID, { add: false, edit: false, del: false,search:false,refresh:true,
            afterRefresh:function(){
                document.getElementById(errorid).innerHTML= " ";
            }}
    );


    resizingtable(grid_width,tableID);
}
/**
 * jqGrid表格
 * @param colNames 列名称
 * @param colModel 表格内容
 * @param url 服务器地址
 * @param tableID 添加表格table的id
 * @param captionName 表头名称
 * @param paperID 工具栏div的id
 * @param gridComplete 操作（如果没有操作选项，可以传null）
 * @param autowidth，shrinkToFit都为true，表示列整体宽度固定100%，都为false，表示整体宽度不固定
 */
function eidtGridUI(colNames,colModel,url,tableID,captionName,sortName,sortOrder,paperID,gridComplete,autowidth,shrinkToFit,errorid,editable,editurl){
    $("#"+tableID).jqGrid({   //myTab:装在数据的table id
        sortable: true,//支持鼠标拖动列排序
        datatype: "json", //将这里改为使用JSON数据
        url:url, //这是数据的请求地址
        editurl:editurl,
        colNames:colNames,
        colModel:colModel,
        gridComplete: gridComplete,
        loadComplete:function(xhr) {if(xhr && xhr.status && "N"==xhr.status)$("#"+errorid).html(xhr.info);},
        autowidth: autowidth,
        shrinkToFit:shrinkToFit,
        height:"100%",
        pgfirst : "首页",
        pglast : "末页",
        pgnext : "下一页",
        pgprev : "上一页",
        sortname: sortName,
        sortorder:sortOrder,
        recordtext: "{0} - {1}\u3000共 {2} 条数据",
        pager: "#"+paperID, //分页工具栏，pager:分页DIV的id
        rowNum:20, //每页显示记录数
        viewrecords: true, //是否显示行数
        rowList:[10,20,50,100,200], //可调整每页显示的记录数
        multiselect: true, //是否支持多选
        caption: captionName,
        altRows:true,//设置斑马
        altclass:'i-altclass'
    }).navGrid("#"+paperID, { add: false, edit: false, del: false,search:false,refresh:true,
            afterRefresh:function(){
                document.getElementById(errorid).innerHTML= " ";
            }}
    );
    resizingtable(grid_width,tableID);
}

/**
 * jqGrid表格(不加载数据)
 * @param colNames 列名称
 * @param colModel 表格内容
 * @param url 服务器地址
 * @param tableID 添加表格table的id
 * @param captionName 表头名称
 * @param paperID 工具栏div的id
 * @param gridComplete 操作（如果没有操作选项，可以传null）
 * @param autowidth，shrinkToFit都为true，表示列整体宽度固定100%，都为false，表示整体宽度不固定
 */
function lazyLoadgridUI(colNames,colModel,url,tableID,captionName,sortName,sortOrder,paperID,gridComplete,autowidth,shrinkToFit,errorid){

    $("#"+tableID).jqGrid({   //myTab:装在数据的table id
        sortable: true,//支持鼠标拖动列排序
        datatype: "local", //local,不加载数据
        url:url, //这是数据的请求地址
        colNames:colNames,
        colModel:colModel,
        gridComplete: gridComplete,
        loadComplete:function(xhr) {if(xhr && xhr.status && "N"==xhr.status)$("#"+errorid).html(xhr.info); if(xhr && xhr.ids)$("#ids").val(xhr.ids);},
        autowidth: autowidth,
        shrinkToFit:shrinkToFit,
        height:"100%",
        pgfirst : "首页",
        pglast : "末页",
        pgnext : "下一页",
        pgprev : "上一页",
        sortname: sortName,
        sortorder:sortOrder,
        recordtext: "{0} - {1}\u3000共 {2} 条数据",
        pager: "#"+paperID, //分页工具栏，pager:分页DIV的id
        rowNum:20, //每页显示记录数
        viewrecords: true, //是否显示行数
        rowList:[10,20,50,100,200], //可调整每页显示的记录数
        multiselect: true, //是否支持多选
        caption: captionName,
        altRows:true,//设置斑马
        altclass:'i-altclass'
    }).navGrid("#"+paperID, { add: false, edit: false, del: false,search:false,refresh:true,
            afterRefresh:function(){
                document.getElementById(errorid).innerHTML= " ";
            }}
    );


    resizingtable(grid_width,tableID);
}

function resizingtable(width,tableID) {
    $("#"+tableID).jqGrid('setGridParam','autowidth',false);
    $("#"+tableID).jqGrid('setGridWidth',width);
    var newHeight = $(window).height() - 95 - $("#o-serch").height();
    $("#"+tableID).jqGrid('setGridHeight', newHeight);
}

function reloadGrid(tableId, url, errorId) {
    $("#"+errorId).html("");
    $("#"+tableId).jqGrid('setGridParam',{datatype:'json', postData:{'condition':""}}).trigger('reloadGrid');
}

function linkItem(cellvalue, options, rowObject,url,name){
    return "<a href="+url+"?id=" + rowObject.id+"&"+name+"="+cellvalue+"' style='cursor:pointer;text-decoration:underline;color:blue'>"+cellvalue+"</a>";

}

function selectAll(tableID,selectflag){
    var ids = $("#"+tableID).jqGrid("getDataIDs");
    //设置全选
    if(!selectflag){
        selectflag=true;
        $("#"+tableID).jqGrid("resetSelection");
        for(var i=0;i<ids.length;i++){
            $("#"+tableID).jqGrid("setSelection",ids[i]);
        }
    }else{
        selectflag=false;
        $("#"+tableID).trigger("reloadGrid");
    }
    return selectflag;
    //用ajax在后台全部选中数据
}

/**
 * 删除
 * @param id 数据的ID
 * @param strDel 删除服务器地址
 * @param tableID 必须项，否则无法刷新表格
 */
function dele(id,strDel,tableID){
    confirmMessage("确定要删除吗？\n（删除后数据不可恢复）",function(data){
        if(data){
            var urlDel = strDel+"?id="+id;
            var type= "GET";
            ajaxfn(type,urlDel,tableID);
        }
    });
}

/**
 * ajax提交删除
 * @param type
 * @param urlDel
 * @param tableID
 */
function ajaxfn(type,urlDel,tableID){

    $.ajax({
        type: type,
        url:urlDel,
        dataType: "text",
        beforeSend:function () {
            $.blockUI({ message:'<h1><img src="../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        complete:function () {
            $.unblockUI();
        },
        error: function(data) {
            alertMessage("数据源连接失败！", '提示');
        },
        success: function(data) {
            jQuery("#"+tableID).trigger('reloadGrid');
            if(data !="success"){
                alertMessage(data, '提示');
            }
        }
    });
}

/**
 * 表单验证
 * @param formID
 * @param divID
 * @param tableID
 * @param errormsgID
 */
function valid(formID,divID,tableID,errormsgID,errorid){
    var formvalid = $("#"+formID).Validform({
        tiptype:function(msg,o,cssctl){
            if(!o.obj.is("form")){//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                var html = "<div class='info'><span class='Validform_checktip'></span><span class='dec'><s class='dec1'>&#9670;</s></span></div>";
                o.obj.parent().append(html);
                var objtip=o.obj.parent().find(".Validform_checktip");
                cssctl(objtip,o.type);
                objtip.text(msg);

                var infoObj=o.obj.parent().find(".info");
                if(o.type==2){
                    infoObj.fadeOut(200);

                }else{
                    if(infoObj.is(":visible")){return;}
                    var left=o.obj.offset().left,
                        top=o.obj.offset().top;

                    infoObj.css({
                        left:left+40,
                        top:top-45
                    }).show().animate({
                            top:top+15
                        },200);
                }

            }
        },
        usePlugin:{
            passwordstrength:{
                minLen:6,
                maxLen:18,
                trigger:function(obj,error){
                    if(error){
                        obj.parents("td").next().find(".passwordStrength").hide();
                    }else{
                        obj.parents("td").next().find(".info").hide();
                        obj.parents("td").next().find(".passwordStrength").show();
                    }
                }
            }
        },
        ajaxPost:true,
        beforeSubmit:function(curform){
            //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
            $.blockUI({ message:'<h1><img src="../../images/loading.gif" width="100" height="80" /><br/> 正在提交请求，请稍后...</h1>'});
        },
        callback:function(data){
            if(data.status=="N"){
                var tip=$("#"+errormsgID);
                var info = data.info.replace(/;/g,"<br>");
                tip.html(info);
            }else{
                parent.window.$("#"+errorid).html(data.info);
                parent.window.closeUrlDlgAndRefresh(divID,tableID);
            }

            $.unblockUI();
        }

    });

    //添加自定义验证
    $.extend($.Datatype, {
        "z0": /^[1-9]\d*$/  //大于0的整数
    });

    $.Tipmsg.w["z0"]="请输入大于0的整数";

    return formvalid;
}

function resetFrom(validformObj, formId) {
    validformObj.resetForm();
    $("#" + formId).find(".info").each(function() {
        $(this).remove();
    });
}


/**
 * 文件上传处理函数
 * @param url
 * @param fileElementId
 * @param errormsgID
 * @param errorid
 * @param divID
 * @param tableID
 * @returns {boolean}
 */
function ajaxFileUpload(url,fileElementId,errormsgID,errorid,divID,tableID) {
    $.ajaxFileUpload( {
        url : url,//用于文件上传的服务器端请求地址
        secureuri : false,//一般设置为false
        type: 'post',
        fileElementId : fileElementId,//文件上传控件的id属性
        dataType : 'json',//返回值类型 一般设置为json
        success : function(data, status) //服务器成功响应处理函数
        {
            if(data.status=="N"){
                var tip=$("#"+errormsgID);
                var info = data.info.replace(/;/g,"<br>");
                tip.html(info);
            }else{
                parent.window.$("#"+errorid).html(data.info);
                parent.window.closeUrlDlgAndRefresh(divID,tableID);
            }
        },
        error : function(data, status, e)//服务器响应失败处理函数
        {
            $("#"+errormsgID).html("服务器没有响应！");
        }
    })
    return false;
}
function loadForSubmit(){
    var load = { message:'<h1><img src="../../images/loading_circle.gif" width="30" height="30" /><br/> 正在提交请求...</h1>'};
    $.blockUI(load);
    setTimeout(function(){
        $.unblockUI(load);
    },2000);
}
