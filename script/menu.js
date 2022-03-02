let nav = document.querySelector('.nav-toggle');
let menu = document.querySelector('.header__menu');
let presonalArea = document.querySelector('.header__personal-area');

nav.addEventListener('click', function(){
    nav.classList.toggle('opened');
    if (nav.classList.contains('opened')){
        menu.setAttribute('style', 'left: 0%');
        presonalArea.setAttribute('style', 'left: 0%');

    }else{
        menu.setAttribute('style', 'left: -105%');
        presonalArea.setAttribute('style', 'left: -105%');
    }
})