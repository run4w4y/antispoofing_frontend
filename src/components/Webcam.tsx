import React, { useState, useEffect, useRef } from 'react';

interface WebcamProps {
    faceID: string,
    submitImage?: (img: string, id: string) => any
};

interface FaceArea {
    color: string,
    left: number,
    top: number,
    right: number,
    bottom: number
};

export const Webcam = (props: WebcamProps) => {
    const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
    const [videoInputs, setVideoInputs] = useState<Array<MediaDeviceInfo> | null>(null);
    const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);
    const [mirrored, setMirrored] = useState<boolean>(false);
    const [currentFrame, setCurrentFrame] = useState<number>(0);
    const [currentFaceArea, setCurrentFaceArea] = useState<FaceArea | null>(null);
    const mirroredRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

    const updateWebcamStream = async () => {
        if (webcamStream) // stop the current stream
            webcamStream.getTracks().forEach(track => track.stop());
        
        setWebcamStream(
            await navigator
                .mediaDevices
                .getUserMedia({
                    video: { deviceId: { exact: activeDeviceId ?? undefined } },
                    audio: false
                })
        );
    };

    const getVideoInputs = async () => {
        if (!videoInputs) {
            const allDevives = 
                await navigator
                    .mediaDevices
                    .enumerateDevices();
            
            setVideoInputs(allDevives.filter(x => x.kind === 'videoinput'));
        }
    };

    useEffect(() => { // get the webcam stream
        getVideoInputs();
    }, []);

    useEffect(() => {
        updateWebcamStream();
    }, [activeDeviceId]);

    useEffect(() => { // play the webcam stream in the hidden video tag
        videoRef.current!.srcObject = webcamStream;
        videoRef.current?.play();
    }, [webcamStream]);

    useEffect(() => {
        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        
        const renderFrame = () => { // render the current webcam stream frame in the canvas 
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (mirroredRef.current?.checked)
                context.scale(-1, 1);

            context.drawImage(video, mirroredRef.current?.checked ? -1 * canvas.width : 0, 0, canvas.width, canvas.height);
        };

        const drawFaceArea = () => {
            // TODO: mirror
            if (currentFaceArea) {
                context.rect(
                    currentFaceArea.left, 
                    currentFaceArea.top, 
                    currentFaceArea.right, 
                    currentFaceArea.bottom
                );
                context.lineWidth = 2;
                context.strokeStyle = currentFaceArea.color;
                context.stroke();
            }
        };

        const encodeFrame = () => {
            // resize and convert the frame to jpeg, then send it 
            // TODO: mirror
            const hiddenCanvas = hiddenCanvasRef.current!;
            const hcontext = hiddenCanvas.getContext('2d')!;
            const 
                ratio = video.videoHeight / video.videoWidth,
                w = 800,
                h = ratio * w;
            hiddenCanvas.width = w;
            hiddenCanvas.height = h;
            hcontext.drawImage(video, 0, 0, w, h);

            const res = hiddenCanvas.toDataURL('image/jpeg', 1.0);
            return res;
        };

        renderFrame();
        drawFaceArea();
        const submit = async () => {
            const result = props.submitImage!(encodeFrame(), props.faceID);
            console.log(result);
            setCurrentFaceArea(result.bbox);
        };

        if (props.submitImage)
            submit();
        
        const timeout = setTimeout(
            () => setCurrentFrame((prev) => prev + 1)
        , 100); // re-render in 100ms
        return () => clearTimeout(timeout);

    }, [currentFrame]);

    return (
        <div>
            <video autoPlay={true} className="hidden" ref={videoRef} muted />
            <canvas ref={canvasRef} />
            <canvas ref={hiddenCanvasRef} className="hidden" />
            <select ref={selectRef} onChange={(e) => setActiveDeviceId(e.target.value)}>
                { videoInputs?.map(x => <option value={x.deviceId}> {x.label || `Camera ${x.deviceId}`} </option>)} 
            </select>
            <label>
                Mirror image:
                <input type='checkbox' ref={mirroredRef} checked={mirrored} onChange={
                    (e) => {
                        setMirrored(e.target.checked);
                        console.log(mirrored);
                    }
                } />
            </label> 
        </div>
    );
}