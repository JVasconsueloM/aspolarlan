/**
 * Created by Polar on 16/06/2017.
 */


// OBSERVERS
var observer_tittle_background = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        $("#paso2-acordion").find(".card-header.mobile-header").css('background', $("#title-mobile-background-cp-value").val());
    });
});

var observer_tittle_font = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        $("#paso2-acordion").find('.card-header.mobile-header').find('.col-xs-8').find('i').css('color', $("#title-mobile-font-cp-value").val());
    });
});
var observer_body_background = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        $("#paso2-acordion").find('#sortable').css('background', $("#body-mobile-background-cp-value").val());
    });
});


// PARA EL CAMBIO DE COLOR

//PARA EL TITULO MOVIL BACKGROUND
$("#title-mobile-background-cp-value").on('keyup paste', function() {
    $("#paso2-acordion").find(".card-header.mobile-header").css('background', $(this).val());
});

var title_mobile_background = document.getElementById('title-mobile-background');
observer_tittle_background.observe(title_mobile_background, { attributes: true, attributeFilter: ['style'] });

//PARA EL TITULO MOVIL FUENTE
$("#title-mobile-font-cp-value").on('keyup paste', function() {
    $("#paso2-acordion").find('.card-header.mobile-header').find('.col-xs-8').find('i').css('color', $(this).val());
});

var title_mobile_font = document.getElementById('title-mobile-font');
observer_tittle_font.observe(title_mobile_font, { attributes: true, attributeFilter: ['style'] });


//PARA EL TITULO MOVIL FUENTE
$("#body-mobile-background-cp-value").on('keyup paste', function() {
    $("#paso2-acordion").find('#sortable').css('background', $(this).val());
});

var body_mobile_background = document.getElementById('body-mobile-background');
observer_body_background.observe(body_mobile_background, { attributes: true, attributeFilter: ['style'] });
