var ORDER_STATE = { 1: "NO ORDER PLACED", 2: "COOKING", 3: "READY TO SERVE", 4: "SERVING"};
var dishes;
$(document).ready(function(){
    $('.collapsible').collapsible();
    
    getMenuStatus();
    
    window.setInterval(updateStatus, 1000);
});

function getMenuStatus() {
    $.get('menu_status', (result) => {
        dishes = result
        loadData()
    });
};

function loadData(){

    let dishListRoot = $("#dish-list");
    dishListRoot.empty();
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<li id="dish-' + key + '"><div class="dish-header collapsible-header">' + dishes[key].name + '<span></span></div><div class="collapsible-body"><img class = "dish-image" src="' + dishes[key].foodImageUrl + '" alt="" width="100" height="100"><div class= "dish-info-table"><div class = "left-panel"></div><div class = "right-panel"></div></div><button class="order-button">ORDER</button></div></li>');
        
        let left = $("#dish-" + key + " > .collapsible-body > .dish-info-table > .left-panel");
        
        let right = $("#dish-" + key + " > .collapsible-body > .dish-info-table > .right-panel");
        
        left.append('<p id = "cook-time">Cook Time</p><p id = "fresh-time">Fresh Time</p><p id = "last-served">Since Last Served</p><p id = "next-refill">Next Refill Due</p><p id = "order-status">Order Status</p>');
        
        right.append('<p id = "cook-time-value">' + dishes[key].cookTime + ' minutes</p><p id = "fresh-time-value">' + dishes[key].freshTime + ' minutes</p><p id = "last-served-value">' +
         (((dishes[key].lastServed == 'none') ? "NOT SERVED TODAY" : (new Date(dishes[key].lastServed).customFormat("#hh#:#mm#"))))
         + '</p><p id = "next-refill-value">' + 
         (((dishes[key].lastServed == 'none') ? "NOT SERVED TODAY" : (new Date(dishes[key].lastServed + dishes[key].freshTime * 60000).customFormat("#hh#:#mm#"))))
         + '</p><p id = "order-status-value">' + ORDER_STATE[dishes[key].orderStatus] + '</p>');
        
        if(dishes[key].orderStatus == 2) {
            $("#dish-" + key + " > .collapsible-body > .order-button").prop('disabled', true);
            $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "gray");
        }else if(dishes[key].orderStatus == 3){
            $("#dish-" + key + " > .collapsible-body > .order-button").text("SERVE");
            $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "green");
            $("#dish-" + key + " > .dish-header span").text(ORDER_STATE[dishes[key].orderStatus])
            $("#dish-" + key + " > .dish-header span").css('color', 'green')
            $("#dish-" + key + " > .dish-header span").css('margin-left', '40px')
            $("#dish-" + key + " > .collapsible-body > .order-button").click(()=>{
               //ajax to update the order status 
               setStatus(dishes[key].id, dishes[key].orderStatus)
            });
        }else{
            $("#dish-" + key + " > .collapsible-body > .order-button").click(()=>{
               //ajax to place the order with dish id and user id and other info 
               setStatus(dishes[key].id, dishes[key].orderStatus)
            });
        }
        
        if(sessionStorage.getItem("dishID") == dishes[key].id){
            $("#" + 'dish-' + key).addClass("active");
        }
    }); 
}

function setStatus(menuID,statusID) {
    $.get('set_status',{menuitem:menuID, status:statusID}, (result) =>{});
}

function updateStatus(){
    $.get('menu_status', (result) => {
        dishes = result
        Object.keys(dishes).forEach(key => {
            $("#dish-" + key + " > .collapsible-body > .dish-info-table > .right-panel > #last-served-value").text((((dishes[key].lastServed == 'none') ? "NOT SERVED TODAY" : (new Date(dishes[key].lastServed).customFormat("#hh#:#mm#")))));
            $("#dish-" + key + " > .collapsible-body > .dish-info-table > .right-panel > #next-refill-value").text((((dishes[key].lastServed == 'none') ? "NOT SERVED TODAY" : (new Date(dishes[key].lastServed + dishes[key].freshTime * 60000).customFormat("#hh#:#mm#")))));
            $("#dish-" + key + " > .collapsible-body > .dish-info-table > .right-panel > #order-status-value").text(ORDER_STATE[dishes[key].orderStatus]);
            if(dishes[key].orderStatus == 3) {
                $("#dish-" + key + " > .collapsible-body > .order-button").prop('disabled', false);
                $("#dish-" + key + " > .collapsible-body > .order-button").text("SERVE");
                $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "green");
                $("#dish-" + key + " > .dish-header span").text(ORDER_STATE[dishes[key].orderStatus])
                $("#dish-" + key + " > .dish-header span").css('color', 'green')
                $("#dish-" + key + " > .dish-header span").css('margin-left', '40px')
            } 
            else if(dishes[key].orderStatus == 2) {
                
                $("#dish-" + key + " > .collapsible-body > .order-button").prop('disabled', true);
                $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "gray");
                
            }
            else {
                $("#dish-" + key + " > .collapsible-body > .order-button").text("ORDER");
                $("#dish-" + key + " > .collapsible-body > .order-button").prop('disabled', false);
                $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "yellow");
                $("#dish-" + key + " > .dish-header span").text("") 
            }
        })
    });
}
