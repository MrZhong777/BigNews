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
            console.log(backData);
            $(".guanzhu_list").html(template("attention", backData));
        }
    });

    // // 最新资讯ajax请求
    // $.ajax({
    //     url: BigNew.current_information,
    //     type: 'get',
    //     dataType: 'json',
    //     success: function (backData) {
    //         $(".setfr").html(template("information", backData));
    //     }
    // });

    // 搜索
    $(".search_btn").click(function () {
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/search',
            type: 'get',
            dataType: 'json',
            data: {
                key: $(".search_txt").val(),
                type: '',
                page: 1,
                perpage: ''
            },
            success: function (backData) {
                console.log(backData);

                $(".setfr").html(template("information", backData));
            }
        });
    });

    $(".search_btn").click();



});