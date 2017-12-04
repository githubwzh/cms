/**
 * 对表单进行验证
 * @param formid 表单id
 * @param errorDId 错误信息显示位置id
 * @returns {boolean} true：校验通过  false：校验未通过
 */
function checkForm(formId, errorDId) {
    var flag = true;
    var msg = "";

    //输入框，下拉框验证
    $("#" + formId).find(":text,:file, select, textarea").each(function() {
        msg += checkContent($(this),$(this).val());
    });

    //单选框校验
    var radioName = "";
    $("#" + formId).find(":radio").each(function() {
        var thisName = $(this).attr("name");
        if(radioName != thisName) {
            radioName = thisName
            var value = $(":radio[name='" + radioName + "']:checked").val();
            msg += checkContent($(this), value);
        }
    });

    //复选框校验
    var chexBoxName = "";
    $("#" + formId).find(":checkbox").each(function() {
        var thisName = $(this).attr("name");
        if(chexBoxName != thisName) {
            chexBoxName = thisName
            var value = $(":checked[name='" + chexBoxName + "']:checked").length;
            value = value==0 ? "" : value;
            msg += checkContent($(this), value);
        }
    });

    if(msg != "") {
        flag = false;
        $("#" + errorDId).html(msg);
    }
    return flag;
}
/**
 * 表单校验的具体方法
 * @param obj 校验对象
 * @param value 校验值
 * @returns {string} 返回错误信息
 */
function checkContent(obj,value) {
    var msg = "";
    var checkRules = obj.attr("check-rule");
    if(checkRules != undefined) {
        var rules = eval('(' + checkRules + ')');
        var tipname = obj.attr("tipname");
        tipname = tipname == undefined ? obj.attr("name") : tipname;
        for(var method in rules) {
            var fun = eval(method);
            var rtn = "";
            if(rules[method] == true) {
                rtn = fun(value);
            } else {
                rtn = fun(value, rules[method]);
            }

            if(rtn != "") {
                msg += tipname + rtn + "<br/>";
                break;
            }
        }
    }

    return msg;
}

//是否为空的校验
function required(value) {
    var msg = "";
    if(value == null || value == "" || value == 'undefined') {
        msg = "不能为空";
    }
    return msg;
}

//最大长度的校验
function maxLength(value, len) {
    var msg = "";
    if(value.length > len) {
        msg = "最大长度不能大于" + len;
    }
    return msg;
}

//最小长度的校验
function minLength(value, len) {
    var msg = "";
    if(value != "" && value.length < len) {
        msg = "最小长度不能小于" + len;
    }
    return msg;
}

//是否是数字的校验
function isNum(value) {
    var msg = "";
    if(value != "" && isNaN(value)) {
        msg = "必须是数字";
    }
    return msg;
}

//是否是正整数的校验(不包括0)
function isIntp(value) {
    var msg = "";
    var re = "^[0-9]*[1-9][0-9]*$";
    if (!re.test(value)) {
        msg ="应是大于零的整数";
        return msg;
    }
}

//正整数
function isPInt(str) {
    var g = /^[0-9]*[1-9][0-9]*$/;
    return g.test(str);
}

//非负整数
function isQInt(str) {
    var g = /^(0|[0-9]*[1-9][0-9]*)$/;
    return g.test(str);
}

//验证日期是否合法
function RQcheck(RQ) {
    var date = RQ;
    var result = date.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

    if (result == null)
        return false;
    if(result[1]<2000)
        return false;
        var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);

}

//去掉空格
function trim(text) {
    text = text.replace(/^[ |\n|\r|\t|\x0B|\0|?]+/, "");
    text = text.replace(/[ |\n|\r|\t|\x0B|\0|?]+$/, "");
    return text;
}