var dishID;
var foodImage = null;

$(document).ready(function() {
    
    dishID = sessionStorage.getItem("dishID");
    //console.log(sessionStorage.getItem("dishID"));
    if(dishID){
        getDish(dishID);
    }else{
        $("#delete-btn").css("display", "none");
    }
    /*
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
    */
    $("#save-btn").on("click", function(e){
        if(validateDish()) {
            if(dishID){
                $("<input />").attr("type", "hidden")
                .attr("name", "dishID")
                .attr("value", dishID)
                .appendTo("#manager-dish-info");
            }
            var formData = new FormData($('#manager-dish-info').get(0));
            console.log('prior to ajax code:')
            console.log(dishID)

            $.ajax({
                url: $('#manager-dish-info').attr("action"),
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {
                    console.log('after success:')
                    console.log(dishID)
                    loadData(data);
                    parent.getDishes();
                }
            });
        }
        
        /*
        if(validateDish()){
            if(dishID) {
                $("<input />").attr("type","hidden")
                .attr("name","dishID")
                .attr("value",dishID)
                .appendTo("#manager-dish-info");
            }
            let data = $('#manager-dish-info').seralize();
            let url = $('#manager-dish-info').attr("action");
            $.post(url,data, (result) => {
                loadData(result);
                parent.getDishes();
            },'json'
            );
        }
        */
    });
    
    $("#delete-btn").on("click", function(){
        $.get("dish_delete", {dishID: dishID}, (result) => {
            sessionStorage.removeItem("dishID");
            dishID = undefined;
            location.reload();
            parent.getDishes();
            console.log("delete dish");
        });
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

var getDish = (dishID) => {
    $.get('dishes', {dishID: dishID}, (dish) => {
        loadData(dish)
    });
}

function loadData(dish){
    console.log('after loadData call:')
    console.log(dishID)
    if (dishID == undefined) {
        $("#delete-btn").css("display", "");
        sessionStorage.setItem("dishID", dish.id);
        dishID = dish.id;
    }
    console.log('after loadData + dishID == undefined call:')
    console.log(dishID)

    dishID = dish.id
    $("input#display-name").val(dish.name); //first part is <id
    $("input#cook-time").val(dish.cookTime);
    $("input#fresh-time").val(dish.freshTime);
    $("select#serve").val(dish.serve);
    
    if(dish.foodImageUrl != null){
        $("img#current-food-image").prop("src", dish.foodImageUrl);
        $("img#current-food-image").show();
    }

}

function validateDish(){
    if($("input#display-name").val() == ""){
        alert("Please enter Dish name!!")
        return false;
    }
    if($("input#cook-time").val() == ""){
        alert("Please enter Cook Time!!")
        return false;
    }
    if($("input#fresh-time").val() == ""){
        alert("Please enter Fresh Time!!")
        return false;
    }
    
    return true;
}

