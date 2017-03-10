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
        var value = stickiesArray[key];
        addStickyToDOM(value);
    }
}

function addStickyToDOM(value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    var span = document.createElement("span"); //why add a span element? for css purpose?
    span.setAttribute("class", "sticky")
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var time = new Date().getTime();
    var key = "sticky_" + time;
    var stickiesArray = getStickiesArray();

    localStorage.setItem(key, value); //Why are key/value pairs add to the localStorage again since they are kept in an array?
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));

    addStickyToDOM(value);
}

function getStickiesArray() {
    var stickiesArray = localStorage["stickiesArray"];
    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }

    return stickiesArray;
}