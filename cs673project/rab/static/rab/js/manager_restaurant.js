
$(document).ready(function() {

    setStatus(undefined);

    $("#manager-restaurant-form").on("submit", function(e){
        e.preventDefault();
            //todo: ajax to update user info
        if(validateInfo()) {
            let data = $(this).serialize();
            let url = $(this).attr("action");
            //let form = $(this)
            $.post(url, data, (result) => {
                loadData(result);
            },'json'
            );
        }
    }); 


    $("#open-btn").click(() => {setStatus(true)});
    $("#close-btn").click(() => {setStatus(false)});


});

function setStatus(data) {
    $.get('restaurant_status', {status: data},(result) => {
        if(result.status == true) {
            $('#rest-status').html('OPEN');
            $('#rest-status').css('color', 'green');
        }
        else {
            $('#rest-status').html('CLOSED');
            $('#rest-status').css('color', 'red');
        }
    }, 'json');
}

function loadData(restaurant){
    console.log("load");
    //todo: load restaurant data by id
    
    $("input#name").val(restaurant.name);
    $("input#address").val(restaurant.address);
    $("input#phone").val(restaurant.phone);
    $("input#open-time").val(restaurant.open_time);
    $("input#close-time").val(restaurant.close_time);
    
}


function validateInfo() {
    if($("input#name").val() == "") {
        $(".manager-restaurant-name-error-messages").text("Please enter name of restaurant!!").fadeIn().delay(10000).fadeOut();
        return false;
    } else {
        return true;
    }
}