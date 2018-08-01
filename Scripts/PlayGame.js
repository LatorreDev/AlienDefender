// Mueva el defensor a la posición actual del ratón (horizontalmente).
function moveDefender(e) {
    defenderXPosition = e.clientX;
}	


// Handle key-down events, para mover el defensor de la izquierda / derecha, o para disparar una bala.
function keyDown(e) {

     if (e.keyCode == LEFT_ARROW) {
        defenderXPosition -= DELTA_DEFENDER;
        defenderDirection = -1;
    }
	else if (e.keyCode == RIGHT_ARROW) {
	    defenderXPosition += DELTA_DEFENDER;
        defenderDirection = 1;
	}
	else if (e.keyCode == SPACE_BAR) {	
		fireBullet();
		shootSound();
	}	
}

//Reproducir música de fondo continuamente!
function playBackgroundMusic() {

    var audio = document.createElement('audio');
    audio.addEventListener("canplay", function () { audio.play(); }, false);
	audio.loop= true;
	audio.volume = 0.5;
	audio.src = "Audio/play-the-game.mp3";
	}

//Reproduce música background

playBackgroundMusic()


// Crear una bala en la posición defensor, y añadirlo a la matriz de todas las balas.
function fireBullet() {
    var newBullet = new Bullet(defenderXPosition -8, 580 -86 -70);
	bullets.push(newBullet);
	shootSound();
}	

function shootSound() {

    var audio = document.createElement('audio');
    audio.addEventListener("canplay", function () { audio.play(); }, false);
	audio.loop= false;
	audio.volume = 1;
	audio.src = "Audio/Shoot2.mp3";	
}	

			
	// Crea una nave espacial en un lugar al azar, y añadirlo a la matriz de todas las naves espaciales.
function createSpaceship() {
	var newSpaceship = new Spaceship(-70, 50 + Math.random() * 200, Math.random() *10);
	spaceships.push(newSpaceship);
}	

	
// ==================================================================================
// Funciones de dibujo
// ==================================================================================
		
// Dibuja todo (esta función se llama repetidamente a un temporizador, para dar la impresión de animacion).
function draw() {
    drawScene();
	drawDefender();
	drawBullets();
	drawSpaceships();
}

// Pinta todas las partes de la escena de fondo
function drawScene() {

    // Limpia Canvas
	ctx.clearRect(0, 0, width, height);
	
	// Dibujar el cielo como un gradiente lineal
	sky = ctx.createLinearGradient(0, width, 0, height);
	sky.addColorStop(Math.random(), SKY_COLOR);
	sky.addColorStop(1, '#FFFFFF');
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, width, height);
	
	// Dibuja las montañas
	ctx.drawImage(mountains, -20, height -400);
	
	// Dibuja el paisaje urbano.
	ctx.drawImage(cityscape, 0, height - 400);
	
	// Dibuja el fondo.
	ctx.drawImage(ground, 0, height -80);
	
	// Dibuja el sol
	if (sunPosition >= width)
	    sunPosition = SUN_START_POSITION;
	else
		sunPosition++;
	ctx.drawImage(sun, sunPosition, 0);

    // Dibuja las nubes.
	ctx.drawImage(cloud1,  20,  50);
	ctx.drawImage(cloud2,  150, 130);
	ctx.drawImage(cloud3,  300, 40);
}
	
	
// Dibujar tanque en su ubicación actual.
function drawDefender() {

    // Dibuja el cuerpo del tanque
    ctx.drawImage(defender, defenderXPosition -43, height -80 -50);
     
	// Calcular el ángulo de rotación de las ruedas
    wheelAngle += defenderDirection * 10;
    if (wheelAngle > 360 || wheelAngle < -360)
	    wheelAngle = 0;
	defenderDirection = 0;
	
    // Dibujar la rueda izquierda (en un ángulo de rotación)
	ctx.save();
	ctx.translate(defenderXPosition - 43 + 6 + 17, height - 86 -34 + 17);
	ctx.rotate(wheelAngle * Math.PI / 180);
	ctx.drawImage(wheel, -17, -17, 25, 25);
	ctx.restore();
	
	// Dibuja la rueda derecha (en un ángulo de rotación).
	ctx.save();
	ctx.translate(defenderXPosition -43 + 6 + 40 +17, height -86 -34 +17);
	ctx.rotate(wheelAngle * Math.PI / 180);
	ctx.drawImage(wheel, -17, -17, 25, 25);
	ctx.restore();
}


// Dibuja todas las balas.
function drawBullets() {

     // Retire todos los proyectiles que han pasado fuera de la pantalla.	
     for (var b = 0; b < bullets.length; b++) {
	     if (bullets[b].defunct == true || bullets[b].y <= 0) {
		 bullets.splice(b,1);
		 b--;
		}	 
	}

	// Pinta todas las balas que aún quedan
	for (var b = 0; b < bullets.length; b++) {

		// Mueva la bala un poco.
		bullets[b].y -= DELTA_BULLET;
	
		// Si la bala ha afectado a alguna de las naves espaciales!
		var hit = false;
		for (var s = 0; s < spaceships.length && hit == false; s++) {
		
			// Es un éxito de la prueba para ver si la bala ha afectado esta nave espacial.
			if ((Math.abs(spaceships[s].x - bullets[b].x) < HIT_PROXIMITY) &&
				(Math.abs(spaceships[s].y - bullets[b].y) < HIT_PROXIMITY)) {
	     
			// Es un éxito! Así que marquen la nave espacial y la bala como "defunct".
			spaceships[s].defunct = true;
			bullets[b].defunct = true;
			hit = true;
			}
		}


		// Si la bala no alcanzó ninguna de las naves espaciales, a continuación, dibuje la bala.
		if (!hit) {
			ctx.drawImage(bullet, bullets[b].x, bullets[b].y);
		}
	}
}	


// Pinta todas las naves espaciales.
function drawSpaceships() {

    //Retire cualquier nave espacial que ha pasado fuera de la pantalla.
 	for (var s = 0; s < spaceships.length; s++) {
	    if (spaceships[s].defunct == true || spaceships[s].x > width) {
			spaceships.splice(s, 1);
			s--;
		}
	}

// Pinta todas las naves espaciales que aún quedan.
for (var s = 0; s < spaceships.length; s++) {

	// Mueve la nave derecha un poco.
	spaceships[s].x += spaceships[s].speed;
	
	// Dibuja la nave espacial
	ctx.drawImage(spaceship, spaceships[s].x, spaceships[s].y);
	}
}	
