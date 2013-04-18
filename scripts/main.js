/*onload block begin*/
var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid );
    var data = {};
    var position = 0;
    data['action'] = 'index';
    /*make ajax request and parsing data to create content of the table*/
    MakeRequest(data, function (callback) {
        buildTable(callback);
    });

    getSortInfo();

    /*binding key pressed*/
    bind('keypress', document, upAndDownOnPushKeys);

    var remove_button = bId('remove_button');
    bind('click', remove_button, removeRow);

    var add_button = bId('add_button');
    bind('click', add_button, function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal([],'show');
    });

    var edit_button = bId('edit_button');
    bind('click', edit_button, showEditForm);

    //editing on double click
    bind('dblclick', '', showEditForm);

    var close_button = bId('close');
    bind('click', close_button, modal);

    var cancel_button = bId('cancel_button');
    bind('click', cancel_button, function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal([],'close');
    });

    var ok_button = bId('ok_button');
    bind('click', ok_button, function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal([],'submit');
    });


    var wrapper = bId('table-wrapper');
    bind('scroll', wrapper, loadData);
}, 100 );
/*onload block end*/

function loadData() {
    var obj = this;
    if (obj.scrollTop + obj.offsetHeight >= obj.scrollHeight) {
        /*add data to bottom and delete from top*/
    } else {
        if (obj.scrollTop == 0) {
            /*add data to top and delete from bottom*/
        }
    }

}

