//清空值tr
function clearTab(queryTab){
    $("#"+queryTab).find("tr").each(function(index){
        if(index>1){
            $(this).remove();
        }
    });
}

function showValues(queryTab,tourl,condition){
    clearTab(queryTab);
    jQuery.ajax({
        type:"post", //请求方式
        url:tourl, //请求路径
        data: condition,  //传参
        dataType: "html",//返回值类型
        success:function(data){
            $("#"+queryTab+" tr:last").after(data);
        },
        error: function(data) {
            alert("showValues错误：---- "+data);
        }
    });

}

/**
 * 组装快速查询sql条件
 * @param param 属性字段
 * @param calc  条件 等于 不等于
 * @param tableID
 * @param divID
 * @param url 获取数据的url
 * @param type 类型（Select ， Date ，String ，Time）
 */
function getSqlCondition(param,calc,tableID,divID,url,type){
    var condition = "";
    var flag = 0;
    var type1 = "";
    if(""!=type){
        type1 = type.substr(0,type.length-1);
    }else{
        $("#errormsg").html("未设置属性类型！");
        return condition;
    }
    //获取sql表别名
    var serialno = "";
    var alias = "";
    if(""!=type){
        serialno = type.substr(type.length-1);
        if("0"!=serialno){
            alias = "t"+serialno+".";
        }
    }
    //获取字段名
    var nparam = alias+param;
    if("7"==calc||"8"==calc){
        //不显示任何input
        if("7"==calc){//为空
            condition = nparam +" is null";
        }else if("8"==calc){//不为空
            condition = nparam +" is not null";
        }
    }else if("14"==calc){//介于...之间
        //显示两个input
        var value1 = "";
        var value2 = "";
        if("Select"==type1){
            value1 = $("select[name='"+param+"1']").val();
            value2 = $("select[name='"+param+"2']").val();
        }else{
            value1 = $("input[name='"+param+"1']").val();
            value2 = $("input[name='"+param+"2']").val();
        }

        if(""==value1||""==value2){
            $("#errormsg").html("条件输入不完整，请重新输入！");
            flag = 1;
        }else{
            if("Date"==type1||"Time"==type1){
                value1 = formatDate(value1);
                value2 = formatDate(value2);
            }else{
                value1 = "'"+value1+"'";
                value2 = "'"+value2+"'";
            }
            condition = nparam +" between "+value1+" and "+value2;
        }
    }else{
        //显示第一个input
        var value = "";
        if("Select"==type1){
            value = $("select[name='"+param+"1']").val();
        }else{
            value = $("input[name='"+param+"1']").val();
        }
        if(""==value){
            $("#errormsg").html("条件输入不完整，请重新输入！");
            flag = 1;
        }else{
            if("1"==calc){//等于
                if("Date"==type1||"Time"==type1){
                    condition = nparam +"="+formatDate(value);
                }else{
                    condition = nparam +"='"+value+"'";
                }
            }else if("2"==calc){//不等于
                if("Date"==type1||"Time"==type1){
                    condition = nparam +"<>"+formatDate(value);
                }else{
                    condition = nparam +"<>'"+value+"'";
                }
            }else if("3"==calc){//大于
                if("Date"==type1||"Time"==type1){
                    condition = nparam +">"+formatDate(value);
                }else{
                    condition = nparam +">'"+value+"'";
                }
            }else if("4"==calc){//大于等于
                if("Date"==type1||"Time"==type1){
                    condition = nparam +">="+formatDate(value);
                }else{
                    condition = nparam +">='"+value+"'";
                }
            }else if("5"==calc){//小于
                if("Date"==type1||"Time"==type1){
                    condition = nparam +"<"+formatDate(value);
                }else{
                    condition = nparam +"<'"+value+"'";
                }
            }else if("6"==calc){//小于等于
                if("Date"==type1||"Time"==type1){
                    condition = nparam +"<="+formatDate(value);
                }else{
                    condition = nparam +"<='"+value+"'";
                }
            }else if("11"==calc){//全模糊
                if("Date"==type1||"Time"==type1){
                    condition = nparam + " like "+ formatDate(value);
                }else{
                    condition = nparam + " like '%"+ value+"%'";
                }
            }else if("12"==calc){//左模糊
                if("Date"==type1||"Time"==type1){
                    condition = nparam + " like "+ formatDate(value);
                }else{
                    condition = nparam + " like '%"+ value+"'";
                }
            }else if("13"==calc){//右模糊
                if("Date"==type1||"Time"==type1){
                    condition = nparam + " like "+ formatDate(value);
                }else{
                    condition = nparam + " like '"+ value+"%'";
                }
            }else{
                var values = value.split(",");
                var temp="";
                for(var j=0;j<values.length;j++){
                    if("Date"==type1||"Time"==type1){
                        if(j+1<values.length){
                            temp = temp+formatDate(values[j])+",";
                        }else{
                            temp = temp+formatDate(values[j]);
                        }
                    }else{
                        if(j+1<values.length){
                            temp = temp+"'"+values[j]+"',";
                        }else{
                            temp = temp+"'"+values[j]+"'";
                        }
                    }
                }
                if("9"==calc){//包含
                    condition = nparam +" in ("+ temp+")";
                }else if("10"==calc){//不包含
                    condition = nparam + " not in ("+ temp+")";
                }
            }
        }
    }
    if(0==flag){
        window.parent.closeUrlDlg(divID);
        window.parent.jQuery("#"+tableID).jqGrid('setGridParam',{datatype:'json', postData:{'condition':condition}}).trigger("reloadGrid");
    }
    return condition;
}



