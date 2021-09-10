import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface WebcamProps {
    children: JSX.Element,
    faceID: string,
    assignmentId: string,
    submitImage?: (img: string, id: string, assignmentId: string) => any,
    callback?: () => void,
    expiredCallback?: () => void
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
    const [mirrored, setMirrored] = useState<boolean>(true);
    const [currentFrame, setCurrentFrame] = useState<number>(0);
    const [currentFaceArea, setCurrentFaceArea] = useState<FaceArea | null>(null);
    const [resultSpoofing, setResultSpoofing] = useState<number | null>(null);
    const [resultFaceScore, setResultFaceScore] = useState<number | null>(null);
    const [successCount, setSuccessCount] = useState<number>(0);
    const [dropTimeout, setDropTimeout] = useState<number | null>(null);
    const mirroredRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const {t, i18n} = useTranslation('common');

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

    const resetDropTimeout = () => {
        if (dropTimeout)
            clearTimeout(dropTimeout);

        console.log('drop timeout cleared');

        setDropTimeout(window.setTimeout(() => {
            if (props.expiredCallback)
                props.expiredCallback();
        }, 60000));

        console.log('drop timeout set');
    }

    useEffect(() => { // get the webcam stream
        getVideoInputs();
        resetDropTimeout();
    }, []);

    useEffect(() => {
        updateWebcamStream();
    }, [activeDeviceId]);

    useEffect(() => { // play the webcam stream in the hidden video tag
        videoRef.current!.srcObject = webcamStream;
        videoRef.current?.play();
    }, [webcamStream]);

    useEffect(() => {
        if (successCount >= 5 && props.callback)
            props.callback();
    }, [successCount]);

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
            if (currentFaceArea) {
                const ratio2 = canvas.width / 600;
                context.strokeStyle = currentFaceArea.color;
                context.lineWidth = 2;
                context.rect(
                    currentFaceArea.left * ratio2 - (mirroredRef.current?.checked ? canvas.width : 0), 
                    currentFaceArea.top * ratio2, 
                    (currentFaceArea.right - currentFaceArea.left) * ratio2, 
                    (currentFaceArea.bottom - currentFaceArea.top) * ratio2
                );
                context.stroke();
            }
        };

        const encodeFrame = () => {
            // resize and convert the frame to jpeg, then send it 
            const hiddenCanvas = hiddenCanvasRef.current!;
            const hcontext = hiddenCanvas.getContext('2d')!;
            const 
                ratio = video.videoHeight / video.videoWidth,
                w = 600,
                h = ratio * w;
            hiddenCanvas.width = w;
            hiddenCanvas.height = h;

            hcontext.drawImage(video, 0, 0, w, h);
            // if (mirroredRef.current?.checked)
            //     hcontext.scale(-1, 1);
            // hcontext.drawImage(video, mirroredRef.current?.checked ? -1 * hiddenCanvas.width : 0, 0, w, h);

            const res = hiddenCanvas.toDataURL('image/jpeg', 1.0);
            return res;
        };

        renderFrame();
        drawFaceArea();
        const submit = async () => {
            const result = await props.submitImage!(encodeFrame(), props.faceID, props.assignmentId);
            if (result.face_score < 0.7) 
                resetDropTimeout();
            const isSuccessful = result.spoofing < 0.3 && result.face_score < 0.7;
            setCurrentFaceArea({
                ...result.bbox,
                color: isSuccessful ? 'green' : 'blue'
            });
            setResultFaceScore(result.face_score);
            setResultSpoofing(result.spoofing);
            if (isSuccessful)
                setSuccessCount(prev => prev + 1);
        };

        if (props.submitImage && currentFrame % 15 === 0)
            submit();
        
        const timeout = setTimeout(
            () => setCurrentFrame((prev) => prev + 1)
        , 100); // re-render in 100ms
        return () => clearTimeout(timeout);

    }, [currentFrame]);

    return (
        <div>
            <video autoPlay={true} className="hidden" ref={videoRef} muted playsInline />
            <div className="grid grid-cols-2">
                <div ref={canvasContainerRef} className="col-span-2 lg:col-span-1">
                    <canvas ref={canvasRef} />
                </div>
                <div className="col-span-2 lg:col-span-1 w-50 p-6 bg-gray-100">
                    <ul>
                        <li>
                            <b>{t('webcam.bar.success_count.title')}</b> 
                            {t('webcam.bar.success_count.text', {success_count: successCount})}
                        </li>
                        <li>
                            {!resultFaceScore || resultFaceScore > 0.7 ? 
                            <b> {t('webcam.bar.face_score.not_target_face_text')} </b> : 
                            <b> {t('webcam.bar.face_score.target_face_text')} </b>}
                        </li>
                        <li>
                            <b>spoofing:</b> {resultSpoofing}
                        </li>
                        <li>
                            <label>
                                <b>{t('webcam.bar.input_select.title')}</b>
                                <br />
                                <select ref={selectRef} onChange={(e) => setActiveDeviceId(e.target.value)}>
                                    { videoInputs?.map(x => <option value={x.deviceId}> {x.label || `Camera ${x.deviceId}`} </option>)} 
                                </select>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center">
                                <b className="pr-2 flex-col">{t('webcam.bar.mirror_toggle.title')}</b>
                                <input className="flex-col" type='checkbox' ref={mirroredRef} checked={mirrored} onChange={
                                    (e) => {
                                        setMirrored(e.target.checked);
                                    }
                                } />
                            </label> 
                        </li>
                        <li>
                            {props.children}
                        </li>
                        <li>
                            <button id="successButton" className="hidden" onClick={() => setSuccessCount(prev => prev + 1)}> Success button </button>
                        </li> 
                    </ul>
                </div>
            </div>
            
            <canvas ref={hiddenCanvasRef} className="hidden" />
        </div>
    );
}