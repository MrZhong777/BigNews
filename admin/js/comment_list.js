$(function () {
    // 发送ajax请求,所有文章评论列表
    $.ajax({
        url: BigNew.comment_list,
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            perpage: 10
        },
        success: function (backData) {
            console.log(backData);
            $(".table tbody").html(template("comment_list", backData));
            // 加载分页插件,先清除上一次
            $('#pagination-demo').twbsPagination('destroy');
            $('#pagination-demo').twbsPagination({
                totalPages: backData.data.totalPage,
                visiblePages: 10,
                startPage: 1,
                first: "首页",
                prev: "上一页",
                next: "下一页",
                last: "尾页",
                onPageClick: function (event, page) {
                    $('#page-content').text('Page ' + page);
                    // 页面分页码点击事件
                    $.ajax({
                        url: BigNew.comment_list,
                        type: 'get',
                        dataType: 'json',
                        data: {
                            page: page,
                            perpage: 10
                        },
                        success: function (backData) {
                            $(".table tbody").html(template("comment_list", backData));
                        }
                    });
                }
            });
        }
    });

    // 页面中的 批准 拒绝 删除 按钮点击事件 动态创建 事件委托
    $(".table tbody").on("click", ".btn_approval,.btn_delete,.btn_refuse", function () {
        let id = $(this).attr("data_id");
        if ($(this).hasClass("btn_approval")) {  // 批准按钮
            getAjax(BigNew.comment_pass, id);
        } else if ($(this).hasClass("btn_delete")) { // 删除按钮
            getAjax(BigNew.comment_delete, id);
        } else { // 拒绝按钮
            getAjax(BigNew.comment_reject, id);
        }
    });

    function getAjax(url, id) {
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                if (backData.code == 200) {
                    alert(backData.msg);
                    window.location.reload();
                }

            }
        });
    }



});