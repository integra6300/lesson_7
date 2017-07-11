var $ = require('jquery');
import _ from 'lodash'
import './style.css'

"use strict";

const baseUrl = 'http://jsonplaceholder.typicode.com/posts';

const form = document.forms.inputForm;

const presntRow = (row)=>{
    const tr = $(`<tr id="tr_${row.id}"></tr>`)
    const columns = ['id', 'title', 'body','userId'].map((field)=>$(`<td><pre>${row[field]}</pre></td>`))
    const manipulationUrl = `${baseUrl}/${row.id}`
    
    const deleteButton = $('<input type="button" value="Delete"/>')
   
    deleteButton.on('click', (e)=>{
        e.preventDefault();
        $.ajax(manipulationUrl, {
            type: 'DELETE'
        });
        $(`#tr_${row.id}`).remove();
    })

    const updateButton =  $('<input type="button" value="Update"/>')
    updateButton.on('click',(e)=>{
        var input, input1;
        input = prompt("Заголовок", row.title);
        input1 = prompt("Сообщение", row.body);
        var data2;
        if (input === null && input1 === null) {
            return;
        } else if (input === null && !(input1 === null)) {
            data2 = {id: row.id, body: input1, userId: row.userId};
        } else if (input1 === null && !(input === null)) {
            data2 = {id: row.id, title: input, userId: row.userId};
        } else {
            data2 = {id: row.id, title: input, body: input1, userId: row.userId};
        }

        $.ajax(manipulationUrl, {
            type: 'PUT',
            data: data2
        }).then(function(data) {
            $('#tr_' + data.id).find("td").eq(1).html(data.title);
            $('#tr_' + data.id).find("td").eq(2).html(data.body);
        });
    })

    _.each(columns, (c)=> tr.append(c))
    const buttonsTd = $('<td></td>');
    buttonsTd.append(deleteButton)
    buttonsTd.append(updateButton)
    tr.append(buttonsTd)
    return tr 
}


form.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	formData.append("userId", 1);

	const formDataJSON = {};
	for(const [key, val] of formData.entries()) {
		formDataJSON[key] = val;
	}
    
    $.ajax(baseUrl, {
        type: 'POST',
        data: formDataJSON
    }).then(function(data) {
        $('#microPosts').append(presntRow(data))
    });

});


function getData() {
    $.ajax(baseUrl, {
        method: 'GET'
    }).then(function(data) {
        _.each(data, (item)=>$('#microPosts').append(presntRow(item)))
    });  
}


getData();
