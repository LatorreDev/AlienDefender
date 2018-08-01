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
		audio.loop= true;
		audio.volume = 0.5;
		audio.src = "Audio/play-the-game.mp3";
		}
	

	//Iniciar el juego
	playBackgroundMusic();
	width = myCanvas.width;
	height =myCanvas.height;
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
{
//Reproducir música de fondo continuamente!

// Cargar Sonido Disparo
function shootSound() {

    var audio = document.createElement('audio');
    audio.addEventListener("canplay", function () { audio.play(); }, false);
	audio.loop= false;
	audio.volume = 1;
	audio.src = "Audio/Shoot2.mp3";	
	}
}	

// Añadir Scoreboard

//=====================================================
// 						IMÁGENES
//=====================================================
// Cargar todas las imágenes del juego.
function loadAllImages() {

	sky =ctx.createLinearGradient(0, width, 0, height);
	sky.addColorStop(0, SKY_COLOR);
	sky.addColorStop(1, '#FFFFFF');

	//Mountains load
	countImagesLoading++;
    mountains = new Image();
    mountains.src = 'Images/mountains.png';
    mountains.addEventListener("load", function () { countImagesLoading--; }, false);

	//Cityscape load
    countImagesLoading++;
    cityscape = new Image();
    cityscape.src = 'Images/cityscape.png';
    cityscape.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Ground load
	countImagesLoading++;
    ground = new Image();
    ground.src = 'Images/ground.png';
    ground.addEventListener("load", function () { countImagesLoading--; }, false);

	//Defender load
	countImagesLoading++;
    defender = new Image();
    defender.src = 'Images/defender-pixel.png';
    defender.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Cloud 1 load
	countImagesLoading++;
	cloud1 = new Image();
    cloud1.src = 'Images/cloud1.png';
    cloud1.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Cloud 2 load
	countImagesLoading++;
    cloud2 = new Image();
    cloud2.src = 'Images/cloud2.png';
    cloud2.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Cloud 3 load
	countImagesLoading++;
    cloud3 = new Image();
    cloud3.src = 'Images/cloud3.png';
    cloud3.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Sun Load
	countImagesLoading++;
    sun = new Image();
    sun.src = 'Images/sun_pixel.png';
    sun.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Bullet load
	countImagesLoading++;
    bullet = new Image();
    bullet.src = 'Images/bullet-pixel.png';
    bullet.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Wheel load
	countImagesLoading++;
    wheel = new Image();
    wheel.src = 'Images/wheel_pixel.png';
    wheel.addEventListener("load", function () { countImagesLoading--; }, false);
	
	//Space ship load
	countImagesLoading++;
    spaceship = new Image();
    spaceship.src = 'Images/spaceship.png';
    spaceship.addEventListener("load", function () { countImagesLoading--; }, false);
	
	setTimeout(checkIfAllImagesLoaded, 100);
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
