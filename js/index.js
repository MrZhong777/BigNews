// 入口函数
$(function () {
    // 发送焦点图ajax请求
    $.ajax({
        url: BigNew.home_page,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".focus_list").html(template("focu_hotpic", backData));
        }
    });

    // 热门排行ajax请求
    $.ajax({
        url: BigNew.top_ranking,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".right_con .hotrank_list").html(template("hot_rank", backData));
        }
    });

    // 文章类型ajax请求
    $.ajax({
        url: BigNew.article_type,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".menu .level_two").html(template("art_type", backData));
        }
    });

    // 最新资讯ajax请求
    $.ajax({
        url: BigNew.current_information,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".common_news").html(template("information", backData));
        }
    });

    // 最新评论ajax请求
    $.ajax({
        url: BigNew.current_comments,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".common_wrap .comment_list").html(template("latest_comment", backData));
        }
    });

    // 焦点关注ajax请求
    $.ajax({
        url: BigNew.focus,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            $(".guanzhu_list").html(template("attention", backData));
        }
    });

    // 焦点图点击事件
    $(".focus_list").on("click", "li a", function () {
        location.assign("./article.html?id=" + $(this).attr("data_id"));
    });


});