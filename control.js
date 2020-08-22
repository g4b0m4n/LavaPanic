var gout = null, splat = null, Ngotas = 0, frames = 0, change_tile = false, context, controller, level = 1, loop, width, height;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 700;
height = context.canvas.height;
context.canvas.width = 500;
width = context.canvas.width;

/*
var magma_block = new Image();
var stone_block = new Image();
var cora = new Image();
var steve_stand = new Image();
var steve_walk = new Image();
var steve_stand_left = new Image();
var steve_walk_left = new Image();
var lava = new Image();
var empty = new Image();
/*
magma_block.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/magma-block.png";
stone_block.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/stone.jpg";
cora.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/cora.png";
steve_stand.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/steve-stand.png";
steve_walk.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/steve-walk.png";
steve_stand_left.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/steve-stand-left.png";
steve_walk_left.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/steve-walk-left.png";
lava.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/lava-bucket.png";
empty.src = "https://raw.githubusercontent.com/g4b0m4n/LavaPanic/master/empty-bucket.png";
*/

var stone_block = "stone_block";
var magma_block = "magma_block";
var steve_stand = "steve_stand";
var steve_walk = "steve_walk";
var steve_stand_left = "steve_stand_left";
var steve_walk_left = "steve_walk_left";
var cora = "cora";
var lava = "lava_bucket";
var empty = "empty_bucket";

class Steve {

    constructor(x, y, w, h) {
        this.tile = "steve_stand";
        this.jumping = false;
        this.health = 10;
        this.x = x;
        this.w = w;
        this.h = h;
        this.y = y;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.last_left = false;
    }
}
let steve = new Steve(200, 230, 100, 170);
let steve2 = new Steve(200, 530, 100, 170);
//console.log(steve.tile +"\n"+ steve.x +"\n"+ steve.last_left);

class Bucket {

    constructor() {
        this.xl = 0;
        this.xr = 0;
        this.y = 0;
        this.w = 50;
        this.h = 50;
        this.y_velocity = 1;
        this.tile = empty;
        this.bucket_full = false;
        this.health = 10;
    }
    setxl(value) {
        bucket.xl = value-30;
    }
    setxr(value) {
        bucket.xr = value+80;
    }
    sety(value) {
        bucket.y = value+70;
    }

    getxl() {
        return bucket.xl;
    }
    getxr() {
        return bucket.xr;
    }
    gety() {
        return bucket.y;
    }
}
bucket = new Bucket();
bucket2 = new Bucket();

class Gout {

    constructor() {
        Ngotas++;
        //size
        this.x = 50+(Math.floor(Math.random()*4)+1)*100;
        this.y = 100;
        this.h = 4;
        this.w = 4;
    }

    colision(object) {

        if (object.w > this.x && object.h > this.y ||
            object.y < this.h && object.x < this.w) {

            //play sound
            return true;
        } else {
            return false;
        }
    }
}
controller = {

    left: false,
    right: false,
    up: false,
    /*
    touchListener: function(event) {
        event.preventDefault();
        var touch_state = event.type == "touchstart"?true:false;
        switch (event.touches[0].pageX < 250) {
            case true:
                controller.left = touch_state;
                break;
            case false:
                controller.right = touch_state;
                break;
        }
        if (event.touches[0].pageY < 200) {controller.up = touch_state;}
    },*/
    mouseListener: function(event) {
        var touch_state = event.type == "mousedown"?true: false;

        switch (event.clientX < 250) {
            case true:
                controller.left = touch_state;
                break;
            case false:
                controller.right = touch_state;
                break;
        }
        if (event.clientY < 200) {
            controller.up = touch_state;
        }
    },
    keyListener: function() {
        var key_state = event.type == "keydown"?true: false;

        switch (event.keyCode) {

            case 37: //left
                controller.left = key_state;
                break;
            case 38: //up
                controller.up = key_state;
                break;
            case 39: //right
                controller.right = key_state;
                break;
        }
    }/*keyListener end*/
}; /*controller end*/

