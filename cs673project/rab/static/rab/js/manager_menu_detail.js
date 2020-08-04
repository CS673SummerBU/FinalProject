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

    $("#serve-dish").on("change", function(e){
        var tk = $(this).attr("data-token")
        console.log('serve-dish happened');
        let checked = $("#serve-dish").prop("checked");
        console.log(checked);
        let data = $('#serve-dish').serialize();
        let url = $('#serve-dish').attr("action");
        if(dishID) {
            console.log('DishID true');
            $("<input />").attr("type", "hidden")
                .attr("name", "dishID")
                .attr("value", dishID)
                .appendTo("#serve-dish");
            console.log('Input happened');
            console.log(url);
            //console.log(data);
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: url,
                data: {'dishID':dishID,'serve-dish':checked,'csrfmiddlewaretoken': tk},        
                success: function (response){
                    sessionStorage.setItem("restaurantID", 1);
                    sessionStorage.setItem("userID", 1);
                    $(this).prop("checked", response.serve);
                },
            });

            /*
            $.post(url, formData, (result) => {
                console.log($("#serve-dish").val());
                $("#serve-dish").val();
                sessionStorage.setItem("restaurantID", 1);
                sessionStorage.setItem("userID", 1);
                $(this).prop("checked", result.serve);
            },'json'
            );
            */
        } else {
            alert("Save the dish before serving!!");
            $(this).prop("checked", false);
        }
    });
    
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
    if (dishID == undefined) {
        $("#delete-btn").css("display", "");
        sessionStorage.setItem("dishID", dish.id);
        dishID = dish.id;
    }

    dishID = dish.id
    $("input#display-name").val(dish.name); //first part is <id
    $("input#cook-time").val(dish.cookTime);
    $("input#fresh-time").val(dish.freshTime);
    
    if(dish.foodImageUrl != null){
        $("img#current-food-image").prop("src", dish.foodImageUrl);
        $("img#current-food-image").show();
    }

    if(dish.serve == true){
        $("#serve-dish").prop("checked", true);
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
    
    if($("input#cook-time").val() <= 0){
        alert("Please enter Cook Time greater than 0!!")
        return false;
    }

    if($("input#fresh-time").val() <= 0){
        alert("Please enter Fresh Time greater than 0!!")
        return false;
    }

    return true;
}

