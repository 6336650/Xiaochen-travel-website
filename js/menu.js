/*
 * @Author: labixiaochen
 * @LastEditors: Tt's me too
 * @FirstEditTime: new Data()
 * @sayings: 质量编码,解决问题
 */

(function () {
    var bannerNavUl = document.getElementById('banner-nav-ul');
    var bannerNav = document.getElementById('banner-nav');


    // 必须使用onmouseover事件， 不能使用onmouseenter事件， 因为后者不冒泡
    bannerNavUl.onmouseover = function (e) {
        // 因为不同的浏览器显示的标签名可能有的是大写有的是小写，统一转换为小写
        if (e.target.tagName.toLowerCase() == 'li') {
            // 妈的，我老是在判断的时候少写一个等于号，我是傻逼
            var n = e.target.getAttribute('data-n');
            // e.target.style.backgroundColor = 'red';
            // console.log(n);
            // 寻找匹配的menu
            var themenu = document.querySelector('.menu-box .menu[data-n=' + n + ']');
            // 排他操作，其他盒子都去掉curr类名.思路：让所有的盒子都去掉，然后指定的盒子添上
            var menus = document.querySelectorAll('.menu-box .menu');
            for (var i = 0; i < menus.length; i++) {
                menus[i].className = 'menu';
            }
            // console.log(themenu)
            // 加上指定当前的类名
            themenu.className = 'menu curr';
        }
    }

    // 当鼠标离开大盒子的时候，它就要关闭
    bannerNav.onmouseleave = function () {
        var menus = document.querySelectorAll('.menu-box .menu');
        for (var i = 0; i < menus.length; i++) {
            menus[i].className = 'menu';
        }
    }

})()