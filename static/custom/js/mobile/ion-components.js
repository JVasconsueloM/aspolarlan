/**
 * Created by Polar on 03/07/2017.
 */


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var id_page_selected = 0;
var counter_components = 0;
var ion_component = new Object();
ion_component.heading = "<h1 id='page_id-component_id' style='color:#000000;' data-componentid='component_id' class='ic-selected target' data-draggable='item'>Heading</h1>";
ion_component.paragraph = "<div id='page_id-component_id' class='show-list-numbers-and-dots ic-selected target' data-componentid='component_id' data-draggable='item'><p style='color:#000000; margin: auto; margin: 5px 0;'>Some friendly <strong>markdown</strong></p></div>";
ion_component.button = "<div id='page_id-component_id' class='btn btn-primary btn-block waves-effect ic-selected ion-btn target' data-componentid='component_id' data-draggable='item'>Tap me!</div>";
ion_component.card = "";
ion_component.container = "<div id='page_id-component_id' data-componentid='component_id' class='creator-container ic-selected target' data-draggable='target' data-draggable='item'></div>";
ion_component.image = "<div id='page_id-component_id' data-componentid='component_id'  class='ic-selected target' style='margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center; min-height: 20px; margin: 10px 0;' data-draggable='item'><i class='icon ion-image' style='font-size: 64px; color: rgb(136, 136, 136); vertical-align: middle;'></i></div>";
ion_component.spacer = "<div id='page_id-component_id' data-componentid='component_id' class='spacer ic-selected target'style='min-height: 100px;' data-draggable='item'></div>";
ion_component.checkbox = "<label id='page_id-component_id' data-componentid='component_id' class='item item-checkbox ic-selected target'  data-draggable='item'><div class='checkbox checkbox-input-hidden disable-pointer-events checkbox-circle'><input type='checkbox'><i class='checkbox-icon'></i></div><div class='item-content disable-pointer-events' ng-transclude=''><span>Checkbox</span></div></label>";
ion_component.form = "";
ion_component.input = "<label id='page_id-component_id' data-componentid='component_id' class='item item-input ic-selected target' data-draggable='item'><span class='input-label' aria-label='Input' id='_component_id'>Input</span><input type='text' placeholder=''></label>";
ion_component.radio = "<label id='page_id-component_id' data-componentid='component_id' class='item item-radio ic-selected target' data-draggable='item'><input type='radio' name='radio-group'><div class='radio-content'><div class='item-content disable-pointer-events' ng-transclude=''><span>Radio</span></div><i class='radio-icon disable-pointer-events icon ion-checkmark'></i></div></label>";
ion_component.search = "<label id='page_id-component_id' data-componentid='component_id' class='item item-input ic-selected target' data-draggable='item'><i class='zmdi zmdi-search zmdi-hc-fw f-20 placeholder-icon'></i><input type='search' placeholder=''></label>";
ion_component.select = "<label id='page_id-component_id' data-componentid='component_id' class='item item-select ic-selected target' data-draggable='item'><span class='input-label' aria-label='Select' id='_component_id'>Select</span><select></select></label>";
ion_component.textarea = "<label id='page_id-component_id' data-componentid='component_id' class='item item-input ic-selected target' data-draggable='item'><span class='input-label' aria-label='Text' id='_component_id'>Text</span><textarea placeholder=''></textarea></label>";
ion_component.toggle = "<div  id='page_id-component_id' data-componentid='component_id'  class='item item-toggle toggle-small ic-selected target' data-draggable='item'><div class='toggle-switch' style='width: 100%' data-ts-color='red'><label for='_component_id' class='ts-label text-left'>Toggle </label><input id='_component_id' type='checkbox' hidden='hidden'><label for='_component_id' class='ts-helper' style='float: right; top: 4px;'></label></div></div>";
ion_component.list_divider = "<div id='page_id-component_id' data-componentid='component_id' class='item-divider item ic-selected target' data-draggable='item'> Item</div>";
ion_component.container_list_item = "";
ion_component.thumbnail_list_item = "<div  id='page_id-component_id' data-componentid='component_id' class='item-thumbnail-left item ic-selected selected target' data-draggable='item'><img src='/static/img/thumbnail-img.png'><h2>Item</h2></div>";
ion_component.icon_list_item = "";
ion_component.avatar_list_item = "<div id='page_id-component_id' data-componentid='component_id' class='item-avatar item ic-selected target' data-draggable='item'><img src='/static/img/avatar-img.png'><h2>Item</h2></div>";

ion_component.get = function (type_component) {
    var html = '';
    component_id = null;

    // if(type_component == "heading"){ html = ion_component.heading}
    // else if(type_component == "paragraph"){html = ion_component.paragraph}
    // else if(type_component == "button"){html = ion_component.button}
    // else if(type_component == "card"){html = ion_component.card}
    // else if(type_component == "container"){html = ion_component.container}
    // else if(type_component == "image"){html = ion_component.image}
    // else if(type_component == "spacer"){html = ion_component.spacer}
    // else if(type_component == "checkbox"){html = ion_component.checkbox}
    // else if(type_component == "form"){html = ion_component.form}
    // else if(type_component == "input"){html = ion_component.input}
    // else if(type_component == "radio"){html = ion_component.radio}
    // else if(type_component == "search"){html = ion_component.search}
    // else if(type_component == "select"){html = ion_component.select}
    // else if(type_component == "textarea"){html = ion_component.textarea}
    // else if(type_component == "toggle"){html = ion_component.toggle}
    // else if(type_component == "list_divider"){html = ion_component.list_divider}
    // else if(type_component == "container_list_item"){html = ion_component.container_list_item}
    // else if(type_component == "thumbnail_list_item"){html = ion_component.thumbnail_list_item}
    // else if(type_component == "icon_list_item"){html = ion_component.icon_list_item}
    // else if(type_component == "avatar_list_item"){html = ion_component.avatar_list_item}

    html = ion_component[type_component];
    component_id = type_component + counter_components;
    html = html.replaceAll("component_id", component_id);
    html = html.replace("page_id", id_page_selected);
    counter_components++;
    return html

}