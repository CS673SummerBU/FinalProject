$(document).ready(function() {
    
    loadData();
    
    $(".status-item").on("click", function(){
          sessionStorage.setItem("menuID", $(this).children("span#menu-id").text());
        $("#status-detail").attr("src", $(this).children("span#url").text());
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });

});

function loadData(){
    console.log("load");
    
    //todo: ajax to load the list of dishes by restaurant id
    //sample return:
    let dishes = {
        0:{id: 25,
        name: "Beef Broccli"},
        1:{id: 26,
        name: "Shrimp Cocktail"},
        2:{id: 29,
        name: "Kong Pao Chicken"},
        3:{id: 41,
        name: "French Fries"}
    };
    
    let dishListRoot = $("#status-list-container");
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<div id = "dish-' + key + '" class="status-item"><p>' + dishes[key].name + '</p><span id = "url" style="display: none">manager_status_detail</span><span id = "menu-id" style = "display:none">' + dishes[key].id + '</span></div>');
    });
}