window.onload = function() {
    var previewButton = document.getElementById("previewButton");
    previewButton.onclick = previewHandler;
}

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context);

    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;
    if (shape === "squares") {
        for (var square = 0; square < 20; square++) {
            drawSquare(canvas, context);
        }
    }
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var backgroundColor = selectObj[index].value; //omit options here
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}