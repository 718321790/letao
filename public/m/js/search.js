$(function(){

    function getItem(){
        var lt_arr_search = localStorage.getItem('lt_arr_search')
        lt_arr_search = JSON.parse(lt_arr_search) || []
        return lt_arr_search
    }

    function render(){
        var lt_arr_search = getItem()
        console.log(lt_arr_search);
        $('.lt-history').html(template('tmp',{list:lt_arr_search}))
    }

   

    render()
    
    // 点击按钮跳转和添加历史记录
    $('.btn-search').on('click',function(){
        var lt_arr_search = getItem()

        var $val = $('#search').val().trim()
        
        if ($val.length != 0) {


            // 如果有重复了，删除旧的那个
            if (lt_arr_search.indexOf($val) > -1) {
                lt_arr_search.splice(lt_arr_search.indexOf($val),1)
            }

            // 如果历史记录长度超过10 删除旧的那个
            if (lt_arr_search.length >= 10) {
                lt_arr_search.pop()
            }

            lt_arr_search.unshift( $val) 
            localStorage.setItem('lt_arr_search',JSON.stringify(lt_arr_search))
            
            // 渲染
            render()

            // 清空
            $('#search').val('')

            location.href = "searchList.html?key="+$val

        }  
    })
    
    // 清空所有历史记录
    $('.lt-history').on('click','.clearAll',function(){
        mui.confirm("确定删除所有历史记录吗",'温馨提示',['取消','确定'],function(e){
            if (e.index === 1) {
                localStorage.removeItem('lt_arr_search')
                render()
            }
        })
    })

    // 清空单个记录
    $('.lt-history').on('click','.btn_delete',function(){
        mui.confirm("确定删除吗",'温馨提示',['取消','确定'],function(e){
            if (e.index === 1) {

                var lt_arr_search = getItem()
                var index = $(this).data('index')
                lt_arr_search.splice(index,1)
                localStorage.setItem('lt_arr_search',JSON.stringify(lt_arr_search))
                render()

            }
        })
    })


})