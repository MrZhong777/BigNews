// 入口函数
$(function () {
    // 点击登录按钮的点击事件
    $(".input_sub").click(function (e) {
        // 阻止按钮的默认跳转事件
        e.preventDefault();
        // 非空判断
        if ($(".input_txt").val().trim().length == 0 || $(".input_pass").val().trim().length == 0) {
            // 弹出模态框
            $('.modal-body>p').text('用户名和密码不能为空...');
            $('#myModal').modal();
            return false;
        }
        // 发送ajax请求,验证登录
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            dataType: 'json',
            data: {
                username: $(".input_txt").val(),
                password: $(".input_pass").val()
            },
            success: function (backData) {
                if (backData.code == 400) {
                    // 弹出模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                } else {
                    // 弹出模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                    // 模态框在被隐藏以后执行
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 保存token到本地存储当中
                        localStorage.setItem("token", backData.token);
                        // 登录成功跳转到首页
                        location.assign("./index.html");
                    })

                }
            }
        });
    });
});