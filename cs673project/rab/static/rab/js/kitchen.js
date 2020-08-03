$(document).ready(function() {

    getOrders();
    
    window.setInterval(getOrders, 1000);
});

var getOrders = () => {
    $.get('orders', (orders) => {
        loadData(orders)
    });
};

function loadData(orders){
    let orderRoot = $(".limiter");
    orderRoot.empty();
    
    Object.keys(orders).forEach(key => {
        console.log(orders[key].dueTime);        
        let dueTimeLeft = orders[key].dueTime - new Date().getTime();
        console.log(dueTimeLeft);
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
