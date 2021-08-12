import { useState, useEffect, useRef } from 'react';

interface WebcamProps {
    getFaceArea?: () => ({x: number, y: number, w: number, h: number} | null)
};

export const Webcam = (props: WebcamProps) => {
    const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => { // get the webcam stream
        (async () => { 
            if (!webcamStream) {
                setWebcamStream(
                    await navigator
                        .mediaDevices
                        .getUserMedia({ video: true, audio: false })
                );
            }
        }) ();
    }, []);

    useEffect(() => { // play the webcam stream in the hidden video tag
        videoRef.current!.srcObject = webcamStream;
        videoRef.current?.play();
    }, [webcamStream]);

    const renderFrame = () => { // render the current webcam stream frame in the canvas 
        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (props.getFaceArea) {
            const faceArea = props.getFaceArea();
            if (faceArea) {
                context.rect(faceArea.x, faceArea.y, faceArea.w, faceArea.h);
                context.lineWidth = 6;
                context.strokeStyle = 'red';
                context.stroke();
            }
        }

        setTimeout(renderFrame, 100); // re-render in 100ms
    };

    return (
        <div>
            <video autoPlay={true} className="hidden" ref={videoRef} onPlay={renderFrame} muted />
            <canvas ref={canvasRef} />
        </div>
    );
}