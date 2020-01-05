var c = document.getElementsByClassName("myCanvas");
var ctx = c[0].getContext("2d");
ctx.lineWidth = 3;
var slider1 = document.getElementById("myRange1");
var slider2 = document.getElementById("myRange2");
var slider3 = document.getElementById("myRange3");
var slider4 = document.getElementById("myRange4");
var angle1 = Math.PI*slider1.value/180;
var s=RGBToHex(slider2.value,slider3.value,slider4.value);
ctx.strokeStyle = s;
var z=componentToHex(245);
slider2.oninput = function() {
    var s=RGBToHex(this.value,slider3.value,slider4.value);
    ctx.strokeStyle = s;
    ctx.clearRect(0, 0, c[0].width, c[0].height);
    ctx.beginPath();
    branch(200,400,200,300,100,0,1,angle1,3);
}
slider3.oninput = function() {
    var s=RGBToHex(slider2.value,this.value,slider4.value);
    ctx.strokeStyle = s;
    ctx.clearRect(0, 0, c[0].width, c[0].height);
    ctx.beginPath();
    branch(200,400,200,300,100,0,1,angle1,3);
}
slider4.oninput = function() {
    var s=RGBToHex(slider2.value,slider3.value,this.value);
    ctx.strokeStyle = s;
    ctx.clearRect(0, 0, c[0].width, c[0].height);
    ctx.beginPath();
    branch(200,400,200,300,100,0,1,angle1,3);
}
slider1.oninput = function() {
    angle1 = Math.PI*this.value/180;
    ctx.clearRect(0, 0, c[0].width, c[0].height);
    ctx.beginPath();
    branch(200,400,200,300,100,0,1,angle1,3);
}
function branch(x1,y1,x2,y2,len,ang,sgn,angle,k){
    if(k>0.5)
    {
        ctx.lineWidth=k; 
        k*=0.8;
    }
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    len=len*0.67;
    if(len>2){
        var x3 = Math.floor(x2 + Math.sin(ang+sgn*angle)*len);
        var y3 = Math.floor(y2 - Math.cos(ang+sgn*angle)*len);
        branch(x2,y2,x3,y3,len,ang+sgn*angle,1,angle,k);
        var x3 = Math.floor(x2 + Math.sin(ang-sgn*angle)*len);
        var y3 = Math.floor(y2 - Math.cos(ang-sgn*angle)*len);
        branch(x2,y2,x3,y3,len,ang-sgn*angle,-1,angle,k);
    }
}
function componentToHex(c) {
    var r="";
    while(c!=0)
    {
        var d=c%16;
        c=(c-d)/16;
        if(d<=9) r+=d.toString();
        else if(d==10) r+="A";
        else if(d==11) r+="B";
        else if(d==12) r+="C";
        else if(d==13) r+="D";
        else if(d==14) r+="E";
        else r+="F";
    }
    r=reverse(r);
    return r.length == 1 ? "0" + r : r;
  }
  
  function RGBToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  function reverse(str) {
    var splitString = str.split(""); 
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); 
    return joinArray;
}
var btnDisplay = document.getElementById("btnDisplay");
var btnDownload = document.getElementById("btnDownload");
var imgConverted = document.getElementById("imgConverted");
/*btnDisplay.addEventListener("click", function(){
    const dataURI = c[0].toDataURL();
    //document.getElementById("demo").innerHTML = dataURI;
    imgConverted.src = dataURI;
});*/
btnDownload.addEventListener("click",function(){
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(c[0].msToBlob(),canvas-image.png);
    } else {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href=c[0].toDataURL();
        a.download = "canvas-image.png";
        a.click();
        document.body.removeChild(a);
    }

});