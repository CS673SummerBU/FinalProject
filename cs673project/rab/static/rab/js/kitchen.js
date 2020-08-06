var orders;
$(document).ready(function() {
    getOrders();
    window.setInterval(getOrders, 1000);
});

var getOrders = () => {
    $.get('orders', (result) => {
        orders = result
        loadData()
    });
};

function loadData(){
    let orderRoot = $(".limiter");
    orderRoot.empty();
    
    Object.keys(orders).forEach(key => {
      orders[key].dueTimeLeft = new Date(orders[key].dueTime).customFormat("#hh#:#mm#");
      orderRoot.append('<div class="container-order"><div id = "order-' + orders[key].id + '" class="wrap-order"><span class="order-id" style="display: none">' + orders[key].id + '</span><p class="order-title">' + orders[key].name + '</p><p class="order-due">' + orders[key].dueTimeLeft + '</p><button class="ready-button">READY</button></div></div>');

      //orders[key].dueTimeLeft = orders[key].dueTime - new Date().getTime();
      //orderRoot.append('<div class="container-order"><div id = "order-' + orders[key].id + '" class="wrap-order"><span class="order-id" style="display: none">' + orders[key].id + '</span><p class="order-title">' + orders[key].name + '</p><p class="order-due">' + millisToTimeString(orders[key].dueTimeLeft) + '</p><button class="ready-button">READY</button></div></div>');

      if(orders[key].dueTimeLeft < 0){
        $("#order-" + orders[key].id).addClass("past-due");
      }
      $("#order-" + orders[key].id + " > .ready-button").click(() =>{
        //ajax to set the order status to ready for pickup
        setStatus(orders[key].id, orders[key].orderStatus)
        console.log("order " + $(this).siblings(".order-id").text() + " ready!");
      });

    });
}

function setStatus(menuID,statusID) {
    $.get('set_status',{menuitem:menuID, status:statusID}, (result) =>{});
}

