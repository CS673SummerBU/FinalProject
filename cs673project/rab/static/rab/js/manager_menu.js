$(document).ready(function() {
    
    getDishes();
    
    $("#add-item-btn").on("click", function(){
        sessionStorage.removeItem("dishID");
        $("#dish-detail").attr("src", "manager_menu_detail");
        $(".selected").removeClass("selected");
    });

});

var getDishes = () => {
    $.get('dishes', (dishes) => {
        loadData(dishes)
    });
};

function loadData(dishes){
    
    let dishListRoot = $("#dish-list-items-container"); //changed <div id=> in manager_menu.html
    dishListRoot.empty();
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<div id = "dish-' + key + '" class="dish-item"><p>' + dishes[key].name + '</p><span id = "url" style="display: none">manager_menu_detail</span><span id = "dish-id" style = "display:none">' + dishes[key].id + '</span></div>');

    }); 
    
    $(".dish-item").on("click", function(){
        sessionStorage.setItem("dishID", $(this).children("span#dish-id").text());
        $("#dish-detail").attr("src", $(this).children("span#url").text()); //changed <div id=> in manager_menu.html
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
}
