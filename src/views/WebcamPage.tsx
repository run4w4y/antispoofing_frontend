import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Webcam, Timer } from '../components'
import { submitImage } from '../faceAPI'

export function WebcamPage() {
    const location = useLocation();
    const seed = new URLSearchParams(location.search).get('seed');
    const { faceID } = useParams<{ faceID: string }>();
    const [ expired, setExpired ] = useState(false);
    const [ passed, setPassed ] = useState(false);

    if (!faceID || !seed)
        return <div></div>;
    
    if (expired)
        return <div>Time limit was reached.</div>;

    if (passed)
        return <div>You passed, here's you key: </div>;

    return (
        <div> 
            <Webcam callback={() => setPassed(true)} faceID={faceID} submitImage={submitImage}>
                <div>
                    <b>Time left:</b> 
                    <br />
                    <Timer seconds={600} callback={() => setExpired(true)} />
                </div>
            </Webcam>
        </div>
    );
}