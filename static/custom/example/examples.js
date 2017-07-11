/**
 * Created by Polar on 27/06/2017.
 */


$('#markham-attendance').click(function () {
    $('.mobile-header').attr('style', 'background: #f5b400');
    $('#left_icon').removeAttr('class');
    $('#left_icon').attr('class', 'zmdi zmdi-notifications zmdi-hc-fw');
    $('#left_icon').addClass('color-default');
    $('#right_icon').removeAttr('class');
    $('#right_icon').attr('class', 'zmdi zmdi-more-vert zmdi-hc-fw');
    $('#right_icon').addClass('color-default');
    $('#icon-middle').attr('style', 'font-style: initial; font-family: Arial; font-size:18px');
    $('#icon-middle').text('Attendance 5BrgU');
    $('#sortable').css({'padding':''});
    $('#sortable').html('');
    $('#sortable').html("<div style='background:#fcf1d3; padding : 13px' >" +
                            "<span style='padding-left:15px'>Monday 26 - June 2017</span>" +
                            "<button class='btn btn-primary btn-icon waves-effect waves-circle waves-float' style='font-weight:bold; background: #f5b400; float: right;bottom:8px'>ALL P</button>" +
                        "</div>");
    $('#sortable').append("<div>" +
                            "<div class='col-xs-3' style='padding: initial'>" +
                                "<img src='/static/img/perfil.png' style='width: 100%; height: 80px;'>" +
                            "</div>" +
                            "<div class='col-xs-9' style='border-bottom: .55px solid #c8c7cc; float:right; padding:initial'>" +
                                "<div class='col-xs-9' style='padding:3px'>" +
                                    "<h6 class='child'>CANDILLO SANTILLANA,</h6>" +
                                    "<h6 class='child'>Sebastian Percy</h6>" +
                                    "<h6 class='child'>5BU</h6>" +
                                "</div><h6 class='child'>P</h6>" +
                            "</div>" +
                        "</div>")
    $('#sortable').append("<div>" +
                            "<div class='col-xs-3' style='padding: initial'>" +
                                "<img src='/static/img/perfil.png' style='width: 100%; height: 80px;'>" +
                            "</div>" +
                            "<div class='col-xs-9' style='border-bottom: .55px solid #c8c7cc; float:right; padding:initial'>" +
                                "<div class='col-xs-9' style='padding:3px'>" +
                                    "<h6 class='child'>CASTELLANOS DALY,</h6>" +
                                    "<h6 class='child'>Joaquin Antonio</h6>" +
                                    "<h6 class='child'>5BU</h6>" +
                                "</div><h6 class='child'>P</h6>" +
                            "</div>" +
                        "</div>")
    $('#sortable').append("<div>" +
                            "<div class='col-xs-3' style='padding: initial'>" +
                                "<img src='/static/img/perfil.png' style='width: 100%; height: 80px;'>" +
                            "</div>" +
                            "<div class='col-xs-9' style='border-bottom: .55px solid #c8c7cc; float:right; padding:initial'>" +
                                "<div class='col-xs-9' style='padding:3px'>" +
                                    "<h6 class='child'>DUCATO HOFFMANN,</h6>" +
                                    "<h6 class='child'>Giacorno</h6>" +
                                    "<h6 class='child'>5BU</h6>" +
                                "</div><h6 class='child'>P</h6>" +
                            "</div>" +
                        "</div>")
    $('#sortable').append("<div>" +
                            "<div class='col-xs-3' style='padding: initial'>" +
                                "<img src='/static/img/perfil.png' style='width: 100%; height: 80px;'>" +
                            "</div>" +
                            "<div class='col-xs-9' style='border-bottom: .55px solid #c8c7cc; float:right; padding:initial'>" +
                                "<div class='col-xs-9' style='padding:3px'>" +
                                    "<h6 class='child'>GAIGE TENNA,</h6>" +
                                    "<h6 class='child'>Samantha Lissette</h6>" +
                                    "<h6 class='child'>5BU</h6>" +
                                "</div><h6 class='child'>P</h6>" +
                            "</div>" +
                        "</div>");
    $('#sortable').append("<div>" +
                            "<div class='col-xs-3' style='padding: initial'>" +
                                "<img src='/static/img/perfil.png' style='width: 100%; height: 80px;'>" +
                            "</div>" +
                            "<div class='col-xs-9' style='border-bottom: .55px solid #c8c7cc; float:right; padding:initial'>" +
                                "<div class='col-xs-9' style='padding:3px'>" +
                                    "<h6 class='child'>ISSA,</h6>" +
                                    "<h6 class='child'>Sama (RS)</h6>" +
                                    "<h6 class='child'>5BU</h6>" +
                                "</div><h6 class='child'>P</h6>" +
                            "</div>" +
                        "</div>");
    $('#sortable').append("<div>" +
                            "<div class='col-xs-3' style='padding: initial'>" +
                                "<img src='/static/img/perfil.png' style='width: 100%; height: 80px;'>" +
                            "</div>" +
                            "<div class='col-xs-9' style='border-bottom: .55px solid #c8c7cc; float:right; padding:initial'>" +
                                "<div class='col-xs-9' style='padding:3px'>" +
                                    "<h6 class='child'>MAJLUF ELIZONDO,</h6>" +
                                    "<h6 class='child'>Adriana</h6>" +
                                    "<h6 class='child'>5BU</h6>" +
                                "</div>" +
                                "<h6 class='child'>AJ</h6>" +
                            "</div>" +
                        "</div>");
    
    $('#sortable').append("<button class='btn btn-primary btn-icon waves-effect waves-circle waves-float' style='font-weight:bold; position:absolute; right:0; bottom:0; margin:10px; width: 60px;height: 60px;'>SAVE</button>")

    $('.tree').append(getPageHtml('attendance', 'Attendance'));
    $('a[href=#paso2]').click();

    $('.page').click(function(){
        $('.tree').html('');
        $('#markham-attendance').click()
    })


});

