"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let balls = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    addEventListener("resize", (e) => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    canvas.addEventListener("click", (e) => {

        let x = e.clientX;
        let y = e.clientY;
        let speed = 1;
        let maxJumpDistance = 8;

        let ball = [x, y, speed, maxJumpDistance];
        balls.push(ball);

        console.log("Ball Added.");
        console.log(balls.length);
    });

    // -- GAME LOOP --

    requestAnimationFrame(gameLoop);

    function gameLoop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < balls.length; i++) {

            let ball = balls[i];

            ball[1] += ball[2];
            ball[2] += 0.2;

            if (ball[2] > ball[3]) ball[2] = ball[3];

            if (ball[1] > canvas.height - 15) {

                ball[1] = canvas.height - 15;
                ball[2] *= -1;
                ball[3] *= 0.6;
            }

            ctx.beginPath();
            ctx.arc(ball[0], ball[1], 15, 0, 2 * Math.PI); // 20 es el radio del círculo
            ctx.fillStyle = "red"; // Color del círculo
            ctx.fill();
            ctx.closePath();
        }

        requestAnimationFrame(gameLoop);
    }

});