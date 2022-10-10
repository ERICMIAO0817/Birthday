var loadFile = function(event) {
    var image = document.getElementById('display-image');
    image.src = URL.createObjectURL(event.target.files[0]);
};

var loadFile2 = function(event) {
    var image = document.getElementById('display-image2');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
        x.className += " subnav responsive";
    } else {
        x.className = "navbar";
    }
}