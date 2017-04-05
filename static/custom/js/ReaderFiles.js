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

            var rows = reader.result.replace(regex_carrete, "|").split("|");
            var model_exist = false;
            var cache = "";
            var model = Object();

            for (i = 0; i < rows.length; i++){
                var row = rows[i];

                if(row.match(regex_empty)){ continue;} // si es vacio no se agrega
                if(!!cache){ row = cache + row;} // si el field no esta completo agrega la siguiente linea

                if (model_exist){
                    if(row.match(regex_fields)){
                        model.fields.push({
                              field: /^(\s|\s\s+|)(\w+)(\s|\s\s+|)/gi.exec(row)[0],
                              type: /models.(\w+)/gi.exec(row)[1],
                              kwargs: row.match(/\(.*(.*)\)$/gi)[0].split(',')
                            })
                    }
                    else if (row.match(regex_uncomplete_field) && !row.match(regex_close_field)){
                        cache += row.trim();
                    }
                    else{
                        cache = "";
                        model_exist = false
                    }
                }

                if(row.match(regex_class)){
                    file_content.push(model);
                    model.model = row.match(/(\w+)/gi)[1];
                    model.fields = [];
                    model_exist = true
                }
            }
            var t1 = performance.now();
            // DivContent.html(html);
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

            init();
        }


    };
    reader.readAsText(file);

}


function init(){
    $("th input[type=checkbox]").change(function(){
        var checkbox_id = $(this).attr("id");

        if($(this).is(':checked')){
            $("." + checkbox_id + " input[type=checkbox]").prop('checked', true)
        }else{
            $("." + checkbox_id + " input[type=checkbox]").prop('checked', false)
        }
    })
}

// evalua si un HTML Element, una lista o un string no es valido
function isNotValid(val){ return !val.length }
function displayError(HTMLElement, msg){
    if(isNotValid(HTMLElement)){ alert('El Error no Pudo ser Displayado'); return ;}
    HTMLElement.text(msg);
    HTMLElement.removeClass('hide');

}