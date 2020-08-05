var userID;
$(document).ready(function() {

     userID = sessionStorage.getItem("userID");
 
    $("#manager-personal-form").on("submit", function(e){
        e.preventDefault();
        if(validateInput()){
            $("<input />").attr("type", "hidden")
                .attr("name", "employeeID")
                .attr("value", userID)
                .appendTo("#manager_personal_update");
            
            let data_new = $(this).serialize();
            let url = $(this).attr("action");

            $.ajax({
                url: 'validate_username',
                type: 'GET',
                data: {
                    'username':  $("input#username").val(),
                    'employeeID': userID,
                },
                dataType: 'json',
                async: false,
                success: function(data) {
                    if(data.is_taken) {
                        alert("A user with this username already exists!");
                        return; 
                    } else {
                        $.post(url, data_new, (result) => {
                            loadData(result);
                        },'json'
                        );
                    }
                }
            });
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

function validateInput(){
    if($("input#firstname").val() == ""){
        $(".manager-personal-firstname-messages").text("Please enter employee firstname!!").fadeIn().delay(10000).fadeOut();
        //alert("Please enter employee firstname!!");
        return false;
    }
    
    if($("input#lastname").val() == ""){
        $(".manager-personal-lastname-messages").text("Please enter employee lastname!!").fadeIn().delay(10000).fadeOut();
        //alert("Please enter employee lastname!!");
        return false;
    }
    
    if($("input#username").val() == ""){
        $(".manager-personal-username-messages").text("Please enter employee username!!").fadeIn().delay(10000).fadeOut();
        //alert("Please enter employee username!!");
        return false;
    }

    if($("input#password").val().match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
        if($("input#password").val() == ""){
            $(".manager-personal-password-messages").text("Please enter employee password!!").fadeIn().delay(10000).fadeOut();
            //alert("Please enter password!!");
            return false;
        }
        if($("input#password").val() != $("input#password-cfm").val()) {
            $(".manager-personal-password-messages").text("Passwords do not match!!").fadeIn().delay(10000).fadeOut();
            //alert("Passwords don't match!!");
            return false;
        } else {
            return true;
        }
    } else {
        $(".manager-personal-password-messages").text("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)").fadeIn().delay(10000).fadeOut();
        //alert("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)")
    }
}