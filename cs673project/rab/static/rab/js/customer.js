$(document).ready(function(){
    $('.collapsible').collapsible();
    
    loadData();
    
    window.setInterval(updateFreshness, 1000);
});

function loadData(){
    //insert dish info here
    let dishes = {
        0:{id: 25,
           name: "Beef Broccli",
           freshTime: 60,//fresh time in min
           lastServed: 1596317883091,//last served time in millis
           foodImageUrl: "../resources/shrimp-cocktail.jpg"//replace with real url or image stream
          },
        1:{id: 26,
           name: "Shrimp Cocktail",
           freshTime: 60,//fresh time in min
           lastServed: 1596317883091,//last served time in millis
          foodImageUrl: "../resources/shrimp-cocktail.jpg"
          },
        2:{id: 29,
           name: "Kong Pao Chicken",
           freshTime: 60,//fresh time in min
           lastServed: 1596317883091,//last served time in millis
          foodImageUrl: "../resources/shrimp-cocktail.jpg"
          },
        3:{id: 41,
           name: "French Fries",
           freshTime: 60,//fresh time in min
           lastServed: 1596317883091,//last served time in millis
          foodImageUrl: "../resources/shrimp-cocktail.jpg"
          }
    };
    
    let dishListRoot = $("#dish-list");
    dishListRoot.empty();
    
    Object.keys(dishes).forEach(key => {
        dishListRoot.append('<li id="dish-' + key + '"><div class="dish-header collapsible-header">' + dishes[key].name + '</div><div class="collapsible-body"><img class = "dish-image" src="' + dishes[key].foodImageUrl + '" alt="" width="100" height="100"><div class= "dish-info-table"><div class = "left-panel"><p class = "fresh-time">Best-taste Period (min)</p><p class = "last-served">Last Served At</p></div><div class = "right-panel"><p class = "fresh-time-value">' + dishes[key].freshTime + '</p><p class = "last-served-value">' + new Date(dishes[key].lastServed).customFormat("#hh#:#mm#") + '</p></div></div></div></li>');
        
        
        if(sessionStorage.getItem("dishID") == dishes[key].id){
            $("#" + 'dish-' + key).addClass("active");
        }
    }); 
}

function updateFreshness(){
    //do something to update the freshness
}

