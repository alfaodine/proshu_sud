$(document).ready(function(){
    $('.reviews__references').slick({
      dots: false,
  infinite: true,
  speed: 2000,
  autoplay:true,
  autoplaySpeed: 4000,
  arrows:true,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: $('.prev-btn'),
  nextArrow: $('.next-btn'),
  
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
    });
  });