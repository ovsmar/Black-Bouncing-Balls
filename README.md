# Black Bouncing Balls

A simple canvas animation that simulates bouncing balls with collision detection.


## Getting started

To run this project, simply open the index.html file in your browser.

## How it works

The index.html file loads a JavaScript file called app.js, which contains the code for creating and animating the bouncing balls.

When the app.js file is loaded, it first retrieves the canvas element from the HTML file and creates a 2D drawing context for the canvas. It also retrieves a button element for adding new balls and creates an empty array to store instances of the Ball class.

The Ball class is defined with properties for the ball's position, velocity, radius, and color. It also has methods for drawing the ball on the canvas and updating its position based on its velocity and any collisions with other balls or the canvas edges.

The app.js file then creates three instances of the Ball class with random properties and adds them to the array of balls. It also sets up an animation loop that calls the update method for each ball instance on each frame, causing the balls to move and bounce around the canvas.

Finally, the app.js file adds an event listener to the "add-ball" button that creates a new instance of the Ball class with random properties and adds it to the array of balls when clicked, causing a new bouncing ball to appear on the canvas.