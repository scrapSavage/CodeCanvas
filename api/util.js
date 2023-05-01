function hex_to_bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, "0");
}

function set_char_at(str,index,char) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + char + str.substring(index+1);
}

function point_in_rect(px,py,x1,y1,x2,y2) {
    return (px >= x1 && px <= x2 && py >= y1 && py <= y2);
}