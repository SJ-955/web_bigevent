$(function(){
    // 点击注册账号链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击登陆账户链接
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    var form = layui.form
    var layer = layui.layer

    // 通过form.verify自定义校验规则
    form.verify({
        pwd:[ /^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd!=value){
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟人的点击行为
            $('#link-login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success:function(res){
               console.log('ok')
                if(res.status !== 0){
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token',res.token)
                location.href ='./index.html'
            }
        })
    })
})
