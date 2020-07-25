var dishID = null;
var foodImage = null;

$(document).ready(function() {
    
    dishID = sessionStorage.getItem("dishID");
    console.log(sessionStorage.getItem("dishID"));
    if(dishID){
        loadData();
    }else{
        $("#delete-btn").css("display", "none");
    }

    $("#serve-dish").on("change", function(){
        let checked = $("#serve-dish").prop("checked");
        if(checked){
            if(dishID){
                //todo: ajax to add the dish to menu
                console.log("add");
            }else{
                alert("Save the dish before serving!!");
                $(this).prop("checked", false);
            }
            
        }else{
            //todo: ajax to remove the dish from menu
        }
    });
    
    $("#save-btn").on("click", function(){
        
        if(validateDish()){
            //ajax to save the dish
            let name = $("input#display-name").val();

            let cookTime = $("input#cook-time").val();

            let freshTime = $("input#fresh-time").val();

            console.log("save dish");
            
            //todo: set dishID on success
            parent.loadData();
        }else{
            alert("Dish Info Not Complete!!");
        }
        
    });
    
    $("#delete-btn").on("click", function(){
        //todo: ajax to delete the dish
        console.log("delete dish");
        parent.loadData();
    });
    
    $("input#food-image").on("change", function(event){
        let tgt = event.target || window.event.srcElement;
        let files = tgt.files;
        if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            console.log(fr.result);
            $("img#current-food-image").prop("src", fr.result);
            foodImage = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
    });

});

function loadData(){
    
    //todo: ajax to retrieve dish info by id
    let dish = {
        name: "Shrimp Cocktail",
        cookTime: 15,
        freshTime: 60,
        foodImageUrl: "../resources/shrimp-cocktail.jpg",
        menuID: 32
    };
    
    $("input#display-name").val(dish.name);
    
    $("input#cook-time").val(dish.cookTime);
    
    $("input#fresh-time").val(dish.freshTime);
    
    if(dish.foodImageUrl != null){
        $("img#current-food-image").prop("src", dish.foodImageUrl);
        $("img#current-food-image").show();
    }
    
    if(dish.menuID != null){
        $("#serve-dish").prop("checked", true);
    }
}

function validateDish(){
    if($("input#display-name").val() == ""){
        return false;
    }
    if($("input#cook-time").val() == ""){
        return false;
    }
    if($("input#fresh-time").val() == ""){
        return false;
    }
    
    return true;
}

