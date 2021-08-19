import React, { useState, useEffect, useRef } from 'react';

interface WebcamProps {
    children: JSX.Element,
    faceID: string,
    submitImage?: (img: string, id: string) => any,
    callback?: () => void
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
    const [resultSpoofing, setResultSpoofing] = useState<number | null>(null);
    const [resultFaceScore, setResultFaceScore] = useState<number | null>(null);
    const [successCount, setSuccessCount] = useState<number>(0);
    const mirroredRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

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
        const container = canvasContainerRef.current!;
        const scaleRatio = container.offsetWidth / video.videoWidth;
        
        const renderFrame = () => { // render the current webcam stream frame in the canvas 
            canvas.width = video.videoWidth * scaleRatio;
            canvas.height = video.videoHeight * scaleRatio;

            if (mirroredRef.current?.checked)
                context.scale(-1, 1);

            context.drawImage(video, mirroredRef.current?.checked ? -1 * canvas.width : 0, 0, canvas.width, canvas.height);
        };

        const drawFaceArea = () => {
            // TODO: mirror
            if (currentFaceArea) {
                context.rect(
                    currentFaceArea.left * scaleRatio - (mirroredRef.current?.checked ? canvas.width : 0), 
                    currentFaceArea.top * scaleRatio, 
                    (currentFaceArea.right - currentFaceArea.left) * scaleRatio, 
                    (currentFaceArea.bottom - currentFaceArea.top) * scaleRatio
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
                w = 600,
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
            const result = await props.submitImage!(encodeFrame(), props.faceID);
            console.log(result);
            setCurrentFaceArea({
                ...result.bbox,
                color: result.spoofing < 0.5 ? 'green' : 'blue'
            });
            setResultFaceScore(result.face_score);
            setResultSpoofing(result.spoofing);
        };

        if (props.submitImage && currentFrame % 15 === 0)
            submit();
        
        const timeout = setTimeout(
            () => setCurrentFrame((prev) => prev + 1)
        , 100); // re-render in 100ms
        return () => clearTimeout(timeout);

    }, [currentFrame]);

    // TODO: optimize for phones
    return (
        <div>
            <video autoPlay={true} className="hidden" ref={videoRef} muted />
            <div className="grid grid-cols-2">
                <div ref={canvasContainerRef} className="col-span-2 lg:col-span-1">
                    <canvas ref={canvasRef} />
                </div>
                <div className="col-span-2 lg:col-span-1 w-50 p-6 bg-gray-100">
                    <ul>
                        <li>
                            <b>Successful attemps:</b> {successCount}
                        </li>
                        <li>
                            <b>face_score:</b> {resultFaceScore}
                        </li>
                        <li>
                            <b>spoofing:</b> {resultSpoofing}
                        </li>
                        <li>
                            <label>
                                <b>Select input:</b>
                                <br />
                                <select ref={selectRef} onChange={(e) => setActiveDeviceId(e.target.value)}>
                                    { videoInputs?.map(x => <option value={x.deviceId}> {x.label || `Camera ${x.deviceId}`} </option>)} 
                                </select>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center">
                                <b className="pr-2 flex-col">Mirror image:</b>
                                <input className="flex-col" type='checkbox' ref={mirroredRef} checked={mirrored} onChange={
                                    (e) => {
                                        setMirrored(e.target.checked);
                                        console.log(mirrored);
                                    }
                                } />
                            </label> 
                        </li>
                        <li>
                            {props.children}
                        </li>
                    </ul>
                </div>
            </div>
            
            <canvas ref={hiddenCanvasRef} className="hidden" />
        </div>
    );
}