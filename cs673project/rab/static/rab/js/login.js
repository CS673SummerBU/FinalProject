$(document).ready(function() {
                    
    $("#login-btn").on("click", function(e){
        var tk = $(this).attr("data-token");
        let username = $("#login-username").val();
        let pw = $("#login-pw").val();

        $.ajax({
            url: 'login_user',
            type: 'POST',
            dataType: 'json',
            data: {
                'csrfmiddlewaretoken': tk, 'username': username, 'pass':pw
            },
            success: function(data) {
                alert('Username and password combination was incorrect!');
                location.reload();
            },
        });
        sessionStorage.setItem("restaurantID", 1);
        sessionStorage.setItem("userID", 1);
    });
    

    var finish = false;
    $("#register-btn").on("click", function(e){
        console.log('Reg Starts!');
        e.preventDefault();
        console.log($("#reg-username").val());

        if(validatePassword()){
            $.ajax({
                url: 'validate_username',
                type: 'GET',
                data: {
                    'username':  $("#reg-username").val(),
                },
                dataType: 'json',
                async: false,
                success: function(data) {
                    if(data.is_taken) {
                        alert("A user with this username already exists!");
                        return;
                    } else {
                        let data_new = $('#reg-form').serialize();
                        let url = $('#reg-form').attr("action");
                        sessionStorage.setItem("restaurantID", 1);
                        sessionStorage.setItem("userID", 1);
                        finish = true;
                        $.post(url, data_new, (result) => {
                            $("#reg-username").val();
                            $("#reg-pw").val();
                            $("#reg-pw-cfm").val();
                            sessionStorage.setItem("restaurantID", 1);
                            sessionStorage.setItem("userID", 1);
                        },'json'
                        );
                    }
                }
            });
            if (finish) {
                alert('A user has been created!');
                location.reload();
            } 
        }
        $("#reg-username").val();
        $("#reg-pw").val("");
        $("#reg-pw-cfm").val("");
    });
});

function validatePassword(){
    if($("#reg-pw").val().match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
        if($("#reg-pw").val() == ""){
            alert("Please enter password!!");
            return false;
        }
        if($("#reg-pw").val() != $("#reg-pw-cfm").val()) {
            alert("Passwords don't match!!");
            return false;
        } else {
            return true;
        }
    } else {
        alert("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)")
    }
}


