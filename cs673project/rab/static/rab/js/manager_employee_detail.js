var employeeID;

$(document).ready(function() {
    
    employeeID = sessionStorage.getItem("employeeID");
    if(employeeID){
        loadData();  
    }else{
        $("#delete-btn").css("display", "none");
    }
    
    $("#save-btn").on("click", function(){
        if(validateInfo()){
            //todo: ajax to add/update employee info
            
            //on success: loadData()
            parent.loadData();
        }
    });
    
    $("#delete-btn").on("click", function(){
        //todo: ajax to delete the employee
        console.log("delete employee");
        sessionStorage.setItem("employeeID", null);
        parent.loadData();
    });

});

function loadData(){
    
    //todo: ajax to retrieve dish info by id
    let employee = {
        firstName: "Ali",
        lastName: "Baba",
        username: "babaa@bu.edu"
    };
    
    $("input#firstname").val(employee.firstName);
    $("input#lastname").val(employee.lastName);
    $("input#username").val(employee.username);
    
}


function validateInfo(){
    if($("input#firstname").val() == ""){
        alert("Please enter employee firstname!!");
        return false;
    }
    
    if($("input#lastname").val() == ""){
        alert("Please enter employee lastname!!");
        return false;
    }
    
    if($("input#username").val() == ""){
        alert("Please enter employee username!!");
        return false;
    }
    
    if($("input#password").val() == ""){
        alert("Please enter employee password!!");
        return false;
    }
    if($("input#password").val() != $("input#password-cfm").val()) {
        alert("Passwords don't match!!");
        return false;
    } else {
        return true;
    }
}