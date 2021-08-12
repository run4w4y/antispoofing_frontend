import React, { useState, useEffect } from 'react';
import { Webcam } from '../components'

export function WebcamPage() {
    let prev = {x: 10, y: 10};

    const f = () => {
        prev.x += 1;
        return {
            ...prev,
            h: 20,
            w: 30
        }
    }

    return (
        <div> 
            <Webcam getFaceArea={f} />
        </div>
    );
}