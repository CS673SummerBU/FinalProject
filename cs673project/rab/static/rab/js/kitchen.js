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
    let orderRoot = $("#order-list");
    orderRoot.empty();
    
    Object.keys(orders).forEach(key => {
      console.log(orders[key].dueTime);        
      let dueTimeLeft = orders[key].dueTime - new Date().getTime();
      console.log(dueTimeLeft);
      orderRoot.append('<div class="container-order"><div id = "order-' + orders[key].id + '" class="wrap-order"><span class="order-id" style="display: none">' + orders[key].id + '</span><p class="order-title">' + orders[key].name + '</p><p class="order-due">' + millisToTimeString(dueTimeLeft) + '</p><button class="ready-button">READY</button></div></div>');

      if(dueTimeLeft < 0){
        $("#order-" + orders[key].id).addClass("past-due");
      }
      if (orders[key].orderStatus == 2){
        $("#order-" + key + ".ready-button").click(() =>{
          //ajax to set the order status to ready for pickup
          console.log('CLICK HAPPENS')
          setStatus(orders[key].id, orders[key].orderStatus)
          console.log("order " + $(this).siblings(".order-id").text() + " ready!");
        });
      }
    });
}

function setStatus(menuID,statusID) {
    //console.log('setStatus Happens');
    $.get('set_status',{menuitem:menuID, status:statusID}, (result) =>{});
}

