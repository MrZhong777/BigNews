$(function () {
    // 热门排行ajax请求
    $.ajax({
        url: BigNew.top_ranking,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".content_list").html(template("hot_rank", backData));
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
            $(".guanzhu_list").html(template("attention", backData));
        }
    });

    // 发送ajax请求,获得文章详细内容
    let id = location.href.split("=")[1];
    $.ajax({
        url: BigNew.article_content,
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (backData) {
            $("#article_content").html(template("art_comtent", backData));
        }
    });

    // 评论列表部分
    $.ajax({
        url: BigNew.comment_list1,
        type: 'get',
        dataType: 'json',
        data: {
            articleId: String(id)
        },
        success: function (backData) {
            $("#comment_list").html(template("com_list", backData));
        }
    });

    // 发表评论部分
    $(".comment_sub").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: BigNew.make_comment,
            type: 'post',
            dataType: 'json',
            data: {
                author: $(".comment_name").val(),
                content: $(".comment_input").val(),
                articleId: id
            },
            success: function (backData) {
                if (backData.cade == 201) {
                    alert(backData.msg);
                    location.reload();
                } else {
                    alert(backData.msg);
                    location.reload();
                }

            }
        });
    });

});