import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Webcam, Timer } from '../components';
import { submitImage } from '../faceAPI';
import { useTranslation } from 'react-i18next';

export function WebcamPage() {
    const location = useLocation();
    const seed = new URLSearchParams(location.search).get('key');
    const language = new URLSearchParams(location.search).get('language');
    const faceID = new URLSearchParams(location.search).get('faceid');
    const [ expired, setExpired ] = useState(false);
    const [ passed, setPassed ] = useState(false);
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        i18n.changeLanguage(language ?? 'en');
    }, []);

    if (expired)
        return <div>{t('webcam.view.timer.expired')}</div>;

    if (passed) {
        const res = seed + '|>*<|' + 'aaaaa';
        return <div>{t('webcam.view.success.text', {key: btoa(res)})} </div>;
    }

    if (!faceID || !seed)
        return <div></div>;

    return (
        <div> 
            <Webcam callback={() => setPassed(true)} faceID={faceID} submitImage={submitImage}>
                <div>
                    <b>{t('webcam.view.timer.title')}</b> 
                    <br />
                    <Timer seconds={900} callback={() => setExpired(true)} />
                </div>
            </Webcam>
        </div>
    );
}