

$(function(){


    function render() {
        $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            success: function(info){
                console.log(info);
                if (info.error === 400) {
                    //没登录，跳转到登录页面 , 登录成功需要回跳
                    location.href = "login.html?retUrl=" + location.href;
                }else if (info.length === 0) {
                    $('.mui-table-view').html('没有更多商品了，快去购物车添加吧')
                }else{
                    $('.mui-table-view').html(template('tmp',{info: info}))
                }
            }
        })
    }
    $('.mui-table-view').on('change','.ck',function(){
        var total = 0
        $('.ck:checked').each(function(i,e){
            var price = $(e).data('price')
            var num = $(e).data('num')
            total = total + price * num 
        })
        total = total.toFixed(2)
        $('.lt-total .left span').text(total)
    })

    
    
    render()

    mui.init({
        
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback: function(){
                $.ajax({
                    type: 'get',
                    url: '/cart/queryCart',
                    success: function(info){
                        console.log(info);
                        setTimeout(function(){
                            if (info.error === 400) {
                                //没登录，跳转到登录页面 , 登录成功需要回跳
                                location.href = "login.html?retUrl=" + location.href;
                            }else if (info.length === 0) {
                                $('.mui-table-view').html('没有更多商品了，快去购物车添加吧')
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();//此处有坑，官方文档事件名写错了
                            }else{
                                console.log(mui('#refreshContainer').pullRefresh());
                                $('.mui-table-view').html(template('tmp',{info: info}))
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                            }
                        },1000) 
                    }
                })
            }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });


      //修改购物车
    $('.mui-table-view').on('tap','.change',function(){
        var data = $(this).parent().data('item')
        console.log(data);
        var html = template('tmp2',data).replace(/\n/g,'')
        mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {
            var id = data.id
            var size = $('.lt_edit_size span.now').text()
            var num = $('.mui-numbox input').val()

            $.ajax({
                type: 'post',
                url: '/cart/updateCart',
                data: {
                    id: id,
                    size: size,
                    num: num
                },
                success: function(info){
                    if (info.success) {
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                }
            })
            
        })

        // 修改尺寸
        $('.lt_edit_size span').on('tap',function(){
            $(this).addClass('now').siblings().removeClass('now')

        })

        //动态添加的numbox需要重新初始化一下
        mui('.mui-numbox').numbox()
    })

    


    //删除购物车
    $('.mui-table-view').on('tap','.delete',function(){
        var id = []
        id.push($(this).parent().data('id'))
        mui.confirm('你是否要删除这个商品？','温馨提示',['否','是'],function(e){

            console.log(e);
            if (e.index === 1) {
                $.ajax({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {
                        id: id
                    },
                    success: function(info){
                        if (info.success) {
                            mui.toast('删除购物车成功')
                            render()
                        }
                    }
                })
            }
        }) 
    })

      

})