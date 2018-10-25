jQuery(document).ready(function(){
    
    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1FEXimj96l4009FsR653pp0DhKX2Oc_vs4aqUErjwg-4/edit?usp=sharing';
    var table = null;
        
    createData(publicSpreadsheetUrl);
    $(document).bind('complete', function()
    {
        //SET SEARCH/FILTER
        var mixer = mixitup('#results',
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
            },
            callbacks:
            {
                onMixEnd: function(state, futureState)
                {
                    if(mixer.getState().totalShow < 1)
                    {
                        $('#results').removeClass("hasResults");
                    }
                    else
                    {
                        $('#results').addClass("hasResults");
                        $('#results .result').addClass("visible");
                    }
                }
            }
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
        });
    });
    
    //CREATE TABLE
    function createData(sheetURL)
    {
        Tabletop.init(
        { 
            key: sheetURL,
            callback: function(data, tabletop)
            { 
                //remove description row
                data.splice(0,1);
                console.log(data);

                showResults(data);
                
                fillIndustries(data);
        
                $(document).trigger('complete');
            },
            simpleSheet: true
        });
    }
    
    // CREATE INDUSTY CAROUSEL
    $('.industryCarousel').slick({
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.jobsCarousel',
        responsive:
        [
            {
                breakpoint: 499,
                settings:
                {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    //CREATE JOBS CAROUSEL
    $('.jobsCarousel').slick({
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.industryCarousel'
    });
    
    //OPEN MODALS
    $('.industry').click(function()
    {
        var name = $(this).attr("data-name");
        console.log(name);

        if($(this).hasClass("slick-center"))
        {
            $('.industryModals [data-name*="' + name + '"]').addClass("open");
            $('.industryModals').addClass("open");
            $('body').addClass("stop");
        }
    });

    //CLOSE MODALS
    $('.modal button').click(function()
    {
        $('.modal').removeClass("open");
        $('.industryModals').removeClass("open");
        $('body').removeClass("stop");
    });
    
    $('.industryModals').click(function()
    {
        if($(this).hasClass("open"))
        {
            $('.modal').removeClass("open");
            $('.industryModals').removeClass("open");
            $('body').removeClass("stop");
        }
        
    });
    
    //ALTERNATE SEARCH BARS
    $('#search').hover(function()
    {
        $('#filter').toggleClass("hide");
    });
    
    $('#filter').hover(function()
    {
        $('#search').toggleClass("hide");
    });
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
            var jobTitle = tempData.Name;
            
            if(tempData.VideoEmbed != "")
            {
                jobTitle = jobTitle + ' <span class="play">&#9654;</span>';
            } 
            
            var teaser = "./img/teasers/" + tempData.Name + ".jpg";//"url to image..." + tempData.Name;
            var industry = tempData.Sector;
            var link = tempData.PageURL;
            
//            var newJob = '<a data-name="' + job.toLowerCase() + '" class="job" href="' + link + '">' + job + '</a>';
            
            var newJob = '<div data-name="' + job.toLowerCase() + '" class="job"><div><a href="' + link + '"><img src="' + teaser + '"></a></div><p class="JobTitle">' + jobTitle + '</p></div>';
            
            $('[data-name*="' + industry + '"] .jobGrid').append(newJob);
        }
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
        var teaser = "./img/teasers/" + data[x].Name + ".jpg";//"url to image..." + data[x].Name;
        var industry = data[x].Sector;
        var link = data[x].PageURL;
        
        if(tempData.VideoEmbed != "")
        {
            job = job + ' <span class="play">&#9654;</span>';
        } 
        
        var skills = data[x].Skills.split(',');
        var temp = " ";
        for(var y = 0; y < skills.length; y++)
        {
            temp = temp + skills[y] + " ";
        }
        skills = temp;
        
        //add object to results
        var newResult = '<div data-name="' + job.toLowerCase() + '" class="result mix ' + skills + '"  ontouchstart="this.classList.toggle(' + "'hover'" + ');"><div><a href="' + link + '"><img src="' + teaser + '"></a></div><p class="JobTitle">' + jobTitle + '</p></div>';
        
        $('#results').append(newResult);
    }
}