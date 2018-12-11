/* set up XMLHttpRequest */
var url = "../js/Jobs-Grid.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

var jobs;
var skills;
var sponsors;

oReq.onload = function(e)
{
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var result = [];

    for(var i = 0; i != data.length; ++i) result[i] = String.fromCharCode(data[i]);
    var bstr = result.join("");

    /* Call XLSX */
    var result = [];
    var workbook = XLSX.read(data, { type: 'binary' });

    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y)
    { /* iterate through sheets */
        //Convert the cell value to Json
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
        if (roa.length > 0)
        {
            result.push(roa);
        }
    });

   //Get the value as an array without description lines
    result[0].splice(0,1);
    jobs = result[0];

    result[1].splice(0,1);
    sponsors = result[1];

    result[2].splice(0,1);
    skills = result[2];

    $(document).trigger('complete');
}
oReq.send();