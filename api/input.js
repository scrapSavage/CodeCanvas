const mouse = {x:0,y:0,b:0,lb:0,h:false};

let keys_down = {};

function init_input() {

    canvas.addEventListener("mousemove",(e) => {
    let rect = canvas.getBoundingClientRect()
    mouse.x = (e.clientX-rect.left)/canvas.offsetWidth*x_resolution
    mouse.y = (e.clientY-rect.top)/canvas.offsetHeight*y_resolution
    })
    document.body.onmousedown = function() { 
        mouse.b = 1
    }
    document.body.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        mouse.b = 2
    });
    document.body.onmouseup = function() {
        if (mouse.b != 2) {
        mouse.b = 0
        }
    }
    
    document.body.addEventListener("keydown", (e) => {
    	keys_down[e.key]=true;
    });
    document.body.addEventListener("keyup", (e) => {
    	keys_down[e.key]=false;
    });
}

function get_key_down(key) {
	return keys_down[key];
}