$(function () {

    var page = 1
    var pageSize = 5

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info)
                $('tbody').html(template('tmp', info))

                //渲染分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, p) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p
                        render();
                    }
                });
            }
        })
    }
    render()

    $('.add-cat').on('click', function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 1000
            },
            success: function (info) {
                console.log(info)
                $('.dropdown-menu').html(template('tmp1', info))
            }
        })
    })

    // 表单验证功能
    $('form').bootstrapValidator({
        //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类名不能为空'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '品牌名不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传品牌图片'
                    }
                }
            }
        }
    })

    // 选择一级分类
    $('.dropdown-menu').on('click','li',function(){
        $('#dropdownMenu1 .chosen').text($(this).children().text())
        $('[name=categoryId]').val($(this).data('id'))
        console.log($('[name=categoryId]').val());
        $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
    })

    // 图片上传
    $("#file").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data.result.picAddr);
            $('.myImg').attr('src',data.result.picAddr)
            $('[name=brandLogo]').val(data.result.picAddr)
            $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    });

    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('form').serialize(),
            success: function(info){
                // console.log(info)
                if (info.success) {
                    page = 1
                    render();
                    $('#categoryModal').modal('hide');
                    $("form").data('bootstrapValidator').resetForm(true);
                    $('#dropdownMenu1 .chosen').text("请选择一级分类")
                    $('.myImg').attr('src','./images/none.png')
                }
            }
        })
    });

    

})