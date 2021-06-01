/*
 * @Author: labixiaochen
 * @LastEditors: Tt's me too
 * @FirstEditTime: new Data()
 * @sayings: 质量编码,解决问题
 */
// 轮播图特效
(function () {
    var lists = document.getElementById('banner-img-ul');
    var btn_l = document.getElementById('btn-l');
    var btn_r = document.getElementById('btn-r');
    var curs_ol = document.getElementById('curs');
    var banner = document.getElementById('banner');
    // 获取ol中的li
    var curs_lis = curs_ol.getElementsByTagName('li');

    // 克隆第一张图片
    var clone_li = lists.firstElementChild.cloneNode(true);
    // 上树
    lists.appendChild(clone_li);

    // 定时器变量
    var timer;
    var index = 0;

    // 函数节流变量
    var lock = true;

    btn_r.onclick = btn_r_zd;
    // 这个地方将函数赋值给事件的时候， 前面不要写function
    // 我还必须写成这种形式， 因为不写成这种形式的话，定时器还无法调用这个函数

    function btn_r_zd() {
        // 函数节流,进来先判断锁的状态，然后直接关锁，在关键代码的最后实现事件设置即可
        if (!lock) return;
        lock = false;

        lists.style.transition = 'transform .5s linear 0s';
        index++;
        lists.style.transform = 'translateX(' + index * -16.66 + '%)';

        // 判断是否为最后一张，如果是最后一张，那么就要瞬间移动回来
        if (index > 4) {
            setTimeout(function () {
                // 去掉过渡
                lists.style.transition = 'none';
                // 删除transform属性
                lists.style.transform = 'none';
                index = 0;
                // setCurrent(); //会有一定的延迟来进行显示
            }, 500)
        }
        // 设置小圆点
        setCurrent();


        setTimeout(function () {
            lock = true;
        }, 500);
    }
    btn_l.onclick = function () {
        if (!lock) return;
        lock = false;

        // 左按钮很特殊需要先写if语句
        if (index == 0) {
            // 取消过渡
            lists.style.transition = 'none';
            // 拉倒最后
            lists.style.transform = 'translateX(' + 5 * -16.66 + '%)';
            // 改变index的值
            index = 4;

            // 小技巧， 延时0毫秒，可以让刚才的瞬移发生之后，再把过渡加上，这个也太聪明了吧
            setTimeout(function () {
                // 加上过渡
                lists.style.transition = 'transform .5s linear 0s';
                // 动画
                lists.style.transform = 'translateX(' + index * -16.66 + '%)';

            }, 0)
        } else {
            index--;
            // 拉动即可
            lists.style.transform = 'translateX(' + index * -16.66 + '%)';
        }
        // 设置小圆点
        setCurrent();



        setTimeout(function () {
            lock = true;
        }, 500);

    }

    // 设置小圆点在current类上， 需要为index的小圆点才有这个类， 其他的类取消current类
    function setCurrent() {
        // 遍历0,1,2,3,4,每遍历一个数字，就要和index比一下，如果相等，就把这项的类名设置为current，其他类名设置为''即可，这个操作属于排它操作
        for (var i = 0; i <= 4; i++) {
            if (i == index % 5) {
                // 这里的 % 5 是十分巧妙的， 1234 除以5都是本身， 但是5除以5却是0
                // 这里 % 5 的目的是为了右按键它有一瞬间， index会变成5，200毫秒之后才会是0
                curs_lis[i].className = 'current';
            } else {
                curs_lis[i].className = '';
            }
        }
    }


    // 事件委托，小圆点的监听
    curs_ol.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            var n = Number(e.target.getAttribute('data-n'));
            // 改变 index 的值
            index = n;
            lists.style.transform = 'translateX(' + index * -16.66 + '%)';
            setCurrent();

        }
    }


    // 自动轮播
    timer = setInterval(btn_r_zd, 2000);

    // 鼠标进入， 自动轮播暂停
    banner.onmouseenter = function () {
        clearInterval(timer);
    }

    // 当鼠标离开的时候， 自动轮播开始
    banner.onmouseleave = function () {
        // 设表先关
        clearInterval(timer);
        timer = setInterval(btn_r_zd, 2000);
        // 这个地方不能直接写timer， 必须写全了， 因为你直接写一个新的定时器， 清除的是外部定时器，设表先关就失去了意义
    }
})()