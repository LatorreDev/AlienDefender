// Variables generales
var ctx = null;
var width = 0;
var height = 0;

// Constantes
var SKY_COLOR = '#eaa3a9';
var SUN_START_POSITION = -120;
var DELTA_BULLET = 20;
var DELTA_DEFENDER = 10;
var MAX_BULLET_DISTANCE = 600 - 100;
var HIT_PROXIMITY = 70;

// Codigos teclado para controles
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var SPACE_BAR = 32;

// Variables con las imagenes.

//cielo, fondo, nube1, nube2, nube3,sol, bala, nave espacial;
//montana, paisaje urbano, suelo;
//defensor var, rueda, bala, nave espacial;

var sky, background, cloud1, cloud2, cloud3, sun, bullet, spaceship;
var mountains, cityscape, ground;
var defender, wheel, bullet, spaceship;
var countImagesLoading = 0;

// Variables de trabajo, para realizar un seguimiento de lo que está sucediendo en el juego.
var bullets = [];
var spaceships = [];
var defenderXPosition;
var defenderDirection = 0; // 0=still, -1=left, 1=right
var wheelAngle = 0;
var sunPosition = -120;

//define el objeto bala
var Bullet = function (x, y) {
	this.x = x;
	this.y = y;
	this.defunct = false;
}

// Define el objeto nave espacial
var Spaceship = function (x, y, s) {
	this.x = x;
	this.y = y;
	this.speed = s;
	this.defunct = false;
}	