/**
 * 组装高级查询条件的保存格式
 * （"|字段1::名称|类型|运算参数值1::名称|参数1::名称（参数1）(如果为空或不空[|字段1|类型|运算参数值1|]);and/or|字段2::名称|类型|运算参数值2::名称|参数2::名称（参数2）;and/or|字段3::名称|类型|运算参数值3::名称|参数3::名称（参数3）；..."）
 * @param param 属性字段
 * @param calc  条件 等于 不等于
 * @param type 类型（Select ， Date ，String , Time）
 * reuturn |字段1::名称|类型|运算参数值1::名称|参数1::名称（参数1）（参数1可以为空(is null)或者参数1,参数2(between)）
 *
 */
function getSeniorCondition(param,calc,type,param_ch,calc_ch){
    var condition = "";
    var type1 = "";
    var serialno ="";
    if(""!=type){
        type1 = type.substr(0,type.length-1);
        serialno = type.substr(type.length-1);
    }else{
        condition = "setypeerror";
        return condition;
    }
    if("7"==calc||"8"==calc){
        //不显示任何input
        condition = "|"+param+"::"+param_ch+"|null"+serialno+"|"+calc+"::"+calc_ch;
    }else if("14"==calc){//介于...之间
        //显示两个input
        var value1 = "";
        var value2 = "";
        var text1="";
        var text2="";
        if("Select"==type1){
            value1 = $("select[name='"+param+"1']").val();
            value2 = $("select[name='"+param+"2']").val();
            text1 = $("select[name='"+param+"1']").find("option:selected").text();
            text2 = $("select[name='"+param+"2']").find("option:selected").text();
        }else{
            value1 = $("input[name='"+param+"1']").val();
            value2 = $("input[name='"+param+"2']").val();
            text1 = value1;
            text2 = value2;
        }
        if(inputVerify(value1)&&inputVerify(value2)){
            condition = "|"+param+"::"+param_ch+"|"+type+"|"+calc+"::"+calc_ch+"|"+value1+"^"+value2+"::"+text1+"^"+text2;
        }else{
            condition = "inputerror";
        }
    }else{
        //显示第一个input
        var value = "";
        var text = "";
        if("Select"==type1){
            value = $("select[name='"+param+"1']").val();
            text = $("select[name='"+param+"1']").find("option:selected").text();
        }else{
            value = $("input[name='"+param+"1']").val();
            text = value;
        }
        if(inputVerify(value)){
            condition = "|"+param+"::"+param_ch+"|"+type+"|"+calc+"::"+calc_ch+"|"+value+"::"+text;
        }else{
            condition = "inputerror";
        }
    }
    return condition;
}
//将scondition转换成标准sql的where条件
function getSeniorSql(con){
    var condition = "";
    var temp = con.split(";");
    for(var i = 0; i<temp.length;i++){
        var params = temp[i].split("|");
        var link = params[0];
        var param = (params[1].split("::"))[0];
        var type = params[2];
        var calc = (params[3].split("::"))[0];
        var value ="";
        if(params.length>4){
            value = (params[4].split("::"))[0];
        }
        var transcon = transferSql(param,type,calc,value);
        condition = condition+" "+link+" "+transcon;
    }
    return condition;
}
//sql转换工具方法
function transferSql(param,type,calc,value){
    //判断calc或value是否包含")"
    var num = "";
    if(""==value){
        num = patch(calc,"\\)",false);
        calc = calc.replace(/\)/g,"");
    }else{
        num = patch(value,"\\)",false);
        value = value.replace(/\)/g,"");
    }
    var condition = "";
    //获取sql表别名
    var serialno = "";
    var alias = "";
    var type1 = "";
    if(""!=type){
        type1 = type.substr(0,type.length-1);
        serialno = type.substr(type.length-1);
        if("0"!=serialno){
            alias = "t"+serialno+".";
        }
    }
    //获取字段名
    var param_right = param.replace(/\(/g,"");
    var param_left = param.replace(param_right,"");
    param = param_left+alias+param_right;
    if(""==value){
        //无input
        if("7"==calc){//为空
            condition = param +" is null";
        }else if("8"==calc){//不为空
            condition = param +" is not null";
        }
    }else{
        if("14"==calc){
            //显示两个input
            var values = value.split("^");
            var value1="";
            var value2="";
            if("Date"==type1||"Time"==type1){
                value1 = formatDate(values[0]);
                value2 = formatDate(values[1]);
            }else{
                value1 = "'"+values[0]+"'";
                value2 = "'"+values[1]+"'";
            }
            condition = param +" between "+value1+" and "+value2;
        }else{
            //显示一个input
            if("1"==calc){//等于
                if("Date"==type1||"Time"==type1){
                    condition = param +"="+formatDate(value);
                }else{
                    condition = param +"='"+value+"'";
                }
            }else if("2"==calc){//不等于
                if("Date"==type1||"Time"==type1){
                    condition = param +"<>"+formatDate(value);
                }else{
                    condition = param +"<>'"+value+"'";
                }
            }else if("3"==calc){//大于
                if("Date"==type1||"Time"==type1){
                    condition = param +">"+formatDate(value);
                }else{
                    condition = param +">'"+value+"'";
                }
            }else if("4"==calc){//大于等于
                if("Date"==type1||"Time"==type1){
                    condition = param +">="+formatDate(value);
                }else{
                    condition = param +">='"+value+"'";
                }
            }else if("5"==calc){//小于
                if("Date"==type1||"Time"==type1){
                    condition = param +"<"+formatDate(value);
                }else{
                    condition = param +"<'"+value+"'";
                }
            }else if("6"==calc){//小于等于
                if("Date"==type1||"Time"==type1){
                    condition = param +"<="+formatDate(value);
                }else{
                    condition = param +"<='"+value+"'";
                }
            }else if("11"==calc){//全模糊
                if("Date"==type1||"Time"==type1){
                    condition = param + " like "+ formatDate(value);
                }else{
                    condition = param + " like '%"+ value+"%'";
                }
            }else if("12"==calc){//左模糊
                if("Date"==type1||"Time"==type1){
                    condition = param + " like "+ formatDate(value);
                }else{
                    condition = param + " like '%"+ value+"'";
                }
            }else if("13"==calc){//右模糊
                if("Date"==type1||"Time"==type1){
                    condition = param + " like "+ formatDate(value);
                }else{
                    condition = param + " like '"+ value+"%'";
                }
            }else{
                var values = value.split(",");
                var temp="";
                for(var j=0;j<values.length;j++){
                    if("Date"==type1||"Time"==type1){
                        if(j+1<values.length){
                            temp = temp+formatDate(values[j])+",";
                        }else{
                            temp = temp+formatDate(values[j]);
                        }
                    }else{
                        if(j+1<values.length){
                            temp = temp+"'"+values[j]+"',";
                        }else{
                            temp = temp+"'"+values[j]+"'";
                        }
                    }
                }
                if("9"==calc){//包含
                    condition = param +" in ("+ temp+")";
                }else if("10"==calc){//不包含
                    condition = param + " not in ("+ temp+")";
                }
            }
        }
    }
    //根据num值，右补num个)
    for(var i=0;i<num;i++){
        condition = condition+")";
    }
    return condition;
}

