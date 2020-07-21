// 入口函数
$(function () {
    // 先获取所有文章类别,渲染数据
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // 渲染文章类别的下拉选择框
            $(".category").html(template("art_list", backData));
        }
    });

    // 时间日期
    jeDate("#testico", {
        isinitVal: true,
        theme: { bgcolor: '#D91600', pnColor: '#FF6653' },
        trigger: "dblclick",
        zIndex: 10001,
        format: "YYYY-MM-DD"
    });

    // 富文本
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()


    // 从URL中接收id值,发送ajax请求,渲染页面数据
    var id = location.href.split("=")[1];
    // 发送ajax请求,获取当前文章的详细信息
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (backData) {
            $("#inputTitle").val(backData.data.title);
            $(".article_cover").attr("src", backData.data.cover);
            // 文章类别 根据获取id选中类别
            $("[value=" + backData.data.categoryId + "]").prop("selected", true);
            $("#testico").val(backData.data.date);
            editor.txt.html(backData.data.content);
        }
    });



    // 文件预览功能
    $("#inputCover").change(function () {
        let file = this.files[0];
        let url = URL.createObjectURL(file);
        $(".article_cover").attr("src", url);
    });




    // 声明一个函数,编辑保存文章
    function editArticle(text) {
        var fd = new FormData($("#form")[0]);
        fd.append("state", text);
        fd.append("date", $("#testico").val());
        fd.append("content", editor.txt.html());
        fd.append("id", id);
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                    location.reload();
                } else {
                    alert(backData.msg);
                    location.reload();
                }
            }
        });
    }

    //编辑文章ajax请求封装
    // function editArticlie(state) {
    //     //(3)创建fd对象
    //     var fd = new FormData($('#form')[0]);
    //     //追加一个修改后的内容
    //     fd.append('content', editor.txt.html());
    //     //追加文章id到fd中去.
    //     fd.append('id', id);
    //     //追加文章状态
    //     fd.append('state', state);
    //     //3.发送ajax请求,完成修改
    //     $.ajax({
    //         url: BigNew.article_edit,
    //         type: 'post',
    //         data: fd,
    //         contentType: false,
    //         processData: false,
    //         success: function (backData) {
    //             if (backData.code == 200) {
    //                 alert('修改成功!');
    //                 //回退上一页
    //                 window.history.back();
    //             } else {
    //                 alert(backData.msg);
    //             }
    //         }
    //     });
    // }


    // 点击修改按钮
    $(".btn-edit1").on("click", function (e) {
        // 阻止默认行为
        // e.preventDefault();
        editArticle("已发布");
        return false;
    });

    // 点击存为草稿
    $(".btn-draft").click(function (e) {
        e.preventDefault();
        editArticle("草稿");
    });

});