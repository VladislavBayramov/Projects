    var arr = [
    "https://kde.link/test/0.png",
    "https://kde.link/test/1.png",
    "https://kde.link/test/2.png",
    "https://kde.link/test/3.png",
    "https://kde.link/test/4.png",
    "https://kde.link/test/5.png",
    "https://kde.link/test/6.png",
    "https://kde.link/test/7.png",
    "https://kde.link/test/8.png",
    "https://kde.link/test/9.png"
    ];

    var height, width, columns, randIndex, id, n = 0, k = 0, j = 0, divActive = "", imgActive = "", count = 0, steps=0, found = 0, display,

    widthAtr = document.getElementById('width'),
    heightAtr = document.getElementById('height'),
    stepAtr = document.getElementById('step'),
    timeAtr = document.getElementById('time');


    //Timer
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (++timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    window.onload = function () {
        var startTime = 0;
        display = document.querySelector('#time');
        startTimer(startTime, display);
    };

    //Get random integer
    function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Getjson and creating variable values
    $.getJSON("https://kde.link/test/get_field_size.php", function(response){
        var items = [];
        $.each(response, function(key, val){
            if (key == "width"){
                width = val; 
                }                 
                else if (key == "height"){
                    height = val;
                } 
    });

    columns = height * (width/2);
    // add images to the page    
    while (k < 2) {
        for ( i = 0 ; i < columns; i++ ) {
            n++;
            if (i < 10){
                $("#container").append("<div class='wrap_image' id='image"+n+"'><img src='https://kde.link/test/"+i+".png'></div>");
            } else if (i >= 10) {
                j = i % 10;
                $("#container").append("<div class='wrap_image' id='image"+n+"'><img src='https://kde.link/test/"+j+".png'></div>");
            }
            // mix pictures
            function shuffle() {
                    var children = $("#container").children();
                    var child = $("#container div:first-child");
                    var array_img = new Array();
                for (q=0; q < children.length; q++) {
                    array_img[q] = $("#"+child.attr("id")+" img").attr("src");
                    child = child.next();
                }         
                var child = $("#container div:first-child");          
                for (z=0; z < children.length; z++) {
                    randIndex = getRandomInt(0, array_img.length - 1);
                    $("#"+child.attr("id")+" img").attr("src", array_img[randIndex]);
                    array_img.splice(randIndex, 1);
                    child = child.next();
                }
            }

            //Field size on page
            widthAtr.innerText = width;
            heightAtr.innerText = height;

            // game functionality
            $(document).ready(function() {
                $("img").hide();
                $("#container div").click(openCard);

                shuffle();

                function openCard() {

                    id = $(this).attr("id");

                    if ($("#"+id+" img").is(":hidden")) {
                        $("#container div").unbind("click", openCard);
                        $("#"+id+" img").slideDown('fast');

                        if (imgActive == "") {
                            divActive = id;
                            imgActive = $("#"+id+" img").attr("src");
                            setTimeout(function() {
                                $("#container div").bind("click", openCard)
                                steps++;
                                stepAtr.innerText = steps;
                            }, 200);
                        } else {
                            currentopened = $("#"+id+" img").attr("src");
                            if (imgActive != currentopened) {
                            // close again
                                setTimeout(function() {
                                    $("#"+id+" img").slideUp('fast');
                                    $("#"+divActive+" img").slideUp('fast');
                                    divActive = "";
                                    imgActive = "";
                                }, 200);
                            } else {
                            // found
                                $("#"+id+" img").addClass("founded");
                                $("#"+divActive+" img").addClass("founded");
                                found++;
                                divActive = "";
                                imgActive = "";
                            }
                        
                            setTimeout(function() {
                                $("#container div").bind("click", openCard)
                            }, 200);
                        }
                        if (found === columns) {
                            alert('You win! Steps number is: ' + steps + '!' + ' Finish time is: '+timeAtr.innerText +'!' + ' Refresh page for new game!');
                        }
                    }
                }
            });
        }
        n=n;
        k++;
    }
    
    // calculation of the width of the playing field
    if (width == 1) {
        $('#container').css('width','110px')
    } else if (width == 2) {
        $('#container').css('width','220px')
    } else if (width == 3) {
        $('#container').css('width','330px')
    } else if (width == 4) {
        $('#container').css('width','440px')
    } else if (width == 5) {
        $('#container').css('width','550px')
    } else if (width == 6) {
        $('#container').css('width','660px')
    } else if (width == 7) {
        $('#container').css('width','770px')
    } else if (width == 8) {
        $('#container').css('width','880px')
    }
    });