$('#sio-movil').click(function () {
    $('.tree').html('');
    login_sio();
    $('.tree').append(getPageHtml('login', 'Login'));
    $('.tree').append(getPageHtml('formulario', 'formulario'));
    $('a[href=#paso2]').click();

    $('.treegrid-login').click(function(){
        login_sio();
    })
    $('.treegrid-formulario').click(function(){
        formulario();
    })


});

function login_sio() {

    $('.text-left').attr('style', 'display:block-inline');
    $('#left_icon').removeAttr('class');
    $('#left_icon').parent().removeAttr('class');
    $('#right_icon').removeAttr('class');
    $('#right_icon').attr('class', 'zmdi zmdi-view-subtitles zmdi-hc-fw');
    $('#right_icon').addClass('color-default');
    $('#right_icon').parent().css({'top':'20px'});
    $('#icon-middle').attr('style', 'font-style: initial; font-family: Arial; font-size:18px; display:block-inline');
    $('#icon-middle').text('Sio Móvil');
    $('#sortable').css({'padding':''});
    $('#sortable').html('');
    $('#sortable').append("<div id='" + 0 + "' class='image-mobile' style='width:50%; height: 100px;background: no-repeat transparent center top url(/static/img/image.png); background-size: cover;display:inline-block'></div>");
    $('#sortable').css({'text-align': 'center'});

    $('#sortable').append("</br>");
    $('#sortable').append("</br>");
    $('#sortable').append("</br>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto'><div class='fg-line'><p type='text' class='form-control text-left'>Usuario</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto'><div class='fg-line'><p type='text' class='form-control text-left'>Contraseña</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto'><div class='fg-line'><p type='text' class='form-control text-left'>Unidad Operativa</p></div></div>");

    $('#sortable').append("<button class='btn btn-primary btn-block waves-effect' style='margin: 10px;width: 90%;'>Ingresar</button>");

}

function formulario() {

    $('.mobile-header').attr('style', 'background: #262fff');
    $('.text-left').attr('style', 'display:block-inline');
    $('#left_icon').removeAttr('class');
    $('#left_icon').parent().removeAttr('class');
    $('#right_icon').removeAttr('class');
    $('#right_icon').addClass('color-default');
    $('#right_icon').parent().css({'top':'20px'});
    $('#icon-middle').attr('style', 'font-style: initial; font-family: Arial; font-size:18px; display:block-inline');
    $('#icon-middle').text('#SSP1035 - EIE (Granel)');


    $('#sortable').css({'padding':''});
    $('#sortable').html('');

    $('#sortable').html("<div style='background:#E8EAF6; padding : 13px' >" +
                            "<span style='padding-left:15px'>INFORMACION DE CARGA</span>" +
                        "</div>");

    $('#sortable').append("</br>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Nave</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Bodega</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Area</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Peso Estimado</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Articulo</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Producto</p></div></div>");
    $('#sortable').append("<div class='form-group' style='margin-bottom: auto; margin-left: 5px'><div class='fg-line'><p type='text' class='form-control text-left'>Observacion</p></div></div>");

    $('#sortable').append("<button class='btn btn-primary btn-block waves-effect' style='margin: 10px;width: 90%;'>Guardar</button>");


    
}