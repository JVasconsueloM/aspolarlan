/**
 * Created by Polar on 03/07/2017.
 */

$('#delete-element').click(function () {
    $('#' + id_component_selected).remove();
    delete ionic3.components[id_component_selected];
    $('.conf').hide();
});

$('.tree').treegrid();
$('.cancelar').click(function() {
    window.location.reload();
});
$('#procesar').click(function() {
    procesarPaso1();
});
$('#ContinuarPaso2').click(function() {
    continuarPaso2();
});

// BUTTON ADD PARA INLINE DE SWIPE
$('.add').click(function(){
    $('.inline-swipe .inline').removeClass('inline');
    $('.inline-swipe').append($('.inline').clone());
    $('.dropdown-menu li').click(function(){
        $(this).parent().siblings( "button" ).find('.choiced').html($(this).html());
        $(this).parent().siblings( "button" ).find('.choiced div').addClass('swipe-color-margin')
    })
});

$('.ic-selected').on('click', function(){
    $('.ic-selected').removeClass('target');
    $(this).addClass('target');
});

$('#file').change(function(){
    readBlob('file', 'file-content', 'msg-error');
});


$('.options-toggle-box').click(function(){
    parent = $(this).parent().parent();
    parent.find('.options-toggle-box').removeClass('options-toggle-box-selected');
    $(this).addClass('options-toggle-box-selected');
});

id_page = 1;
id_folder = 9999;
$('.template-page').click(function () {
    if(id_page_selected){
        ionic3.pages[id_page_selected].html_header = $('.mobile-header').html();
        ionic3.pages[id_page_selected].html_body = $('#sortable').html();
    }else{
        ionic3.base_html_header = $('.mobile-header').html();
        ionic3.base_html_body = $('#sortable').html();

    }
    $('.mobile-header').html(ionic3.base_html_header);
    $('#sortable').html(ionic3.base_html_header);


    $('.tree tr').removeClass('tr-selected');
    tree = $('.tree');
    type = $(this).attr('id');
    if(!$('.tree .folder').length){
        tree.append(getFolderHtml( id_folder, "Pages"));
        id_folder++;
    }
    if( type == '_blank'){
        tree.append(getPageHtml(id_page, "page" + id_page, 9999));

    }
    if( type == '_login'){
        tree.append(getPageHtml(id_page, "Login" + id_page, 9999));

    }
    if( type == '_signup'){
        tree.append(getPageHtml(id_page, "Signup" + id_page, 9999));

    }
    ionic3.create_page(id_page);
    id_page_selected = id_page;
    id_page++;
    tree.treegrid();
    $('.tree tr:not(.folder)').click(function () {
        $('.tree tr').removeClass('tr-selected');
        $(this).addClass('tr-selected');
    })
    var s = "<option></option>";
    for(var name in ionic3.pages) {
        var url = ionic3.pages[name].url;
        s += "<option value=" + url + ">" + url + "</option>"
    }
    $('.urls').html(s);
    $('.urls').trigger("chosen:updated");


    $('.page').click(function () {
        var before_page = id_page_selected;
        id_page_selected = $(this).attr('id');
        console.log($(this).attr('id'))

        ionic3.pages[before_page].html_header = $('.mobile-header').html();
        ionic3.pages[before_page].html_body = $('#sortable').html();
        $('.mobile-header').html(ionic3.pages[id_page_selected].html_header);
        $('#sortable').html(ionic3.pages[id_page_selected].html_body);
        inicializar();
        initialize_conections_configurations();
    });

        inicializar();
        initialize_conections_configurations();

});

$('#configuracion-heading .form-control:not(.cp-value)').keyup(function () {
    var target_id = $(this).attr('data-target-id');
    component = ionic3.components[id_component_selected];
    component.text = $(this).val();
    $('#' + target_id).text($(this).val());
});

$('#configuracion-heading select.size').change(function () {
    var value = $(this).val();
    var target_id = $(this).attr('data-target-id');
    if(value){
        component = ionic3.components[id_component_selected];
        $('#' + target_id).each(function (o, elt) {
            var newElt = $("<"+ value +"/>");
            Array.prototype.slice.call(elt.attributes).forEach(function(a) {
                newElt.attr(a.name, a.value);
            });
            $(elt).wrapInner(newElt).children(0).unwrap();
        });
        component.size = $(this).val();
        initialize_conections_configurations();
    }

});
$('#configuracion-heading select.weight').change(function () {
    var value = $(this).val();
    var target_id = $(this).attr('data-target-id');
    if(value){
        component = ionic3.components[id_component_selected];
        $('#' + target_id).css({'font-weight': value});
        component.weight = $(this).val();
    }

});
$('.options-cursiva .options-toggle-box').click(function () {
    component = ionic3.components[id_component_selected];
    if($(this).hasClass('right')){
        component.cursiva = 'italic';
        $('#' + id_component_selected).css({'font-style': 'italic'});
    }
    else{
        component.cursiva = 'normal';
        $('#' + id_component_selected).css({'font-style': ''});
    }

});

