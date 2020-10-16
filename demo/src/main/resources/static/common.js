/** common.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
var flg = getQueryString("flg")
var isAdmin = getQueryString("isAdmin")
var isYdr = getQueryString("isYdr")


layui.define(['layer'], function (exports) {
    "use strict";
    var $ = layui.jquery,
        layer = layui.layer;
    var common = {
        /**
         * 抛出一个异常错误信息
         * @param {String} msg
         */
        throwError: function (msg) {
            throw new Error(msg);
            return;
        },
        /**
         * 弹出一个错误提示
         * @param {String} msg
         */
        msgError: function (msg) {
            layer.msg(msg, {
                icon: 5
            });
            return;
        }
    };

    exports('common', common);
});

function addDate(date, days) {

    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    var mm = getFormatDate(m)
    var dd = getFormatDate(d.getDate())
    return d.getFullYear() + '-' + mm + '-' + dd;
}

//日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}

function getQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}

window.encode = function (text) {
    var s4 = new SM4Util();
    return s4.encryptDataECB(text);

};
window.decode = function (text) {
    if (text == null) {
        return ""
    } else {
        var s4 = new SM4Util();
        return s4.decryptDataECB(text);
    }
};
//判断类型
window.leixing = function (d) {
    var leixing = decode(d);
    if (leixing == 0) {
        return "对外发文"
    } else if (leixing == 1) {
        return "内部请示"
    } else if (leixing == 2) {
        return "收文办理"
    } else if (leixing == 3) {
        return "文件传阅"
    } else if (leixing == 4) {
        return "公文补录"
    } else if (leixing == 5) {
        return "简化审批"
    } else if (leixing == 6) {
        return "印章审批"
    } else if (leixing == 7) {
        return "保密审批"
    } else if (leixing == 8) {
        return "外出审批"
    } else if (leixing == 10) {
        return "上传文件"
    } else if (leixing == 'wjj') {
        return "文件夹"
    } else if (leixing == '13') {
        return "接待呈报单"
    } else if (leixing == '14') {
        return "接待呈报单"
    } else {
        return "其他"
    }

}

//判断文章类型
window.wenZhangLeiXing = function (d) {
    var wenZhangLeiXing = decode(d);
    if (wenZhangLeiXing == 0) {
        return "公告发布"
    } else if (wenZhangLeiXing == 1) {
        return "通知发布"
    } else if (wenZhangLeiXing == 2) {
        return "资料库发布"
    } else {
        return "其他"
    }
}
//判断状态
window.zhuangTai = function (d) {
    var zhuangTai = decode(d);
    if (zhuangTai == 0) {
        return "草稿"
    } else if (zhuangTai == 1) {
        return "审批中"
    } else if (zhuangTai == 2) {
        return "已办结"
    } else {
        return "暂无"
    }
}
//判断状态
window.buLuZhuangTai = function (d) {
    var zhuangTai = decode(d);
    if (zhuangTai == 0) {
        return "草稿"
    } else if (zhuangTai == 1) {
        return "已补录"
    } else if (zhuangTai == 2) {
        return "已办结"
    }
}
//判断登记状态
window.dengJiZhuangTai = function (d) {
    if (d == 0) {
        return "未登记"
    } else if (d == 1) {
        return "<p style='color:#015294'>已登记</p>"
    }
}
//日期转换
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
//删除数组某个元素

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var xpwidth = window.screen.width - 10;
var xpheight = window.screen.height - 35;
var popshuxing = 'resizable=yes,directories=no,top=0,left=0,width=' + xpwidth + ',height=' + xpheight

function openWindow(url, id, zt) {
    window.open(url + "?id=" + id + "&zhuangTai=" + zt, '', popshuxing);
}

function opendcdbWindow(url, id, psdid) {
    window.open(url + "?id=" + id + "&zhuangTai=" + zt, '', popshuxing);
}

