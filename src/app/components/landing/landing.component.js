angular
  .module('app')
  .component('landingComponent', {
    templateUrl: 'app/components/landing/landing.tmpl.html',
    controller: function (authService, $state, localStorageService) {

      $(document).ready(function () {
        $("nav").find("li").on("click", "a", function () {
          // $('.navbar-collapse.in').collapse('hide');
        });
      });

      $(document).ready(function() {
        $('.logo').click(function() {
          $('.menu').slideToggle("swing");
        });
      });

      $(document).ready(function() {
        $('.logo-small').click(function() {
          $('.menu').slideToggle("swing");
        });
      });

      $(document).ready(function(){

        $("#slideshow > div:gt(0)").hide();

        var buttons = "<button class=\"slidebtn prev\"><i class=\"fa fa-chevron-circle-left\"></i></button><button class=\"slidebtn next\"><i class=\"fa fa-chevron-circle-right\"></i></button\>";

        var slidesl = $('.slideitem').length
        var d = "<li class=\"dot active-dot\">&bull;</li>";
        for (var i = 1; i < slidesl; i++) {
          d = d+"<li class=\"dot\">&bull;</li>";
        }
        var dots = "<ul class=\"slider-dots\">" + d + "</ul\>";

        $("#slideshow").append(dots).append(buttons);
        var interval = setInterval(slide, 3000);

        function intslide(func) {
          if (func == 'start') {
            interval = setInterval(slide, 3000);
          } else {
            clearInterval(interval);
          }
        }

        function slide() {
          sact('next', 0, 1200);
        }

        function sact(a, ix, it) {
          var currentSlide = $('.current');
          var nextSlide = currentSlide.next('.slideitem');
          var prevSlide = currentSlide.prev('.slideitem');
          var reqSlide = $('.slideitem').eq(ix);

          var currentDot = $('.active-dot');
          var nextDot = currentDot.next();
          var prevDot = currentDot.prev();
          var reqDot = $('.dot').eq(ix);

          if (nextSlide.length == 0) {
            nextDot = $('.dot').first();
            nextSlide = $('.slideitem').first();
          }

          if (prevSlide.length == 0) {
            prevDot = $('.dot').last();
            prevSlide = $('.slideitem').last();
          }

          if (a == 'next') {
            var Slide = nextSlide;
            var Dot = nextDot;
          }
          else if (a == 'prev') {
            var Slide = prevSlide;
            var Dot = prevDot;
          }
          else {
            var Slide = reqSlide;
            var Dot = reqDot;
          }

          currentSlide.fadeOut(it).removeClass('current');
          Slide.fadeIn(it).addClass('current');

          currentDot.removeClass('active-dot');
          Dot.addClass('active-dot');
        }

        $('.next').on('click', function(){
          intslide('stop');
          sact('next', 0, 400);
          intslide('start');
        });//next

        $('.prev').on('click', function(){
          intslide('stop');
          sact('prev', 0, 400);
          intslide('start');
        });//prev

        $('.dot').on('click', function(){
          intslide('stop');
          var index  = $(this).index();
          sact('dot', index, 400);
          intslide('start');
        });//prev
//slideshow
      });

    }
  })