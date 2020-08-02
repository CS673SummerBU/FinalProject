$(document).ready(function() {
    loadData();
    
    window.setInterval(loadData, 1000);
});

function loadData(){
    //ajax to load details of all orders
    let orders = {
        //order placed by waiter, past due
        0:{id: 25,
          name: "Beef Broccli",
          placedBy: "Ali Baba",
          dueTime: 1596323501226},
        //order placed by system
        1:{id: 26,
          name: "Shrimp Cocktail",
          placedBy: "",
          dueTime: 1596441501226}
    };
    
    let orderRoot = $(".limiter");
    orderRoot.empty();
    
    Object.keys(orders).forEach(key => {
        let dueTimeLeft = orders[key].dueTime - new Date().getTime();
        
        orderRoot.append('<div class="container-order"><div id = "order-' + orders[key].id + '" class="wrap-order"><span class="order-id" style="display: none">' + orders[key].id + '</span><p class="order-title">' + orders[key].name + '</p><p class="order-due">' + millisToTimeString(dueTimeLeft) + '</p><button class="ready-button">READY</button></div></div>');
        
        if(dueTimeLeft < 0){
            $("#order-" + orders[key].id).addClass("past-due");
        }
    });
    
    $(".ready-button").on("click", function(){
        //ajax to set the order status to ready for pickup
        console.log("order " + $(this).siblings(".order-id").text() + " ready!");
    })
}
