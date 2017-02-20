window.onload = function() {
    var url = "http://gumball.wickedlysmart.com/gumball/gumball.html";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    //if newer browser version
    request.onload = function() {
        if (request.status === 200) {
            updateSales(request.responseText);
        }
    };
    //if older browser version
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            updateSales(request.responseText);
        }
    }
    request.send(null);

    function updateSales(responseText) {
        var salesDiv = document.getElementById("sales");
        var sales = JSON.parse(responseText);
        for (var i = 0; i < sales.length; i++) {
            var sale = salses[i];
            var div = document.createElement("div");
            div.setAttribute("class", "saleItem");
            div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
            salesDiv.appendChild(div)
        }
    }
}

