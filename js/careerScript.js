//set color values
var lightBlue = "#4994D0";
var blue = "#253E5E";
var lightGreen = "#586742";
var green = "#434F39";

var temp = null;

//create jobs array
//var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1FEXimj96l4009FsR653pp0DhKX2Oc_vs4aqUErjwg-4/edit?usp=sharing';

$(document).bind('complete', function()
{    
    fillPage();
    
    setTimeout(function()
    {
//        console.log(jobs);
        
//        console.log(skills);

//        console.log(sponsors);
        
        runjobs();
    }, 100);
    
    // SCROLL TO VIDEO
    $(document).on('click', '#videoButton', function()
    {
        $('html, body').animate(
        {
            scrollTop: $("#video").offset().top - 225
        }, 1000);

    });

    // BACK TO TOP
    $(document).on('click', '#toTop', function()
    {
        $('html, body').animate(
        {
            scrollTop: $("#about").offset().top
        }, 1000);

    });
    
//    $('*').on('click', function()
//    {
//        console.log($(this));
//    });
    
});

function fillPage()
{
    // load contetnt from baseCareer
    $('body').load('../careers/baseCareer.html' + ' #page-cover, .pre-load, header, .container');
}

function runjobs()
{
    //set jobs name to match row
    var jobName = $("title").text();
    //separate selected row
    var row = jobs.filter(x => x.Name === jobName)[0];

    //display job name
    $("#JobTitle").text(row.Name);
    
    //display industry
    $("#industry").text(row.Sector);
        
    //fill copy
    $("#copy").text(row.Copy);
    
    //add teaser image
    var src = "../img/teasers/" + row.Name + ".jpg";
    $('#about .bg img').attr("src", src);
    
    //add video
    if(row.VideoEmbed != "" && row.VideoEmbed != undefined)
    {
        $("#video .content-wrapper .video-container").append(row.VideoEmbed);
    }
    else
    {
//        $('#video').css("display", "none");
        $('#video').remove();
        $('#videoButton').css("display", "none");
    }
    
    //set skills
    row.Skills = row.Skills.split(',');
    for(var x = 0; x < row.Skills.length; x++)
    {
        temp = skills.filter(y => y.name === row.Skills[x])[0];
        temp.src = "../img/icons/skills/ICONS_SKILLS_" + temp.name + ".png";
        $("#Skills ul").append('<li ontouchstart="this.classList.toggle(' + "'hover'" + ');"><img src="' + temp.src + '"><h3 class="tooltip">' + temp.tooltip + '</h3><p class="about">' + temp.about + '</p></li>');
    }    
    
    education(row);
    
    schools(row);
        
    hours(row);
    
    level(row);
    
    fillSponsors(row);
    
    salary(row);
}

