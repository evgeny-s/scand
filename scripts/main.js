var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid );
    var data = {};
    var position = 0;
    data['action'] = 'index';
    /*make ajax request and parsing data to create content of the table*/
    MakeRequest(data, function (callback) {
        for (i in callback) {
            var tr = document.createElement('TR');
            var td1 = document.createElement('TD');
            var td2 = document.createElement('TD');
            var td3 = document.createElement('TD');
            var td4 = document.createElement('TD');
            if (i == 0) {
                tr.setAttribute('class', 'selected');
            }
            tr.setAttribute('number', callback[i]['id']);
            td1.innerHTML = callback[i]['first_name'];
            td2.innerHTML = callback[i]['surname'];
            td3.innerHTML = callback[i]['date_of_birth'];
            td4.innerHTML = callback[i]['salary'];
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            var table = document.getElementById('salaryTable');
            table.appendChild(tr);
            bind('click', tr, selectOnClick);
        }
    });

    /*binding key pressed*/
    bind('keypress', document, upAndDownOnPushKeys);

    var remove_button = document.getElementById('remove_button');
    bind('click', remove_button, removeRow);

    var add_button = document.getElementById('add_button');
    bind('click', add_button, addRow);

    /*assign action to event for all browser*/
    var wrapper = document.getElementById('table-wrapper');
    if (wrapper.addEventListener) {
        wrapper.addEventListener('scroll', loadData, false);
    } else if (wrapper.attachEvent)  {
        wrapper.attachEvent('onscroll', loadData);
    }


}, 100 );

function loadData() {
    var obj = this;
    if (obj.scrollTop + obj.offsetHeight >= obj.scrollHeight) {
        //alert('add data to bottom and delete from top');
    } else {
        if (obj.scrollTop == 0) {
            //alert('add data to top and delete from bottom');
        }
    }

}

function bind(action, element, func) {
    if (element.addEventListener) {
        element.addEventListener(action, func, false);
    } else if (element.attachEvent)  {
        element.attachEvent('on' + action, func);
    }
}

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

function MakeRequest(data, onSuccess)
{
    var jsonString = JSON.stringify(data)
    var xmlHttp = getXMLHttp();

    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4)
        {
            var response = xmlHttp.responseText;
            console.log(response);
            if (response) {
                var output = JSON.parse(response);
            } else {
                var output = false;
            }
            onSuccess(output);
        }
    }
    xmlHttp.open("POST", "default.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length", data.length);
    xmlHttp.setRequestHeader("Connection", "close");
    xmlHttp.send(jsonString);
}

/*
* @function selectOnClick
* mark clicked row by adding class 'selected'
*
*/
function selectOnClick() {
    var obj = this;
    var sel_tr = document.getElementsByClassName('selected');
    sel_tr[0].setAttribute('class', '');
    obj.setAttribute('class', 'selected');
}

/*
 * @function upAndDownOnPushKeys
 * move up and down mark of row when arrow keys pressed
 *
 */
function upAndDownOnPushKeys(e) {
    e = e || window.event;
    e.preventDefault();
    /*up*/
    if (e.keyCode == '38') {
        var sel_tr = document.getElementsByClassName('selected');
        var prev_sibling = sel_tr[0].previousSibling;
        if (prev_sibling && prev_sibling.nodeName == 'TR') {
            sel_tr[0].setAttribute('class', '');
            prev_sibling.setAttribute('class', 'selected');
        } else {
            return false;
        }
    } else
    /*down*/
    if (e.keyCode == '40') {
        var sel_tr = document.getElementsByClassName('selected');
        var next_sibling = sel_tr[0].nextSibling;
        if (next_sibling && next_sibling.nodeName == 'TR') {
            sel_tr[0].setAttribute('class', '');
            next_sibling.setAttribute('class', 'selected');
        } else {
            return false;
        }
    }
}

/*
 * @function removeRow
 * remove selected row
 *
 */
function removeRow() {
    var sel_tr = document.getElementsByClassName('selected');
    var next_sibling = sel_tr[0].nextSibling;
    var prev_sibling = sel_tr[0].previousSibling;

    var id = sel_tr[0].getAttribute('number');
    var use_ajax = document.getElementById('use_ajax');
    if (confirm('Are you sure?')) {
        if (use_ajax.checked) {
            var data = {};
            data['action'] = 'remove';
            data['id'] = id;
            MakeRequest(data, function (callback) {
                if (callback) {
                    sel_tr[0].parentNode.removeChild(sel_tr[0]);
                    /*transfer marking*/
                    if (prev_sibling && prev_sibling.nodeName == 'TR') {
                        prev_sibling.setAttribute('class', 'selected');
                    } else
                    if (next_sibling && next_sibling.nodeName == 'TR') {
                        next_sibling.setAttribute('class', 'selected');
                    } else {
                        /*exception for last row*/
                    }
                } else {
                    alert('Some problems occurred. Please, try again later.');
                }
            });
        } else {
            var form = document.createElement("form");
            form.setAttribute('method',"post");
            form.setAttribute('action',"default.php");
            form.setAttribute('id',"remove_form");

            var i1 = document.createElement("input");
            i1.setAttribute('type',"text");
            i1.setAttribute('name',"action");
            i1.setAttribute('value',"remove");

            var i2 = document.createElement("input");
            i2.setAttribute('type',"text");
            i2.setAttribute('name',"id");
            i2.setAttribute('value',id);

            var submit = document.createElement("input"); //input element, Submit button
            submit.setAttribute('type',"submit");
            submit.setAttribute('value',"Submit");

            form.appendChild(i1);
            form.appendChild(i2);
            form.appendChild(submit);

            document.getElementsByTagName('body')[0].appendChild(form);

            form.submit();
        }
    }
}

/*
 * @function addRow
 * add new row
 *
 */
function addRow() {

}

