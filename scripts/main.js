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

/*
 * @function addRow
 * add new row
 *
 */
function addRow() {

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
            break;
        case 'submit':
            var use_ajax = document.getElementById('use_ajax');
            if (validate()) {
                if (use_ajax) {
                    data['action'] = 'submit';
                    MakeRequest(data, function(callback) {
                        if (callback.result) {
                            if (callback.id) {
                                var selected_row = document.getElementsByClassName('selected');
                                var tds = selected_row.childNodes();
                                tds[0].innerHTML = callback.first_name;
                                tds[1].innerHTML = callback.surname;
                                tds[2].innerHTML = callback.date_of_birth;
                                tds[3].innerHTML = callback.salary;
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
                                td4.innerHTML = callback.salary;
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
                    i2.setAttribute('value',data['first_name']);
                    form.appendChild(i2);

                    var i3 = document.createElement("input");
                    i2.setAttribute('type',"text");
                    i2.setAttribute('name',"surname");
                    i2.setAttribute('value',data['surname']);
                    form.appendChild(i3);

                    var i4 = document.createElement("input");
                    i2.setAttribute('type',"text");
                    i2.setAttribute('name',"date_of_birth");
                    i2.setAttribute('value',data['date_of_birth']);
                    form.appendChild(i4);

                    var i5 = document.createElement("input");
                    i2.setAttribute('type',"text");
                    i2.setAttribute('name',"salary");
                    i2.setAttribute('value',data['salary']);
                    form.appendChild(i5);

                    if (data['id']) {
                        var i6 = document.createElement("input");
                        i6.setAttribute('type',"text");
                        i6.setAttribute('name',"id");
                        i6.setAttribute('value',data['id']);
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
            }
        case 'close':
            modal.style.display = 'none';
            popup.style.display = 'none';
            break;
    }
    if (data['id']) {
        var first_name_field = bId('first_name');
        first_name_field.setAttribute('value', data['first_name']);
        var surname = bId('first_name');
        surname.setAttribute('value', data['surname']);
        var date_of_birth = bId('first_name');
        date_of_birth.setAttribute('value', data['date_of_birth']);
        var salary = bId('first_name');
        salary.setAttribute('value', data['salary']);
        var id = bId('id');
        id.setAttribute('value', data['id']);
    } else {

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

    return;
}

showEditForm = function(e) {
    e.preventDefault();
    e.stopPropagation();
    data = {};
    var selected_row = document.getElementsByClassName('selected');
    var tds = selected_row[0].childNodes;
    data.id = selected_row[0].getAttribute('number');
    data.first_name = tds[0].innerHTML;
    data.surname = tds[1].innerHTML;
    data.date_of_birth = tds[2].innerHTML;
    data.salary = tds[3].innerHTML;
    modal(data,'show');

}

