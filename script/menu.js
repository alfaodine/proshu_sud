let nav = document.querySelector('.nav-toggle');
let menu = document.querySelector('.header__menu');
let menuBg = document.querySelector('.header__menu-bg');
let menuBgPages = document.querySelector('.menu_mobile');
let presonalArea = document.querySelector('.header__personal-area');
let hh = 'hello';

nav.addEventListener('click', function(){
    // menuBg.setAttribute("style","height:500px");
    // console.log(menu.clientHeight);
    nav.classList.toggle('opened');
    if (menuBg) {menuBg.classList.toggle('active-menu')};
    if(menuBgPages) {menuBgPages.classList.toggle('active-menu')};

    if (nav.classList.contains('opened')){
        
        // menuBg.classList.toggle('active-menu');

        // menu.setAttribute('style', 'left: 0%');
        // menuBg.setAttribute('style', `left: 0%; top: 7vh; height:${menu.clientHeight}px`);
        // presonalArea.setAttribute('style', 'left: 0%');

    }else{
        // menu.setAttribute('style', 'left: -100%');
        // presonalArea.setAttribute('style', 'left: -100%');
        // menuBg.setAttribute('style', 'top: -50vh; left: -105%');
        // menuBg.classList.toggle('active-menu');
    }
})