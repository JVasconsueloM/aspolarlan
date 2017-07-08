/**
 * Created by Polar on 29/06/2017.
 */

function inicializar(){
// JQUERY PARA SIMULAR SELECT CON DROPDOWN
    $('.dropdown-menu li').click(function(){
        var button = $(this).parent().siblings( "button" );
        var target_id = button.attr('data-target-id');
        var target = $('#' + target_id );
        var target_parent = target.parent();
        var icon = $(this).find('i').attr('class');

        button.find('.choiced').html($(this).html());
        button.find('.choiced div').addClass('swipe-color-margin');

        if(icon){
            target_parent.removeAttr('class');
            target.removeAttr('class');
            target.attr('class', icon + ' c-white');
        }
        else{
            target.removeAttr('class');
            target_parent.removeAttr('class');
        }

        if(target_id == 'left_icon' || target_id == 'right_icon'){
            ionic3.pages[id_page_selected].header[target_id] = icon
        }
        else{
            if(id_component_selected){
                if(ionic3.components[id_component_selected].type == 'toggle'){
                    $('#' + id_component_selected).find('label.ts-helper').css({'background': icon })
                }
                else{
                    $('#' + id_component_selected).attr('style', 'background: '+ icon +' !important');


                }
                ionic3.components[id_component_selected].theme = icon;

            }
        }

    });

    $('#configuracion-general .fg-line input:not(.cp-value)').keyup(function () {
        var target_id = $(this).attr('data-target-id');
        var target = $('#' + target_id);
        var target_parent = target.parent();
        var text = $(this).val();

        target.siblings( "span" ).text(text);
        target_parent.attr('class', 'inline-block');
        if(target_id == 'left_icon')
        {
            ionic3.pages[id_page_selected].header.left_text = text
        }
        else if (target_id == 'right_icon')
        {
            ionic3.pages[id_page_selected].header.right_text = text
        }
        else if (target_id == 'middle_icon')
        {
            ionic3.pages[id_page_selected].header.middle_text = text
        }
    });



    // $('#configuracion-image input').keyup(function () {
    //     id_target = $(this).attr('data-target-id');
    //     style = $(this).attr('attr-style');
    //     value = $(this).val();
    //     $('#'+ id_target).css(style, value);
    //
    // });
    //
    // $('.image-mobile').click(function () {
    //     $("#configuracion-image input[attr-style='height']").val($(this).css('height'));
    //     $("#configuracion-image input[attr-style='height']").attr('data-target-id', $(this).attr('id'));
    //     $("#configuracion-image input[attr-style='width']").val($(this).css('width'));
    //     $("#configuracion-image input[attr-style='width']").attr('data-target-id', $(this).attr('id'));
    // })
};