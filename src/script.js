
var canv = document.getElementById("canv")
canv.width = window.innerWidth;
canv.height = window.innerHeight;

var src = canv.getContext("2d");

var numRows = 12;
var numCols = 12;

var mod = 50;
var origin = [13*mod,10*mod];

var deriv = true;
var showDeriv = false;

var showTaylor = false;
var taylorEq = "";
var iter = 0;


//Graph
var l_x = 0;
var l_y = 0;

function removeTaylor(){
  clearBalls();
  iter=0;
  showTaylor = false;
}

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

  if (equation.includes(";") == false) {
    if (subject && formula){
      drawLine(subject,formula,false);
    }
  }
}

function beginTaylor(){
  showTaylor = true;
}


function taylor(power){
  var equation = document.getElementById("b1").value;
  var subject = equation.split("=")[0];
  var formula = equation.split("=")[1];

  clearBalls();

  if (equation.includes(";") == false) {
    if (subject && formula){

      var final = "";
      var max = document.getElementById("range").value;
      
      for (var x=0; x<power; x++){

        var der = advDerive(formula,x,0)
        
        if (x == 0){
          final += der.toString()
        } else {
          if (der!=0){
            if (der > 0){
              final += "+(" + der.toString() + "/" + math.factorial(x).toString() + ")*pow(x," + x.toString() + ")"
            } else {
              final += "+(" + der.toString() + "/" + math.factorial(x).toString() + ")*pow(x," + x.toString() + ")"
            }
          }
        }
      }
      showTaylor = true;
      taylorEq = final;

      document.getElementById("results").innerHTML += "Equation:" + final;
    }
  }
}

function drawTaylor(){
  drawLine("y",taylorEq,true);
}

function advDerive(eq,order,val){
  for (var x = 0; x<order; x++){
    eq = math.derivative(eq,"x").toString()
  }

  return math.evaluate(eq.replace("x",val.toString()))
}


function derive(eq,x){
  y_1 = math.evaluate(eq.replace(/x/g,x));
  y_2 = math.evaluate(eq.replace(/x/g,x+0.00001));

  return (y_2 - y_1)/0.0001;
}


class Ball{
  constructor(x){
    
    this.x = x;
    this.posx = origin[0] + x*mod;

    this.y = 0;
    this.posy = 0;

    this.found = false;
  }

  update(equation){

    if (this.found == false){
      var det = derive(equation,this.x);
  
      src.beginPath();

      if ((det<0.001 && det>0) | (det>-0.001 && det<0)){
        document.getElementById("results").innerHTML += "<p>Found new local minima at (" + this.x + "," + this.y + ")</p>";
        this.found = true;
      } else if (det>0){
        this.x -= 0.01;
        this.posx = origin[0] + this.x*mod;  
      } else {
        this.x += 0.01;
        this.posx = origin[0] + this.x*mod;
      }
  
      this.posy = origin[1] + math.evaluate(equation.replace(/x/g,this.x))*mod*-1;
  
    } else {
    }
      
    src.arc(this.posx, this.posy, 20, 0, 2 * Math.PI);
    src.fill();
    src.closePath();
  } 
}

function randRange(max){
  var control = Math.random();
  if (control > 0.5){
    return Math.random()*max*-1
  } else {
    return Math.random()*max
  }
  
}

var balls = [];

for (var x=0; x<10; x++) {
  balls.push(new Ball(randRange(11)));
}

function newBall(){
  for (var x=0; x<10; x++) {
    balls.push(new Ball(randRange(11)));
  }
}

function clearBalls(){
  balls = [];
  document.getElementById("results").innerHTML = "";
}


var s = 1;
var animate = false;
var osc = 0;


function drawLine(sub,form,taylor){

  var prevPoint = [origin[0]+-12*mod,origin[1]+math.evaluate(form.replace(/x/g,-12))*mod*-1];

  if (taylor == false){
    src.clearRect(0, 0, canv.width, canv.height);
  }
    
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
      p2 = origin[1] + math.evaluate(form.replace(/x/g,x))*mod*-1;
    } else {
      p2 = origin[1] + math.evaluate(form.replace(/x/g,x))*mod*-1;
    }
  
    src.moveTo(prevPoint[0],prevPoint[1]);
    src.lineTo(origin[0]+(x*mod),p2);

    if (taylor){
      src.strokeStyle = "#DD9900";
    } else {
      src.strokeStyle = "#0099DD";
    }
    
    src.lineWidth = 4;
    src.stroke();

    src.stroke();
    
    src.lineWidth = 1;
    src.strokeStyle = "#000000";


    prevPoint = [origin[0]+(x*mod),p2];

  }

  for (var x=0; x<balls.length; x++){
    balls[x].update(form);
  }
  
  src.closePath();

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

  if (showTaylor){

    if (iter < document.getElementById("range").value){
      taylor(iter);
      drawTaylor();
      iter += 1;
    } else if (iter > document.getElementById("range").value){
      taylor(iter);
      drawTaylor();
      iter -= 1;
    } else {
      drawTaylor();
    }
  }
}

setInterval(draw,10)