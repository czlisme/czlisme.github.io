// 当前页面索引 curpageIndex 下一个页面索引 nextpageIndex
//当前现实的页面zindex 为2 不显示的为1
var showPage = (function showPage() {
    var curIndex = 0;
    var pages = $$('.page');
    var nextIndex = null;
    //初始化位置
    function initPosition() {
        nextIndex = null;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]; //拿到每一个页面
            page.style.zIndex = i === curIndex ? 1 : 2; //判断i是否是当前页面的索引
            // if (i === curpageIndex) {
            //     page.style.zIndex =1;
            // } else {
            //     page.style.zIndex = 2;
            // }
            page.style.top = (i - curIndex) * height() + 'px';
        }
    }
    initPosition();
    /*
    @dis 相当于正确位置(移动的偏移量)
    */
    function movePosition(dis) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (i !== curIndex) {
                //如果不是当前页面的时候重新设置位置 (因为不能移动当前页面)
                page.style.top = (i - curIndex) * height() + dis + "px";
            }
        }

        if (dis > 0 && curIndex > 0) {
            nextIndex = curIndex - 1;

        } else if (dis < 0 && curIndex < pages.length - 1) {
            nextIndex = curIndex + 1;
        } else {
            nextIndex = null;
        }
    }


    function finishMove() {
        // 如果没有下一个
        if (nextIndex === null) {
            //这里一定要写== 或者 === 不然比较不了、、bug找了好久气死了。。。。
            initPosition();
            return;
        }
        var nextpage = pages[nextIndex];
        nextpage.style.transition = '.5s';
        nextpage.style.top = 0;

        setTimeout(function() {
            curIndex = nextIndex;
            nextpage.style.transition = '';
            initPosition();
        }, 500)
    }
    //事件
    var pageContainer = $(".page_container");
    pageContainer.ontouchstart = function(e) {
        // 类似于mousedown   表示手指按下
        var y = e.touches[0].clientY;

        function handler(e) {
            var dis = e.touches[0].clientY - y;
            if (Math.abs(dis) < 20) {
                // 防止误触
                dis = 0; // 相当于手指没动
            }
            movePosition(dis);
            // 阻止事件的默认行为浏览器
            if (e.cancelable) {
                // 如果事件可以取消
                e.preventDefault(); // 取消事件 - 阻止默认行为
            }
        }
        // 手指按下，监听移动
        pageContainer.addEventListener("touchmove", handler, {
            passive: false,
        });

        // 手指松开，完成移动
        pageContainer.ontouchend = function() {
            finishMove();
            pageContainer.removeEventListener("touchmove", handler);
        };
    };

    // 自动切换到某个板块
    // index: 页面索引
    function showPage(index) {
        var nextPage = pages[index]; //下一个页面元素
        if (index < pageIndex) {
            // 下一个页面在当前页面上面
            nextPage.style.top = -height() + "px";
        } else if (index > pageIndex) {
            // 下一个页面在当前页面下面
            nextPage.style.top = height() + "px";
        } else {
            // 下一个页面就是当前页面
            if (pageIndex === 0) {
                // 目前是第一个页面
                pageIndex++;
            } else {
                pageIndex--;
            }
            initPosition(); // 重新设置位置
        }
        // 强行让浏览器渲染
        nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
        nextIndex = index; // 设置下一个页面索引
        finishMove();
    }


    return showPage;
})();