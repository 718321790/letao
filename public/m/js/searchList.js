/*
 * @Author: lu-yijun 
 * @Date: 2018-10-30 10:57:08 
 * @Last Modified by: lu-yijun
 * @Last Modified time: 2018-10-30 10:57:35
 */
$(function(){

    //获取传入的url对象
    var search = getSearch(location.search)
    // console.log(search) //测试用
    var key = search.key
    $('#search').val(key)

    var data = {
        proName: key,
        page: 1 ,
        pageSize: 1000
    }
    
    // 渲染
    function render(){

        
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: data,
            beforeSend: function(){
                $('.loading').show()
            },
            success: function(info){
                console.log(info)
                
                $('.lt-product').html(template('tmp',info))
            },
            complete:function(){
                
                $('.loading').hide()                
            }
        })
    }

    // 首屏渲染
    render()

    // 点击搜索按钮 重新搜索商品列表
    $('.btn-search').on('click',function(){
        key = $('#search').val()
        data = {
            proName: key,
            page: 1 ,
            pageSize: 1000
        }
        render()
    })

    // 点击排序栏，切换排序
    $('.lt-sort li[data-type]').on('click',function(){

        data = {
            proName: key,
            page: 1 ,
            pageSize: 1000
        }
        
        var $this = $(this)
        // 如果有active 类，点击时切换箭头方向和排序顺序
        if ($this.hasClass('active')) {
            $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
        }else{
            //如果没有active类，点击时添加该类并排他，让所有箭头重置为朝下

            $this.addClass('active').siblings().removeClass('active')
            $('.lt-sort li span').removeClass('fa-angle-up').addClass('fa-angle-down')
        }

        if ($this.data('type') === 'price') {
            var price = $this.find('span').hasClass('fa-angle-down')?2:1
            data.price = price
        }
        if ($this.data('type') === 'num') {
            var num = $this.find('span').hasClass('fa-angle-down')?2:1
            data.num = num 
        }
        
        render()

    })

})