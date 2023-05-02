let color_index = 8
let sprite_canvas = {width:16,height:16,psize:8};
let spritedata = ""
function init() {
  spritedata=spritedata+String.fromCharCode(sprite_canvas.width)
  spritedata=spritedata+String.fromCharCode(sprite_canvas.height)
  for (let x=0; x<sprite_canvas.width; x++) {
    for (let y=0; y<sprite_canvas.height; y++) {
      spritedata=spritedata+String.fromCharCode(0);
    }
  }
  sprite_editor = create_window({x:32,y:32,w:136,h:96,bg:22,title:"sprite editor"})
  create_button(sprite_editor,{x:4,y:110,w:96,h:9,bg:2,txt:"Selected",on_click:()=>{}})
  for (let i=0; i<palette.length/2; i++) {
    create_button(sprite_editor,{x:4+i*6,y:120,w:6,h:6,bg:i,txt:"",on_click:()=>{sprite_editor.canvases[0].selected_color=i;}})
  }
  for (let i=0; i<palette.length-1; i++) {
    create_button(sprite_editor,{x:4+i*6,y:126,w:6,h:6,bg:(i+palette.length/2),txt:"",on_click:()=>{sprite_editor.canvases[0].selected_color=(i+palette.length/2);}})
  }
  create_canvas(sprite_editor,{x:4,y:12,w:16,h:16,psize:6,bg:24,bg_alt:0})
  create_canvas(sprite_editor,{x:102,y:12,w:16,h:16,psize:2,bg:24,bg_alt:0})
  create_button(sprite_editor,{x:102,y:46,w:34,h:10,txt:"Swap",bg:20,on_click:()=>{let old = sprite_editor.canvases[0].spritedata; sprite_editor.canvases[0].spritedata = sprite_editor.canvases[1].spritedata; sprite_editor.canvases[1].spritedata = old}})
  create_button(sprite_editor,{x:4,y:133,w:49,h:9,bg:20,txt:"Eraser",on_click:()=>{sprite_editor.canvases[0].selected_color=32;}})
  player = {x:0,y:0,xv:0,yv:0,flr:false,f:false}
}
elapsed = 0;
function update() {
  mouse.h = false;
  update_window(sprite_editor)
  if (player.y>192) {
  	player.y=192
	player.yv=0
  } else {
  	player.yv+=0.2
  }
  player.x+=player.xv; player.y+=player.yv
  elapsed+=delta_time
  
  if (get_key_down("ArrowUp") && player.y>=192) {
  	player.yv-=5
  }
  if ((!get_key_down("ArrowLeft"))&&(!get_key_down("ArrowRight"))) {
  	player.xv*=0.9
  }
  if (get_key_down("ArrowLeft") && player.xv>-3) {
  	player.xv-=0.1
	player.f=true
  }
  if (get_key_down("ArrowRight") && player.xv<3) {
  	player.xv+=0.1
	player.f=false
  }
}
function draw() {
  sprite_editor.buttons[0].bg = sprite_editor.canvases[0].selected_color
  rectfill(0,0,x_resolution,y_resolution,27)
  msd = "\u0008\u0008\u0018\u0018      \u0018\u0014\u0018     \u0018\u0014\u0014\u0018    \u0018\u0014\u0014\u0014\u0018   \u0018\u0014\u0014\u0014\u0014\u0018  \u0018\u0014\u0014\u0014\u0014\u0014\u0018 \u0018\u0014\u0018\u0018\u0018\u0018   \u0018\u0018\u0014\u0018   "
  sd = "\x10\x10\b\x07\x07\x07\x01\b\b\b\b\b\b\x01\x07\x07\b\b\x07\x07\x07\b\b\b\x01\x07\x07\x01\b\b\b\b\b\b\x07\x07\b\b\x01\x07\x11\x11\x07\x07\b\x11\x11\x07\x07\b\x07\x07\b\x01\x07\x11\x07\x07\x07\x07\b\x07\x07\x07\b\b\x07\x07\b\x07\x07\x07\x07\x07\x07\x07\b\b\b\b\b\b\b\x07\b\x07\x07\x07\x07\x07\x07\b\x01\x07\x07\x07\x07\x01\b\x01\b\x01\x07\x07\x07\x01\b\b\x07\x11\x11\x11\x07\x07\b\b\b\b\b\b\b\b\b\x07\x07\x07\x07\x07\x07\x01\b\b\b\x01\x07\x07\x07\x01\b\x07\x07\x07\x07\x07\x01\b\x07\b\x07\x07\x11\x11\x07\x07\b\b\x07\x01\b\b\b\b\x07\b\x07\x07\x07\x07\x07\x07\x01\b\b\b\b\b\b\b\x07\b\x01\x07\x07\x07\x07\x07\x07\b\x01\x07\x07\x07\x01\b\b\b\b\b\x01\x07\x07\x07\x01\b\x07\x11\x11\x07\x07\b\x01\b\b\b\b\b\b\b\b\x01\x07\x07\x07\x07\x07\b\x07\x11\x11\x01\b\x07\x07\x01\b\x07\x07\x07\x07\x07\x07\b\x07\x07\x07\x07\b\b\b\b\b\b\x07\x07\x07\x01\b\b"
  gsd = "\x10\x10\n\n\t\t\n\n\n\n\t\n\n\n\n\t\t\n\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\n\n\v\n\v\v\v\v\v\v\v\v\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t\t\t\n\n\n\t\t\t\t\t\t\b\x01\b\t\b\x01\t\t\t\t\t\t\x07\x11\x11\t\x07\x07\b\b\b\b\b\b\t\b\b\x07\x07\x07\x07\x07\x07\x01\b\b\b\x01\x07\x07\t\x01\b\x07\x07\x07\x07\x07\x01\b\x07\b\x07\x07\x11\x11\x07\x07\b\b\x07\x01\b\b\b\b\x07\b\x07\x07\x07\x07\x07\x07\x01\b\b\b\b\b\b\b\x07\b\x01\x07\x07\x07\x07\x07\x07\b\x01\x07\x07\x07\x01\b\b\b\b\b\x01\x07\x07\x07\x01\b\x07\x11\x11\x07\x07\b\x01\b\b\b\b\b\b\b\b\x01\x07\x07\x07\x07\x07\b\x07\x11\x11\x01\b\x07\x07\x01\b\x07\x07\x07\x07\x07\x07\b\x07\x07\x07\x07\b\b\b\b\b\b\x07\x07\x07\x01\b\b"
  for (let x=0; x<32; x++) {
    for (let y=0; y<3; y++) {
      draw_sprite(gsd,0+x*16,208+y*16, false);
    }
  }
  for (let x=0; x<32; x++) {
    for (let y=0; y<2; y++) {
      draw_sprite(sd,0+x*16,216+y*16, false);
    }
  }
  
  printString("dT: "+(delta_time.toString()),256,32,20,1024)
  printString("Elapsed: "+(elapsed.toFixed(3)).toString(),256,40,20,1024)

  draw_window(sprite_editor)
  draw_sprite(((~~elapsed%2==0)?sprite_editor.canvases[0].spritedata:sprite_editor.canvases[1].spritedata),player.x,player.y,player.f)
  //mouse
  draw_sprite(msd,mouse.x,mouse.y)
}