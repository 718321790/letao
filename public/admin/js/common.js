$(function(){


    $(document).ajaxStart(function(){
        NProgress.start()
    })

    $(document).ajaxStop(function(){
        setTimeout(function(){

            NProgress.done()        
        },1000)
    })

    $('.category').on('click',function(){
        $('.child').slideToggle()
    })

    $('.icon-menu').on('click',function(){
        $('.app').toggleClass('active')
        $('.app-left').toggleClass('active')
    })

    // 登出功能
    $('.logout').on('click',function(){
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function(info){
                if (info.success == true) {
                    location.href = 'login.html';
                }
            }
        })
    })

})