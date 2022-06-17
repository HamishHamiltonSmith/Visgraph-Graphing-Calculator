
var canv = document.getElementById("canv")
canv.width = window.innerWidth;
canv.height = window.innerHeight;

var src = canv.getContext("2d");

var numRows = 12;
var numCols = 12;

var mod = 50;
var origin = [13*mod,10*mod];

//Graph
var l_x = 0;
var l_y = 0;

function renderHorizontal(){
  src.beginPath();

  var start = 0;
  
  for (var x=-12; x<12; x++){
    start += 50;
    src.moveTo(0,start);

    src.lineTo(canv.width,start);
    src.stroke();
  }

  src.closePath();
}

function renderVertical(){
  src.beginPath();
  
  var start = 0;
  
  //Vertical
  for (var x=-12; x<13; x++){
    start += 50;
    src.moveTo(start,0);

    src.lineTo(start,canv.height);
    src.stroke();

    src.font = '25px serif';
    src.fillText(x.toString(),start-6,window.innerWidth/2-250+16)
    
  }
 
  src.closePath();
}


//Functions
function checkFormula(){
  var equation = document.getElementById("b1").value;
  var subject = equation.split("=")[0];
  var formula = equation.split("=")[1];

  if (subject && formula){
    drawLine(subject,formula)
  }
}

var s = 1;
var animate = false;
var osc = 0;


function drawLine(sub,form){

  var prevPoint = [origin[0]+-12*mod,origin[1]+eval(form.replace('x',-12))*mod*-1];
  
  src.clearRect(0, 0, canv.width, canv.height);

  renderVertical();
  renderHorizontal();

  if (form.includes("s")){
    animate = true;
  } else {
    animate = false;
  }


  for (var x = -13; x<15; x+=0.05){
    src.beginPath();

    if (animate){
      p2 = origin[1] + eval(form.replace('x',x))*mod*-1;
    } else {
      p2 = origin[1] + eval(form.replace('x',x))*mod*-1;
    }
  
    src.moveTo(prevPoint[0],prevPoint[1]);
    src.lineTo(origin[0]+(x*mod),p2);

  
    src.strokeStyle = "#0099DD";
    src.lineWidth = 4;
    src.stroke();
    src.lineWidth = 1;
    src.strokeStyle = "#000000";
  
    src.closePath();

    prevPoint = [origin[0]+(x*mod),p2];

  }

  if (animate){
    if (osc == 0){
      s+=0.1
    } else{
      s-=0.1
    }

    if (s>document.getElementById('range').value){
      osc=1;
    } else if (s<0){
      osc=0;
    }
    }

}


//Rendering
renderVertical();
renderHorizontal();

function draw(){
  checkFormula();
}

setInterval(draw,10)