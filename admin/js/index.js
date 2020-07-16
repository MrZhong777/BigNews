// jq入口函数
$(function () {
    // 获取当前用户的信息
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".user_info>img").attr("src", backData.data.userPic);
            $(".user_info>span").text("欢迎 " + backData.data.nickname);
            $(".user_center_link>img").attr("src", backData.data.userPic);
        }
    });

    // 退出按钮的点击事件
    $(".logout").click(function () {
        localStorage.removeItem("token");
        location.assign("./login.html");
    });

    // 左侧导航栏的点击事件
    $(".level01").click(function () {
        $(this).addClass("active").siblings().removeClass("active");

        // 判断当前点击的是否是文章管理模块
        if ($(this).index() == 1) {
            // 下拉ul菜单
            $(".level02").slideToggle();
            // 默认选中第一个模块,添加active改变字体颜色
            $(".level02>li:eq(0)").addClass("active");
            // 小箭头做旋转动画
            $(this).find("b").toggleClass("active");
        }
    });

    // 文章管理模块下的小模块的点击事件
    $(".level02>li").click(function () {
        // 排他思想
        $(this).addClass("active").siblings().removeClass("active");
    });

});