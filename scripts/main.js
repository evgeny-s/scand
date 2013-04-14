var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid );
    var data = {};
    data['ajax'] = '1';
    MakeRequest(data, function (callback) {console.log(callback)});

}, 100 );

function getXMLHttp()
{
    var xmlHttp;

    try
    {
        //Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch(e)
    {
        //Internet Explorer
        try
        {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
                alert("Your browser does not support AJAX!")
                return false;
            }
        }
    }
    return xmlHttp;
}

function MakeRequest(data, action)
{
    console.log(data);
    var jsonString = JSON.stringify(data)
    console.log(jsonString);
    var xmlHttp = getXMLHttp();

    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4)
        {
            response = xmlHttp.responseText;
            action(response);
        }
    }
    xmlHttp.open("POST", "default.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length", data.length);
    xmlHttp.setRequestHeader("Connection", "close");
    xmlHttp.send(jsonString);
}