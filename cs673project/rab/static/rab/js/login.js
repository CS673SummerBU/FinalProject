$(document).ready(function() {
     /*          
    $("#login-btn").on("click", function(){
        let username = $("#login-username").val();
        let pw = $("#login-pw").val();
        console.log("user login:");
        console.log("    username: " + username);
        console.log("password: " + pw);
        
        //todo: ajax login
        
        //on success:
        sessionStorage.setItem("restaurantID", 1);
        sessionStorage.setItem("userID", 1);
        
        //window.open("../html/manager.html");
    });
    

    $("#register-btn").on("click", function(e){
        console.log('Reg Starts!');
        e.preventDefault();
        let data = $('#reg-form').serialize();
        let url = $('#reg-form').attr("action");
        console.log($("#reg-username").val());

        if(validatePassword()){
            console.log('Password Validated!');
            validateUsername()
            .then(function(data_take) {
                if (data_take.is_taken) {
                    alert("A user with this username already exists!");
                    return;
                }
                console.log('Username Validated!');
                console.log(data_take);
                console.log(url);
                console.log($("#reg-username").val());
                //let data = $('#reg-form').serialize();
                //let url = $('#reg-form').attr("action");

                $.post(url, data, (result) => {
                    $("#reg-username").val();
                    $("#reg-pw").val();
                    $("#reg-pw-cfm").val();
                    sessionStorage.setItem("restaurantID", 1);
                    sessionStorage.setItem("userID", 1);
                    //window.location.href = '/manager/';
                },'json'
                );
            })
        }
        $("#reg-username").val("");
        $("#reg-pw").val("");
        $("#reg-pw-cfm").val("");
    });
    */

    $("#register-btn").on("click", function(e){
        console.log('Reg Starts!');
        e.preventDefault();
        console.log($("#reg-username").val());

        if(validatePassword()){
            console.log('Password Validated!');
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
                    }
                    console.log('Username Validated!');
                    console.log($("#reg-username").val());
                    let data_new = $('#reg-form').serialize();
                    let url = $('#reg-form').attr("action");
                    sessionStorage.setItem("restaurantID", 1);
                    sessionStorage.setItem("userID", 1);
                    $.post(url, data_new, (result) => {
                        console.log('Got into this post function');
                        console.log($("#reg-username").val());
                        $("#reg-username").val();
                        $("#reg-pw").val();
                        $("#reg-pw-cfm").val();
                        sessionStorage.setItem("restaurantID", 1);
                        sessionStorage.setItem("userID", 1);

                        //window.location.href = '/manager/';
                    },'json'
                    );
                }
            });
            alert('A user has been created! Please login!');
            location.reload();
            return;
        }
        $("#reg-username").val("");
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
/*
function validateUsername() {
    return new Promise((resolve) => {
        $.ajax({
            url: 'validate_username',
            type: 'GET',
            data: {
                'username':  $("#reg-username").val(),
            },
            dataType: 'json',
            async: false,
            cache: false,
            success: function(data) {
                resolve(data);
            }
        });
    })
}
*/