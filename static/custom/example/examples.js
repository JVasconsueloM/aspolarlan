/**
 * Created by Polar on 27/06/2017.
 */


$('#markham-attendance').click(function () {
    $('.mobile-header').attr('style', 'background: #f5b400');
    $('#icon-left').removeAttr('class');
    $('#icon-left').attr('class', 'zmdi zmdi-notifications zmdi-hc-fw');
    $('#icon-left').addClass('color-default');
    $('#icon-right').removeAttr('class');
    $('#icon-right').attr('class', 'zmdi zmdi-more-vert zmdi-hc-fw');
    $('#icon-right').addClass('color-default');
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