$('.options-align .options-toggle-box').click(function () {
    var align = $(this).attr('data-align');
    $('#' + id_component_selected).css('text-align', align);
    component = ionic3.components[id_component_selected];
    component.align = align;

});
$('#configuracion-style input').keyup(function () {
    // $('#' + id_component_selected).attr('text-align', align);
    component = ionic3.components[id_component_selected];
    component.class = $(this).val();
});

$('.size input').keyup(function () {
    var value =  $(this).val();
    component = ionic3.components[id_component_selected];
    component.size = value;
    $('#' + id_component_selected).css('font-size', value + 'px');
});

$('.urls').change(function () {
    component = ionic3.components[id_component_selected];
    component.url = $(this).val();
});
$('#configuracion-button .text input').keyup(function () {
    component = ionic3.components[id_component_selected];
    component.text = $(this).val();
    $('#' + id_component_selected).text($(this).val());

});


$('select.weight').change(function () {
    var value = $(this).val();
    component = ionic3.components[id_component_selected];
    $('#' + id_component_selected).css({'font-weight': value});
    component.weight = $(this).val();

});

$('select.width').change(function () {
    var value = $(this).val();
    var target = $('#' + id_component_selected);
    component = ionic3.components[id_component_selected];
    target.removeClass('btn-inline');
    target.removeClass('btn-full-width');
    target.removeClass('btn-full-block');
    target.addClass(value);
    component.width = $(this).val();

});

$('select.type').change(function () {
    var value = $(this).val();
    var target = $('#' + id_component_selected);
    component = ionic3.components[id_component_selected];
    target.removeClass('btn-default');
    target.removeClass('btn-clear');
    target.removeClass('btn-outline');
    target.addClass(value);
    component.btn_type = $(this).val();

});
$('select.label_style').change(function () {
    var value = $(this).val();
    var target = $('#' + id_component_selected);
    component = ionic3.components[id_component_selected];
    target.removeClass('input-floating');
    target.removeClass('input-normal');
    target.addClass(value);
    component.label_style = $(this).val();

})
$('select.input_type').change(function () {
    var value = $(this).val();
    component = ionic3.components[id_component_selected];
    component.input_type = $(this).val();

});


$('#configuracion-container input').keyup(function () {
    var value = $(this).val();
    if(value){
        component = ionic3.components[id_component_selected];
        $('#' + id_component_selected).each(function (o, elt) {
            var newElt = $("<"+ value +"/>");
            Array.prototype.slice.call(elt.attributes).forEach(function(a) {
                newElt.attr(a.name, a.value);
            });
            $(elt).wrapInner(newElt).children(0).unwrap();
        });
        component.tag = $(this).val();
        initialize_conections_configurations();
    }

});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        component = ionic3.components[id_component_selected];

        reader.onload = function (e) {
            $('#' + id_component_selected).html('<img width="100%" height="200"  src="' + e.target.result + '" >' )
            component.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
        else{
            $('#' + id_component_selected).html('');
        }
}

$("#configuracion-image input[type=file]").change(function(){
    readURL(this);
});

$('.width input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).css({"width": value + "px"});
    component = ionic3.components[id_component_selected];
    component.width = $(this).val();
});

$('.height input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).css({"height": value + "px"});
    component = ionic3.components[id_component_selected];
    component.height = $(this).val();
});



$('#configuracion-checkbox .tittle input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('label').text(value);
    component = ionic3.components[id_component_selected];
    component.text = $(this).val();
});

$('.name input').keyup(function () {
    var value = $(this).val();
    component = ionic3.components[id_component_selected];
    component.name = value;
});


$('#configuracion-input .tittle input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('span').text(value);
    component = ionic3.components[id_component_selected];
    component.text = value;
});


$('.placeholder input').keyup(function () {
    var value = $(this).val();
    var type = $('#' + id_component_selected).attr('data-type');
    if(type!='textarea'){
        $('#' + id_component_selected).find('span').text(value);
    }
    component = ionic3.components[id_component_selected];
    component.placeholder = value;
});


$('#configuracion-textarea .value input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('div').text(value);
    component = ionic3.components[id_component_selected];
    component.value = value;
});
$('#configuracion-textarea .tittle input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('span').text(value);
    component = ionic3.components[id_component_selected];
    component.tittle = value;
});

$('#configuracion-radio .tittle input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('span').text(value);
    component = ionic3.components[id_component_selected];
    component.text = value;
});

$('#configuracion-radio .radio-group input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('span').text(value);
    component = ionic3.components[id_component_selected];
    component.radio_group = value;
});

$('#configuracion-toggle .tittle input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).find('label.text-left').text(value);
    component = ionic3.components[id_component_selected];
    component.tittle = value;
});
$('.content input').keyup(function () {
    var value = $(this).val();
    $('#' + id_component_selected).text(value);
    component = ionic3.components[id_component_selected];
    component.text = value;

});


