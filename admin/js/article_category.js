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
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('新增分类')
        modal.find('.modal-body input').val(recipient)
    });


    // 新增按钮点击事件
    $("#xinzengfenlei").click(function () {
        $('#exampleModal').modal();
        // 点击模态框里面的新增按钮事件
        $(".new-create").click(function () {
            // 发送ajax请求,新增文章类别
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
                        alert(backData.msg);
                        window.location.reload();
                    }
                }
            });
        });
    });


    // 点击编辑按钮事件,动态创建的编辑按钮,采用事件委托注册事件
    $(".table").on("click", ".edit", function () {
        // 发送ajax请求,查询文章类别信息
        $.ajax({
            url: BigNew.category_search,
            type: 'get',
            dataType: 'json',
            data: {
                id: $(this).attr("index")
            },
            success: function (backData) {
                $("#recipient-name").val(backData.data[0].name);
                $("#message-text").val(backData.data[0].slug);
                $(".new-create").text("编辑");
            }
        });
        // 弹出模态框
        $('#exampleModal').modal();
        // 点击编辑按钮,发送ajax请求,修改数据
        $.ajax({
            url: BigNew.category_edit,
            type: 'post',
            dataType: 'json',
            data: '',
            success: function (backData) {

            }
        });

    });


});