var employeeID;

$(document).ready(function() {
    
    employeeID = sessionStorage.getItem("employeeID");
    if(employeeID){
        getEmployee(employeeID); 
    }else{
        $("#delete-btn").css("display", "none");
    }
    
    $("#save-btn").on("click", function(e){
        if(validateInfo()){
            if(employeeID){
                $("<input />").attr("type", "hidden")
                .attr("name", "employeeID")
                .attr("value", employeeID)
                .appendTo("#manager-employee-info");
            }
            let data = $('#manager-employee-info').serialize();
            let url = $('#manager-employee-info').attr("action");

            $.post(url, data, (result) => {
                loadData(result);
                parent.getEmployees();
            },'json'
            );            
        }
    });
    
    $("#delete-btn").on("click", function(){
        $.get("employee_delete",{employeeID: employeeID}, (result) => {
            sessionStorage.removeItem("employeeID");
            employeeID = undefined;
            location.reload();
            parent.getEmployees();
            console.log("delete employee");
        });
    });

});

var getEmployee = (employeeID) => {
    $.get('employees', {employeeID: employeeID}, (employee) => {
        loadData(employee)
    });
}

function loadData(employee){
    if(employeeID == undefined) {
        $("#delete-btn").css("display", "");
        sessionStorage.setItem("employeeID", employee.id);
        employeeID = employee.id;
    }

    employeeID = employee.id
    $("input#firstname").val(employee.firstName);
    $("input#lastname").val(employee.lastName);
    $("input#username").val(employee.username);
    $('select#role').val(employee.role);
    $("input#password").val("");
    $("input#password-cfm").val("");
    
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

    if($("input#password").val().match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
        if($("input#password").val() == ""){
            alert("Please enter password!!");
            return false;
        }
        if($("input#password").val() != $("input#password-cfm").val()) {
            alert("Passwords don't match!!");
            return false;
        } else {
            return true;
        }
    } else {
        alert("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)")
    }
}