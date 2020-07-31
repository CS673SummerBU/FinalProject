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
        if(validatePassword()){
            console.log('validatePassword was True');
            let username = $("#reg-username").val();
            let pw = $("#reg-pw").val();
            let pwc = $("#reg-pw-cfm").val();
            console.log("user register:");
            console.log("    username: " + username);
            console.log("    password: " + pw);
            console.log("    password: " + pwc);
            
            //todo: ajax to register
            
            //on success:
            sessionStorage.setItem("restaurantID", 1);
            sessionStorage.setItem("userID", 1);
           // window.open("../html/manager.html");
           
        }
    });
    */
    $("#register-btn").on("click", function(e){
        if(validatePassword()){
            var formData = new FormData($('#register-form')).get(0);

            $.ajax({
                url: $('register-form').attr("action"),
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function(data) {
                    if (validatePassword()) {
                        loadData(data)                        
                    }
                }

            })
           
        }
    });

});

function loadData(data){
    $("input#reg-username").val(data.username);
    $("input#reg-pw").val(data.pass);
    $("input#reg-pw-cfm").val(data.pass_cfm);   

    sessionStorage.setItem("restaurantID", 1);
    sessionStorage.setItem("userID", 1);
}

function validatePassword(){
    console.log('Got to validateInfo');
    if($("#reg-username").val() == "") {
        alert("Username Field Blank!!");
        return false;
    } else {
        var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
        if($("#reg-pw").val().match(passwd)) {
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
            alert("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)");
        }
    }
}


