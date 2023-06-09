var canvas = document.getElementById("myCanvas"); // Récupération de l'élément canvas dans la page HTML
var ctx = canvas.getContext("2d"); // Création d'un contexte de dessin en 2D pour le canvas
var addBallButton = document.getElementById("add-ball"); // Récupération du bouton "add-ball" dans la page HTML
var balls = []; // Création d'un tableau vide pour stocker les instances de la classe Ball

// Définition de la classe Ball pour créer des instances de balles
function Ball(x, y, dx, dy, radius, gradient) {
  // Propriétés de la balle
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = gradient;

  // Méthode pour dessiner la balle
  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.gradient;
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 30;
    ctx.fill();
  };

  // Méthode pour mettre à jour la position de la balle
  this.update = function () {
    // Rebond de la balle sur les bords du canvas
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx; // Inversion de la vitesse horizontale si la balle touche le bord gauche ou droit du canvas
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy; // Inversion de la vitesse verticale si la balle touche le bord haut ou bas du canvas
    }

    // Collision avec les autres balles
    for (var i = 0; i < balls.length; i++) {
      var otherBall = balls[i];
      if (this !== otherBall) {
        var distance = Math.sqrt(
          (this.x - otherBall.x) * (this.x - otherBall.x) +
          (this.y - otherBall.y) * (this.y - otherBall.y)
        );
        if (distance < this.radius + otherBall.radius) {
          // Vérification de la collision entre la balle actuelle et une autre balle

          // Calcul de l'angle de collision
          var angle = Math.atan2(otherBall.y - this.y, otherBall.x - this.x);

          // Calcul des nouvelles vitesses
          //calcule la vitesse de la balle actuelle en fonction de ses valeurs dx et dy actuelles.
          var thisSpeed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

          //calcule la vitesse d'une autre balle en fonction de ses valeurs actuelles dx et dy.
          var otherBallSpeed = Math.sqrt(
            otherBall.dx * otherBall.dx + otherBall.dy * otherBall.dy
          );

          //calcule l'angle de direction de la balle actuelle en fonction de ses valeurs dx et dy actuelles à l'aide de la fonction atan2, qui renvoie l'angle entre la direction positive de l'axe x et le vecteur donné par ses composants.
          var thisAngle = Math.atan2(this.dy, this.dx);

          //calcule l'angle de direction d'une autre balle en fonction de ses valeurs actuelles dx et dy de la même manière que thisAngle.
          var otherBallAngle = Math.atan2(otherBall.dy, otherBall.dx);

          //définit la nouvelle vitesse d'une autre balle en fonction de la vitesse de la balle actuelle.
          var newThisSpeed = otherBallSpeed;

          //calcule la nouvelle vitesse horizontale de la balle actuelle en fonction de sa nouvelle vitesse et de son angle de direction à l'aide des fonctions cos et sin.
          var newOtherBallSpeed = thisSpeed;

          //calcule la nouvelle vitesse verticale de la balle actuelle en fonction de sa nouvelle vitesse et de son angle de cap à l'aide des fonctions cos et sin.
          var newThisDx = newThisSpeed * Math.cos(thisAngle + angle);

          //calcule la nouvelle vitesse horizontale d'une autre balle en fonction de sa nouvelle vitesse et de son angle de direction à l'aide des fonctions cos et sin.
          var newThisDy = newThisSpeed * Math.sin(thisAngle + angle);

          //calcule la nouvelle vitesse verticale d'une autre balle en fonction de sa nouvelle vitesse et de son angle de cap à l'aide des fonctions cos et sin.
          var newOtherBallDx =
            newOtherBallSpeed * Math.cos(otherBallAngle + angle);
          var newOtherBallDy =
            newOtherBallSpeed * Math.sin(otherBallAngle + angle);

          // Assignation des nouvelles vitesses
          this.dx = newThisDx;
          this.dy = newThisDy;
          otherBall.dx = newOtherBallDx;
          otherBall.dy = newOtherBallDy;

          /// Repoussage des balles l'une de l'autre
          var overlapping = this.radius + otherBall.radius - distance;
          var direction = {
            x: this.x - otherBall.x,
            y: this.y - otherBall.y,
          };
          direction.x /= distance;
          direction.y /= distance;

          this.x += direction.x * overlapping * 0.5; // Décalage de la balle actuelle vers l'extérieur de la balle avec laquelle elle est en collision
          this.y += direction.y * overlapping * 0.5;
          otherBall.x -= direction.x * overlapping * 0.5; // Décalage de l'autre balle vers l'intérieur de la balle avec laquelle elle est en collision
          otherBall.y -= direction.y * overlapping * 0.5;
        }
      }
    }

    // Mise à jour de la position de la balle en fonction de sa vitesse
    this.x += this.dx;
    this.y += this.dy;

    // Redessin de la ball
    this.draw();
  };
}

// Boucle pour créer 6 balles avec des propriétés aléatoires
for (var i = 0; i < 6; i++) {
  // Coordonnées de la balle aléatoires
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;

  // Vitesse de la balle aléatoire
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;
  // Rayon de la balle aléatoire
  var radius = Math.random() * 50;

  // Couleurs pour le dégradé de la balle
  var startColor = [255, 0, 0]; // красный цвет
  var endColor = [0, 0, 255]; // синий цвет

  // Création du dégradé de la balle
  var gradient ="linear-gradient(to bottom, rgb("+startColor.join(",") +"), rgb(" +endColor.join(",") +"))";

  // Ajout de la nouvelle balle à la liste des balles
  balls.push(new Ball(x, y, dx, dy, radius, gradient));
}

// La fonction qui anime les balles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
  }
}
// Appeler la fonction animate pour animer les balles
animate();

/// ajouter des balles en cliquant sur le button
addBallButton.addEventListener("click", function () {
  var radius = Math.random() * 50;
  var x = Math.random() * (canvas.width - radius * 2) + radius;
  var y = Math.random() * (canvas.height - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 5;
  var dy = (Math.random() - 0.5) * 5;
  var color = gradient;

  //ajoute une nouvelle instance de la classe "Ball" dans le tableau "balls":
  balls.push(new Ball(x, y, dx, dy, radius, color));
});
