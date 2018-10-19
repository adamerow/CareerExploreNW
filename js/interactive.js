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
        $('#greenClip').toggleClass("open");
        $('#greenLines').toggleClass("open");
        $('#stats').toggleClass("open");
        $('#content').toggleClass("open");
        $('#blueLines').toggleClass("open");
        $('#teaser').toggleClass("open");
        $(this).toggleClass("open");

        $('#green').toggleClass("view");
        $('#greenLines').toggleClass("view");
        $(this).toggleClass("view");
        
        if($(this).hasClass("open"))
        {
            window.setTimeout(function (){
                $('#video-container iframe').addClass("open");
            }, 1000);
            
            $('#stats').addClass("open");
        }
        else
        {
            $('#video-container iframe').removeClass("open");
            
            window.setTimeout(function (){
                $('#stats').removeClass("open");
            }, 1000);
        }
    });
    
    //open/close stats    
    $('#statTease').click(function(){
        $('#stats').toggleClass("stats");
        $('#stats').toggleClass("view");
        $('#stats').toggleClass("active");
        $('body').toggleClass("stop");
        window.setTimeout(function (){
            $('#statExit').toggleClass("hide");
        }, 500);
    });
    
    $('#statExit').click(function(){        
        $('#stats').toggleClass("stats");
        $('#stats').toggleClass("view");
        $('#stats').removeClass("active");
        $('#statTease').removeClass("active");
        $('body').toggleClass("stop");
    });

});



                      
                      