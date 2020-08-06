var employeeID;

$(document).ready(function() {
    
    employeeID = sessionStorage.getItem("employeeID");
    if(employeeID){
        getEmployee(employeeID); 
    }else{
        $("#delete-btn").css("display", "none");
    }
    
    $("#save-btn").on("click", function(e){
        let url = $('#manager-employee-info').attr("action");

        if(validateInfo()){
            if(employeeID){
                $("<input />").attr("type", "hidden")
                .attr("name", "employeeID")
                .attr("value", employeeID)
                .appendTo("#manager-employee-info");
                console.log(employeeID);

                let data_new = $('#manager-employee-info').serialize();
                $.ajax({
                    url: 'validate_username',
                    type: 'GET',
                    data: {
                        'username':  $("input#username").val(),
                        'employeeID': employeeID,
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
                                parent.getEmployees();
                            },'json'
                            );
                            sessionStorage.setItem("userID", 1);
                            sessionStorage.setItem("restaurantID", 1);
                        }
                    }
                });
            } else {
                let data_new = $('#manager-employee-info').serialize();

                $.ajax({
                    url: 'validate_username',
                    type: 'GET',
                    data: {
                        'username':  $("input#username").val(),
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
                                parent.getEmployees();
                            },'json'
                            );
                            sessionStorage.setItem("userID", 1);
                            sessionStorage.setItem("restaurantID", 1); 
                        }
                    }
                });
            }
        }
    });
    
    $("#delete-btn").on("click", function(){
        $.get("employee_delete",{employeeID: employeeID}, (result) => {
            sessionStorage.removeItem("employeeID");
            employeeID = undefined;
            $('#manager-employee-info')[0].reset();
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
        $(".manager-employee-firstname-error-messages").text("Please enter employee firstname!!").fadeIn().delay(10000).fadeOut();
        //alert("Please enter employee firstname!!");
        return false;
    }
    
    if($("input#lastname").val() == ""){
        //alert("Please enter employee lastname!!");
        $(".manager-employee-lastname-error-messages").text("Please enter employee lastname!!").fadeIn().delay(10000).fadeOut();
        return false;
    }
    
    if($("input#username").val() == ""){
        $(".manager-employee-username-error-messages").text("Please enter employee username!!").fadeIn().delay(10000).fadeOut();
        //alert("Please enter employee username!!");
        return false;
    }

    if($("input#password").val().match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
        if($("input#password").val() == ""){
            $(".manager-employee-password-error-messages").text("Please enter password!!").fadeIn().delay(10000).fadeOut();
            //alert("Please enter password!!");
            return false;
        }
        if($("input#password").val() != $("input#password-cfm").val()) {
            $(".manager-employee-password-error-messages").text("Please enter password!!").fadeIn().delay(10000).fadeOut();
            //alert("Passwords don't match!!");
            return false;
        } else {
            return true;
        }
    } else {
        $(".manager-employee-password-error-messages").text("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)").fadeIn().delay(10000).fadeOut();
        return false;
        //alert("Please make sure password is between 6 to 20 characters and includes 1 numeric digit and a special character (!@#$%^&*)")
    }
}