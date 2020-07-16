// 入口函数
$(function () {
    // 文件预览功能
    $("#exampleInputFile").change(function () {
        // 获取当前选中的图片
        let file = this.files[0];
        // 修改为src能够识别的路径
        let url = URL.createObjectURL(file);
        // 把URL赋值给图片的src路径
        $(".user_pic").attr("src", url);
    });



    // 发送ajax请求,获取用户的详情信息
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // 渲染数据
            $("#inputEmail1").val(backData.data.username);
            $("#inputEmail2").val(backData.data.nickname);
            $("#inputEmail3").val(backData.data.email);
            $(".user_pic").attr("src", backData.data.userPic);
            $("#inputEmail4").val(backData.data.password);

        }
    });


    // 点击修改按钮发送ajax,修改用户信息
    $(".btn-edit").click(function (e) {
        // 阻止默认跳转事件
        e.preventDefault();
        // 创建formData对象
        let fd = new FormData($("#form")[0]);
        // 发送ajax请求
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType: false,
            success: function (backData) {
                if (backData.code == 200) {
                    // 弹出模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                } else {
                    // 弹出模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                }
            }
        });
    });

});