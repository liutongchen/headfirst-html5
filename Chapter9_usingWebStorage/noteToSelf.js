window.onload = function() {
    //set up the add button
    var addButton = document.getElementById("add_button");
    addButton.onclick = createSticky;

    //set up the clear button
    var clearLSButton = document.getElementById("clear_button");
    clearLSButton.onclick = function() {
        localStorage.clear();
    }

    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var stickyObj = JSON.parse(localStorage[key]); //notice here the "stickyObj" needed to be parsed
        addStickyToDOM(key, stickyObj);
    }
};

function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    var span = document.createElement("span"); 

    sticky.setAttribute("id", key)
    span.setAttribute("class", "sticky")
    sticky.style.backgroundColor = stickyObj.color;
    span.innerHTML = stickyObj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick = deleteSticky;
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var stickiesArray = getStickiesArray();
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;
    var stickyObj = {
        "value": value,
        "color": color
    }

    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));

    addStickyToDOM(key, stickyObj);
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray");

    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
        console.log(stickiesArray); //test
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}

function deleteSticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
        key = e.tagName.parentNode.id;
    }

    localStorage.removeItem(key);
    console.log("remove"); //test
    var stickiesArray = getStickiesArray();
    var index = stickiesArray.indexOf(key);
    console.log("index&key: ", index, " ", key); //test
    if (index >= 0) {
        stickiesArray.splice(index, 1);
    }
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    removeStickyFromDOM(key)
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}