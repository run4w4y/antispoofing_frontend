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
    const [ expiredT, setExpiredT ] = useState(false);
    const [ passed, setPassed ] = useState(false);
    const [ uploaded, setUploaded ] = useState(false);
    const { t, i18n } = useTranslation('common');

    useEffect(() => {
        i18n.changeLanguage(language ?? 'en');
    }, []);

    if (!faceID || !seed)
        return <div></div>;

    if (expired)
        return <div>{t('webcam.view.timer.expired')}</div>;

    if ((passed || expiredT) && uploaded) {
        const res = btoa(atob(seed) + '|>*<|' + 'aaaaa');
        return <div>
            {t('webcam.view.success.text', {key: res})} 
            <button className="pl-2 underline text-gray-600" onClick={async () => {
                await navigator.clipboard.writeText(res);
            }}> 
                {t('webcam.view.success.copy_button')} 
            </button>
        </div>;
    }

    return (
        <div> 
            <Webcam 
                assignmentId={atob(seed)} 
                callback={() => setPassed(true)} 
                expiredCallback={() => setExpired(true)} 
                faceID={faceID} 
                submitImage={submitImage}
                uploadCallback={() => setUploaded(true)}
                passed={expiredT}
            >
                <div>
                    <b>{t('webcam.view.timer.title')}</b> 
                    <br />
                    <Timer seconds={300} callback={() => setExpiredT(true)} />
                </div>
            </Webcam>
        </div>
    );
}