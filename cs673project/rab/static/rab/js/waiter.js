var ORDER_STATE = ["NO ORDER PLACED", "COOKING", "SERVING"];

$(document).ready(function(){
    $('.collapsible').collapsible();
    
    loadData();
    
    window.setInterval(updateStatus, 1000);
});

function loadData(){
    //insert dish info here
    let dishes = {
        0:{id: 25,
           name: "Beef Broccli",
           cookTime: 15,
           freshTime: 60,//fresh time in millis
           orderStatus: 0,
           lastServed: 1596317883091,//last served time in millis
           foodImageUrl: "../resources/shrimp-cocktail.jpg"//replace with real url or image stream
          },
        1:{id: 26,
           name: "Shrimp Cocktail",
           cookTime: 15,
           freshTime: 60,//fresh time in millis
           orderStatus: 1,
           lastServed: 1596317883091,//last served time in millis
          foodImageUrl: "../resources/shrimp-cocktail.jpg"
          },
        2:{id: 29,
           name: "Kong Pao Chicken",
           cookTime: 15,
           freshTime: 60,//fresh time in millis
           orderStatus: 0,
           lastServed: 1596317883091,//last served time in millis
          foodImageUrl: "../resources/shrimp-cocktail.jpg"
          },
        3:{id: 41,
           name: "French Fries",
           cookTime: 15,
           freshTime: 60,//fresh time in millis
           orderStatus: 2,
           lastServed: 1596317883091,//last served time in millis
          foodImageUrl: "../resources/shrimp-cocktail.jpg"
          }
    };
    
    let dishListRoot = $("#dish-list");
    dishListRoot.empty();
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<li id="dish-' + key + '"><div class="dish-header collapsible-header">' + dishes[key].name + '</div><div class="collapsible-body"><img class = "dish-image" src="' + dishes[key].foodImageUrl + '" alt="" width="100" height="100"><div class= "dish-info-table"><div class = "left-panel"></div><div class = "right-panel"></div></div><button class="order-button">ORDER</button></div></li>');
        
        let left = $("#dish-" + key + " > .collapsible-body > .dish-info-table > .left-panel");
        
        let right = $("#dish-" + key + " > .collapsible-body > .dish-info-table > .right-panel");
        
        left.append('<p id = "cook-time">Cook Time</p><p id = "fresh-time">Fresh Time</p><p id = "last-served">Since Last Served</p><p id = "next-refill">Next Refill Due</p><p id = "order-status">Order Status</p>');
        
        right.append('<p id = "cook-time-value">' + dishes[key].cookTime + '</p><p id = "fresh-time-value">' + dishes[key].freshTime + '</p><p id = "last-served-value">' + new Date(dishes[key].lastServed).customFormat("#hh#:#mm#") + '</p><p id = "next-refill-value">' + new Date(dishes[key].lastServed + dishes[key].freshTime * 60000).customFormat("#hh#:#mm#") + '</p><p id = "order-status-value">' + ORDER_STATE[dishes[key].orderStatus] + '</p>');
        
        if(dishes[key].orderStatus == 1) {
            $("#dish-" + key + " > .collapsible-body > .order-button").prop('disabled', true);
            $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "gray");
        }else if(dishes[key].orderStatus == 2){
            $("#dish-" + key + " > .collapsible-body > .order-button").text("SERVE");
            $("#dish-" + key + " > .collapsible-body > .order-button").css("background", "green");
            $("#dish-" + key + " > .collapsible-body > .order-button").on("click", function(){
               //ajax to update the order status 
            });
        }else{
            $("#dish-" + key + " > .collapsible-body > .order-button").on("click", function(){
               //ajax to place the order with dish id and user id and other info 
            });
        }
        
        if(sessionStorage.getItem("dishID") == dishes[key].id){
            $("#" + 'dish-' + key).addClass("active");
        }
    }); 
}

function updateStatus(){
    //do something to update the freshness/readiness
}
