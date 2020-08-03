var dishes;
var rest_id;
$(document).ready(function(){
    $('.collapsible').collapsible();
    rest_id = $('#rest_id').val();
    getMenu();
    
    window.setInterval(updateFreshness, 1000);
});

function getMenu() {

    $.get('menu', {id: rest_id}, (result) => {
        dishes = result
        loadData()
    });
}

function loadData(){

    let dishListRoot = $("#dish-list");
    dishListRoot.empty();
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<li id="dish-' + key + '"><div class="dish-header collapsible-header">' + dishes[key].name + '</div><div class="collapsible-body"><img class = "dish-image" src="' + dishes[key].foodImageUrl + '" alt="" width="100" height="100"><div class= "dish-info-table"><div class = "left-panel"><p class = "fresh-time">Best-taste Period (min)</p><p class = "last-served">Last Served At</p></div><div class = "right-panel"><p class = "fresh-time-value">' + dishes[key].freshTime + '</p><p class = "last-served-value">' 
        +   (((dishes[key].lastServed == 'none') ? "NOT SERVED TODAY" : (new Date(dishes[key].lastServed).customFormat("#hh#:#mm#")))) 
        + '</p></div></div></div></li>');
        
        
        if(sessionStorage.getItem("dishID") == dishes[key].id){
            $("#" + 'dish-' + key).addClass("active");
        }
    }); 
}

function updateFreshness(){
    $.get('menu', {id: rest_id}, (result) => {
        dishes = result
        Object.keys(dishes).forEach(key => {
            $("#dish-" + key + " > .collapsible-body > .dish-info-table > .right-panel > .last-served-value").text((((dishes[key].lastServed == 'none') ? "NOT SERVED TODAY" : (new Date(dishes[key].lastServed).customFormat("#hh#:#mm#")))) )
        })
    });
}

