/**
 * Created by Polar on 08/01/2017.
 */
// global vars
var rowIds = []

// checkbox functions
$("th [name='select']").click(function(){
    var is_checked = $(this).is(':checked');
    var checkboxChild = $("td [name='select']");
    is_checked? checkboxChild.prop('checked', true) : checkboxChild.prop('checked', false) ;
    Addids()
});

$("td [name='select']").click(function(){
    Addids();
});


function Addids(){
    rowIds = [];
    $("td [name='select']:checked").each(function(){
        rowIds.push($(this).val());
    });
    console.log(rowIds)
}