function showQuery(divID1,divID2,tourl,condition){
    jQuery.ajax({
        type:"post", //请求方式
        url:tourl, //请求路径
        data: condition,  //传参
        dataType: "html",//返回值类型
        success:function(data){
            var datas = data.split("---");
            $("#"+divID1).html(datas[0]);
            $("#"+divID2).html(datas[1]);
            $("#s-condition").val(datas[2]);
        },
        error: function(data) {
            alert("showQuery错误：---- "+data);
        }
    });

}
function singleShowQuery(divID1,divID2,tourl,condition){
    jQuery.ajax({
        type:"post", //请求方式
        url:tourl, //请求路径
        data: condition,  //传参
        dataType: "html",//返回值类型
        success:function(data){
            var datas = data.split("|");
            $("#"+divID1).html(datas[0]);
            $("#"+divID2).html(datas[1]);
        },
        error: function(data) {
            alert("showQuery错误：---- "+data);
        }
    });

}

function showItemQuery(divID1,divID2,tourl,condition){
    jQuery.ajax({
        type:"post", //请求方式
        url:tourl, //请求路径
        data: condition,  //传参
        dataType: "html",//返回值类型
        success:function(data){
            var datas = data.split("|");
            $("#"+divID1).html(datas[0]);
            $("#"+divID2).html(datas[1]);
        },
        error: function(data) {
            alert("showQuery错误：---- "+data);
        }
    });

}

