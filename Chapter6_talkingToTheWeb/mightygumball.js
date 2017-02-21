window.onload = function() {
    setInterval(function() {
        var newScriptElement = document.createElement("script");
        newScriptElement.setAttribute("src", "http://gumball.wickedlysmart.com/?callback=updateSales");
        newScriptElement.setAttribute("id", "jsonp");

        var oldScriptElement = document.getElementById("jsonp");
        var head = document.getElementsByTagName("head")[0];
        if (oldScriptElement) {
            head.replaceChild(newScriptElement, oldScriptElement);
        } else {
            head.appendChild(newScriptElement);
        }
    }
    , 3000)    
}

function updateSales(sales) {
        var salesDiv = document.getElementById("sales");
        for (var i = 0; i < sales.length; i++) {
            var sale = sales[i];
            var div = document.createElement("div");
            div.setAttribute("class", "saleItem");
            div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
            salesDiv.appendChild(div)
        }
    }
