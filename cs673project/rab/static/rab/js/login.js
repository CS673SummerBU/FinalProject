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
    */
    $("#register-btn").on("click", function(){

        if(validatePassword()){
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
           
        }else{
            alert("Passwords don't match!")
        }
      
    });

});

function validatePassword(){
    if($("#reg-pw").val() != $("#reg-pw-cfm").val()) {
        return false;
    } else {
        return true;
    }
}


