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
    } else if (shape === "circles") {
        for (var circle = 0; circle < 20; circle++) {
            drawCircle(canvas, context)
        }
    }

    drawText(canvas, context);
    drawBird(canvas, context);
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var backgroundColor = selectObj[index].value;
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

function drawCircle(canvas, context) {
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    context.arc(x, y, radius, 0, degreeToRadians(360), true);

    context.fillStyle = "lightblue";
    context.fill();
}

function degreeToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function updateTweets(tweets) {
    var tweetsSelction = document.getElementById("tweets");

    for (var i = 0; i < tweets.length; i++) {
        var tweet = tweets[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text.replace("\"", "'");
        tweetsSelction.options.add(option);
    }

    tweetsSelction.selectedIndex = 0;
}

function drawText(canvas, context) {
    //draw "I saw this tweet"
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    //draw "and all I got was this lousy t-shirt"
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt", canvas.width-20, canvas.height-40);
    
    //draw the tweet
    var selectTweet = document.getElementById("tweets");
    var index = selectTweet.selectedIndex;
    var tweet = selectTweet[index].value;

    context.font ="italic 1.2em serif";
    context.textAlign = "left";
    if (tweet.length > 60) {
        tweetArray = splitIntoLines(canvas, tweet);
        for (var i = 0; i < tweetArray.length; i++) {
            context.fillText(tweetArray[i], 30, 70+(i*25));        
        }
    } else {
        context.fillText(tweet, 30, 100);
    }
}

function drawBird(canvas, context) {
    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png";
    twitterBird.onload = function() {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    }
}

function splitIntoLines(canvas, tweet) {
    var lines;
    var strArray = [];
    if (tweet.length % 60 === 0) {
        lines = tweet.length / 60;
        console.log("first")//test
    } else {
        lines = Math.floor(tweet.length / 60) + 1;
        console.log(lines);//test
    }
    while (lines > 0) {
        strArray.push(tweet.substring((lines-1)*60, lines*60))
        lines--;
        console.log(strArray) //test
    }
    tweetArray = strArray.reverse();
    return tweetArray
}