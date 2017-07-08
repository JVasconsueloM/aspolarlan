/**
 * Created by Polar on 16/06/2017.
 */


// OBSERVERS

//PARA EL TITULO MOVIL BACKGROUND
$("#title-mobile-background-cp-value").on('keyup paste', function() {
    var value = $(this).val();
    $("#paso2-acordion").find(".card-header.mobile-header").css('background', value);
        if(ionic3.pages[id_page_selected]){
            ionic3.pages[id_page_selected].header.background = value;
        }

});

var observer_tittle_background = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        var value = $("#title-mobile-background-cp-value").val();
        $("#paso2-acordion").find(".card-header.mobile-header").css('background', value);
        if(ionic3.pages[id_page_selected]){
            ionic3.pages[id_page_selected].header.background = value;
        }

    });
});

var title_mobile_background = document.getElementById('title-mobile-background');
observer_tittle_background.observe(title_mobile_background, { attributes: true, attributeFilter: ['style'] });


//PARA EL TITULO MOVIL FUENTE
$("#title-mobile-font-cp-value").on('keyup paste', function() {
    var value = $(this).val();
    $("#paso2-acordion").find('.card-header.mobile-header').find('.col-xs-8').find('i').css('color', value);
    if(ionic3.pages[id_page_selected]){
        ionic3.pages[id_page_selected].header.color = value;
    }
});
var observer_tittle_font = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        var value = $("#title-mobile-font-cp-value").val();
        $("#paso2-acordion").find('.card-header.mobile-header').find('i').css('color', value);
        if(ionic3.pages[id_page_selected]){
            ionic3.pages[id_page_selected].header.color = value;
        }

    });
});
var title_mobile_font = document.getElementById('title-mobile-font');
observer_tittle_font.observe(title_mobile_font, { attributes: true, attributeFilter: ['style'] });



//PARA EL TITULO MOVIL FUENTE
$("#body-mobile-background-cp-value").on('keyup paste', function() {
    var value = $(this).val();
    $("#paso2-acordion").find('#sortable').css('background', value);
        if(ionic3.pages[id_page_selected]){
            ionic3.pages[id_page_selected].body.background = value;
        }
});

var observer_body_background = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        var value = $("#body-mobile-background-cp-value").val();
        $("#paso2-acordion").find('#sortable').css('background', value);
        if(ionic3.pages[id_page_selected]){
            ionic3.pages[id_page_selected].body.background = value;
        }

    });
});
var body_mobile_background = document.getElementById('body-mobile-background');
observer_body_background.observe(body_mobile_background, { attributes: true, attributeFilter: ['style'] });



//PARA EL TITULO MOVIL FUENTE
$("#heading-color-cp-value").on('keyup paste', function() {
    var value = $(this).val();
    var target_id = $(this).attr('data-target-id');
    $("#" + target_id).css('color', value);
    if(ionic3.components[id_component_selected]){
        ionic3.components[id_component_selected].color = value;
    }
});

var observer_heading_color = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        var color = $("#heading-color-cp-value");
        var value = color.val();
        var target_id = color.attr('data-target-id');

        $('#' + target_id).css('color', value);
        if(ionic3.components[id_component_selected]){
            ionic3.components[id_component_selected].color = value;
        }

    });
});
var heading_color = document.getElementById('heading-color');
observer_heading_color.observe(heading_color, { attributes: true, attributeFilter: ['style'] });


//PARA EL TITULO MOVIL FUENTE
$("#paragraph-color-cp-value").on('keyup paste', function() {
    var value = $(this).val();
    $("#" + id_component_selected).css('color', value);
    if(ionic3.components[id_component_selected]){
        ionic3.components[id_component_selected].color = value;
    }
});

var observer_paragraph_color = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        var color = $("#paragraph-color-cp-value");
        var value = color.val();
        $('#' + id_component_selected).css('color', value);
        if(ionic3.components[id_component_selected]){
            ionic3.components[id_component_selected].color = value;
        }

    });
});
var paragraph_color = document.getElementById('paragraph-color');
observer_paragraph_color.observe(paragraph_color, { attributes: true, attributeFilter: ['style'] });
