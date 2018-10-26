$(function(){
    var page = 1
    var pagesize = 5
    var id
    var status
    
    function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pagesize
            },
            success: function(info){
                console.log(info)
                $('tbody').html( template('tmp',info) )

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    numberOfPages: pagesize,
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p
                        render()
                    }
                });
            }
        })
    }
    render();

    $('tbody').on('click','.btn',function(){
        id = $(this).parent().data('id')
        status = $(this).data('status')
        status = status == 0 ? 1 : 0;
        console.log(id)
        console.log(status)

        
    })

    $('.confirm').on('click',function(){
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: status
            },
            success: function(info){
                console.log(info)
                if (info.success) {
                    $('#myModal1').modal("hide");
                    render()
                }
            }
        })
    })

})