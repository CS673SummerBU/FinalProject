var userID;

$(document).ready(function() {
 
    $("#manager-personal-form").on("submit", function(e){
        e.preventDefault()
        if(validatePassword()){
            //todo: ajax to update user info
            let data = $(this).serialize();
            let url = $(this).attr("action");
            //let form = $(this)
            $.post(url, data, (result) => {
                loadData(result);
            },'json'
            );
        }
    }); 


});

function loadData(user){
    //todo: ajax to load user info by id
    //sample return:

    $("input#firstname").val(user.firstname);
    $("input#lastname").val(user.lastname);
    $("input#username").val(user.username);
    $("input#password").val("");
    $("input#password-cfm").val("");
}

function validatePassword(){
    if($("input#password").val() == ""){
        alert("Please enter your password!!");
        return false;
    }
    if($("input#password").val() != $("input#password-cfm").val()) {
        alert("Passwords don't match!!");
        return false;
    } else {
        return true;
    }
}