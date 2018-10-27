// Realiza la inicialización en el arranque.
window.addEventListener("load", function () {

	// Obtener el elemento canvas.
	var myCanvas = document.querySelector('canvas');
	if (!myCanvas || !myCanvas.getContext) {
		return;
	}

	// obtener el contexto canvas 2d
	ctx = myCanvas.getContext('2d');

	function playBackgroundMusic() {

		var audio = document.createElement('audio');
		audio.addEventListener("canplay", function () { audio.play(); }, false);
		audio.loop = true;
		audio.volume = 0.5;
		audio.src = "Audio/play-the-game.mp3";
	}


	//Iniciar el juego
	playBackgroundMusic();
	width = myCanvas.width;
	height = myCanvas.height;
	defenderXPosition = 0 - 0;
	loadAllImages();

	//Manejar los eventos de ratón (Mover la imagen de defensor-tanque)
	document.addEventListener("mousemove", moveDefender, false);
	document.addEventListener("mousedown", fireBullet, false);
	document.addEventListener("keydown", keyDown, false);
}, false);


//=====================================================
//						AUDIO
//=====================================================
//Reproducir música de fondo continuamente!

// Cargar Sonido Disparo
function shootSound() {

	var audio = document.createElement('audio');
	audio.addEventListener("canplay", function () { audio.play(); }, false);
	audio.loop = false;
	audio.volume = 1;
	audio.src = "Audio/Shoot2.mp3";
}

// Añadir Scoreboard

//=====================================================
// 						IMÁGENES
//=====================================================
// Cargar todas las imágenes del juego.
function loadAllImages() {

	sky = ctx.createLinearGradient(0, width, 0, height);
	sky.addColorStop(0, SKY_COLOR);
	sky.addColorStop(1, '#FFFFFF');

	//Mountains load
	mountains = imageLoader('Images/mountains_pixel.png');

	//Cityscape load
	cityscape = imageLoader('Images/cityscape_pixel.png');

	//Ground load
	ground = imageLoader('Images/ground_pixel.png');

	//Defender load
	defender = imageLoader('Images/defender-pixel.png');

	//Cloud 1 load
	cloud1 = imageLoader('Images/cloud1_pixel.png');

	//Cloud 2 load
	cloud2 = imageLoader('Images/cloud2_pixel.png');

	//Cloud 3 load
	cloud3 = imageLoader('Images/cloud3_pixel.png');

	//Sun Load
	sun = imageLoader('Images/sun_pixel.png');

	//Bullet load
	bullet = imageLoader('Images/bullet-pixel.png');

	//Wheel load
	wheel = imageLoader('Images/wheel_pixel.png');

	//Space ship load
	spaceship = imageLoader('Images/spaceship_pixel.png');

	setTimeout(checkIfAllImagesLoaded, 100);
}

//Carga las imagenes y lleva la cuenta de las que se van cargando
function imageLoader(url) {
	countImagesLoading++;
	let image = new Image();

	image.src = url;
	image.addEventListener("load", function () { countImagesLoading--; }, false);

	return image;
}


// Comprueba si todas las imagenes se han cargado, si así se inicia el juego.
function checkIfAllImagesLoaded() {

	// si todas las imágenes se han cargado por ahora, establecer re-dibujar cada 50 ms y una nave espacial
	if (countImagesLoading == 0) {
		setInterval(draw, 50);
		setInterval(createSpaceship, 1000);
	}
	else {
		setTimeout(checkIfAllImagesLoaded, 100);
	}
}
