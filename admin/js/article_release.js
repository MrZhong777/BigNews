// 入口函数
$(function () {
    // 侧边栏的发表文章按钮高亮

    // $("box").addClass().siblings().removeClass()
    window.parent.$(".level02 li:eq(1)").addClass("active").siblings().removeClass("active");


    // 文件预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });

    // 渲染文章分类数据,发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // 渲染模板引擎
            $(".category").html(template("art_list", backData));

        }
    });

    // 日期插件
    jeDate("#testico", {
        isinitVal: true,
        theme: { bgcolor: '#D91600', pnColor: '#FF6653' },
        trigger: "dblclick",
        format: "YYYY-MM-DD"
    });

    // 富文本插件
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    // 文件上传
    $(".btn-release,.btn-draft").click(function (e) {
        // 阻止默认跳转
        e.preventDefault();
        let state = $(this).hasClass("btn-release") ? "已发布" : "草稿";
        // 发送ajax请求
        let fd = new FormData($("#form")[0]);
        fd.append("date", $("#testico").val());
        fd.append("content", editor.txt.html());
        fd.append("state", state);
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                    windwo.location.href = "article_list.html";
                }

            }
        });

    });

});