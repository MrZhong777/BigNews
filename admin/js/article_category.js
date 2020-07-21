// 入口函数
$(function () {
    // 加载所有的类别管理数据
    // 发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".table tbody").html(template("category", backData));
        }
    });

    // 模态框
    // $('#exampleModal').on('show.bs.modal', function (event) {
    //     var button = $(event.relatedTarget) // Button that triggered the modal
    //     var recipient = button.data('whatever') // Extract info from data-* attributes
    //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //     var modal = $(this)
    //     modal.find('.modal-title').text('新增分类')
    //     modal.find('.modal-body input').val(recipient)
    // });


    // 新增按钮点击事件
    // $("#xinzengfenlei").click(function () {
    //     $('#exampleModal').modal();
    //     // 点击模态框里面的新增按钮事件
    //     $(".new-create").click(function () {
    //         // 发送ajax请求,新增文章类别
    //         $.ajax({
    //             url: BigNew.category_add,
    //             type: 'post',
    //             dataType: 'json',
    //             data: {
    //                 name: $("#recipient-name").val(),
    //                 slug: $("#message-text").val()
    //             },
    //             success: function (backData) {
    //                 if (backData.code == 201) {
    //                     // 弹出修改成功的模态框
    //                     $("#myModal1 .modal-body p").text(backData.msg);
    //                     $('#myModal1').modal();
    //                     // 点击确认编辑模态框消失并重新刷新页面
    //                     $("#myModal1 .confirm").click(function () {
    //                         location.reload();
    //                     })
    //                 }
    //             }
    //         });
    //     });
    // });


    // // 点击编辑按钮事件,动态创建的编辑按钮,采用事件委托注册事件
    // $(".table").on("click", ".edit", function () {
    //     // 获取当前文章类别的id值
    //     let id = $(this).attr("index");
    //     // 发送ajax请求,查询文章类别信息
    //     $.ajax({
    //         url: BigNew.category_search,
    //         type: 'get',
    //         dataType: 'json',
    //         data: {
    //             id: $(this).attr("index")
    //         },
    //         success: function (backData) {
    //             $("#recipient-name").val(backData.data[0].name);
    //             $("#message-text").val(backData.data[0].slug);
    //             $(".new-create").text("编辑");
    //         }
    //     });
    //     // 弹出模态框
    //     $('#exampleModal').modal();
    //     // 点击编辑按钮,发送ajax请求,修改数据
    //     $(".new-create").click(function () {
    //         $.ajax({
    //             url: BigNew.category_edit,
    //             type: 'post',
    //             dataType: 'json',
    //             data: {
    //                 id: id,
    //                 name: $("#recipient-name").val(),
    //                 slug: $("#message-text").val()
    //             },
    //             success: function (backData) {
    //                 if (backData.code == 200) {
    //                     // 弹出修改成功的模态框
    //                     $("#myModal1 .modal-body p").text(backData.msg);
    //                     $('#myModal1').modal();
    //                     // 点击确认编辑模态框消失并重新刷新页面
    //                     $("#myModal1 .confirm").click(function () {
    //                         $('#exampleModal').modal("hide");
    //                         location.reload();
    //                     })
    //                 }

    //             }
    //         });
    //     });

    // });


    // 点击删除按钮的事件,动态创建,事件委托
    $(".table").on("click", ".delete", function () {
        // 发送ajax请求
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: $(this).attr("index")
            },
            success: function (backData) {
                if (backData.code == 204) {
                    // 弹出修改成功的模态框
                    $("#myModal1 .modal-body p").text(backData.msg);
                    $('#myModal1').modal();
                    // 点击确认编辑模态框消失并重新刷新页面
                    $("#myModal1 .confirm").click(function () {
                        location.reload();
                    })
                }
            }
        });
    });



    // 模态框弹出以前,判断是哪个按钮电钮触发
    $('#exampleModal').on('show.bs.modal', function (e) {
        if ($(e.relatedTarget).text() == "新增分类") {
            $(".modal-body form")[0].reset();
            $(".new-create").text("新增");
        } else {
            $(".new-create").text("编辑");
            // 把当前点击的编辑按钮事件触发源的id值传给模态框的 确认编辑 的按钮
            $(".new-create").attr("data_id", $(e.relatedTarget).attr("index"));
            // 给表单赋值当前文章的内容
            $("#recipient-name").val($(e.relatedTarget).parents("tr").children("td").eq(0).text());
            $("#message-text").val($(e.relatedTarget).parents("tr").children("td").eq(1).text());
        }
    })

    // 点击模态框取消按钮,表单内容重置
    $(".cancle").click(function () {
        $(".modal-body form")[0].reset();
    });

    // 点击模态框确认按钮,判断文本,分别执行不同的ajax
    $(".new-create").click(function () {
        if ($(this).text() == "新增") {
            // 发送新增分类ajax请求
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $("#recipient-name").val(),
                    slug: $("#message-text").val()
                },
                success: function (backData) {
                    if (backData.code == 201) {
                        // 弹出修改成功的模态框
                        $("#myModal1 .modal-body p").text(backData.msg);
                        $('#myModal1').modal();
                        // 点击确认编辑模态框消失并重新刷新页面
                        $("#myModal1 .confirm").click(function () {
                            location.reload();
                        })
                    }
                }
            });
        } else {
            // 编辑按钮,发送ajax请求
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    id: $(this).attr("data_id"),
                    name: $("#recipient-name").val(),
                    slug: $("#message-text").val()
                },
                success: function (backData) {
                    if (backData.code == 200) {
                        // 弹出修改成功的模态框
                        $("#myModal1 .modal-body p").text(backData.msg);
                        $('#myModal1').modal();
                        // 点击确认编辑模态框消失并重新刷新页面
                        $("#myModal1 .confirm").click(function () {
                            location.reload();
                        })
                    }

                }
            });
        }
    });

    // 



});