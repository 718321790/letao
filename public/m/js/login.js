$(function () {
    $('.btn-confirm').on('click', function () {
        var username = $('[name=username]').val()
        var password = $('[name=password]').val()
        if (!username) {
            mui.toast('请输入用户名')
            return
        }
        if (!password) {
            mui.toast('请输入密码')
            return
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                console.log(info);
                if (info.error) {
                    mui.toast(info.message)
                }
                if (info.success) {
                    // console.log(location.search);
                    //如果成功，
                    //如果有backurl，跳转回之前页面，否则跳到个人中心
                    var search = location.search
                    if (search.indexOf('backurl') === -1) {
                        location.href = 'user.html'
                    }else{
                        location.href = search.replace('?backurl=','')
                    }
                }
            }
        })
    })
})