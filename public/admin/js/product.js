$(function () {

    var page = 1
    var pageSize = 2

    function render() {

        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info)
                $('tbody').html(template('tmp', info))

                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "normal",//设置控件的大小，mini, small, normal,large
                    itemTexts: function (type, page, current) {
                        // console.log(type, page ,current);
                        switch (type) {
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '最后一页';
                            case 'prev':
                                return '上一页';
                            case 'first':
                                return '第一页';
                            case 'page':
                                return page;
                        }
                    },
                    onPageClicked: function (event, originalEvent, type, p) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p
                        render()
                    }
                })
            }
        })
    }

    render()

    // 获取商品分类列表
    $('.btn-addProduct').on('click', function () {
        var secondListPage = 1
        var secondListPageSize = 999
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: secondListPage,
                pageSize: secondListPageSize
            },
            success: function (info) {
                console.log(info)
                $('.dropdown-menu').html(template('tmp1', info))
            }
        })
    })

    // 表单验证
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
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品的名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品的描述'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品的库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1,9]\d{0,4}$/,
                        message: '数量在1-99999之间'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品的尺码'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式为xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品的原价'
                    }
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品的价格'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            }
        }
    })

    // 选择二级分类验证成功
    $('.dropdown-menu').on('click', 'li', function () {
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
        $('.dropdown .chosen').text($(this).children().text())
        $('[name=brandId]').val($(this).data('id'))
    })


    // 图片验证成功
    $("#file").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data.result);
            var img = document.createElement('img')
            img.style.width = '100px'
            img.style.height = '100px'
            img.src = data.result.picAddr
            img.name = data.result.picName
            $('.img-box').append(img)
            if ($('.img-box img').length === 3) {
                $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
            } else {
                $('form').data('bootstrapValidator').updateStatus('brandLogo', 'INVALID')
            }
        }
    });


    // 验证成功提交表单
    $('form').on('success.form.bv', function (e) {

        e.preventDefault();
        var src = ''
        $('.img-box img').each(function (index, ele) {
            src += '&picName' + (index + 1) + '=' + $(this).attr('name') + '&picAddr' + (index + 1) + '=' + $(this).attr('src')
        })

        var data = $('form').serialize() + src
        console.log(data);
        // 使用ajax提交
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            success: function (info) {
                console.log(info);
                if (info.success) {
                    page = 1
                    render()
                    $('#addProductModal').modal('hide');
                    $('form').data('bootstrapValidator').resetForm(true);
                    $('.dropdown .chosen').text('请选择二级分类')
                    $('.img-box').html('');
                }
            }
        })
    })



})