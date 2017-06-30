/**
 * Created by Polar on 29/06/2017.
 */

function inicializar(){
// JQUERY PARA SIMULAR SELECT CON DROPDOWN
    $('.dropdown-menu li').click(function(){
        button = $(this).parent().siblings( "button" );
        button.find('.choiced').html($(this).html());
        button.find('.choiced div').addClass('swipe-color-margin');

        icon = $(this).find('i').attr('class');
        target = $('#' +  button.attr('attr-id_target'));
        target_parent = target.parent();

        if(icon){
            target_parent.removeAttr('class');
            // target_parent.attr('class', 'col-xs-3');
            target.removeAttr('class');
            target.attr('class', icon + ' c-white');
        }
        else{
            target.removeAttr('class');
            target_parent.removeAttr('class');
            // target_parent.attr('class', 'inline-block col-xs-4');
        }
    });

    $('#configuracion-general .fg-line input:not(.cp-value)').keyup(function () {
        target = $('#' + $(this).attr('attr-id_target'));
        target_parent = target.parent();

        text = $(this).val();
        target.siblings( "span" ).text(text);
        target_parent.attr('class', 'inline-block');

    });



    $('#configuracion-image input').keyup(function () {
        id_target = $(this).attr('attr-id_target');
        style = $(this).attr('attr-style');
        value = $(this).val();
        $('#'+ id_target).css(style, value);
    });

    $('.image-mobile').click(function () {
        $("#configuracion-image input[attr-style='height']").val($(this).css('height'));
        $("#configuracion-image input[attr-style='height']").attr('attr-id_target', $(this).attr('id'));
        $("#configuracion-image input[attr-style='width']").val($(this).css('width'));
        $("#configuracion-image input[attr-style='width']").attr('attr-id_target', $(this).attr('id'));
    })
};