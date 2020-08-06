var menuID;
var menu;
var ORDER_STATE = ["NO ORDER PLACED", "COOKING", "SERVING"];

$(document).ready(function() {

    menuID = sessionStorage.getItem("menuID");
    if(menuID){
        getMenus(menuID);
    }

});

var getMenus = (menuID) => {
    $.get('menus', {menuID: menuID}, (menu) => {
        loadData(menu)
    });
};

function loadData(menu){
    console.log("load");
    
    menuID = menu.id
    if(menu.foodImageUrl != null){
        $("img#dish-image").prop("src", menu.foodImageUrl);
        $("img#dish-image").css("display", "block");
        $("img#dish-image").show();
    }
    
    $("p#name-value").text(menu.name);
    $("p#cook-time-value").text(menu.cookTime);
    $("p#fresh-time-value").text(menu.freshTime);
    $("p#order-status-value").text(menu.orderStatus);
    $("p#last-served-value").text(menu.lastServedTime);     
    $("p#next-refill-value").text(menu.dueTime);

    updateCountDown(menu);
    window.setInterval(updateCountDown(menu), 1000);
}

function updateCountDown(menu){
    //let currentTimeMillis = new Date().getTime();
    if (menu.lastServedTime != 'none' && menu.dueTime != 'none') {
        $("p#last-served-value").text(new Date(menu.lastServedTime).customFormat("#hh#:#mm#"));
        $("p#next-refill-value").text(new Date(menu.dueTime).customFormat("#hh#:#mm#"));
    }
}