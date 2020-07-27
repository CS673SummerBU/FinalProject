$(document).ready(function() {
    
    getDishes();
    
    $("#add-item-btn").on("click", function(){
        sessionStorage.removeItem("dishID");
        $("#menu-detail").attr("src", "manager_menu_detail");
        $(".selected").removeClass("selected");
    });
});

var getDishes = () => {
    $.get('dishes', (dishes) => {
        loadData(dishes)
    });
};


function loadData(){

    let dishListRoot = $("#menu-list-items-container");
    dishListRoot.empty();
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<div id = "dish-' + key + '" class="dish-item"><p>' + dishes[key].name + '</p><span id = "url" style="display: none">manager_menu_detail</span><span id = "dish-id" style = "display:none">' + dishes[key].id + '</span></div>');
        /*if(sessionStorage.getItem("dishID") == dishes[key].id){
            $("#" + 'dish-' + key).addClass("selected");
            $("#menu-detail").attr("src", "manager_menu_detail");
        }*/
    }); 
    
    $(".dish-item").on("click", function(){
        sessionStorage.setItem("dishID", $(this).children("span#dish-id").text());
        $("#menu-detail").attr("src", $(this).children("span#url").text());
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
}