/*assign actions to event for all browser*/
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
    /*up*/
    if (e.keyCode == '38') {
        e.preventDefault();
        e.stopPropagation();
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
        e.preventDefault();
        e.stopPropagation();
        var sel_tr = document.getElementsByClassName('selected');
        var next_sibling = sel_tr[0].nextSibling;
        if (next_sibling && next_sibling.nodeName == 'TR') {
            sel_tr[0].setAttribute('class', '');
            next_sibling.setAttribute('class', 'selected');
        } else {
            return false;
        }
    } else {

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


function modal(data, action) {
    if (!action) {
        action = 'close';
    }
    var modal = bId('modal');
    var popup = bId('popup');
    var first_name_field = bId('first_name');
    var surname_field = bId('surname');
    var date_of_birth_field = bId('date_of_birth');
    var salary_field = bId('salary');
    var id_field = bId('id');
    switch(action) {
        case 'show':
            if (data['id']) {
                data['date_of_birth'] = convertDate(data['date_of_birth']);
                data['salary'] = parseInt(data['salary']);
                first_name_field.setAttribute('value', data['first_name']);
                surname_field.setAttribute('value', data['surname']);
                date_of_birth_field.setAttribute('value', data['date_of_birth']);
                salary_field.setAttribute('value', data['salary']);
                id_field.setAttribute('value', data['id']);
            } else {
                first_name_field.setAttribute('value', '');
                surname_field.setAttribute('value', '');
                date_of_birth_field.setAttribute('value', '');
                salary_field.setAttribute('value', '');
            }
            modal.style.display = 'block';
            popup.style.display = 'block';
            return false;
            break;
        case 'submit':
            var use_ajax = bId('use_ajax');
            if (validate()) {
                if (use_ajax.checked) {
                    data = {};
                    data['action'] = 'submit';
                    data['first_name'] = first_name_field.value;
                    data['surname'] = surname_field.value;
                    data['date_of_birth'] = date_of_birth_field.value;
                    data['salary'] = salary_field.value;
                    data['id'] = id_field.value;
                    MakeRequest(data, function(callback) {
                        if (callback.result) {
                            callback.date_of_birth = reverseConvertDate(callback.date_of_birth);
                            if (callback.id) {
                                var selected_row = document.getElementsByClassName('selected');
                                var tds = selected_row[0].childNodes;
                                tds[0].innerHTML = callback.first_name;
                                tds[1].innerHTML = callback.surname;
                                tds[2].innerHTML = callback.date_of_birth;
                                tds[3].innerHTML = callback.salary + " RUB";
                            } else {
                                var table = bId('salaryTable');
                                var tr = document.createElement('TR');
                                table.appendChild(tr);
                                var td1 = document.createElement('TD');
                                td1.innerHTML = callback.first_name;
                                var td2 = document.createElement('TD');
                                td2.innerHTML = callback.surname;
                                var td3 = document.createElement('TD');
                                td3.innerHTML = callback.date_of_birth;
                                var td4 = document.createElement('TD');
                                td4.innerHTML = callback.salary + " RUB";
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                tr.appendChild(td3);
                                tr.appendChild(td4);
                            }
                        } else {
                            alert('Some problems occurred. Please, try again later.');
                        }
                    });
                } else {
                    var form = document.createElement("form");
                    form.setAttribute('method',"post");
                    form.setAttribute('action',"default.php");
                    form.setAttribute('id',"submit_form");

                    var i1 = document.createElement("input");
                    i1.setAttribute('type',"text");
                    i1.setAttribute('name',"action");
                    i1.setAttribute('value',"submit");
                    form.appendChild(i1);

                    var i2 = document.createElement("input");
                    i2.setAttribute('type',"text");
                    i2.setAttribute('name',"first_name");
                    i2.setAttribute('value', first_name_field.value);
                    form.appendChild(i2);

                    var i3 = document.createElement("input");
                    i3.setAttribute('type',"text");
                    i3.setAttribute('name',"surname");
                    i3.setAttribute('value', surname_field.value);
                    form.appendChild(i3);

                    var i4 = document.createElement("input");
                    i4.setAttribute('type',"text");
                    i4.setAttribute('name',"date_of_birth");
                    i4.setAttribute('value', date_of_birth_field.value);
                    form.appendChild(i4);

                    var i5 = document.createElement("input");
                    i5.setAttribute('type',"text");
                    i5.setAttribute('name',"salary");
                    i5.setAttribute('value', salary_field.value);
                    form.appendChild(i5);

                    if (id_field.value) {
                        var i6 = document.createElement("input");
                        i6.setAttribute('type',"text");
                        i6.setAttribute('name',"id");
                        i6.setAttribute('value', id_field.value);
                        form.appendChild(i6);
                    }

                    var submit = document.createElement("input"); //input element, Submit button
                    submit.setAttribute('type',"submit");
                    submit.setAttribute('value',"Submit");

                    form.appendChild(submit);

                    document.getElementsByTagName('body')[0].appendChild(form);

                    form.submit();
                }
            } else {
                alert('Please, check input data!');
                break;
            }
        case 'close':
            modal.style.display = 'none';
            popup.style.display = 'none';
            break;
    }
}

/*
 * @function bId
 * getting element by id
 *
 */
function bId(data) {
    var element = document.getElementById(data);
    return element;
}

/*
 * @function validate
 * validation input data before server send
 *
 */
function validate() {
    var first_name_field = bId('first_name');
    var surname_field = bId('surname');
    var date_of_birth_field = bId('date_of_birth');
    var salary_field = bId('salary');
    if (!first_name_field.value || !surname_field.value || !/^(\d{1,2}).(\d{1,2}).(\d{4})$/.test(date_of_birth_field.value) || !/^\d{1,}$/.test(salary_field.value)) {
        return false;
    } else {
        return true;
    }
}

showEditForm = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    data = {};
    var selected_row = document.getElementsByClassName('selected');
    var tds = selected_row[0].childNodes;
    data['id'] = selected_row[0].getAttribute('number');
    data['first_name'] = tds[0].innerHTML;
    data['surname'] = tds[1].innerHTML;
    data['date_of_birth'] = tds[2].innerHTML;
    data['salary'] = tds[3].innerHTML;
    modal(data,'show');
}

