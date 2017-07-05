/**
 * Created by Polar on 03/07/2017.
 */

$('#configuracion-lista').hide();
$('#id_conf_general_title').click(function () {
    $("#id_conf_general_content").hide()
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
        $(this).parent().siblings( "button" ).find('.choiced').html($(this).html())
        $(this).parent().siblings( "button" ).find('.choiced div').addClass('swipe-color-margin')
    })
})

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


