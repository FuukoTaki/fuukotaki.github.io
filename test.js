// Enable JS strict mode.
"use strict";

// Wait until HTML and CSS is fully loaded.
document.addEventListener("DOMContentLoaded", () => {

    // Get access to HTML elements.
    let canvas = document.getElementById("canvas");
    let fullscreenBtn = document.getElementById("fullscreenBtn");

    // Get access to canvas context.
    let ctx = canvas.getContext("2d");

    // Array to store all balls created by the user.
    let balls = [];

    // Set canvas size to match device screen size.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas size when window is resized.
    addEventListener("resize", (e) => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Enable fullscreen button functionality.
    fullscreenBtn.addEventListener("click", (e) => {

        console.log("Fullscreen.");
        document.documentElement.requestFullscreen();

        // Hide fullscreen button.
        fullscreenBtn.style.display = "none";
    });

    // Listen for fullscreen when deactivated.
    document.addEventListener("fullscreenchange", (e) => {

        if (!document.fullscreenElement) {

            // Show fullscreen button.
            fullscreenBtn.style.display = "block";
        }
    });

    // Add canvas functionality to add balls when clicked.
    canvas.addEventListener("click", (e) => {

        // Set balls coordinates, speed and max jump distance.
        let x = e.clientX;
        let y = e.clientY;
        let speed = 1;
        let maxJumpDistance = 8;

        // Create ball element and add it to balls array.
        let ball = [x, y, speed, maxJumpDistance];
        balls.push(ball);

        // Debug.
        console.log("Ball Added.");
        console.log(balls.length);
    });

    // -- GAME LOOP --

    requestAnimationFrame(gameLoop);

    function gameLoop() {

        // Clear canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through all balls to move them.
        for (let i = 0; i < balls.length; i++) {

            // Get access to ball element.
            let ball = balls[i];

            // Ball gravity. 
            ball[1] += ball[2];
            ball[2] += 0.2;

            // Check if ball surpass its max speed allowed.
            if (ball[2] > ball[3]) ball[2] = ball[3];

            // Check collision with the bottom of the screen.
            if (ball[1] > canvas.height - 15) {

                // If there is a collision:
                // reduce ball max speed.
                // multiply speed wth -1 to move upwards.
                // align ball with the bottom of the screen.
                ball[1] = canvas.height - 15;
                ball[2] *= -1;
                ball[3] *= 0.6;
            }

            // Draw ball.
            ctx.beginPath();
            ctx.arc(ball[0], ball[1], 15, 0, 2 * Math.PI); // 15 is its radius.
            ctx.fillStyle = "red"; // Ball color.
            ctx.fill();
            ctx.closePath();
        }

        // Call next frame.
        requestAnimationFrame(gameLoop);
    }

});