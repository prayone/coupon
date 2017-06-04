
function initSwiper() {
    var mySwiper = new Swiper('.swiper-container',{
        mode:'horizontal',
        loop: true,
        autoplay:3000
    });
};
// footer点击颜色变绿
function chageColor(info) {
    $(".weui-tabbar__item").find("p").removeClass("on-color");
    $(".weui-tabbar__item").find("i").removeClass("on-color");

    $(info).find("p").addClass("on-color")
    $(info).find("i").addClass("on-color")
}

$(function () {

    // var targetUrl = 'http://119.29.254.72:3001';
    //初始化sweiper高度
    $('#swiper-container').height($(window).width()/16*6.5);
    // 菜单操作
    var username=getQueryString("username");
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    $(document).on("click", "#show-actions-bg", function() {
        if(username==null){
            $.actions({
                title: "选择操作",
                onClose: function() {
                    console.log("close");
                },
                actions: [
                    {
                        text: "注册",
                        className: "color-primary",
                        onClick: function() {
                            location.href="./register.html";

                        }
                    },
                    {
                        text: "登陆",
                        className: "color-primary",
                        onClick: function() {
                            location.href="./login.html";
                        }
                    },
                    {
                        text: "联系我们",
                        className: 'color-danger',
                        onClick: function() {
                            location.href="aboutUs.html";
                        }
                    }
                ]
            });
        }else{
            $.actions({
                title: "欢迎:"+username,
                onClose: function() {
                    console.log("close");
                },
                actions: [
                    {
                        text: "我的优惠券",
                        className: "color-warning",
                        onClick: function() {
                            // location.href="./register.html";

                        }
                    },
                    {
                        text: "联系我们",
                        className: "color-danger",
                        onClick: function() {
                            location.href="aboutUs.html";
                        }
                    },
                    {
                        text: "退出登陆",
                        className: 'color-danger',
                        onClick: function() {
                            location.href="index.html";
                        }
                    }
                ]
            });
        };

    });
    // 注册功能
    $(".quxiao").click(function () {
        location.href="index.html";
    });
    $("#sure").click(function () {
        var username = $('#zhuce-up').val()
        var password = $('#pw1').val()
        var PWD = $('#pw2').val()
        if(password!=PWD){
            alert('两次输入密码不一致')
            return
        }
        if(username==""||password==""){
            alert("用户名或者密码不能为空！")
            return;
        }
        $.ajax({
            type: "POST",
            url: targetUrl+"/op/register",
            data: {username:username, password:password},
            dataType: "json",
            success: function(rs) {
                if(rs.info){
                    alert("恭喜您，注册成功！");
                    location.href = 'login.html';
                }else{
                    alert(rs.err)
                    $('#zhuce-up').val("");

                }
            }
        })
    });
    // 登陆功能
    $(".quxiao").click(function () {
        location.href="index.html";
    });
    $("#loginbtn").on("click",getList);
    $("#pw").on('keyup',function(e){
        if(e.keyCode === 13){
            getList()
        }
    });
    function getList(){
        // 登陆接口'/op/login'
        var username=$("#login").val();
        var password=$("#pw").val();
        $.ajax({
            type:"POST",
            url:targetUrl+'/op/login',
            data: {username:username, password:password},
            dataType: "json",
            success:function (data) {
                if(username==""||password==""){
                    alert("用户名或者密码不能为空！")
                    return;
                }
                if(data.info){
                    console.log("登陆成功！")
                    setCookie('username',username);
                    localStorage.setItem('username',username)
                    window.location.href="./index.html?username="+username;
                }else{
                    alert("密码或者登录名错误！")
                }
            }

        });
    };
});
function backhome(){
    var username=getCookie("username");

    if(username==null){
        window.location.href="./index.html";
    }else{
        window.location.href="./index.html?username="+username;
    }
}