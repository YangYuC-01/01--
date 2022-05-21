$(function () {
    const form = layui.form;
    // 自定义验证规则
    form.verify({
        // 密码验证
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 新老密码不能相同
        somePwd: (val) => {
            if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同！'
        },
        // 确认密码
        rePwd: (val) => {
            if (val !== $('[name=newPwd]').val()) return '两次密码不一致！'
        }
    })


    // 监听form表单提交事件，发起ajax请求修改密码
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:(res) => {
                if (res.status !== 0) return layer.msg('修改失败');
                layer.msg('修改成功');
                localStorage.removeItem('token');
                window.parent.location.href = '/login.html'
            }
            
        })
    })
})