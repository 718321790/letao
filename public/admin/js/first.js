$(function () {

    var page = 1
    var pageSize = 5

    function render() {
        $.ajax({

            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('tmp', info))

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size:"normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p
                        render();
                    }
                });
            }
        })
    }
    render()

    // 表单验证
    $('form').bootstrapValidator({
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            }
        }
    });

    // 
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('form').serialize(),
            success: function(info){
                // console.log(info)
                if (info.success) {
                    page = 1
                    render();
                    $('#categoryModal').modal('hide');
                    $("form").data('bootstrapValidator').resetForm(true);
                }
            }
        })
    });

    
      
})