$(function () {
    getUserInfo();

    $('#btnLogout').on('click', function () {

        layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "" },
            function (index) {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        );
    })


});

const layer = layui.layer;

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg('获取用户信息失败')

            layer.msg('获取用户信息成功');
            renderAvatar(res.data)
        }, 
        // complete: (res) => {         // 不管成功失败都会调用
        //     if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染头像函数

const renderAvatar = (user) => {
    let uname = user.nickname || user.username;
    $('#welcome').html(`欢迎 ${uname}`);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        let first = uname[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }
}