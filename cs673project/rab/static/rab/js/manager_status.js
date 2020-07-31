$(document).ready(function() {

    getMenus();

});

var getMenus = () => {
    $.get('menus', (menus) => {
        loadData(menus)
    });
};

function loadData(menus){

    let menuListRoot = $("#status-list-container");
    menuListRoot.empty();
    console.log(menus)    
    Object.keys(menus).forEach(key => {
        menuListRoot.append('<div id = "menu-' + key + '" class="status-item"><p>' + menus[key].name + '</p><span id = "url" style="display: none">manager_status_detail</span><span id = "menu-id" style = "display:none">' + menus[key].id + '</span></div>');
    });

    $(".status-item").on("click", function(){
        sessionStorage.setItem("menuID", $(this).children("span#menu-id").text());
        $("#status-detail").attr("src", $(this).children("span#url").text());
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
}


