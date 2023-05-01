function draw_window(w) {
    rectfill(w.data.x,w.data.y,w.data.w+w.data.x,w.data.h+w.data.h,w.data.bg)
    rectfill(w.data.x,w.data.y,w.data.x+w.data.w,w.data.y+8,0)
    printString(w.data.title,w.data.x,w.data.y,20,32)
    w.buttons.forEach(b => {
        rectfill(w.data.x+b.x,w.data.y+b.y,w.data.x+b.x+b.w-1,w.data.y+b.y+b.h-1,b.bg)
        printString(b.txt,b.x+w.data.x,b.y+w.data.y,0,32);
    });
    w.canvases.forEach(c => {
        for (let x=0;x<c.data.w;x++) {
            for (let y=0;y<c.data.h;y++) {
                rectfill(w.data.x+c.data.x+x*c.data.psize,w.data.y+c.data.y+y*c.data.psize,w.data.x+c.data.x+(x+1)*c.data.psize,w.data.y+c.data.y+(y+1)*c.data.psize,((x+y)%2==0)?c.data.bg:c.data.bg_alt)
                rectfill(w.data.x+c.data.x+x*c.data.psize,w.data.y+c.data.y+y*c.data.psize,w.data.x+c.data.x+(x+1)*c.data.psize,w.data.y+c.data.y+(y+1)*c.data.psize,c.spritedata.charCodeAt(2+x+y*c.data.w))
            }
        }
    });
}

function create_window(window_data) {
    let window = {};
    window.data = window_data;
    window.buttons = [];
    window.canvases = [];
    return window;
}

function update_window(w) {
    w.buttons.forEach(b => {
        if (point_in_rect(mouse.x,mouse.y,w.data.x+b.x,w.data.y+b.y,w.data.x+b.x+b.w,w.data.y+b.y+b.h)) {
            mouse.h = true;
            if (mouse.b==1 && mouse.b!=mouse.lb) {
                b.on_click();
            }
        }
    });
    w.canvases.forEach(c => {
        if (point_in_rect(mouse.x,mouse.y,w.data.x+c.data.x,w.data.y+c.data.y,w.data.x+c.data.x+c.data.w*c.data.psize,w.data.y+c.data.y+c.data.h*c.data.psize)) {
            mouse.h = true;
            if (mouse.b==1 && mouse.b!=mouse.lb) {
                c.on_click();
            }
            if (c.drawing) {
                let draw_x = ~~((~~mouse.x-c.data.x-w.data.x)/c.data.psize)
                let draw_y = ~~((~~mouse.y-c.data.y-w.data.y)/c.data.psize)
                c.spritedata = set_char_at(c.spritedata, draw_x+draw_y*c.data.w+2, String.fromCharCode(c.selected_color))
            }
        }
        if (mouse.b==0 && mouse.b!=mouse.lb) {
            c.on_release();
        }
    });
}

function create_canvas(window, canvas_data) {
    let canvas = {}
    canvas.spritedata = "";
    canvas.spritedata+=String.fromCharCode(canvas_data.w)
    canvas.spritedata+=String.fromCharCode(canvas_data.h)
    for (let i=0; i<canvas_data.w*canvas_data.h;i++) {
        canvas.spritedata+=String.fromCharCode(32);
    }
    canvas.data = canvas_data;
    canvas.selected_color = 20;
    canvas.drawing = false;
    canvas.on_click = () => {
        canvas.drawing = true;
    }
    canvas.on_release = () => {
        canvas.drawing = false;
    }
    window.canvases.push(canvas)
}

function create_button(window, button_data) {
    window.buttons.push(button_data)
}