$(function () {
    const form = layui.form;
    const layer = layui.layer;

    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    const initUserinfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                console.log(res);
                // 为表单快速赋值
                form.val('initUserinfo', res.data)
            }
        })
    }

    initUserinfo();

    // 重置按钮
    $('#btnReset').on('click', (e) => {
        e.preventDefault();
        initUserinfo();
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');

                // 调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
})
