$(function(){

    var page = 1
    var pageSize = 2

    function render(){

        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info){
                console.log(info)
                $('tbody').html(template('tmp',info))

                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size:"normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p
                        render()
                    }
                })
            }
        })
    }

    render()

})