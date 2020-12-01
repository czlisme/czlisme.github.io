var showPop = (function() {

        function showPop(id) {
            // 传一个id 给每个id的元素给点点击事件显示该id对应的窗口
            $('#' + id).style.display = '';
            var container = $("#" + id);
            // display none 变为空不设置 ;由于设置的是弹性盒不能设置为display block
            container.style.display = "";
            // 判断传的id是否是视频的id 是的话则自动播放 
            if (id === "popVideo") {
                var vdo = container.querySelector("video");
                vdo.play();
            }
        }
        var pop_close = $$('.pop_close');
        // 给每一个关闭按钮绑定点击事件
        for (i = 0; i < pop_close.length; i++) {
            pop_close[i].onclick = function() {
                var popContainer = this.parentElement.parentElement;
                // 这个按钮的父元素的父元素
                popContainer.style.display = 'none';
            }
        }
        var popWx = $(".pop_logoWx");
        var popQq = $(".pop_logoQq");
        popWx.onclick = function() {
            // classList.add 添加类样式
            popWx.classList.add("active");
            popQq.classList.remove("active");
        };

        popQq.onclick = function() {
            popWx.classList.remove("active");
            popQq.classList.add("active");
        };
        // 处理关闭视频弹窗时，视频暂停
        var closeBtn = $("#popVideo .pop_close");
        closeBtn.addEventListener("click", function() {
            $("#popVideo video").pause();
        });
        return showPop;
    })() //需要用的变量抛出去，不需要的封装避免污染全局