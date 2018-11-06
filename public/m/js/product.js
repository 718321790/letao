$(function(){
    
    var search = getSearch(location.search)
    // console.log(search)
    var id = search.id

    $.ajax({
        type:'get',
        url: '/product/queryProductDetail',
        data:{
            id: id
        },
        success: function(info){
            console.log(info)
            $('.mui-scroll').html(template('tmp',info))

            // 重新初始化轮播图
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 初始化数字狂
            mui('.mui-numbox').numbox()



            // 定义几个添加购物车用的参数
            var size
            var productId = id
            var num = $('.num').data('num')
            // 点击选中尺码
            $('.size').on('click','span',function(){
                $(this).addClass('active').siblings().removeClass('active')
                size = $(this).data('size')
            })

            // 点击添加购物车 添加商品并 显示模态框
            $('.btn-add-cart').on('click',function(){
                if ($('.size span.active').length === 0) {
                    mui.toast('请选择尺码',{ duration:'long', type:'div' }) 
                    return
                }
                $.ajax({
                    type:'post',
                    url:'/cart/addCart',
                    data:{
                        productId: productId,
                        num: num,
                        size: size
                    },
                    success:function(info){
                        console.log(info)
                        if (info.success) {
                            mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                                if (e.index === 0) {
                                    location.href = 'cart.html'
                                }
                            }) 
                        }
                        if (info.error === 400) {
                            mui.confirm('添加失败，请先登录','温馨提示',['继续浏览','去登录'],function(e){
                                if (e.index === 1) {
                                    location.href = 'login.html?backurl='+location.href
                                }
                            }) 
                        }
                    }
                })
            })
        }
    })


    


})