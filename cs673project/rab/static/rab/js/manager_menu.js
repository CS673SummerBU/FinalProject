$(document).ready(function() {
    
    loadData();
    
    $(".dish-item").on("click", function(){
        sessionStorage.setItem("dishID", $(this).children("span#dish-id").text());
        $("#menu-detail").attr("src", $(this).children("span#url").text());
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
    
    $("#add-item-btn").on("click", function(){
        sessionStorage.removeItem("dishID");
        $("#menu-detail").attr("src", "manager_menu_detail.html");
        $(".selected").removeClass("selected");
    });

});

function loadData(){
    console.log("load");
    
    //todo: ajax to load the list of dishes
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
    
    let dishListRoot = $("#menu-list-container");
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<div id = "dish-' + key + '" class="dish-item"><p>' + dishes[key].name + '</p><span id = "url" style="display: none">manager_menu_detail.html</span><span id = "dish-id" style = "display:none">' + dishes[key].id + '</span></div>');
    });
    
    dishListRoot.append('<div id = "add-item-container"><img id= "add-item-btn" src="rab/static/rab/resources/plus.png" alt="Click to add an item"></div>');
    
}