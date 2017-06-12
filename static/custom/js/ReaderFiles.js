/**
 * Created by Polar on 12/03/2017.
 */

// main Object
var file_content = [];

// Este JavaScript depende de JQuery
var regex_class = /^Class(\s|\s\s+)(\w+)(\s|\s\s+|)\(models.Model\):$/gi;
var regex_fields = /^(\s|\s\s+|)(\w+)(\s|\s\s+|)=(\s|\s\s+|)models.(\w+)\(.*(.*)\)$/gi;
var regex_carrete = /(\r\n|\n|\r)/gm;
var regex_empty = /^\s*$/;
var regex_uncomplete_field = /^(\s|\s\s+|)(\w+)(\s|\s\s+|)=(\s|\s\s+|)models..*(.*)$/gi;
var regex_close_field = /\)/;
var regex_comentarios = /(\s*\#\s*)(.*)/gi;


// table strings




function readBlob(id_input, id_content, id_error ) {
    var FileInput = $('#' + id_input);
    var DivContent = $('#' + id_content);
    var DivError = $('#' + id_error);

    if(isNotValid(FileInput)) {
        displayError(DivError, 'Ingrese un FileInput valido');
        return;
    }

    var files = FileInput[0].files;

    if (!files.length) {
        displayError(DivError, 'Porfavor, seleccione un archivo!');
        return;
    }

    var file = files[0]; // obtenemos el primer archivo
    var reader = new FileReader();

    // sobre escribimos los eventos de FileReader (se necesita verificar el readyState.  en onloadend)
    reader.onloadend = function(evt) {
        if (this.readyState == FileReader.DONE) { // DONE == 2
            var t0 = performance.now();

            // var rows = reader.result.replace(regex_comentarios, '');
            // var rows = reader.result.split(regex_carrete);
            var rows = reader.result.split(regex_carrete);
            var model_exist = false; // la tabla o modelo en Django
            var textCache = ""; //sea usara para juntar lineas de codigo que seran evaluadas

            for (i = 0; i < rows.length; i++){
                var row = rows[i];

                if(row.match(regex_empty)){ continue;} // si es vacio no se agrega
                if(!!textCache){ row = textCache + row;} // si el field no esta completo agrega la siguiente linea
                if (model_exist){

                    if(row.match(regex_fields))
                    {
                        models.fields.push(
                            {
                                field: /^(\s|\s\s+|)(\w+)(\s|\s\s+|)/gi.exec(row)[0].trim(),
                                type: /models.(\w+)/gi.exec(row)[1].trim(),
                                kwargs: row.match(/\(.*(.*)\)$/gi)[0].replace(')', '').replace('(', '').replace(' ', '').split(',')
                            }
                        )
                    }
                    else if (row.match(regex_uncomplete_field) && !row.match(regex_close_field))
                    {
                        textCache += row.trim();
                    }
                    else
                    {
                        textCache = "";
                        model_exist = false
                    }
                }

                if(row.match(regex_class)){
                    file_content.push(models); // contiene todos los modelos
                    var models = Object();
                    models.model = row.match(/(\w+)/gi)[1];
                    models.fields = [];
                    model_exist = true

                }
            }
            var t1 = performance.now();
            var accordionModels = new AccordionModels(file_content);
            accordionModels.proccessModels();
            $('.modal-body').html(accordionModels.html);
            $('#modalColor').modal('show');
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

        }


    };
    reader.readAsText(file);

}

function procesarPaso1(){
    $("h4 input[type=checkbox]:checked").each(function(){
        var checkbox_id = $(this).attr("attr-position");
        var model = file_content[checkbox_id];
        $($("input.model-" + model.model + ":not(:checked)").get().reverse()).each(function () {
            console.log($(this).attr('id'))
            model.fields.splice($(this).attr('id'), 1);
        })
    });


    $($("h4 input[type=checkbox]:not(:checked)").get().reverse()).each(function(){
        file_content.splice($(this).attr('attr-position'), 1);
    });

    // $("#paso2-acordion").html(acordion);
    $('a[href=#paso2]').click();
    $('#modalColor').modal('hide');

}

function continuarPaso2(){
    $('a[href=#paso3]').click();
}

// evalua si un HTML Element, una lista o un string no es valido
function isNotValid(val){ return !val.length }
function displayError(HTMLElement, msg){
    if(isNotValid(HTMLElement)){ alert('El Error no Pudo ser Displayado'); return ;}
    HTMLElement.text(msg);
    HTMLElement.removeClass('hide');

}


function AccordionModels (content){
    this.items = content ;
    this.html = "";
    this.contenido = "";


    this.getHtml = function () {
        this.html +=  "" +
            "<div class='panel-group' data-collapse-color='green' id='accordionRed' role='tablist' aria-multiselectable='true' style='margin-bottom: auto;'>" +
                this.contenido +
            "</div>";

    };

    this.getModel = function(name_model, fields, position){ // model = name_model, fields = html_fields, contenidoHtml = global_html_main
        var id = "model-" + name_model ;
        this.contenido += "" +
            "<div class='panel panel-collapse' style=' background: aliceblue;'>" +
                "<div class='panel-heading' role='tab'>" +
                    "<h4 class='panel-title'>" +

                            "<div class='checkbox' style='width: 5%; display: inline-block; padding: 5px 12px 0; margin: auto; top: 5px;'>" +
                                "<label>" +
                                    "<input id='" + id + "' attr-position='" + position + "'type='checkbox' value=''>" +
                                    "<i class='input-helper'></i>" +
                                "</label>" +
                            "</div>" +
                        "<a data-toggle='collapse' data-parent='#accordionRed' href='#" + name_model + "' aria-expanded='false' style='padding: 1px 12px 12px; display: inline-block;  width: 94%;'>" +
                            " " + name_model + " " +
                        "</a>" +
                    "</h4>" +
                "</div>" +
                "<div id='" + name_model +"' class='collapse' role='tabpanel'>" +
                    "<div class='table-responsive'>" +
                        "<table class='table table-hover bluegray'>" +
                            "<tbody class='simple_with_drop'>" +
                                fields +
                            "</tbody>" +
                        "</table>" +
                    "</div>" +
                "</div>" +
            "</div>";
    };

    this.getFields = function (fields, id) {
        var fieldsHtml = "";
        for(var i in fields){
            var field = fields[i];
            var required = 'checked';
            var auto_now_add = false;
            for(var key in field.kwargs){
                var kwarg = field.kwargs[key];
                kwarg = kwarg.trim();
                kwarg = kwarg.split('=');
                if (kwarg[0]=='null'){
                   required = kwarg[1]=='True'? '': 'checked';
                }
                else if (kwarg[0]=='auto_now_add'){
                   auto_now_add = kwarg[1]=='True';
                }
            }

            if(!auto_now_add){
                fieldsHtml +=
                    "<tr class='icon-move' style='background: #607d8b'>" +
                        "<td style='padding: 1px;'>" +
                            "<div class='checkbox' style='padding: 0 10px;'>" +
                                "<label>" +
                                    "<input id='"+i+"' type='checkbox' value='' checked class=' " + id + "'>" +
                                    "<i class='input-helper'></i>" +
                                    field.field + "  ( " + field.type +" )" +
                                "</label>" +
                            "</div>" +
                        "</td>" +
                        "<td style='padding: 1px;'>" +
                            "<div class='checkbox'>" +
                                "<label>" +
                                    "<input id='"+i+"' type='checkbox' value='' "+ required +" disabled>" +
                                    "<i class='input-helper'></i> Required" +
                                "</label>" +
                            "</div>" +
                        "</td>" +
                        "<td></td>" +
                        "<td></td>" +
                    "</tr>" ;

            }

        }
        return fieldsHtml;
    };


    this.proccessModels = function () {
        for (i = 1; i < this.items.length; i++){
            var item = this.items[i];
            var id = "model-" + item.model;
            var fields = this.getFields(item.fields, id);
            this.getModel(item.model, fields, i)
        }
        this.getHtml();
    }
}
