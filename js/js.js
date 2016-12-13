var y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g; //a= -g es para motor encendido
var dt = 0.016683;
var timer;
var gasolina=100;
var intentos = 1;
window.onload = function(){
    document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//alert("¡¡¡Aprieta la tecla espacio para usar el motor!!!")
//Empezar a mover nave
	start();

/*con puntero (smartphone)
document.getElementById("botonOn").onmousedown = encenderMotor;
document.getElementById("botonOn").onmouseup = apagarMotor;
document.getElementById("contenedor").onmouseup = apagarMotor;*/
/*
var mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
  if(mousedownID==-1)  //Prevent multimple loops!
     mousedownID = setInterval(whilemousedown, 50);
}
function mouseup(event) {
   if(mousedownID!=-1) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID=-1;
     apagarMotor();
   }

}
function whilemousedown() {
   encenderMotor();
}
//Assign events
document.getElementById("botonOn").addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
document.addEventListener("mouseout", mouseup);
*/

var theElement = document.getElementById("botonOn");

theElement.addEventListener("touchend", handlerFunction, false);

function handlerFunction(event) {
	encenderMotor();
}

//con teclado 
window.onkeydown=function(e) {
	var claveTecla;
	if (window.event)
		claveTecla = window.event.keyCode;
	else if (e)
		claveTecla = e.which;
	if ((claveTecla==32))
		{encenderMotor();
		}
}
window.onkeyup=apagarMotor;
}



function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		finalizarJuego();
	}
}


function finalizarJuego() {
	if (v>5) {
		document.getElementById("imgNave").src="img/nave_rota.gif";
		document.getElementById("gameOver").style.display="block";
		document.getElementById("intentos").innerHTML=intentos;
	} else {
		document.getElementById("userWin").style.display="block";	
	}
}

function encenderMotor() {
	a=-g;
	gasolina--;
	document.getElementById("fuel").innerHTML=gasolina;
	document.getElementById("fuel").style.color="rgb(" + (320-gasolina*3) + ", 0, 0)";
	document.getElementById("imgMotor").style.display="block";
	if (gasolina<=0) {
			apagarMotor();
			document.getElementById("fuel").innerHTML=0;

		}
}



function apagarMotor() {
	a=g
	document.getElementById("imgMotor").style.display="none";
}

function mostrarInstrucciones() {
	pausar();
	document.getElementById("menuInstrucciones").style.display="block";
}

function ocultarInstrucciones() {
    document.getElementById("menuInstrucciones").style.display="none";
}

function reanudar() {
	start();
	document.getElementById("reanudar").style.display="none";
	document.getElementById("pausa").style.display="inline-block";
}
function pausar() {
	stop();
	document.getElementById("pausa").style.display="none";
	document.getElementById("reanudar").style.display="inline-block";
}

function reiniciarJuego() {
	stop();
	document.getElementById("reanudar").style.display="none";
	document.getElementById("pausa").style.display="inline-block";
	intentos++;
	y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
	v = 0;
	g = 1.622;
	a = g;
	dt = 0.016683;
	gasolina=100;
	document.getElementById("fuel").style.color="black";
	clearInterval(timer);
	start();
	document.getElementById("intentos").innerHTML=intentos;
	document.getElementById("imgNave").src="img/nave.png";
	document.getElementById("gameOver").style.display="none";
	document.getElementById("userWin").style.display="none";
	document.getElementById("fuel").innerHTML=gasolina;
}