loop = function() {

    //background & hearts
    for (let i = 0; i < width/100; i++) {
        context.drawImage(document.getElementById(magma_block), i*100, 0, 100, 100);
        context.drawImage(document.getElementById(cora), 10+steve.health*(5*i), 10, 50, 50);

        for (let s = 1; s < height/100; s++) {
            context.drawImage(document.getElementById(stone_block), i*100, s*100, 100, 100);
        }
    }
    //score
    context.font = "30px Courier New bold";
    context.fillStyle = "#ffffff";
    context.fillText("capacity: "+(10-bucket.health)+"/10", width-200, 50);

    //bucket
    if (bucket.health == 0) {
        bucket.tile = full;
    } else {
        bucket.tile = empty;
    }
    bucket.setxl(steve.x);
    bucket.setxr(steve.x);
    bucket.sety(steve.y);

    if (steve.last_left) {
        context.drawImage(document.getElementById(bucket.tile), bucket.xl, bucket.y, 50, 50);
    } else {
        context.drawImage(document.getElementById(bucket.tile), bucket.xr, bucket.y, 50, 50);
    }

    //steve
    steve.y_velocity += 1.5; // gravity
    steve.x += steve.x_velocity;
    steve2.x += steve2.x_velocity;
    steve.y += steve.y_velocity;
    steve.x_velocity *= 0.9; // friction
    steve.y_velocity *= 0.9; // friction
    gout?gout.y+=2:false;

    //tile
    context.drawImage(document.getElementById(steve.tile), steve.x, steve.y, steve.w, steve.h);

    if (controller.up && steve.jumping == false) {
        steve.y_velocity -= 20;
        steve.y += steve.y_velocity;
        steve.jumping = true;
    }

    if (controller.left) {
        steve.x_velocity += -0.5;
        steve.x += steve.x_velocity;
        steve.last_left = true;

        if (frames%10 == 0) {
            if (change_tile) {
                change_tile = false;
            } else {
                change_tile = true;
            }
        }
        if (change_tile) {
            steve.tile = steve_stand_left;
            steve2.tile = steve_stand_left;
        } else {
            steve.tile = steve_walk_left;
            steve2.tile = steve_walk_left;
        }

    } else if (controller.right) {
        steve.x_velocity += 0.5;
        steve.x += steve.x_velocity;
        steve.last_left = false;

        if (frames%10 == 0) {
            if (change_tile) {
                change_tile = false;
            } else {
                change_tile = true;
            }
        }
        if (change_tile) {
            steve.tile = steve_stand;
            steve2.tile = steve_stand;
        } else {
            steve.tile = steve_walk;
            steve2.tile = steve_walk;
        }
    } else if (steve.last_left) {
        steve.tile = steve_stand_left;
        steve2.tile = steve_stand_left;
    }
    // if steve is falling below floor line
    if (steve.y > 230) {

        steve.jumping = false;
        steve.y = 230;
        steve.y_velocity = 0;

    }
    // if steve is going off the left of the screen
    if (steve.x < 0) {

        steve.x = 0;
        bucket_full = false;

    }

    // if steve goes past right boundary
    else if (steve.x > 400) {

        steve.x = 400;
        bucket.bucket_full = false;

    } else if (steve2.x > 400 || steve2.x < 0) {

        let current = steve2.x;
        setTimeout(() => {
            steve2.x = current;
        }, 5000);
        steve2.x_velocity *= -1;
        steve2.x += steve.x_velocity;

        if (bucket.bucket_full)
            bucket2.bucket_full =
        bucket2.bucket_full?true: false;

    }

    // if steve hits his head with the roof
    else if (steve.y < 100) {

        steve.y = 100;
    }

    //bucket2
    if (bucket2.health == 0) {
        bucket2.tile = full;
    } else {
        bucket2.tile = empty;
    }
    bucket2.setxl(steve2.x);
    bucket2.setxr(steve2.x);
    bucket2.sety(steve2.y);

    if (steve2.last_left) {
        context.drawImage(document.getElementById(bucket2.tile), bucket2.getxl, bucket2.gety, 50, 50);
    } else {
        context.drawImage(document.getElementById(bucket2.tile), bucket2.getxr, bucket2.gety, 50, 50);
    }

    //steve2
    //tile
    context.drawImage(document.getElementById(steve2.tile), steve2.x, steve2.y, steve2.w, steve2.h);

    //gout

    //velocity aka level
    //document.getElementById("level").setAttribute("value", level);
    //level = document.getElementById("level").value;
    //color
    context.fillStyle = "#FF4500";
    //splat draw
    if (Ngotas>1) {
        setTimeout(context.fillRect(splat-50,
            398, 100, 2), 2000);
        if (steve.x > splat-50 &&
        steve.x < splat+50)steve.health--;
    }
        if (gout) {
            context.fillRect(gout.x, gout.y,
            gout.w, gout.h); console.log("draw");
            console.log(gout.x+"x"+gout.y);
            //colision //gout true
            if (gout.colision(steve) || gout.colision(bucket)) {
                bucket.health-=1;steve.health-=1;
            } else if (gout.y > 400) {
                splat = gout.x;
                console.log("splat");
                gout = null;
            }
        //creation
       } else {
            gout = new Gout(); console.log("gout");
        }
        //console.log(steve.health+"<br>"+bucket.health
        if (steve.health==0){
            context.fillStyle = "#000000";
            context.fillRect(0,0,width,height);
            context.fillStyle = "#330000";
            context.font = "20px Courier New bold";
            context.fillText("You died!", width/2, height/2);
        } else {
        // call update when the browser is ready to draw again
        setInterval(window.requestAnimationFrame(loop), 66);
        frames++;
        }
    }//loop

    window.addEventListener("mousedown", controller.mouseListener, false);
    window.addEventListener("mouseup", controller.mouseListener, false);
    window.addEventListener("touchstart", controller.touchListener, false);
    window.addEventListener("touchend", controller.touchListener, false);
    window.addEventListener("touchcancel", controller.touchListener, false);
    //window.addEventListener("touchmove", controller.touchListener,false);
    window.addEventListener("keydown", controller.keyListener);
    window.addEventListener("keyup", controller.keyListener);
    window.requestAnimationFrame(loop); //draw first frame