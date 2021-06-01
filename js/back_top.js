/*
 * @Author: labixiaochen
 * @LastEditors: Tt's me too
 * @FirstEditTime: new Data()
 * @sayings: 质量编码,解决问题
 */
(function () {

    var back_top = document.getElementById('back_top');

    var timer;

    back_top.onclick = function () {
        clearInterval(timer);
        timer = setInterval(function () {
            document.documentElement.scrollTop -= 30;
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timer);
            }
        }, 10);
    }

    // 当页面返回顶部的时候是不显示返回顶部按钮的， 要去监听window.onscroll() 事件
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || window.scrollY;

        // 如果为0， 我们就让这个返回顶部的盒子隐藏掉
        if (scrollTop == 0) {
            back_top.style.display = 'none';
        } else {
            back_top.style.display = 'block';
        }
    }
})();