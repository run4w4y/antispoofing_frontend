import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Webcam } from '../components'
import { submitImage } from '../faceAPI'

export function WebcamPage() {
    const location = useLocation();
    const seed = new URLSearchParams(location.search).get('seed');
    const { faceID } = useParams<{ faceID: string }>();

    if (!faceID || !seed)
        return <div> 404 </div>;
    
    return (
        <div> 
            <Webcam faceID={faceID} submitImage={submitImage} />
        </div>
    );
}