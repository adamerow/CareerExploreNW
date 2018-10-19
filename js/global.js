jQuery(document).ready(function(){
                 
    //open hamburger menu
    $('#hamburger').click(function(){
        $(this).toggleClass('open');
        $("#nav-bar").toggleClass('open-nav');
    });
    
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction()
    {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
        {
            $('#toTop').addClass("visible");
        }
        else
        {
            $('#toTop').removeClass("visible");
        }
    }
    
    
    
    //    PAGE TRANSITIONS    //

    //open page
    $(document).bind('complete', function()
    {        
        $('#pageCover').addClass("openPage");
    });
    
    //close page
    $('a').click(function(){
        //prevent leaving page
        event.preventDefault();
        //get url of next page
        var url = $(this).attr("href");

        //animation goes here
        $('body').addClass("stop");
        $('#pageCover').removeClass("openPage");

        //wait for animation then leave
        window.setTimeout(function()
        {
            console.log(url);
            window.location.href = url;
        }, 1050);
    });
});

// When the user clicks on the button, scroll to the top of the document
function topFunction()
{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}