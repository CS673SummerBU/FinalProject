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

    updateCountDown(menu);
    window.setInterval(updateCountDown(menu), 1000); 
}

function updateCountDown(menu){
    let currentTimeMillis = new Date().getTime();
    $("p#last-served-value").text(millisToTimeString(currentTimeMillis - menu.lastServedTime));
    let nextRefill = menu.lastServedTime + menu.freshTime * 60000 - currentTimeMillis;
    if(nextRefill < 0){
        $("p#next-refill-value").text("-" + millisToTimeString(nextRefill));
        $("p#next-refill-value").css("color", "red");
    }else{
        $("p#next-refill-value").css("color", "");
        $("p#next-refill-value").text(millisToTimeString(nextRefill));
    }
    
}