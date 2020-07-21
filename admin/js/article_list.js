// 入口函数
$(function () {
    // 下拉菜单内容的渲染
    // 发送ajax请求,获取所有文章分类
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // 渲染模板引擎
            $("#selCategory").html(template("cat_list", backData));
        }
    });

    // 点击筛选按钮,默认加载所有文章
    $("#btnSearch").click(function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 发送ajax请求
        getAjax(1);
    });

    // 页面一加载,默认点击筛选按钮
    $("#btnSearch").trigger("click");


    // 发送请求函数
    function getAjax(startPage) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $("#selCategory").val(),
                state: $("#selStatus").val(),
                page: startPage,
                perpage: 10
            },
            success: function (backData) {
                $(".table tbody").html(template("art_list", backData));
                pagination(backData.data.totalPage, startPage);
            }
        });
    };


    // 分页功能函数
    function pagination(totalPage, startPage) {
        // 分页功能区
        // 1.先调用方法清除上一次总页数
        $('#pagination').twbsPagination('destroy');
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            visiblePages: 10,
            startPage: startPage,
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "末页",
            onPageClick: function (event, page) {
                $('#page-content').text('Page ' + page);
                if (page != startPage) {
                    getAjax(page);
                }
            }
        });
    };

    // 删除按钮的删除功能
    // 动态创建,事件委托
    $(".table").on("click", ".delete", function () {
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: $(this).attr("data_id")
            },
            success: function (backData) {
                if (backData.code == 204) {
                    // 弹出模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                    // 模态框在被隐藏以后执行
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 登录成功跳转到首页
                        location.reload();
                    });
                } else {
                    // 弹出模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                    // 模态框在被隐藏以后执行
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 登录成功跳转到首页
                        location.reload();
                    });
                }

            }
        });
    });


});