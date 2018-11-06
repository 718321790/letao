$(function(){
    
    var vcode;
    $('.btn-get').on('click',function(e){

        e.preventDefault()

        $.ajax({

            type: 'get',
            url: '/user/vCode',
            success: function(info){
                console.log(info);
                vcode = info.vCode
            }
        })
    })

    $('.btn-register').click(function(){
        var username = $('[name=username]').val()
        var password = $('[name=password]').val()
        var passwordAgain = $('[name=passwordAgain]').val()  
        var mobile = $('[name=mobile]').val()   
        var Vcode = $('[name=vCode]').val()       
        if (!username) {
            mui.toast('请输入用户名')
            return
        }
        if (!password) {
            mui.toast('请输入密码')
            return
        }else if(password.length < 6){
            mui.toast('密码至少6位')
            return
        }
        if (passwordAgain != password) {
            mui.toast('两次输入密码不一致')
            return
        }
        if (!mobile) {
            mui.toast('请输入手机号')
            return
        }else{
            // 做正则验证
            var test1 = /^1[35678]\d{9}/
            if (!test1.test(mobile)) {
                mui.toast('手机号格式错误') 
                return   
            }
        }
        if (!Vcode) {
            mui.toast('请输入验证码')
            return
        }else if(Vcode != vcode){
            mui.toast('验证码错误')
            return
        }
        if (!$('.checkbtn:checked')) {
            mui.toast('请勾选服务协议')
            return
        }

       
        

        $.ajax({
            url: '/user/register',
            type: 'post',
            data:{
                username: username,
                password: password,
                mobile: mobile,
                vCode: Vcode
            },
            success: function(info){
                console.log(info);
            }
        })
    })
    

    

})