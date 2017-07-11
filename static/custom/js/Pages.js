/**
 * Created by Pandita on 05/07/2017.
 */

ionic3 = {};
ionic3.pages = {};
ionic3.components = {};


ionic3.create_page = function (id_page, name) {

    var page = {};
    page.header = {};
    page.body = {};
    page.id = id_page;
    page.header.background = "#262fff";
    page.header.color = "#ffffff";
    page.header.left_icon = "";
    page.header.left_text = "";
    page.header.right_icon = "";
    page.header.right_text = "";
    page.header.middle_text = "";
    page.body.background = "#ffffff";
    page.body.content = [];
    if(name){page.name = name}else {page.name = 'page' + page.id}
    page.url = '/Pages/' + page.name;
    ionic3.pages[id_page] = page;
};

ionic3.create_component =  function(component_id){
    var data = component_id.split('-');

    var component = {};
    component.page_id = data[0];
    component.id = component_id;
    component.type = data[1].replace(/[0-9]/g, '');
    component.text = "";
    component.size = "";
    component.weight = "";
    component.cursiva = "";
    component.color = "#ffffff";
    component.align = "left";
    component.html = "";
    component.style = "";
    component.url = "";
    component.class = "";
    component.btn_type = "";
    component.tag = "";
    component.theme = "";
    if(component.type == "heading"){
        component.color = "#000000"
    }

    ionic3.components[component.id] = component;


};