//高级查询页面重置功能
function resetALL(){
    //清除左上高亮样式
    $("#sq-presave").find("li").removeClass("i-altclass");
    //清除左中位置的内容
    $("#sq-property").val("");
    $("#sq-symbol").val("");
    $("#s-condition").val("");
    $("#s-id").val("");
    $("#s-index").val("");
    $("#presaveName").html("空");
    $("#sq-query-detail").find("tr:gt(1)").remove();

    //清除右上位置的内容
    $("#sq-condition").find("tr:gt(0)").remove();

    //清除右中位置的内容
    $("#sq-query-list").find("tr").remove();
    $("#show-errormsg").hide();
    $("#errormsg").html("");
    clearTab("sq-query-detail");
}


//获取修改的条件值
function getModifySeniorCondition(scondition){
    var mscondition="";
    var temp = scondition.split(";");
    var table = $("#table").val();
    var flag = true;
    for(var i = 0; i<temp.length;i++){
        var index = temp[i].lastIndexOf("|");
        var prescondition = temp[i].substr(0,index+1);
        var params = temp[i].split("|");
        var type = params[2];
        if(""!=type){
            type = type.substr(0,type.length-1);
        }else{
            mscondition = "setypeerror";
            break;
        }
        var calc = (params[3].split("::"))[0];
        //过滤calc中的右括号
        calc = calc.replace(/\)/g,"");
        var num = "";
        if(params.length>4){
            //计算value有多少右括号
            var trvalue = (params[4].split("::"))[0];
            num = patch(trvalue,"\\)",false);
        }
        //开始组装新条件
        var ntemp = "";
        if(calc==14){
            var value1="",value2="",text1="",text2="";
            var str1= "",str2="";
            //介于
            if("Select"==type){
                value1 = $("select[name='"+table+i+"-1']").val();
                value2 = $("select[name='"+table+i+"-2']").val();
                text1 = $("select[name='"+table+i+"-1']").find("option:selected").text();
                text2 = $("select[name='"+table+i+"-2']").find("option:selected").text();
            }else{
                value1 = $("input[name='"+table+i+"-1']").val();
                value2 = $("input[name='"+table+i+"-2']").val();
                text1 = value1;
                text2 = value2;
            }
            if(inputVerify(value1)&&inputVerify(value2)){
                if(num=="0"){
                    ntemp = prescondition+value1+"^"+value2+"::"+text1+"^"+text2;
                }else{
                    for(var k = 0;k<num;k++){
                        str1 = value1+"^"+value2;
                        str1 = str1+")";
                        str2 = text1+"^"+text2;
                        str2 = str2+")";
                    }
                    ntemp = prescondition+str1+"::"+str2;
                }
            }else{
                flag = false;
            }
        }else if("7"==calc||"8"==calc){
            ntemp = temp[i];
        }else{
            var value="",text="";
            var str1="",str2="";
            if("Select"==type){
                value = $("select[name='"+table+i+"-1']").val();
                text = $("select[name='"+table+i+"-1']").find("option:selected").text();
            }else{
                value = $("input[name='"+table+i+"-1']").val();
                text = value;
            }
            if(inputVerify(value)){
                if(num=="0"){
                    ntemp = prescondition+value+"::"+text;
                }else{
                    for(var j = 0;j<num;j++){
                        str1 = value;
                        str1 = str1+")";
                        str2 = text;
                        str2 = str2+")";
                    }
                    ntemp = prescondition+str1+"::"+str2;
                }
            }else{
                flag = false;
            }
        }
        if(flag){
            if(mscondition==""){
                mscondition = ntemp;
            }else{
                mscondition = mscondition+";"+ntemp;
            }
        }else{
            mscondition = "inputerror";
            break;
        }
    }
    return mscondition;
}

