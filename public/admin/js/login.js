$(function () {


    $('form').bootstrapValidator({
        // 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 15,
                        message: '用户名长度必须在6到15之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    },
                    callback: {
                        message: '请输入正确的用户名'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 15,
                        message: '密码长度必须在6到15之间'
                    },
                    callback: {
                        message: '请输入正确的密码'
                    }
                }
            }
        },
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    });

    $('form').on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('form').serialize(),
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = "./index.html";
                }
                if (info.error === 1000) {
                    $("form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }
                if (info.error === 1001) {
                    $("form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                }
            }
        });
    })

    // 重置表单
    $('[type=reset]').on('click',function(e){

        $("form").data('bootstrapValidator').resetForm();
    })
    
    

})