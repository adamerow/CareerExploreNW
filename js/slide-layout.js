var slideNumber = $('.slide').length;
var curSlideNum = 0;
var lastScrollTop = 0;

// on scroll
$(window).scroll(function (event) {
  
    // get current scroll position
    var st = $(this).scrollTop();
  
    // set current slide
    var curSlide = $('.slide').eq(curSlideNum);
  
    // set top break at 20% of window height
    var ViewTop = $(window).scrollTop() + ($(window).height() * 0.3);
    // set bottom break at 80% of window height
    var ViewBottom = ((ViewTop - ($(window).height() * 0.3)) + $(window).height()) - ($(window).height() * 0.3);

    // get position of current slide
    var elemTop = curSlide.offset().top;
    var elemBottom = elemTop + curSlide.outerHeight();
  
    // scrolling down
    if (st > lastScrollTop)
    {   
        //check if bottom reaches 70% of window
        if(elemBottom < ViewBottom)
        {
            next();
        }
      
         // $('.next-slide .content').animate({ top: '-=15' }, 10);
         // $('.prev-slide .content').animate({ top: '-=15' }, 10);
    }
  
    // scrolling up
    else
    {   
        //check if top reaches 30% of window
        if(elemTop > ViewTop)
        {
            prev();
        }
      
         // $('.next-slide .content').animate({ top: '+=15' }, 10);
         // $('.prev-slide .content').animate({ top: '+=15' }, 10);
    }
  
    lastScrollTop = st;
});

function next()
{
    // new slide number
    curSlideNum++;
  
    // remove current slide classes
    $(".slide").removeClass("current-slide");
    $(".slide").removeClass("next-slide");
    $(".slide").removeClass("prev-slide");
    
    // reassign current slide
    var curSlide = $(".slide").eq(curSlideNum);
    curSlide.addClass("current-slide");
  
    // assign prev
    var prevSlide = $(".slide").eq(curSlideNum - 1);
    prevSlide.addClass("prev-slide");
  
    // assign next
    var nextSlide = $(".slide").eq(curSlideNum + 1);
    nextSlide.addClass("next-slide");
}

function prev()
{
    // new slide number
    curSlideNum--;
  
    // remove current slide classes
    $(".slide").removeClass("current-slide");
    $(".slide").removeClass("next-slide");
    $(".slide").removeClass("prev-slide");
    
    // reassign current slide
    var curSlide = $(".slide").eq(curSlideNum);
    curSlide.addClass("current-slide");
  
    // assign prev
    var prevSlide = $(".slide").eq(curSlideNum - 1);
    prevSlide.addClass("prev-slide");
  
    // assign next
    var nextSlide = $(".slide").eq(curSlideNum + 1);
    nextSlide.addClass("next-slide");
}