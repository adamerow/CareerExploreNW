$(document).bind('complete', function()
{
    showResults(jobs);

    fillIndustries(jobs);

    fillSpot(jobs);
    
    // CREATE SPOTLIGHT CAROUSEL
    $('.spotlightCarousel').slick({
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // CREATE INDUSTY CAROUSEL
    $('.industryCarousel').slick(
    {
        dots: true,
        vertical: false,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    });

    //SET SEARCH/FILTER
    var mixer = mixitup('#search .results',
    {
        load: {
            filter: 'none'
        },
        animation:
        {
            duration: 500
        },
        controls:
        {
            toggleDefault: 'none',
            toggleLogic: 'and'
        }
    });
    
    setTimeout(function()
    {
        //ALTERNATE SEARCH BARS
        $('#search-bar').hover(function()
        {
            $(this).removeClass("hide");
            $('#filter').toggleClass("hide");
            $('#filter').removeClass("show");
        });

        //GET SEARCH RESULTS
        $('#search').submit(function(event)
        {
            event.preventDefault();

            var input = $('#search input').val().toLowerCase();
            console.log(input);

            if (input.length > 0)
            {
                // Use an attribute wildcard selector to check for matches
                mixer.filter('[data-name*="' + input + '"]');
            }
            else
            {
                // If no searchValue, treat as filter('all')
                mixer.filter('all');
            }

            $('#filter button').removeClass("mixitup-control-active");
            $('.videos input').prop('checked', false);
        });

        //alternate for mobile
//        $(document).on('click', '#search-bar', function()
//        {
//            $(this).removeClass("hide");
//            $('#filter').toggleClass("hide");
//            $('#filter').removeClass("show");
//        });

        $(document).on('click', '#filter h2', function()
        {
            $('#filter').toggleClass("show");

            if($('#search-bar').hasClass("hide"))
            {
                $('#search-bar').removeClass("hide");
            }
            else
            {
                $('#search-bar').addClass("hide");
            }
        });

    }, 10);
    
});

////    FUNCTIONS   ////

// FILL INDUSTRIES
function fillIndustries(data, tabletop)
{
    var Agr = data.filter(x => x.Sector === "Agriculture");
    var Arc = data.filter(x => x.Sector === "Architecture & Construction");
    var Com = data.filter(x => x.Sector === "Community & Nonprofit");
    var Fin = data.filter(x => x.Sector === "Finance & Insurance");
    var Hea = data.filter(x => x.Sector === "Healthcare & Social Assistance");
    var Man = data.filter(x => x.Sector === "Manufacturing");
    var Sci = data.filter(x => x.Sector === "Science & Technology");
    var Tra = data.filter(x => x.Sector === "Transportation & Warehousing");
    
    var indArray = [Agr, Arc, Com, Fin, Hea, Man, Sci, Tra];
    
    for(var x = 0; x < indArray.length; x++)
    {        
        for(var y = 0; y < indArray[x].length; y++)
        {
            var industry = indArray[x][y].Sector;
            var tempData = indArray[x][y];
            
            //pull stats from data object
            var job = tempData.Name;
            var jobSpan = tempData.Name;
            
            if(tempData.VideoEmbed != "" && tempData.VideoEmbed != undefined)
            {
                jobSpan = '<img src="./img/icons/ICONS_MENU_Play.png" alt=""><p>' + job + '</p>';
            }
            else
                jobSpan = '<p>' + job + '</p>';
            
            var teaser = "./img/teasers/" + tempData.Name + ".jpg";//"url to image..." + tempData.Name;
            var industry = tempData.Sector;
            var link = tempData.PageURL;
            
//            var newJob = '<a data-name="' + job.toLowerCase() + '" class="job" href="' + link + '">' + job + '</a>';
            
            var newJob = '<div data-name="' + job.toLowerCase() + '" class="job"><a href="' + link + '"><div class="job-icon"><img src="' + teaser + '"></div><div class="job-title">' + jobSpan + '</div></a></div>';
            
            $('[data-name*="' + industry + '"] .jobs').append(newJob);
        }
    }
}

// FILL SPOT
function fillSpot(data, tabletop)
{
    var newData = data.filter(function(row)
    {
        return row.Spotlight == "spot";
    });
    
    for(var x = 0; x < newData.length; x++)
    {
        //pull stats from data object
        var job = newData[x].Name;
        var jobSpan = job;
        var teaser = "./img/teasers/" + newData[x].Name + ".jpg";//"url to image..." + data[x].Name;
        var industry = newData[x].Sector;
        var link = newData[x].PageURL;
    
        if(newData[x].VideoEmbed != "")
        {
            jobSpan = '<img src="./img/icons/ICONS_MENU_Play.png" alt=""><h1>' + job + '</h1>';
        }
        else
            jobSpan = '<h1>' + job + '</h1>';
        
        //add object to results
        var newSpot = '<div data-name="' + job.toLowerCase() + '" class="spot"><a href="' + link + '"><img class="teaser" src="' + teaser + '"><div class="job-title">' + jobSpan + '</div></a></div>';
        
        $('#spotlight .spotlightCarousel').append(newSpot);
        
    }
}

// DISPLAY RESULTS
function showResults(data)
{    
    //create result object for each data object
    for(var x = 0; x < data.length; x++)
    {
        //pull stats from data object
        var job = data[x].Name;
        var jobSpan;
        var teaser = "./img/teasers/" + data[x].Name + ".jpg";//"url to image..." + data[x].Name;
        var industry = data[x].Sector;
        var link = data[x].PageURL;
                
        var skills = data[x].Skills.split(',');
        var temp = " ";
        for(var y = 0; y < skills.length; y++)
        {
            temp = temp + skills[y] + " ";
        }
        skills = temp;
        
        if(data[x].VideoEmbed != "" && data[x].VideoEmbed != undefined)
        {
            jobSpan = '<img src="./img/icons/ICONS_MENU_PlayBlue.png" alt=""><p>' + job + '</p>';
            
            skills = skills + " video";
        }
        else
            jobSpan = '<p>' + job + '</p>';
        
        //add object to results
        var newResult = '<div data-name="' + job.toLowerCase() + '" class="result job mix ' + skills + '"><a href="' + link + '"><div class="job-icon"><img src="' + teaser + '"></div><div class="job-title">' + jobSpan + '</div></a></div>';
        
        $('#search .results').append(newResult);
    }
}
