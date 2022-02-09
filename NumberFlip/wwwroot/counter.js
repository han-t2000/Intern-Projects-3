
function generateCounter(url, rowID) {
    //Global Variables
    var initialValue = reloadNumber(url);
    var newValue;
    var delay;
    var flipSpeed;
    var count;
    var toSubtract;

    // Function to perform the flipping animation (perform each time when there is a difference)
    function doFlipAnimation(flipSpeed, rowID, currIndex) {

        var currentNumberElement = $("#counter" + rowID + " .col-" + currIndex);
        //var currentNumberElement = $(".number:eq(" + numberIndex + ")");

        var currentNumber = Number(currentNumberElement.attr("data-number"));
        currentNumber++;

        if (currentNumber > 9) {
            currentNumber = 0;
            currIndex++;
            toSubtract++;
            doFlipAnimation(flipSpeed * 2, rowID, currIndex);
        }

        // This line starts flipping
        currentNumberElement.addClass("flip");

        setTimeout(function () {
            currentNumberElement.attr("data-number", currentNumber);
            currentNumberElement.removeClass("flip");
            count++;
        }, flipSpeed);
    }


    // Function to get a random number from the API
    function reloadNumber(url) {
        var value;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            dataType: "text", //string
            success: function (result) {
                value = result;
            }
        });
        return value;
    }

    // Function to update the counter instantly to start from the previous newValue (start from the initialValue if there is no previous newValue)
    function updateCounter(defVal) {
        var currIndex = defVal.length - 1;
        for (let j = 0; j < defVal.length; j++) {
            $('#counter' + rowID + ' .col-' + j).attr('data-number', defVal[currIndex]);
            currIndex--;
        }
    }

    // Function to call the doFlipAnimation function repeatedly after a delay based on the difference
    function setsIntervalX(callback, delay, repetitions) {
        var x = 0;
        var intervalID = setInterval(function () {
            callback();
            x++;
            if (x == repetitions) {
                clearInterval(intervalID);
                var interValID2 = setInterval(function () {
                    if (count - toSubtract == repetitions) {
                        start();
                        clearInterval(interValID2);
                    }
                }, 10);
            }
        }, delay);
    }

    //// Function to initialize the size of the counter from right to left
    //function CounterSize(inputSize = 9) {
    //    for (let i = inputSize - 1; i >= 0; i--) {
    //        $("body").append('<span class="number" id="span' + i + '" data-number="0"><span class="primary"></span><span class= "secondary"></span></span>');
    //    }
    //}


    // Function to initialize the speed of each component
    function CounterSpeed(initialSpeed) {
        $('head').children('#' + rowID).remove();
        $('head').append('<style id="' + rowID + '"></style>');

        for (let j = 0; j < $('#counter' + rowID).children().length; j++) {
            var classID = '#counter' + rowID + ' .col-' + j;
            $('#' + rowID).append(classID + '.flip .primary:before{animation-duration: ' + initialSpeed + 'ms !important;} ' + classID + '.flip .primary:after{animation-duration: ' + initialSpeed + 'ms !important; animation-delay: ' + initialSpeed + 'ms !important;}');
            initialSpeed *= 2;
        }
    }

    // Function to start the program
    function start() {
        count = 0;
        toSubtract = 0;
        newValue = reloadNumber(url);
        console.log("counter" + rowID + ": initial->", initialValue);
        var diffValue = newValue - initialValue;
        //console.log("row" + rowId + ": newValue->", newValue);
        console.log("counter" + rowID + ": new->", newValue);

        initialValue = newValue;

        // Threshold to keep track of speed based on the difference between each number
        if (diffValue == 0) {
            start();
            return;
        }
        else if (diffValue <= 5) {
            delay = 3200;
            flipSpeed = 3000;
        }
        else if (diffValue <= 10) {
            delay = 2200;
            flipSpeed = 2000;
        }
        else if (diffValue <= 50) {
            delay = 200;
            flipSpeed = 150;
        }
        else {
            delay = 100;
            flipSpeed = 80;
        }

        CounterSpeed(flipSpeed / 2);

        setsIntervalX(function () {
            doFlipAnimation(flipSpeed, rowID, 0);
        }, delay, diffValue);
    }

    //Initialize the program
    updateCounter(initialValue);
    start();
}

$(document).ready(function () {
    $('.counter').each(function (i, obj) {
        let digits = obj.getAttribute("data-digits");
        let body = "";
        for (var i = digits - 1; i >= 0; i--) {
            body += '<span class="number col-' + i + '" data-number="0"><span class="primary" ></span><span class="secondary"></span></span>';
        }
        obj.innerHTML = body;
        generateCounter(obj.getAttribute("data-api"), obj.id.replace("counter", ""));
    });
});