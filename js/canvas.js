var canvas = document.querySelector('#mycanvas');
var context = canvas.getContext('2d');
canvas.width = width();
canvas.height = height();
// window.onresize = function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerWidth;
// }
var mouse = {
    x: null,
    y: null,
    max: 40000
};
// 监听鼠标移动的位置
window.onmousemove = function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
window.onmouseout = function() {
        mouse.x = null;
        mouse.y = null;
    }
    // max 表示鼠标和线的位置的最大值 在max之间就连接起来
function Particle() {

}
var items = []; //储存粒子坐标 速度数据
Particle.prototype = {
    init: function() {
        // var that = this;
        for (var i = 0; i < 150; i++) {
            var obj = {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: returnNum(-1, 1),
                    vy: returnNum(-1, 1),
                    max: 50000
                }
                // context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 10, 10)

            // context.filStyle = 'red'
            items.push(obj);
        }
    },
    draw: function() {
        context.clearRect(0, 0, canvas.width, canvas.height); //清空

        var mousearr = [mouse].concat(items) //鼠标数组放入粒子数组中
            // console.log(mousearr);
            // 遍历粒子数组并改变每个粒子的坐标 
        items.forEach(function(item) {
            item.x += item.vx;
            item.y += item.vy;
            // console.log(item.x);
            item.vx *= (item.x < 0 || item.x > canvas.width) ? -1 : 1;
            item.vy *= (item.y < 0 || item.y > canvas.height) ? -1 : 1;
            // context.fillStyle = 'blue';

            // 绘制粒子
            context.fillRect(item.x, item.y, 1, 1)
                //连线操作
            for (var j = 0; j < items.length; j++) {
                // 判断两个粒子之间的距离
                var d = mousearr[j];
                // 判断当前粒子是否与foreach取出的粒子一样 一样就不连线
                if (d == item) {
                    continue; //退出当前循环
                }
                // 计算粒子的距离
                var dx = item.x - d.x;
                var dy = item.y - d.y;
                var dxy = dx * dx + dy * dy;
                // 此距离和最大距离比较 小于的话进行连线 
                if (dxy < d.max) {
                    //判断取出来的是不是鼠标 且此距离大于鼠标的最大距离的一半时靠近鼠标
                    if (d == mouse && dxy > mouse.max / 2) {
                        // 改变粒子的位置
                        item.x -= dx * 0.03;
                        item.y -= dy * 0.03;
                        // dx dy 自己随便挑 防止很大乘以一个系数
                    }
                    // 绘制线条
                    context.beginPath();

                    context.lineWidth = 0.3;
                    context.strokeStyle = 'aqua';
                    // context.strokeStyle = setColor("aqua", '#00e640', '#4ecdc4');
                    // context.strokeStyle = setColor("aqua", '#22a7f0', '#f62459');
                    context.moveTo(item.x, item.y);
                    context.lineTo(d.x, d.y);
                    context.stroke();
                    // context.closePath();
                    // console.log(111);

                }
            }
            // 从数组中删除比较过得粒子
            mousearr.slice(items.indexOf(item), 1)
        })
    }
};

function setColor(a, b, c, d, e) {
    var arr = Array.of(a, b, c, d, e);
    return arr[parseInt(Math.random() * 5)];
    // return arr[Math.floor(returnNum(0, 5))]
}

function returnNum(min, max) {
    return Math.random() * (max - min) + min;
}

// var a = [1, 2]
// var b = [3, 4]
// var c = a.concat(b);
// console.log(c);
var particle = new Particle();
particle.init();
//重复调用draw方法、
// particle.draw();
setInterval(function() {
        particle.draw();
    }, 17)
    // console.log(items);
    // console.log(mousearr);