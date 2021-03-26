import { useEffect, useRef, useState } from "react";

const SpeedoBar = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [speed, setSpeed] = useState<number>(0);

    const createCanvas = () => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let canvas = canvasRef.current;
            let ctx: any = canvasCtxRef.current;
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = canvas.height / 2 - 20;
            const speedArcRadius = canvas.height / 2 - 20;
            ctx?.beginPath();
            ctx?.arc(centerX, centerY, radius, 0, Math.PI * 2);

            ctx.fillStyle = "black";
            ctx?.fill();
            ctx?.closePath();
            ctx?.restore();

            // speedarc
            ctx?.beginPath();
            ctx?.arc(centerX, centerY, speedArcRadius, 1.55, -4.7 + ((speed / 10) / 3.9));
            ctx.lineWidth = 4;
            ctx.strokeStyle = "orange";
            ctx?.stroke();
            ctx?.closePath();
            ctx?.restore();

            // speedarc
            ctx?.beginPath();
            ctx?.arc(centerX, centerY, speedArcRadius - 140, 0, Math.PI, true);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "white";
            ctx?.stroke();
            ctx?.closePath();
            ctx?.restore();
            ctx?.beginPath();

            ctx?.beginPath();
            ctx.strokeStyle = "white";
            ctx.translate(centerX, centerY);

            ctx.font = "15px Helvetica";
            for (var i = 0; i <= 220; i++) {
                let angle = Math.PI / 120 * i;
                let sineAngle = -Math.sin(angle);
                let cosAngle = Math.cos(angle);
                let iPointX, iPointY, oPointX, oPointY, wPointX, wPointY;

                if (i % 20 === 0) {
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "white";
                    iPointX = sineAngle * (radius - radius / 4);
                    iPointY = cosAngle * (radius - radius / 4);
                    oPointX = sineAngle * (radius - radius / 7);
                    oPointY = cosAngle * (radius - radius / 7);

                    wPointX = sineAngle * (radius - radius / 3);
                    wPointY = cosAngle * (radius - radius / 3);
                    ctx?.fillText(i, wPointX - 2, wPointY + 4);
                }
                else {
                    ctx.fillStyle = "white";
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "orange";
                    iPointX = sineAngle * (radius - radius / 5.5);
                    iPointY = cosAngle * (radius - radius / 5.5);
                    oPointX = sineAngle * (radius - radius / 7);
                    oPointY = cosAngle * (radius - radius / 7);
                }
                ctx?.beginPath();
                ctx?.moveTo(iPointX, iPointY);
                ctx?.lineTo(oPointX, oPointY);
                ctx?.stroke();
                ctx?.closePath();
            }
            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx?.fillText(`${speed} kmh`, -40,0);
            ctx?.closePath();
            ctx?.restore();
            ctx?.translate(-centerX, -centerY);

        }
    }

    useEffect(() => {
        let timer: any;
        if (speed <= 220) {
            createCanvas();
            timer = setInterval(() => setSpeed(speed + 1), 1000);
        }
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed]);

    return (
        <>
            <canvas ref={canvasRef} className="canvas" id="myCanvas" width="500" height="500" />
        </>
    );
}

export default SpeedoBar;