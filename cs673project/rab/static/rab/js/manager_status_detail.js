var menuID = 2;
var menu;
var ORDER_STATE = ["NO ORDER PLACED", "COOKING", "SERVING"];

$(document).ready(function() {
    if(menuID){
        loadData();
    }
    
});

function loadData(){
    console.log("load");
    
    //todo: ajax to retrieve menu info by id
    menu = {
        name: "Shrimp Cocktail",
        lastServedTime: 1595216053007,
        cookTime: 15,
        freshTime: 60,
        foodImageUrl: "../resources/shrimp-cocktail.jpg",
        orderStatus: 1
    };
    
    if(menu.foodImageUrl != null){
        $("img#dish-image").prop("src", menu.foodImageUrl);
        $("img#dish-image").css("display", "block");
        $("img#dish-image").show();
    }
    
    $("p#name-value").text(menu.name);
    $("p#cook-time-value").text(menu.cookTime);
    $("p#fresh-time-value").text(menu.freshTime);
    $("p#order-status-value").text(ORDER_STATE[menu.orderStatus]);
    
    updateCountDown();
    window.setInterval(updateCountDown, 1000);
}

function updateCountDown(){
    
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