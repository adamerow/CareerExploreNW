jQuery(document).ready(function(){
    
    // INFO BOXES
    
    //open infoBox of chosen industry on load
    var url = window.location.href;    
    url = url.slice(url.length - 5, url.length);
    var banner = $('#content').children().filter(function( index )
    {
        return $(this).find('.banner h1').text().indexOf(url) != -1;
    });
    banner.find('.infoBox').addClass("openInfo");
    
    //OPEN PAGE
    window.setTimeout(function()
    {
        $('#pageCover').addClass("openPage");
    }, 1000);
    
    //open/close info
    $('.banner').click(function()
    {
        var elm = $(this).next();
        
        $('.videoBox').removeClass("openVideo");
        
        if(elm.hasClass("openInfo"))
        {
            $('.infoBox').removeClass("openInfo");
            
            window.setTimeout(function (){
                $('.infoBox').css(
                {
                    "position": "relative",
                    "margin-top": "-45px"
                });
            }, 500);
        }
        else
        {
            $('.infoBox').removeClass("openInfo");
            elm.addClass("openInfo");
            
            $('.infoBox').css(
            {
                "position": "relative",
                "margin-top": "-45px"
            });
        }
    });
        
    // VIDEO BOXES
        
    //open video
    $('.infoBox button').click(function()
    {
        var industry = $(this).attr("industry");
        
        var elm = $('#' + industry + ' .videoBox');
        
        //set videoBox top position
        var pos = elm.prev().prev().height() - 20;
        elm.css("top", pos + "px");
        
        if(elm.find('iframe').attr("src") === "")
        {
            //load video source
            var src = elm.find('iframe').attr("data-src");
            elm.find('iframe').attr("src", src);
        }
        
        //open video
        elm.addClass("openVideo");
    });
    
    // close video
    $('.videoBox').click(function()
    {
       $(this).removeClass("openVideo"); 
    });
});