function initialize_conections_configurations() {

    $('.ic-selected').on('click', function () {
        $('.ic-selected').removeClass('target');
        $(this).addClass('target');
    });

    draggable_items = document.querySelectorAll('[data-draggable="item"]');
    for (var items = draggable_items, len = items.length, i = 0; i < len; i++) {
        items[i].setAttribute('draggable', 'true');
    }

    $('[data-type]').click(function () {
        $('.conf').hide();
        type = $(this).attr('data-type');
        $('#configuracion-' + type).show();
        id_component_selected = $(this).attr('id');

        component = ionic3.components[id_component_selected];
        if (type == "heading") {
            $('#configuracion-heading .options-cursiva .options-toggle-box').removeClass('options-toggle-box-selected');
            $('.options-align .options-toggle-box').removeClass('options-toggle-box-selected');
            var chose = component.cursiva == 'italic'? '.right' : '.left';

            $('#configuracion-heading .form-control:not(.cp-value)').val(component.text);
            $('#configuracion-heading select.size').val(component.size);
            $('#configuracion-heading .options-cursiva .options-toggle-box' + chose).addClass('options-toggle-box-selected');
            $('#configuracion-heading select.size').trigger("chosen:updated");
            $('#configuracion-heading select.weight').val(component.weight).trigger("chosen:updated");
            $('#heading-color-cp-value').val(component.color);
            $('#heading-color').css({'background-color': component.color});
            $('.options-align .options-toggle-box[data-align=' + component.align + ']').addClass('options-toggle-box-selected');
            $('#configuracion-style input').val(component.class);


            $('#configuracion-heading .options-cursiva .options-toggle-box').attr('data-target-id', id_component_selected);
            $('#configuracion-heading .form-control:not(.cp-value)').attr('data-target-id', id_component_selected);
            $('#configuracion-heading select.size').attr('data-target-id', id_component_selected);
            $('#configuracion-heading select.weight').attr('data-target-id', id_component_selected);
            $('#heading-color-cp-value').attr('data-target-id', id_component_selected);
            $('#heading-color').attr('data-target-id', id_component_selected);

        }
        else if (type == "paragraph") {
            component = ionic3.components[id_component_selected];
            $('#configuracion-paragraph .size input').val(component.size);

            $('#paragraph-color-cp-value').val(component.color);
            $('#paragraph-color').css({'background-color': component.color});

        }
        else if (type == "button") {
            $('#configuracion-button .options-cursiva .options-toggle-box').removeClass('options-toggle-box-selected');
            $('.options-align .options-toggle-box').removeClass('options-toggle-box-selected');
            var choose = component.cursiva == 'italic'? '.right' : '.left';

            $('#configuracion-button select.urls').val(component.url).trigger("chosen:updated");
            $('#configuracion-button .text input').text(component.text);
            $('#configuracion-button .size input').val(component.size);
            $('#configuracion-button select.weight').val(component.weight).trigger("chosen:updated");
            $('#configuracion-button select.width').val(component.width).trigger("chosen:updated");
            $('#configuracion-button select.type').val(component.btn_type).trigger("chosen:updated");
            $('.options-align .options-toggle-box[data-align=' + component.align + ']').addClass('options-toggle-box-selected');
            $('.options-cursiva .options-toggle-box' + choose).addClass('options-toggle-box-selected');

        }
        else if (type == "card") {
            
        }
        else if (type == "container") {
            
        }
        else if (type == "image") {
            $('#configuracion-image .width input').val(component.width);
            $('#configuracion-image .height input').val(component.height);

        }
        else if (type == "spacer") {
            $('#configuracion-spacer .height input').val(component.height);
            $('[data-type=spacer]').height(function () {
                $('#configuracion-spacer .height input').val($(this).css('height'));
            });

        }
        else if (type == "checkbox") {
            $('#configuracion-checkbox .tittle input').val(component.text);
            $('#configuracion-checkbox .name input').val(component.name);

        }
        else if (type == "form") {
            
        }
        else if (type == "input") {
            $('#configuracion-input .tittle input').val(component.text);
            $('#configuracion-input .placeholder input').val(component.placeholder);
            $('#configuracion-input .name input').val(component.name);
            $('#configuracion-input select.input_type').val(component.input_type).trigger("chosen:updated");
            $('#configuracion-input select.label_style').val(component.label_style).trigger("chosen:updated");

        }
        else if (type == "radio") {
            $('#configuracion-radio .radio-group input').val(component.radio_group);
            $('#configuracion-radio .tittle input').val(component.text)

        }
        else if (type == "search") {
            $('#configuracion-search .placeholder input').val(component.placeholder);
            $('#configuracion-search .name input').val(component.name);
            
        }
        else if (type == "select") {
            
        }
        else if (type == "textarea") {
            $('#configuracion-textarea .placeholder input').val(component.placeholder);
            $('#configuracion-textarea .name input').val(component.name);
            $('#configuracion-textarea .title input').val(component.title);
            $('#configuracion-textarea .value input').val(component.value);
        }
        else if (type == "toggle") {
            
        }
        else if (type == "list_divider") {
            
        }
        else if (type == "container_list_item") {
            
        }
        else if (type == "thumbnail_list_item") {
            
        }
        else if (type == "icon_list_item") {
            
        }
        else if (type == "avatar_list_item") {
            
        }
    });
}
$('.conf').hide();
initialize_conections_configurations();