function getConditionList(scondition,sindex,flag){
    var dscondition="";
    if(flag==0){
        //上移
        var temp = scondition.split(";");
        var str1="",str2="",str3="",str4="";
        if(sindex=="1"){
            var tar = temp[1].indexOf("|");
            str1 = temp[1].substr(tar);
            str2 = "and"+temp[0];
            for(var i= parseInt(sindex)+1;i<temp.length;i++){
                str3 = str3+";"+temp[i];
            }
            dscondition = str1+";"+str2+str3;
        }else{
            for(var i = 0;i<parseInt(sindex)-1;i++){
                if(i==0){
                    str3 = temp[i];
                }else{
                    str3 = str3+";"+temp[i];
                }
            }
            for(var j= parseInt(sindex)+1;j<temp.length;j++){
                str4 = str4+";"+temp[j];
            }
            str1 = temp[sindex];
            str2 = temp[parseInt(sindex)-1];
            dscondition = str3+";"+str1+";"+str2+str4;
        }
    }else if(flag==1){
        //下移
        var temp = scondition.split(";");
        var str1="",str2="",str3="",str4="";
        if(sindex=="0"){
            var tar = temp[1].indexOf("|");
            str1 = temp[1].substr(tar);
            str2 = "and"+temp[0];
            for(var i= parseInt(sindex)+2;i<temp.length;i++){
                str3 = str3+";"+temp[i];
            }
            dscondition = str1+";"+str2+str3;
        }else{
            for(var i = 0;i<parseInt(sindex);i++){
                if(i==0){
                    str3 = temp[i];
                }else{
                    str3 = str3+";"+temp[i];
                }
            }
            for(var j= parseInt(sindex)+2;j<temp.length;j++){
                str4 = str4+";"+temp[j];
            }
            str1 = temp[parseInt(sindex)+1];
            str2 = temp[sindex];
            dscondition = str3+";"+str1+";"+str2+str4;
        }
    }else if(flag==2){
        //左括号
        var temp = scondition.split(";");
        var datas = temp[sindex].split("|");
        var data = datas[1].split("::");
        var param = data[0];
        var param_ch = data[1];
        //添加括号
        param = "("+param;
        param_ch = "("+param_ch;
        var mdata = param+"::"+param_ch;
        var modifydata = "";
        for(var i=0;i<datas.length;i++){
            if(i==0){
                modifydata = datas[0];
            }else{
                var str = datas[i];
                if(i==1){
                    str = mdata;
                }
                modifydata = modifydata+"|"+str;
            }
        }
        for(var j=0;j<temp.length;j++){
            var str1="";
            if(j==sindex){
                str1 = modifydata;
            }else{
                str1 = temp[j];
            }
            if(dscondition==""){
                dscondition = str1;
            }else{
                dscondition = dscondition+";"+str1;
            }
        }
    }else if(flag==3){
        //右括号
        var temp = scondition.split(";");
        var datas = temp[sindex].split("|");
        //判断type是否为空
        var type = datas[2].substr(0,datas[2].length-1);
        var calc = (datas[3].split("::"))[0];
        var calc_ch = (datas[3].split("::"))[1];
        var modifydata = "";
        var mdata="";
        if("null"==type){
            //在calc后面加右括号
            mdata = calc+")::"+calc_ch+")";
        }else{
            //在value后加右括号
            var value = (datas[4].split("::"))[0];
            var value_ch = (datas[4].split("::"))[1];
            mdata = value+")::"+value_ch+")";
        }
        for(var i=0;i<datas.length;i++){
            if(i==0){
                modifydata = datas[0];
            }else{
                var str = datas[i];
                if(i==datas.length-1){
                    str = mdata;
                }
                modifydata = modifydata+"|"+str;
            }
        }
        for(var j=0;j<temp.length;j++){
            var str1="";
            if(j==sindex){
                str1 = modifydata;
            }else{
                str1 = temp[j];
            }
            if(dscondition==""){
                dscondition = str1;
            }else{
                dscondition = dscondition+";"+str1;
            }
        }
    }else if(flag==4){
        //取消左括号
        var temp = scondition.split(";");
        var mdata = temp[sindex].replace(/\(/g,"");
        for(var i=0;i<temp.length;i++){
            if(i==0){
                if(sindex==i){
                    dscondition = mdata;
                }else{
                    dscondition = temp[0];
                }
            }else{
                var str = "";
                if(sindex==i){
                    str = mdata;
                }else{
                    str = temp[i];
                }
                dscondition = dscondition+";"+ str;
            }
        }
    }else if(flag==5){
        //取消右括号
        var temp = scondition.split(";");
        var mdata = temp[sindex].replace(/\)/g,"");
        for(var i=0;i<temp.length;i++){
            if(i==0){
                if(sindex==i){
                    dscondition = mdata;
                }else{
                    dscondition = temp[0];
                }
            }else{
                var str = "";
                if(sindex==i){
                    str = mdata;
                }else{
                    str = temp[i];
                }
                dscondition = dscondition+";"+ str;
            }
        }
    }else if(flag==6){
        //删除明细
        var str1="",str2="",str3="";
        var temp = scondition.split(";");
        if(sindex=="0"){
            if(temp.length>1){
                //删除第一个条件，第二个条件去掉逻辑符号
                var tar = temp[1].indexOf("|");
                str1 = temp[1].substr(tar);
                for(var i=2;i<temp.length;i++){
                    str2 = str2+";"+temp[i];
                }
                dscondition = str1+str2;
            }else if(temp.length==1){
               //删除条件
                dscondition ="";
            }
        }else{
            str1 = temp[0];
            for(var i = 1;i<sindex;i++){
                str2 = str2+";"+temp[i];
            }
            for(var j = parseInt(sindex)+1;j<temp.length;j++){
                str3 = str3+";"+temp[j];
            }
            dscondition = str1+str2+str3;
        }
    }else{
        showErrorMsg("操作类型不合法！");
    }
    return dscondition;
}

//  判断substr字符串在str中出现的次数  isIgnore是否忽略大小写!
function patch(str,substr,isIgnore){
    var count;
    var reg="";
    if(isIgnore==true){
        reg="/"+substr+"/gi";
    }else{
        reg="/"+substr+"/g";
    }
    reg=eval(reg);
    if(str.match(reg)==null){
        count=0;
    }else{
        count=str.match(reg).length;
    }
    return count;
}

//校验是否输入非法字符(高级查询:: ;|^)
function inputVerify(value){
    var flag = true;
    if(patch(value,"::",false)>0||patch(value,";",false)>0||patch(value,"\\|",false)>0||patch(value,"\\^",false)>0){
        flag = false;
    }
    return flag;
}
//转换sql日期格式
function formatDate(value){
    return "to_date('"+value+"','yyyy-mm-dd hh24:mi:ss')";
}