$(document).ready(function() {
                  
    //todo: replace with real urls
    $("a#personal").siblings("span").text("manager_personal");
    $("a#restaurant").siblings("span").text("manager_restaurant");
    $("a#menu").siblings("span").text("manager_menu");
    $("a#status").siblings("span").text("manager_status");
    $("a#employee").siblings("span").text("manager_employee");
               
    $(".tab-title-container").on("click", function(){
        if(!$(this).hasClass("active-tab")){
            $("#main-frame").attr("src", ($(this).children("span").text()));
            $(".active-tab").removeClass("active-tab");
            $(this).addClass("active-tab");
        }
    });

});