// Wait for window load
$(window).load(function() {
    // Animate loader off screen
    $(".pre-load").fadeOut(500);
});

jQuery(document).ready(function()
{
                 
    //open hamburger menu
    $(document).on('click', '#hamburger', function()
    {
        $(this).toggleClass('open');
        $("#nav-bar").toggleClass('open-nav');
    });
    
    //close page animation
    $(document).on('click', 'a', function(e)
    {
        //prevent leaving page
        event.preventDefault();
        //get url of next page
        var url = $(this).attr("href");

        if(url != '#')
        {
            //animation goes here        
            $('#page-cover').css("display", "block");
            $('#page-cover').animate(
            {
                top: 0 - (($(window).height() / 2) + 150)
            },1000, function()
            {
                //wait for animation then leave
                setTimeout(function()
                {
                    console.log(url);
                    window.location.href = url;
                }, 1000);

            });
        }
        
    });
    
});