/**
 * Created by Polar on 03/07/2017.
 */
(function()
{
	//exclude older browsers by the features we need them to support
	//and legacy opera explicitly so we don't waste time on a dead browser
	if(!document.querySelectorAll || !('draggable' in document.createElement('span'))  || window.opera){ return; }

	//get the collection of draggable items and add their draggable attribute
    draggable_items = document.querySelectorAll('[data-draggable="item"]');
	for(var items = draggable_items, len = items.length, i = 0; i < len; i ++){
		items[i].setAttribute('draggable', 'true');
	}

	//variable for storing the dragging item reference
	//this will avoid the need to define any transfer data
	//which means that the elements don't need to have IDs
	var item = null;

	//dragstart event to initiate mouse dragging
	document.addEventListener('dragstart', function(e)
    {
		//set the item reference to this element
		item = e.target;

		//we don't need the transfer data, but we have to define something
		//otherwise the drop action won't work at all in firefox
		//most browsers support the proper mime-type syntax, eg. "text/plain"
		//but we have to use this incorrect syntax for the benefit of IE10+
		e.dataTransfer.setData('text', '');

	}, false);

	//dragover event to allow the drag by preventing its default
	//ie. the default action of an element is not to allow dragging
	document.addEventListener('dragover', function(e)
	{
		if(item)
		{
            // console.log(e, 'dragover')
			e.preventDefault();
		}

	}, false);

	//drop event to allow the element to be dropped into valid targets
	document.addEventListener('drop', function(e)
	{
		//if this element is a drop target, move the item here
		//then prevent default to allow the action (same as dragover)

		if(e.target.getAttribute('data-draggable') == 'target') {
            try {
                $('.ic-selected').removeClass('target');
                type_component = "";
                origen_item = $(item);

                is_heading = origen_item.hasClass("component-heading");
                is_paragraph = origen_item.hasClass("component-paragraph");
                is_button = origen_item.hasClass("component-button");
                is_card = origen_item.hasClass("component-card");
                is_container = origen_item.hasClass("component-container");
                is_image = origen_item.hasClass("component-image");
                is_spacer = origen_item.hasClass("component-spacer");
                is_checkbox = origen_item.hasClass("component-checkbox");
                is_form = origen_item.hasClass("component-form");
                is_input = origen_item.hasClass("component-input");
                is_radio = origen_item.hasClass("component-radio");
                is_search = origen_item.hasClass("component-search");
                is_select = origen_item.hasClass("component-select");
                is_textarea = origen_item.hasClass("component-textarea");
                is_toggle = origen_item.hasClass("component-toggle");
                is_list_divider = origen_item.hasClass("component-list-divider");
                is_container_list_item = origen_item.hasClass("component-container-list-item");
                is_thumbnail_list_item = origen_item.hasClass("component-thumbnail-list-item");
                is_icon_list_item = origen_item.hasClass("component-icon-list-item");
                is_avatar_list_item = origen_item.hasClass("component-avatar-list-item");

                if (is_heading) {
                    type_component = "heading"
                }
                else if (is_paragraph) {
                    type_component = "paragraph"
                }
                else if (is_button) {
                    type_component = "button"
                }
                else if (is_card) {
                    type_component = "card"
                }
                else if (is_container) {
                    type_component = "container"
                }
                else if (is_image) {
                    type_component = "image"
                }
                else if (is_spacer) {
                    type_component = "spacer"
                }
                else if (is_checkbox) {
                    type_component = "checkbox"
                }
                else if (is_form) {
                    type_component = "form"
                }
                else if (is_input) {
                    type_component = "input"
                }
                else if (is_radio) {
                    type_component = "radio"
                }
                else if (is_search) {
                    type_component = "search"
                }
                else if (is_select) {
                    type_component = "select"
                }
                else if (is_textarea) {
                    type_component = "textarea"
                }
                else if (is_toggle) {
                    type_component = "toggle"
                }
                else if (is_list_divider) {
                    type_component = "list_divider"
                }
                else if (is_container_list_item) {
                    type_component = "container_list_item"
                }
                else if (is_thumbnail_list_item) {
                    type_component = "thumbnail_list_item"
                }
                else if (is_icon_list_item) {
                    type_component = "icon_list_item"
                }
                else if (is_avatar_list_item) {
                    type_component = "avatar_list_item"
                }
                else {
                    type_component = null
                }

                if (type_component) {
                    item = ion_component.get(type_component);
                    html_node = $.parseHTML(item)[0];
                    e.target.appendChild(html_node);
                }
                else {
                    origen_item = $(item);
                    item = searching(origen_item);
                    if(item){
                        e.target.appendChild(item);
                    }

                }

                e.preventDefault();

                $('.ic-selected').on('click', function () {
                    $('.ic-selected').removeClass('target');
                    $(this).addClass('target');
                });

                draggable_items = document.querySelectorAll('[data-draggable="item"]');
                for (var items = draggable_items, len = items.length, i = 0; i < len; i++) {
                    items[i].setAttribute('draggable', 'true');
                }
                item = null;


            } catch (err) {
                console.log(err)
            }
        }

	}, false);

	//dragend event to clean-up after drop or abort
	//which fires whether or not the drop target was valid
	document.addEventListener('dragend', function(e)
	{
		item = null;
		// console.log('dragend', e)

	}, false);

})();


function searching(origen_item){
    can_add = !!origen_item.attr('data-componentid');
    if(origen_item.hasClass("dropzone")){return}
    if(!can_add){
        origen_item = origen_item.parent();
        return searching(origen_item)

    }
    else{
        return origen_item[0]
    }
}
