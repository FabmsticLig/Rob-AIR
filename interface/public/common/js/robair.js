function setArrowActive(arrow) {
    $("#" + arrow).removeClass("btn-default");
    $("#" + arrow).addClass("active");
    $("#" + arrow).addClass("btn-primary");
}

var left = function() {
    stop();
    setArrowActive("left");
    robairros.left();
}

var right = function() {
    stop();
    setArrowActive("right");
    robairros.right();
}

var foward = function() {
    stop();
    setArrowActive("foward");
    robairros.foward();
}

var backward = function() {
    stop();
    setArrowActive("backward");
    robairros.backward();
}

var stop = function() {
    $(".active").removeClass("btn-primary");
    $(".active").addClass("btn-default");
    $(".active").removeClass("active");
    robairros.stop();
}

var setSpeed = function(speed) {
    robairros.setSpeed(speed);
    $('#speed').val(robairros.speed);
}
$('#speed').val(robairros.speed);

//Gestion evenement utilisateur

$('#speed').on("change", function() {
    setSpeed($(this).val());
});

var lastkeydown = 0;

$(document).keydown(function(e) {

    if (lastkeydown != e.which) {
        //console.log(e.which);
        switch (e.which) {
            case 37: // left
                left();
                lastkeydown=e.which;
                break;
            case 38: // up
                foward();
                lastkeydown=e.which;
                break;
            case 39: // right
                right();
                lastkeydown=e.which;
                break;
            case 40: // down
                backward();
                lastkeydown=e.which;
                break;
            case 107: // down
                setSpeed(robairros.speed + 5);
                break;
            case 109: // down
                setSpeed(robairros.speed - 5);
                break;
            default:
                return; // exit this handler for other keys
        }
    }
    if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40 || e.which == 107 || e.which == 109) {
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }
});

$(document).keyup(function(e) {
    switch (e.which) {
        case 37:
        case 38: // up
        case 39: // right
        case 40: // down
            lastkeydown=0;
            stop();
            e.preventDefault(); // prevent the default action (scroll / move caret)
            break;
        default:
            return; // exit this handler for other keys
    }
});


$('#left').mousedown(left).mouseup(stop);
$('#right').mousedown(right).mouseup(stop);
$('#foward').mousedown(foward).mouseup(stop);
$('#backward').mousedown(backward).mouseup(stop);





////////////////////////////// EVENT ROS /////////////////////////////////////

robairros.batteryChange = function(battery) {
    if (battery > 26) battery = 26;
    else if (battery < 21) battery = 21;
    $("#battery").removeClass();
    $("#battery").addClass("fa fa-battery-" + (battery - 21));
}

robairros.pingChange = function(ping) {
    if (ping>500)
        $("#ping").css('color', 'red');
    else if(ping>200) 
        $("#ping").css('color', 'orange');
    else {
        $("#ping").css('color', 'black');
    }
}