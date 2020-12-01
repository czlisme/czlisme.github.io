// ~~ function() {
//     $('.menu_switch').onclick = function() {
//         // $('.menu_switch').calssList
//         $('.menu_switch').classList.toggle("menu_switch_expand");
//         $('.menu_nav').classList.toggle("menu_nav_expand");
//     }
// }()
~~ function() {
    let mSwitch = $('.menu_switch');
    let mNav = $('.menu_nav');


    // $('.menu_switch').calssList
    function toggleNav() {
        mSwitch.classList.toggle("menu_switch_expand");
        mNav.classList.toggle("menu_nav_expand");
    }
    mSwitch.onclick = toggleNav;
    mNav.addEventListener("click", function() {
        toggleNav();
    })

}() //立即执行函数封装 避免污染全局变量