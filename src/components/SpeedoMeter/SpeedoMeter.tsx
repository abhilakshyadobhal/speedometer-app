import { useEffect, useRef, useState } from "react";

const SpeedoBar = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [speed, setSpeed] = useState<number>(0);

    useEffect(() => {
        let timer: any;
        if (speed < 180) {
            timer = setInterval(() => setSpeed(speed + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [speed]);

    useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let canvas = canvasRef.current;
            let ctx: any = canvasCtxRef.current;
            // ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = canvas.height / 2;
            ctx?.beginPath();
            ctx?.arc(centerX, centerY, radius, 0, Math.PI * 2,);

            ctx.fillStyle = "black";
            ctx?.fill();
            ctx?.closePath();
            ctx?.restore();

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

                    wPointX = sineAngle * (radius - radius / 2.5);
                    wPointY = cosAngle * (radius - radius / 2.5);
                    ctx?.fillText((i), wPointX - 2, wPointY + 4);
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

            // ctx?.beginPath();
            // ctx.strokeStyle = '#000000';
            // ctx?.arc(0, 0, 19, 0, 2 * Math.PI, true);
            // ctx?.fill();
            // ctx?.closePath();

            // ctx?.beginPath();
            // ctx.lineWidth = 6;
            // ctx?.moveTo(0, 0);
            // ctx?.lineTo(pointX, pointY);
            // ctx?.stroke();
            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx?.fillText(`${speed} kmh`, -40, 20);
            ctx?.closePath();
            ctx?.restore();
            ctx?.translate(-centerX, -centerY);

        }

    }, [speed])

    return (
        <>

            <canvas ref={canvasRef} className="canvas" id="myCanvas" width="500" height="500" />
            <input type="number" min={0} max={180} value={speed} onChange={(e) => {
                setSpeed(Number(e.target.value))
            }} />
        </>
    );
}

export default SpeedoBar;