function openDocumentShow(id) {
    var url = "../gwqc/DocumentShow.jsp?&EditType=2&ShowType=1&FileType=.doc&RecordID=" + id + "&UserName=" + sessionStorage.getItem("username");
    window.open(url, '_blank', 'height=3000,width=4000,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,fullscreen=1,resizable=yes,location=no,status=no');

}


function jumpHtml(id, leiXing, zt) {

    if (leiXing == '0') {
        window.open("../gwqc/gwqc_sp_qfd.html?id=" + id + "&zhuangTai=" + decode(zt), '_blank', popshuxing);
    }
    if (leiXing == '1') {
        window.open("../gwqc/gwqc_sp_cbd.html?id=" + id + "&zhuangTai=" + decode(zt), '_blank', popshuxing);
    }
    if (leiXing == '2') {
        window.open("../swng/swng_detail.html?id=" + id + "&zhuangTai=" + decode(zt), '_blank', popshuxing);
    }
    if (leiXing == '3') {
        window.open("../wjcy/wjcy_detail.html?id=" + decode(id) + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '4') {
        window.open("../gwbl/gwbl_detail.html?id=" + decode(id) + "&zhuangTai=1", '_blank', popshuxing);
    }
    if (leiXing == '5') {
        window.open("../notice/notice_detail.html?id=" + id + "&zhuangTai=1", '_blank', popshuxing);
    }
    if (leiXing == '6') {
        window.open("../yzsp/yzsp_detail.html?id=" + id + "&zhuangTai=" + decode(zt), '_blank', popshuxing);
    }
    if (leiXing == '7') {
        window.open("../xxsp/xxsp_detail.html?id=" + id + "&zhuangTai=" + decode(zt), '_blank', popshuxing);
    }

    if (leiXing == '8') {
        window.open("../wcsp/wcsp_detail.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '13') {
        window.open("../jiedai/lingdao_detail.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '14') {
        window.open("../jiedai/jiedai_detail.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
}

function jumpDetail(id, leiXing, wenjian) {

    if (leiXing == '0') {
        window.open("../jiedai/jiedai_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '1') {//司法局发文
        window.open("../jiedai/jiedai_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
        // window.open("../jiedai/lingdao_detail1.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
        //window.open("../gwqc/gwqc_sp_cbd.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);

    }
    if (leiXing == '2') {
        window.open("../swng/swng_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '3') {
        window.open("../wjcy/wjcy_detail.html?id=" + decode(id) + "&zhuangTai=3", '_blank', popshuxing);
    }
    if (leiXing == '4') {
        window.open("../gwbl/gwbl_detail.html?id=" + decode(id) + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '5') {
        window.open("../notice/notice_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '6') {
        window.open("../yzsp/yzsp_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }

    if (leiXing == '7') {//司法局收文
        window.open("../swng/swng_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
        //window.open("../xxsp/xxsp_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '8') {
        window.open("../wcsp/wcsp_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '10') {
        var filedata = []
        var filehtml = ""
        var psdurl = wenjian.split(",")
        for (var i = 0; i < psdurl.length; i++) {
            var fileurl = psdurl[i]
            var filename = fileurl.split("ð")[1]
            var obj = {filename: filename, fileurl: fileurl}
            filedata.push(obj)
        }

        //console.log(filedata)
        //psdurl.push(fileurl)
        for (var i = 0; i < filedata.length; i++) {
            var item = filedata[i]
            // filehtml += `<tr>  <td><a href="javascript:void(0);"   onclick="showfiles('${item.fileurl}')">${ item.filename }</a></td></tr>`
            filehtml += '<tr>  <td><a href="javascript:void(0);"   onclick="showfiles(' + item.fileurl + ')">' + item.filename + '</a></td></tr>'
        }

        layer.open({
            type: 1,
            title: "查看文件",
            skin: 'layui-layer-demo', //样式类名
            closeBtn: 1, //显示关闭按钮
            shift: 2,
            area: ['520px', '400px'], //宽高
            shadeClose: true, //开启遮罩关闭	    
            content: "<div><table class='layui-table ml10' style='width:95%'>" + filehtml + "</table></div>"
        });
    }
    if (leiXing == '11') {
        layui.use('form', function () {
            var $ = layui.jquery;
            $.ajax({
                url: jypath + '/tjsfj/kqb/findById',
                type: "POST",
                data: {
                    BID: id
                },
                success: function (msg) {
                    var msg = JSON.parse(msg);
                    var data = msg.data;
                    if ((data.name).indexOf("季度") != -1) {
                        window.open("../kqgl/kqb_jddetail.html?tiJiaoRen=" + encode(data.tiJiaoRen) + "&id=" + decode(id) + "&zhuangTai=11", '季度考勤');
                    } else {
                        window.open("../kqgl/kqb_detail.html?tiJiaoRen=" + encode(data.tiJiaoRen) + "&id=" + decode(id) + "&zhuangTai=11", '月度考勤');
                    }
                }

            });
        });
    }
    if (leiXing == '13') {
        window.open("../jiedai/lingdao_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '20') {
        window.open("../dcdb/dcdb_add.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == 'yj') {
        window.open("../email/file_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == 'menHuInfo') {
        window.open("../menhu/newsdetail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }

}

function CYjumpHtml(id, leiXing, zt, flg) {
    if (leiXing == '0') {
        window.open("../gwqc/gwqc_sp_qfd.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '1') {
        window.open("../gwqc/gwqc_sp_cbd.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '2') {
        window.open("../swng/swng_cbd_add.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '3') {
        window.open("../wjcy/wjcy_detail.html?id=" + decode(id) + "&zhuangTai=" + zt + "&flg=" + flg, '_blank', popshuxing);
    }
    if (leiXing == '4') {
        window.open("../gwbl/gwbl_detail.html?id=" + decode(id) + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '7') {
        window.open("../xxsp/xxsp_detail.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '8') {
        window.open("../wcsp/wcsp_detail.html?id=" + id + "&zhuangTai=" + zt, '_blank', popshuxing);
    }
    if (leiXing == '13') {
        window.open("../jiedai/lingdao_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }
    if (leiXing == '14') {
        window.open("../jiedai/jiedai_detail.html?id=" + id + "&zhuangTai=2", '_blank', popshuxing);
    }

    layui.use('form', function (exports) {
        var $ = layui.jquery;
        $.ajax({
            url: jypath + '/tjsfj/wenJianChuanYue/updateOneStatus',
            type: "POST",
            data: {
                id: id,
                zhuangTai: encode('1')
            },
            success: function (msg) {
                ins1.reload({})
                // ins2.reload({    })
            }
        });
    })
}

function WHjumpHtml(lzId, wenHaoId, wenHao) {
    if (wenHao != 'null') {
        window.open("../gwqc/gwqc_sp_qfd.html?id=" + lzId, '', popshuxing);
    } else {
        window.open("../gwqc/gwqc_sp_qfd.html?id=" + lzId + "&dengJi=dengJi&wenHaoId=" + wenHaoId, '', popshuxing);
    }
}

function adddaj() {
    layui.use('form', function () {
        var $ = layui.jquery;
        var form = layui.form;
        $("#showadd").show()
        $("#dajname").val("")


    })

}

function add2() {
    layui.use('form', function () {
        var $ = layui.jquery;
        var form = layui.form;
        var title = $("#dajname").val()
        var fl_fuji = "9cfdce5adcfc4fe8b176a6de66499184"
        $.ajax({
            url: jypath + '/tjsfj/guiDangMuLu/add',
            type: "POST",
            data: {fuJi: encode(fl_fuji), mingCheng: encode(title)},
            success: function (msg) {
                var msg = JSON.parse(msg)
                if (msg.res == 0) {

                    $.ajax({
                        url: jypath + '/tjsfj/guiDangMuLu/findDanJia',
                        type: "POST",
                        success: function (data) {
                            $("#wjjml").html("");
                            var option1 = " <option value=''>请选择档案夹</option>"
                            var data = JSON.parse(data);
                            $.each(data.data, function (key, val) {
                                $("#wjjml").append(option1);
                                option1 = $("<option>").val(decode(val.id)).text(decode(val.mingCheng));
                                $("#wjjml").append(option1);
                                form.render('select');
                            });
                            $("#wjjml").get(0).selectedIndex = 0;
                        }
                    });
                    $("#showadd").hide()

                } else {
                    layer.msg("添加失败", {icon: 5});
                }
            }
        });
    })
}


//移除loading效果
function completeLoading() {
    document.getElementById("loadingDiv").style.display = "none";
}

//展示loading效果
function showLoading() {
    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("loadingDiv").style.zIndex = "19991092";
}

function infotoDetail(id) {
    window.open("../../tjsfj/fabuguanli/file_detail.html?id=" + id, '_blank', popshuxing);
}

//全选函数
function setAll() {
    var check = document.getElementsByName("check");
    for (var i = 0; i < check.length; i++) {
        check[i].checked = true;
    }
}

//删除数组中某个对象
function removeArrobj(arr, attr, value) { //数组，属性，属性值

    var index = 0;
    for (var i in arr) {
        if (arr[i][attr] == value) {
            index = i;
            break;
        }
    }
    arr.splice(index, 1);
}

//删除数组中某个对象	  
function removeArrobj2(arr) { //数组，属性，属性值
//console.log(attr)
    var newarr = []
    var index = 0;
    for (let i of arr) {
        //console.log(i.length)
        if (i.length != 0) {
            delete i.LAY_TABLE_INDEX;
            newarr.push(i)
        }

    }

    return newarr
}

function showtiptext(elem, txt) {
    $(elem).siblings('.tipstext').text(txt).show()
}

function hidetiptext(elem, txt) {
    $(elem).siblings('.tipstext').hide()
}

//展示所有单子的上传文件
function showsclist(list, ele, zt) {
    layui.use(['form'], function () {
        var $ = layui.jquery
        let scfjstr = ""
        for (var item of list) {
            scfjstr += "<tr><td style=\"width:60%\"><a href='javascript:void(0);' onclick=showfiles('" + item.id + "ð" + item.mingCheng + "') > " + item.mingCheng + "</a></td>" +
                "<td class='delitem'><a href='javascript:void(0);'  onclick=showFileDetail('" + item.id + "ð" + item.mingCheng + "') >&nbsp; 预览&nbsp; </a>" +
                "<a href='javascript:void(0);' onclick=fileDel(this,'" + encode(item.id) + "') >删除</a></td></tr>"
        }

        $(ele).html(scfjstr)
        if (zt == "2") {
            $(".delitem").hide()
        }
        if (isAdmin == "false" && isYdr == "false") {
            $(".delitem").hide()
            $(".cmm").hide()
        }
    })
}

//展示所有单子的附件
function showfjlist(list, ele, zt) {
    layui.use(['form'], function () {
        var $ = layui.jquery
        let fjstr = ""
        for (var item of list) {
            if (item.wjLeiXing == "0") {
                $("#addZw").hide()
                fjstr += (`<tr><td style=\"width:60%\">` +
                    //`<a href=\"javascript:void(0);\"  onclick=clickButtonfj(\"${item.id}\",\"${item.mingCheng}\")>${item.mingCheng}</a>`+
                    `<a href=\"javascript:void(0);\"  onclick=alterWordByYozo3(\"${item.id}\",\"${item.mingCheng}\",\"0\")>${item.mingCheng}</a>` +
                    `<a href=\"javascript:void(0);\"  onclick=renamefj(this,\"${item.id}\") class=\"fr cmm\" myname=\"${item.mingCheng}\" >重命名</a>
                <a href="javascript:void(0);"  onclick=showFileDetail('${item.id}.doc') class=\"fr \") >&nbsp;预览&nbsp;</a></td> </tr>`)
            } else {
                fjstr += `<tr>
                <td style="width:60%">
                <a href="javascript:void(0);"  onclick=clickButtonfj("${item.id}","${item.mingCheng}")>${item.mingCheng}</a> 
                <a href="javascript:void(0);"  onclick=renamefj(this,"${item.id}") class="fr cmm" myname="${item.mingCheng}" >重命名</a>
                <a href="javascript:void(0);"  onclick=showFileDetail("${item.id}ð${item.mingCheng}") class="fr">&nbsp;预览&nbsp;</a>
                </td>
                <td class="delitem">
                    <a href="javascript:void(0);"  onclick=delfj(this,"${encode(item.id)}") >删除</a>
                    <a href="javascript:void(0);"  onclick=showFileDetail('${item.id}ð${item.mingCheng}')>&nbsp;预览&nbsp;</a>
                </td>
                </tr>`
            }
        }

        $(ele).html(fjstr)
        if (zt == "2") {
            $(".delitem").hide()
            $(".cmm").hide()
        }
        if (flg == "1") {
            $(".delitem").hide()
            $(".cmm").hide()
        }
        if (isAdmin == "false" && isYdr == "false") {
            $(".delitem").hide()
            $(".cmm").hide()
        }
    })

}

//附件重命名
function renamefj(elem, fjid) {

    layui.use(['form'], function () {
        var $ = layui.jquery
        var fjname = $(elem).attr("myname")
        var str = "<input class='newname layui-input' type='text' value='" + fjname + "' >" +
            "<input type='button' class='layui-btn layui-btn-primary layui-btn-xs ' onclick=setNewName(this,'" + fjid + "') value='确定修改'>"
        $(elem).parent("td").html(str)
    });
}

function showFileDetail(url) {
    $.ajax({
        url: yozoyl + '/dcs.web/onlinefile',
        // url : 'http://localhost:8787/dcs.web/onlinefile',
        type: "POST",
        data: {
            downloadUrl: (jypath + "/file/" + url),
            convertType: 1
        },
        success: function (msg) {
            var res = JSON.parse(msg)
            if (res.result == "0") {
                window.open(res.data, '_blank');
            }
        }
    })
}

//附件重命名接口
function setNewName(ele, fjid) {
    var newname = $(ele).siblings(".newname").val()

    $.ajax({
        url: jypath + '/tjsfj/wengaoQicao/resetName',
        type: "POST",
        data: {
            id: fjid,
            mingCheng: newname
        },
        success: function (msg) {
            var res = JSON.parse(msg).res;
            if (res == "1") {
                var lastfileName = fjid
                var BiaoTiname = newname
                var newstr = `<a href="javascript:void(0);"  onclick=clickButtonfj("${lastfileName}","${BiaoTiname}")>${BiaoTiname}</a>
       <a href="javascript:void(0);"  onclick=renamefj(this,"${lastfileName}") class="fr" myname="${BiaoTiname}" >重命名</a>  `
                $(ele).parent("td").html(newstr)
            } else {
                layer.msg("修改失败！", {icon: 5});
            }

        }
    })

}


//获取新增id并打开单子
function getidOpenwin(url) {
    layui.use(['form'], function () {
        var $ = layui.jquery;
        $.ajax({
            url: jypath + '/tjsfj/wengaoQicao/getUuid',
            type: "POST",
            success: function (res) {
                var id = JSON.parse(res).resMsg;
                window.open(url + "?id=" + id + "&zhuangTai=0", '_blank', popshuxing);
            }
        });
    });
}


//获取新增id并打开督察督办单
function getidOpenwindb(url, psdid) {
    layui.use(['form'], function () {
        var $ = layui.jquery;
        $.ajax({
            url: jypath + '/tjsfj/wengaoQicao/getUuid',
            type: "POST",
            success: function (res) {
                var id = JSON.parse(res).resMsg;
                window.open(url + "?id=" + id + "&&psdid=" + psdid, '_blank', popshuxing);
            }
        });
    });
}

//呈报单，签发单新增，id加密
function getidOpenwin_cbd(url) {
    layui.use(['form'], function () {
        var $ = layui.jquery;
        $.ajax({
            url: jypath + '/tjsfj/wengaoQicao/getUuid',
            type: "POST",
            success: function (res) {
                var id = JSON.parse(res).resMsg;
                window.open(url + "?id=" + encode(id) + "&zhuangTai=0", '_blank', popshuxing);
            }
        });
    });
}

//展示所有单子的附件
function showfjlistwithtable(list, ele, zt) {
    layui.use(['table'], function () {
        var $ = layui.jquery
        let fjstr = ""
        for (var item of list) {
            if (item.wjLeiXing == "0") {
                $("#addZw").hide()
                fjstr += `<tr>
                <td><a href="javascript:void(0);"  onclick=clickButtonfj("${item.id}","${item.mingCheng}")>${item.mingCheng}</a></td>
                <td>${item.authorName}</td>
                <td>${item.wjShangChuanShiJian}</td>
                <td></td> </tr>`
            } else {
                fjstr += `<tr>
                <td style="width:60%">
                <a href="javascript:void(0);"  onclick=clickButtonfj("${item.id}","${item.mingCheng}")>${item.mingCheng}</a> 
                <a href="javascript:void(0);"  onclick=renamefj(this,"${item.id}") class="fr cmm" myname="${item.mingCheng}" >重命名</a>
                </td>
                <td class="delitem"><a href="javascript:void(0);"  onclick=delfj(this,"${encode(item.id)}") >删除</a></td>
                </tr>`
            }
        }

        $(ele).html(fjstr)
        if (zt == "2") {
            $(".delitem").hide()
            $(".cmm").hide()
        }
        if (flg == "1") {
            $(".delitem").hide()
            $(".cmm").hide()
        }
        if (isAdmin == "false" && isYdr == "false") {
            $(".delitem").hide()
            $(".cmm").hide()
        }

        var table = layui.table;
        //转换静态表格
        table.init('demo', {});
    })

}

function createWordByYozo(wjlx) {
    var loginName = sessionStorage.getItem("username");
    alterWordByYozo("", "", loginName, loginName == "超管账户" ? "办公室1" : "测试部门", wjlx)
}

function alterWordByYozo3(fileId, fileName, wjlx) {
    var loginName = sessionStorage.getItem("username");
    alterWordByYozo(fileName, fileId, loginName, loginName == "超管账户" ? "办公室1" : "测试部门", wjlx)
}

function alterWordByYozo(fileName, fileId, author, orgName, wjlx) {

    window.open("../showYozoWord.html?fileId=" + fileId + "&topId=" + ($("#fid").val()) + "&author=" + encodeURI(encodeURI(author)) + "&orgName=" + encodeURI(encodeURI(orgName)) + "&fileName=" + encodeURI(encodeURI(fileName)) + "&wjlx=" + wjlx,
        "_blank", 'height=3000,width=4000,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,fullscreen=1,resizable=yes,location=no,status=no');
}

function getWenJianByYozo(fileName, fileId, author, orgName) {
    layui.use('form', function () {
        var $ = layui.jquery;
        var zwstr = "";
        zwstr += `
           <tr>
    		<td>
    		   <a href="javascript:void(0);"  onclick=alterWordByYozo("${fileName}","${fileId}","${author}","${orgName}")>${fileName}</a> 
    		   <a href="javascript:void(0);"  onclick=renamefj(this,"${fileId}") class="fr" myname="${fileName}" >重命名</a> 
    		</td>
    	   </tr>   `
        $("[id='addZw']").hide();
        $("[id='addYozoZw']").hide();
        $("#zwlist").html(zwstr);
    })
}

window.onmessage = function (e) {
    e = e || event;
    alert(e.data);
}
window.addEventListener('message', function (e) {
    alert(e.data);
}, false);