//set color values
var lightBlue = "#4994D0";
var blue = "#253E5E";
var lightGreen = "#586742";
var green = "#434F39";

var temp = null;

//set skill image values
var Skills =
[
    {name: "AttentionToDetail", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_AttentionToDetail.png", tooltip: "Attention To Detail", about: "Do you often notice things that other people miss? Are you able to complete a project with few or no mistakes?"},
    
    {name: "ComputerSkills", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_ComputerSkills.png", tooltip: "Computer Skills", about: "Can you easily learn to use new programs or applications? Are you able to quickly find nessasary files or information? Can you fix minor computer related issues?"},
    
    {name: "Language", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Language.png", tooltip: "Language", about: "Can you communicate in multiple languages?"},
    
    {name: "Leadership", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Leadership.png", tooltip: "Leadership", about: "Do you work well in a group setting? Are you good at building relationships with others? Are you good at recognizing the skills of others?"},
    
    {name: "Motivation", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Motivation.png", tooltip: "Motivation", about: "Do you work well by yourself? Are you able to start tasks without direction? Are you able to continue a task despite distractions?"},
    
    {name: "Math", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Math.png", tooltip: "Math", about: "Do you have a good sense of numbers? Are you easily able to recognize patterns? Can you easily do basic calculations?"},
    
    {name: "Organization", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Organization.png", tooltip: "Organization", about: "Are you able to keep clutter to a minimum? Can you keep track of lots of different information?"},
    
    {name: "Planning", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Planning.png", tooltip: "Planning", about: "Do you often take notes or make lists? Do you manage you time efficiently? Are you able to prioritize important tasks?"},
    
    {name: "ProblemSolving", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_ProblemSolving.png", tooltip: "Problem Solving", about: "Do you enjoy solving puzzles? Are you able to easily identify the cause of a problem?"},
    
    {name: "StrengthDexterity", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_StrengthDexterity.png", tooltip: "Strength/ Dexterity", about: "Are you able to lift a moderate amount of weight without any issue? Can you stand or walk for an extended period of time?"},
    
    {name: "QualityControl", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_QualityControl.png", tooltip: "Quality Control", about: "Are you good at responding to feedback? Are you able to repeat a task with consistent results?"},
    
    {name: "Research", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_Research.png", tooltip: "Research", about: "Are you able to easily collect information? Do you quickly identify higher priority information?"},
    
    {name: "VerbalCommunication", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_VerbalCommunication.png", tooltip: "Verbal Communication", about: "Are you able to vocalize your thoughts efficiently? Can you retain information that you hear?"},
    
    {name: "VehicleOperation", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_VehicleOperation.png", tooltip: "Vehicle Operation", about: "Are licenced to operate nessasary vehicles? Do you consider machine safety a top priority?"},
    
    {name: "WrittenCommunication", link: "http://www.careerexplorenw.org/job-skills/", src: "../img/icons/skills/ICONS_SKILLS_WrittenCommunication.png", tooltip: "Written Communication", about: "Are you able to write your thoughts efficiently? Can you retain information that you read?"}
]

//create data array
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1FEXimj96l4009FsR653pp0DhKX2Oc_vs4aqUErjwg-4/edit?usp=sharing';

jQuery(document).ready(function(){
    
    // load data
    init();
    
});

function init()
{
    Tabletop.init(
    {
        key: publicSpreadsheetUrl,
        callback: function(data, tabletop)
        { 
            //remove description row
            data.splice(0,1);
            console.log(data);

            runData(data, tabletop);

            $(document).trigger('complete');
        },
        simpleSheet: true 
    })
}


//display data in console
function runData(data, tabletop)
{
    console.log("runData opened");
    
    //set data name to match row
    var jobName = $("title").text();

    //separate selected row
    var row = data.filter(x => x.Name === jobName)[0];

    //display job name
    $("#JobTitle").text(row.Name);
    
    //display industry
    $("#industry a").text(row.Sector);
    $("#industry a").attr("href", '../industries.html#' + row.Sector);
        
    //fill copy
    $("#Copy").text(row.Copy);
    
    //add teaser image
    var src = "../img/teasers/" + row.Name + ".jpg";
    $('#video-container img').attr("src", src);
    
    //add video
    if(row.VideoEmbed != "")
    {
        $("#video-container").append(row.VideoEmbed);
    }
    else
    {
        $('#openVideo').css("display", "none");
    }
    
    //set skills
    row.Skills = row.Skills.split(',');
    for(var x = 0; x < row.Skills.length; x++)
    {
        var temp = Skills.filter(y => y.name === row.Skills[x])[0];
        $("#Skills ul").append('<li ontouchstart="this.classList.toggle(' + "'hover'" + ');"><img src="' + temp.src + '"><h3 class="tooltip">' + temp.tooltip + '</h3><p class="about">' + temp.about + '</p></li>');
    }
    
    //Sponsors
    row.SponsorName = row.SponsorName.split(',');
    row.SponsorLink = row.SponsorLink.split(',');
    //make sure there are sponsors
    if(row.SponsorName.length > 0 && row.SponsorName[0] != "")
    {
        for(var x = 0; x < row.SponsorName.length; x++)
        {        
            if(row.SponsorLink[x] != "" && row.SponsorLink[x] != null)
                temp = row.SponsorLink[x];
            else
                temp = "#";

            $("#sponsors").append('<a href="' + temp + '">' + '<img src="../img/icons/logos/Sponsors/CENW%20Underwriting%20Logos_' + row.SponsorName[x] + '.png" alt=""></a>');
        }
    }
    else
        $("#sponsors").css("display", "none");
    
    //Training Resources
    row.TrainingLinkName = row.TrainingLinkName.split(',');
    row.TrainingLinkURL = row.TrainingLinkURL.split(',');
    for(var x = 0; x < row.TrainingLinkName.length; x++)
    {
        if(row.TrainingLinkURL[x] != "" && row.TrainingLinkURL[x] != null)
            temp = row.TrainingLinkURL[x];
        else
            temp = "#";
        
        $("#TrainingResources").append('<li><a href="' + temp + '">' + row.TrainingLinkName[x] + '</a></li>');
    }
    
    //Industry Links
    for(var x = 0; x < row.SponsorName.length; x++)
    {    
        if(row.SponsorLink[x] != "" && row.SponsorLink[x] != null)
            temp = row.SponsorLink[x];
        else
            temp = "#";
        
        $("#IndustryLinks").append('<li><a href="' + temp + '">' + row.SponsorName[x] + '</a></li>');
    }
    
    row.IndustryName = row.IndustryName.split(',');
    for(var x = 0; x < row.IndustryName.length; x++)
    {    
        $("#IndustryLinks").append('<li><p>' + row.IndustryName[x] + '</p></li>');
    }
    
    
    // EDUCATION //
    
    var edLevel = (row.EducationValue - 1);
    //set education level
    $('.sliderView').slick({
        initialSlide: edLevel,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        centerMode: false,
        swipeToSlide: true,
        customPaging: function (slider, i)
        {
            return '<button class="tab">' + $('.slick-thumbs li:nth-child(' + (i + 1) + ')').html() + '</button>';
        }
    });
    $('.slick-dots .' + row.EducationLevel).parent().addClass("req");
    
    
    // CAREER LEVEL //
    $('*[data-rank="' + row.CareerLevel + '"]').addClass("rank");
    if(row.CareerLevel === "Entry")
    {
        $("#level .copy p").text("Entry-level jobs are jobs that require minimal professional work experience and open the door to larger work-related opportunities. These positions generally mean that the employer is looking for a young professional who has some prior experience such as an internship under their belt, but not necessarily someone who has any full-time experience.");
    }
    else if(row.CareerLevel === "Mid-Level")
    {
        $("#level .copy p").text("Intermediate or mid-level workers may work independently or under supervision. Work-related experience, specific skills and professional degrees are often required. Mid-level workers are deeply involved in the day-to-day operation of a business and have a comprehensive knowledge of their field of specialization. They may supervise small or large groups of employees.");
    }
    else
    {
        $("#level .copy p").text("Senior-level workers in an organization is responsible for the overall performance of the business. They set organizational goals, make major corporate decisions and report to shareholders. Several years of experience in management and advanced professional degrees are often required.");
    }
    
    // HOURS COPY //
    if(row.ShiftDescription != "")
    {
        $("#hours .copy").text(row.ShiftDescription);
    }
    
    //  HOURS //
    var hours = parseInt(row.ShiftHours);
    var hoursDoughnutChart = new Chart($("#hours-pie"),
    {
        type: 'doughnut',
        data:
        {
            labels: [],
            datasets:
            [{
                data: [hours, 24 - hours],
                backgroundColor:
                [
                    green,
                    lightGreen
                ],
                borderWidth: 1
            }]
        },
        options:
        {
            legend:
            {
                display: false
            },
            tooltips:
            {
                enabled: false
            },
            hover:
            {
                mode: null
            }
        }
    });
    $("#hours .pie .hours").text(hours + " hour shifts");
    
    //  WORK DAYS   //
    var workDays = parseInt(row.WorkDays);
    $("#work-bar").css("width", (100 / (20 / workDays)) + "%"); //max: 20
    $("#hours .bars .work").text("Work days in a row: " + workDays);
    
    //  DAYS OFF    //
    var daysOff = parseInt(row.DaysOff);
    $("#off-bar").css("width", (100 / (20 / daysOff)) + "%"); //max: 20
    $("#hours .bars .off").text("Days off between shifts: " + daysOff);
    
    //  SALARY  //
//    var avgSalary = parseInt(row.AvgSalary);
//    $("#salary h2").append(" $" + avgSalary);
    
    var entryLow = parseInt(row.SalaryEntryLow);
    var entryHigh = parseInt(row.SalaryEntryHigh);
    var entryDoughnutChart = new Chart($("#entry-salary"),
    {
        type: 'doughnut',
        data:
        {
            labels: [],
            datasets:
            [{
                data: [(entryLow - 15000), (entryHigh - entryLow), ((120000 - 15000) - entryHigh)],  //subtract 15000 from high and low to make min 15000
                backgroundColor:
                [
                    green,
                    lightGreen,
                    green
                ],
                borderWidth: 1
            }]
        },
        options:
        {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend:
            {
                display: false,
            },
            tooltips:
            {
                enabled: false
            },
            hover:
            {
                mode: null
            }
        }
    });
    
    $("#EntrySalary").html(row.Name + ": <span>$" + (entryLow / 1000) + "k - $" + (entryHigh / 1000) + "k</span>");
    
    var seniorLow = parseInt(row.SalarySeniorLow);
    var seniorHigh = parseInt(row.SalarySeniorHigh);
    var seniorDoughnutChart = new Chart($("#senior-salary"),
    {
        type: 'doughnut',
        data:
        {
            labels: [],
            datasets:
            [{
                data: [(seniorLow - 15000), (seniorHigh - seniorLow), ((120000 - 15000) - seniorHigh)],  //subtract 15000 from high and low to make min 15000
                backgroundColor:
                [
                    green,
                    lightGreen,
                    green
                ],
                borderWidth: 1
            }]
        },
        options:
        {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend:
            {
                display: false,
            },
            tooltips:
            {
               enabled: false
            },
            hover:
            {
                mode: null
            }
        }
    });
    
    $("#SeniorSalary").html(row.Name + ": <span>$" + (seniorLow / 1000) + "k - $" + (seniorHigh / 1000) + "k</span>");
    
    //
    //
    //
    // SALARY COMPARISON
    //
    //
    //    
    
    //job select options
    $("#field-select").change(function () {
        
        var compField = data.filter(x => x.Sector === $(this).val());
        
        $("#job-select").text("");
        $("#job-select").append('<option value="" disabled="disabled" selected="selected">Select job</option>');
        for(var x = 0; x < compField.length; x++)
        {
            $("#job-select").append('<option value="' + compField[x].Name + '">' + compField[x].Name + '</option>');
        }
    });
    
    $("#job-select").change(function ()
    {
        var newJob = data.filter(x => x.Name === $(this).val())[0];
        
        var newEntryLow = parseInt(newJob.SalaryEntryLow);
        var newEntryHigh = parseInt(newJob.SalaryEntryHigh);
        
        var newEntryData = {
            backgroundColor:
            [
                blue,
                lightBlue,
                blue
            ],
            borderWidth: 1,
            data: [(newEntryLow - 15000), (newEntryHigh - newEntryLow), ((120000 - 15000) - newEntryHigh)],  //subtract 15000 from high and low to make min 15000
            label: 'New dataset'
        };
        
        var newSeniorLow = parseInt(newJob.SalarySeniorLow);
        var newSeniorHigh = parseInt(newJob.SalarySeniorHigh);
        
        var newSeniorData = {
            backgroundColor:
            [
                blue,
                lightBlue,
                blue
            ],
            borderWidth: 1,
            data: [(newSeniorLow - 15000), (newSeniorHigh - newSeniorLow), ((120000 - 15000) - newSeniorHigh)],  //subtract 15000 from high and low to make min 15000
            label: 'New dataset'
        };
        
        addData(entryDoughnutChart, "", newEntryData);
        addData(seniorDoughnutChart, "", newSeniorData);
        
        $("#CompEntrySalary").html(newJob.Name + ": <span>$" + (newEntryLow / 1000) + "k - $" + (newEntryHigh / 1000) + "k</span>");
        $("#CompEntrySalary").css("visibility", "visible");
        
        $("#CompSeniorSalary").html(newJob.Name + ": <span>$" + (newSeniorLow / 1000) + "k - $" + (newSeniorHigh / 1000) + "k</span>");
        $("#CompSeniorSalary").css("visibility", "visible");
        
        
                      
    });
    
    //addDataset
    function addData(chart, label, data)
    {
        chart.data.datasets.splice(1, 1); //remove second dataset (if any)
        chart.data.datasets.push(data); //add new dataset
        chart.update();
    }
}