function sort(field) {
    if (field) {
        var use_ajax = bId('use_ajax');
        if (use_ajax.checked) {
            data = {};
            data['action'] = 'sort';
            data['field'] = field;
            MakeRequest(data, function(callback) {
                buildTable(callback);
            });
            getSortInfo();
        } else {
            var form = document.createElement("form");
            form.setAttribute('method',"post");
            form.setAttribute('action',"default.php");
            form.setAttribute('id',"sort_form");

            var i1 = document.createElement("input");
            i1.setAttribute('type',"text");
            i1.setAttribute('name',"action");
            i1.setAttribute('value',"sort");
            form.appendChild(i1);

            var i2 = document.createElement("input");
            i2.setAttribute('type',"text");
            i2.setAttribute('name',"field");
            i2.setAttribute('value', field);
            form.appendChild(i2);

            var submit = document.createElement("input"); //input element, Submit button
            submit.setAttribute('type',"submit");
            submit.setAttribute('value',"Submit");

            form.appendChild(submit);

            document.getElementsByTagName('body')[0].appendChild(form);

            form.submit();
        }
    } else {
        alert('Some problems occurred. Please, try again later.');
    }
}

function buildTable(callback) {
    var table = bId('salaryTable');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (i in callback) {
        var tr = document.createElement('TR');
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        var td4 = document.createElement('TD');
        if (i == 0) {
            tr.setAttribute('class', 'selected');
        }
        tr.setAttribute('ondblclick', 'showEditForm();');
        tr.setAttribute('number', callback[i]['id']);
        td1.innerHTML = callback[i]['first_name'];
        td2.innerHTML = callback[i]['surname'];
        td3.innerHTML = callback[i]['date_of_birth'];
        td4.innerHTML = callback[i]['salary'] + ' RUB';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);
        bind('click', tr, selectOnClick);
    }
}

function getSortInfo() {
    data = {};
    data['action'] = 'show_sort_info';
    MakeRequest(data, function(callback) {
        var ths = document.getElementsByTagName('TH');
        for (i in ths) {
            for (j in ths[i].attributes) {
                if (!ths[i].attributes[j].nodeValue) {
                    continue;
                }
                if (ths[i].attributes[j].nodeValue == callback.field && callback.field && ths[i].attributes[j].nodeType == '2' && ths[i].attributes[j].nodeValue) {
                 ths[i].setAttribute('current', '1');
                 ths[i].setAttribute('class', callback.type);
                    break;
                 } else {
                 ths[i].setAttribute('current', '');
                 ths[i].setAttribute('class', '');
                 }
            }
        }
    });
}

function convertDate(data) {
    convertTable = {};
    convertTable['Jan'] = '01';
    convertTable['Feb'] = '02';
    convertTable['Mar'] = '03';
    convertTable['Apr'] = '04';
    convertTable['May'] = '05';
    convertTable['June'] = '06';
    convertTable['July'] = '07';
    convertTable['Aug'] = '08';
    convertTable['Sept'] = '09';
    convertTable['Oct'] = '10';
    convertTable['Nov'] = '11';
    convertTable['Dec'] = '12';
    parts = data.split(' ');
    result = parts[0] + "." + convertTable[parts[1]] + "." + parts[2];
    return result;
}

function reverseConvertDate(data) {
    convertTable = {};
    convertTable['01'] = 'Jan';
    convertTable['02'] = 'Feb';
    convertTable['03'] = 'Mar';
    convertTable['04'] = 'Apr';
    convertTable['05'] = 'May';
    convertTable['06'] = 'June';
    convertTable['07'] = 'July';
    convertTable['08'] = 'Aug';
    convertTable['09'] = 'Sept';
    convertTable['10'] = 'Oct';
    convertTable['11'] = 'Nov';
    convertTable['12'] = 'Dec';
    parts = data.split('.');
    result = parts[0] + " " + convertTable[parts[1]] + " " + parts[2];
    return result;
}