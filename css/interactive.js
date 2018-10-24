//EVENT SCRIPTS

jQuery(document).ready(function(){

    // CREATE CAROUSELS
    
    // stats
    $('#statContent').slick({
        dots: false,
        infinite: false,
        vertical: true,
        adaptiveHeight: true,
        verticalSwiping: true
    });
    
    //open video
    $('#openVideo').click(function(){
                
        $('body').toggleClass("stop");
//        $('#stats').toggleClass("open");
        $(this).toggleClass("open");
        $(this).toggleClass("view");
        
        if($(this).hasClass("open")) //vid -> info
        {           
//            $('#stats').addClass("open");
            
            animationOut();
        }
        else //info -> vid
        {
//            window.setTimeout(function (){
//                $('#stats').removeClass("open");
//            }, 1000);
            
            animationIn();
        }
    });
    
    function animationIn() //vid -> info
    {
        //flip vid & image
        $('#video-container iframe').removeClass("open");
        
        //image becomes visible
        window.setTimeout(function (){
            $('#teaser').removeClass("open");
        }, 50);
        
        //clips swoop in
        window.setTimeout(function (){
            $('#greenClip').removeClass("open");
            $('#content').removeClass("open");
        }, 500);
        
        //lines swoop in
        window.setTimeout(function (){
            $('#blueLines').removeClass("open");
            $('#greenLines').removeClass("open");
        }, 1000);
        
        
    }
    
    function animationOut() //info -> vid
    {
        //lines swoop out
        $('#blueLines').addClass("open");
        $('#greenLines').addClass("open");
        
        //clips swoop out
        window.setTimeout(function (){
            $('#greenClip').addClass("open");
            $('#content').addClass("open");
        }, 500);
        
        //image fades out
        window.setTimeout(function (){
            $('#teaser').addClass("open");
        }, 1000);
        
        //flip vid & image
        window.setTimeout(function (){
            $('#video-container iframe').addClass("open");
        }, 1500);
    }
    
    $('#Skills li').hover(function()
    {
        var left = $(this + ' p').position().left;
        var right = $(this + ' p').position().left + $(this + ' p').outerWidth();
        console.log(left);
        console.log(right);
        
        if(left < 30)
        {
            $(this + ' p').css(
            {
                "left": 0,
                "transform": "translate(0, calc(-100% - 15px))"
            });
            $(this + ' p').after().css(
            {
                "left": 0,
                "transform": "translateX(150%)"
            });
        }
        
        if(right > $(window).width() - 30)
        {
            $(this + ' p').css(
            {
                "left": 0,
                "transform": "translate(calc(-50% - 45px), calc(-100% - 15px))"
            });
            $(this + ' p').after().css("left", "calc(100% - 55px)");
        }
    }); 
    
    //open/close stats    
//    $('#statTease').click(function(){
//        $('#stats').toggleClass("stats");
//        $('#stats').toggleClass("view");
//        $('#stats').toggleClass("active");
//        $('body').toggleClass("stop");
//        window.setTimeout(function (){
//            $('#statExit').toggleClass("hide");
//        }, 500);
//    });
//    
//    $('#statExit').click(function(){        
//        $('#stats').toggleClass("stats");
//        $('#stats').toggleClass("view");
//        $('#stats').removeClass("active");
//        $('#statTease').removeClass("active");
//        $('body').toggleClass("stop");
//    });

});



                      
                      