function education(row)
{   
    var edLevel = (row.EducationValue - 1);
    $('.sliderView').slick(
    {
        verticle: false,
        infinite: false,
        initialSlide: edLevel,
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
}

function schools(row)
{
    //Schools
    if (row.TrainingLinkName != undefined)
    {
        row.TrainingLinkName = row.TrainingLinkName.split(',');
        
        if (row.TrainingLinkURL != undefined)
        {
            row.TrainingLinkURL = row.TrainingLinkURL.split(',');
        }
        
        for(var x = 0; x < row.TrainingLinkName.length; x++)
        {
            if (row.TrainingLinkURL != undefined)
            {
                if(row.TrainingLinkURL[x] != "" && row.TrainingLinkURL[x] != null)
                {
                    temp = row.TrainingLinkURL[x];
                    $("#TrainingResources").append('<li><a href="' + temp + '">' + row.TrainingLinkName[x] + '</a></li>');
                }
                else
                    temp = "#";
            }
            else
                temp = "#";

            $("#TrainingResources").append('<li>' + row.TrainingLinkName[x] + '</li>');
        }
    }
    else
        $('#education .schools').css("display", "none");
}

function hours(row)
{
    // COPY //
    if(row.ShiftDescription != "")
    {
        $("#stats .hours .copy").text(row.ShiftDescription);
    }

    //  DOUGHNUT //
    var hours = parseInt(row.ShiftHours);
    var pie = document.getElementById("hours-pie");
    var hoursDoughnutChart = new Chart(pie,
    {
        type: 'doughnut',
        data:
        {
            datasets:
            [{
                data: [hours, (24 - hours)],
                backgroundColor:
                [
                  blue,
                  "rgb(0, 0, 0, .2)",
                ],
            }]
        },
        options:
        {
            elements:
            {
                arc:
                {
                    borderWidth: 15,
                },
            },
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
                mode: false
            },
            plugins:
            {
              datalabels: false
            },
            animation:
            {
                onProgress: function(animation)
                {
                    var value = this.config.data.datasets[0].data[0]
                    $('#tooltip-canvas-text h1').text(value);
                },
            },
        },
    });
    Chart.elements.Arc.prototype.draw = function()
    {
        window.arcSpacing = .15;
        var ctx = this._chart.ctx;
        var vm = this._view;
        var sA = vm.startAngle;
        var eA = vm.endAngle;

        ctx.beginPath();
        ctx.arc(vm.x, vm.y, vm.outerRadius, sA + window.arcSpacing, eA - window.arcSpacing);
        ctx.strokeStyle = vm.backgroundColor;
        ctx.lineWidth = vm.borderWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.closePath();
    };

    //  WORK DAYS   //
    var workDays = parseInt(row.WorkDays);
    $("#work-bar").css("width", (100 / (20 / workDays)) + "%"); //max: 20
    $("#stats .bars .work span").text(workDays);

    //  DAYS OFF    //
    var daysOff = parseInt(row.DaysOff);
    $("#off-bar").css("width", (100 / (20 / daysOff)) + "%"); //max: 20
    $("#stats .bars .off span").text(daysOff);
}

function level(row)
{
    $('*[data-rank="' + row.CareerLevel + '"]').addClass("rank");
    switch(row.CareerLevel)
    {
        case "Entry":
        {
            $("#stats .level .copy").text("Entry-level jobs are jobs that require minimal professional work experience and open the door to larger work-related opportunities. These positions generally mean that the employer is looking for a young professional who has some prior experience such as an internship under their belt, but not necessarily someone who has any full-time experience.");
            break;
        }
        case "Mid-Level":
        {
            $("#stats .level .copy").text("Intermediate or mid-level workers may work independently or under supervision. Work-related experience, specific skills and professional degrees are often required. Mid-level workers are deeply involved in the day-to-day operation of a business and have a comprehensive knowledge of their field of specialization. They may supervise small or large groups of employees.");
            break;
        }
        case "Senior":
        {
            $("#stats .level .copy").text("Senior-level workers in an organization is responsible for the overall performance of the business. They set organizational goals, make major corporate decisions and report to shareholders. Several years of experience in management and advanced professional degrees are often required.");
            break;
        }
    }
}

function fillSponsors(row)
{
    //make sure there are sponsors
    if (row.Sponsors != undefined)
    {
        row.Sponsors = row.Sponsors.split(',');
        
        if(row.Sponsors.length > 0 && row.Sponsors[0] != "")
        {
            for(var x = 0; x < row.Sponsors.length; x++)
            {
                temp = sponsors.filter(y => y.Name === row.Sponsors[x]);
                
                if(temp[0].Link != "" && temp[0].Link != null)
                    $("#sponsors .grid").append('<a href="' + temp[0].Link + '">' + '<img src="../img/icons/logos/Sponsors/CENW%20Underwriting%20Logos_' + temp[0].Name + '.png" alt=""></a>');
                
                else
                    $("#sponsors .grid").append('<img src="../img/icons/logos/Sponsors/CENW%20Underwriting%20Logos_' + temp[0].Name + '.png" alt="">');
            }
        }
        else
//        $("#sponsors").css("display", "none");
        $("#sponsors").remove();
    }
    else
//        $("#sponsors").css("display", "none");
        $("#sponsors").remove();
}

function salary(row)
{
    //  SALARY  //

    var entryLow = parseInt(row.SalaryEntryLow);
    var entryHigh = parseInt(row.SalaryEntryHigh);
    var seniorLow = parseInt(row.SalarySeniorLow);
    var seniorHigh = parseInt(row.SalarySeniorHigh);
    var ave = parseInt(row.AvgSalary);
    
    var salaryChart = new Chart($("#salaryChart"),
    {
        type: "line",
        options:
        {
         maintainAspectRatio: false,
        layout:
        {
          padding:
          {
            top: 30,
            left: 0,
            right: 15,
            bottom: 0
          }
        },
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
          mode: false
        },
        scales:
        {
          yAxes:
          [{
            ticks:
            {
                padding: 10,
                min: 0,
                suggestedMax: 100000,
                stepSize: 25000,
                fontSize: 14,
                fontColor: "whitesmoke",
                fontFamily: "Montserrat",
                callback: function(value, index, values)
                {
                    return '$' + value.toLocaleString();
                }
            },
            gridLines:
            {
              color: "rgba(255, 255, 255, 0.5)",
              zeroLineColor: "rgba(255, 255, 255, 0.4)",
              lineWidth: 1,
              drawTicks: false,
            }
          }],
          xAxes:
          [{
            ticks:
            {
              autoSkip: false,
              padding: 10,
              fontSize: 18,
              fontColor: "whitesmoke",
              fontFamily: "Montserrat",
            },
            gridLines:
            {
              display: false,
              drawTicks: false,
              offsetGridLines: true,
            }
          }]
        },
        plugins:
        {
          datalabels:
          {
            color: 'white',
            font:
            {
              family: "Montserrat",
              weight: 800,
              size: 20
            },
            align: 'top',
            offset: 15,
            formatter: function(value)
            {
              return '$' + value.toLocaleString();
            }
          }
        },
      },
        data:
        {
        labels: ['', "ENTRY", '', "SENIOR", '' ],
        datasets:
        [
          {
            data: [null, entryHigh, null, seniorHigh],
            fill: false,
            pointRadius: 2,
            pointBackgroundColor: lightBlue,
            borderWidth: 5,
            borderColor: lightBlue,
            spanGaps: true,
            borderCapStyle: "round",
          }, // high
          {
            label: row.Name,
            data: [null, entryLow, null, seniorLow],
            borderColor: lightBlue,
            borderWidth: 5,
            pointRadius: 2,
            backgroundColor: 'rgb(225, 225, 225, .2)',
            pointBackgroundColor: lightBlue,
            fill: '-1',
            spanGaps: true,
            borderCapStyle: "round",
            datalabels:
            {
              align: 'bottom'
            }
          } // low // label this one
        ]
      }
    });

    // SALARY LEGEND //

    $('#salary .legend h2').text(row.Name);
    $('#salary .legend p').text('Average: $' + ave.toLocaleString());

    // SALARY SUBTEXT //

    switch(row.SalaryRatio)
    {
        default:
        {
            $('#salary .chart .sub').text("Based on regional averages. Subject to change based on location.");
            break;
        }
        case "above":
        {
            $('#salary .chart .sub').text("Spokane is above the regional average and is represented by the top line. Regional averages are shown on the bottom line. Subject to change based on location.");
            break;
        }
        case "below":
        {
            $('#salary .chart .sub').text("Spokane is below the regional average and is represented by the bottom line. Regional averages are shown on the top line. Subject to change based on location.");
            break;
        }
    }

    // SALARY COMPARISON  //

    //job select options
    $("#field-select").change(function ()
    {
        var compField = jobs.filter(x => x.Sector === $(this).val());

        $("#job-select").text("");
        $("#job-select").append('<option value="" disabled="disabled" selected="selected">Select job</option>');
        for(var x = 0; x < compField.length; x++)
        {
            $("#job-select").append('<option value="' + compField[x].Name + '">' + compField[x].Name + '</option>');
        }
    });

    $("#job-select").change(function ()
    {
        var newJob = jobs.filter(x => x.Name === $(this).val())[0];

        var newEntryLow = parseInt(newJob.SalaryEntryLow);
        var newEntryHigh = parseInt(newJob.SalaryEntryHigh);
        var newSeniorLow = parseInt(newJob.SalarySeniorLow);
        var newSeniorHigh = parseInt(newJob.SalarySeniorHigh);
        var newAve = parseInt(newJob.AvgSalary);

        var newData =
        [
          {
            label: newJob.Name,
            data: [null, newEntryHigh, null, newSeniorHigh], //high
            fill: false,
            pointRadius: 2,
            hoverRadius: 2,
            borderWidth: 5,
            borderColor: lightGreen,
            pointBackgroundColor: lightGreen,
            spanGaps: true,
            borderCapStyle: "round"
          }, // label this one
          {
            data: [null, newEntryLow, null, newSeniorLow], //low,
            borderColor: lightGreen,
            pointBackgroundColor: lightGreen,
            borderWidth: 5,
            pointRadius: 2,
            hoverRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            fill: '-1',
            spanGaps: true,
            borderCapStyle: "round",
          }
        ];

        adddata(salaryChart, newData);

        // SALARY LEGEND //
        $('#salary .legend .newJob h2').text(newJob.Name);
        $('#salary .legend .newJob p').text('Average: $' + newAve.toLocaleString());
        $('#salary .legend').css("display", "flex");
        $('#salary .options').css("grid-row", "1");

    });

    $("#clear-select").on('click', function()
    {
        removedata(salaryChart);

        //reset option select
        $('#field-select option').prop('selected', function() {
            return this.defaultSelected;
        });
        $('#job-select option').prop('selected', function() {
            return this.defaultSelected;
        });

        // SALARY LEGEND //
        $('#salary .legend').css("display", "none");
        $('#salary .options').css("grid-row", "1 / 3");
    });
}

function adddata(chart, data)
{
    chart.data.datasets.splice(2, chart.data.datasets.length - 1); //remove second dataset (if any)

    //add new dataset
    for(var x = 0; x < data.length; x++)
        chart.data.datasets.push(data[x]);

    chart.options.plugins.datalabels = false;

    //reload chart
    chart.update();
}

function removedata(chart)
{
    chart.data.datasets.splice(2, chart.data.datasets.length - 1);
    chart.options.plugins.datalabels = 
    {
        color: 'white',
        font:
        {
            family: "Montserrat",
            weight: 800,
            size: 20
        },
        align: 'top',
        offset: 15,
        formatter: function(value)
        {
            return '$' + value.toLocaleString();
        }
    }

  chart.update();
}
