$(document).ready(function() {
    
    getEmployees();

     $("#add-item-btn").on("click", function(){
        sessionStorage.removeItem("employeeID");
        $("#employee-detail").attr("src", "manager_employee_detail");
        $(".selected").removeClass("selected");
    });
});

var getEmployees = () => {
    $.get('employees', (employees) => {
        loadData(employees)
    });
};

function loadData(employees){
    
    let employeeListRoot = $("#employee-list-items-container"); //<div id=> name in manager_employee.html
    employeeListRoot.empty();
    
    Object.keys(employees).forEach(key => {
        employeeListRoot.append('<div id = "employee-' + key + '" class="employee-item"><p>' + employees[key].name + '</p><span id = "url" style="display: none">manager_employee_detail</span><span id = "emp-id" style = "display:none">' + employees[key].id + '</span></div>');
    });
    
    $(".employee-item").on("click", function(){
        sessionStorage.setItem("employeeID", $(this).children("span#emp-id").text());
        $("#employee-detail").attr("src", $(this).children("span#url").text());
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
}