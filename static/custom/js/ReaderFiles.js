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
            // DivContent.html(html);
            html_models = "<div class='table-responsive'>" +
                            "<table class='table table-hover bluegray' style='background-color: #607d8b;'>" +
                                // "<thead>" +
                                //     "<tr>" +
                                //         "<th>#              Modelos</th>" +
                                //     "</tr>" +
                                // "</thead>" +
                                "<tbody>";

           for (i = 1; i < file_content.length; i++){
                var item = file_content[i];
                html_models += "<tr>" +
                                    "<td style='padding: 1px;'>" +
                                            "<div class='checkbox'>" +
                                                "<label>" +
                                                    "<input id='"+i+"' type='checkbox' value='' checked>" +
                                                    "<i class='input-helper'></i>" +
                                                    item.model +
                                                "</label>" +
                                            "</div>" +
                                    "</td>" +
                                "</tr>" ;

               console.log(item)

            }

            html_models +=  "</tbody>" +
                           "</table>" +
                        "</div>";
            $('.modal-body').html(html_models)
            $('#modalColor').modal('show');
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

        }


    };
    reader.readAsText(file);

}

function procesarPaso1(){
    var acordion = "" +
        "<div class='panel-group' data-collapse-color='green' id='accordionRed' role='tablist' aria-multiselectable='true' style='margin-bottom: auto;'>";

    $("input[type=checkbox]:checked").each(function(){
        var checkbox_id = $(this).attr("id");
        var item = file_content[checkbox_id];

        // headers
        // $('.tab-nav li').last().after("<li class='waves-effect' role='presentation'><a href='#" + item.model + "' aria-controls='profile9' role='tab' data-toggle='tab'>" + item.model + "</a></li>");

        var table = "<div class='table-responsive '>" +
                            "<table class='table table-hover bluegray'>" +
                                "<tbody class='simple_with_drop'>";
        for(var i in item.fields){
            var field = item.fields[i];
            var required = 'checked';
            var auto_now_add = false;
            var max_length = '';
            var min_length = '';
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
                else if (kwarg[0]=='max_length'){
                   max_length = kwarg[1];
                }
                else if (kwarg[0]=='min_length'){
                   min_length = kwarg[1];
                }
            }

            if(!auto_now_add){

                table +=
                    "<tr class='icon-move'>" +
                        "<td style='padding: 1px;'>" +
                            "<div class='checkbox'>" +
                                "<label>" +
                                    "<input id='"+i+"' type='checkbox' value='' checked>" +
                                    "<i class='input-helper'></i>" +
                                    field.field + "  ( " + field.type +" )" +
                                "</label>" +
                            "</div>" +
                        "</td>" +
                        "<td style='padding: 1px;'>" +
                            "<div class='checkbox'>" +
                                "<label>" +
                                    "<input id='"+i+"' type='checkbox' value='' "+ required +">" +
                                    "<i class='input-helper'></i> Required" +
                                "</label>" +
                            "</div>" +
                        "</td>" +
                        "<td style='padding: 1px;'>" +
                            "<div class='checkbox'>" +
                                "<label>" +
                                    "<input id='"+i+"' type='checkbox' value=''>" +
                                    "<i class='input-helper'></i> Disabled" +
                                "</label>" +
                            "</div>" +
                        "</td>"


                if(field.type != "ForeignKey" && field.type != "BooleanField" && field.type != "DateTimeField"){
                    table += "<td style='width: 12%'>" +
                                "<input type='text' class='form-control' id='" + field.field +"-regex' value='" + max_length +"' style='width: 20%; display: inline-block;'> Max Length" +
                            "</td>" +
                            "<td style='width: 12%'>" +
                                "<input type='text' class='form-control' id='" + field.field +"-regex' value='" + min_length +"' style='width: 20%; display: inline-block;'> Min Length" +
                            "</td>" +
                            "<td style='width: 30%'>" +
                                "<input type='text' class='form-control' placeholder='Regexp'  id='" + field.field +"-regex' style='width: 80%; display: inline-block;'> Regexp" +
                            "</td>"
                }
                else{
                    table += "<td></td><td></td><td></td>"
                }

                table += "</tr>" ;

            }

        }
        table +=  "</tbody>" +
                   "</table>" +
                "</div>";



        acordion +=
            // "<div class='row'>" +
            // "<div class='col-sm-12'>" +

                    "<div class='panel panel-collapse'>" +
                        "<div class='panel-heading' role='tab'>" +
                            "<h4 class='panel-title'>" +
                                "<a data-toggle='collapse' data-parent='#accordionRed' href='#" + item.model +"' aria-expanded='false'>" +
                                    " " + item.model + " " +
                                "</a>" +
                            "</h4>" +
                        "</div>" +
                        "<div id='" + item.model +"' class='collapse' role='tabpanel'>" +
                            // "<div class='panel-body'>" +
                                table +
                            // "</div>" +
                        "</div>" +
                    "</div>"
            // "</div>" +
        // "</div>"


    });
    acordion += "</div>";
    // bodies
    $("#paso2-acordion").html(acordion);
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