const API_URL = 'https://toloka.suricatvision.com:8443/predictions/biometric'

interface SubmitImageParameters {
    imageURL: string,
    id: string,
    assignmentId: string,
    cameraSelected: MediaDeviceInfo,
    cameraList: MediaDeviceInfo[],
    passedTime: number | null,
}

export const submitImage = async (params: SubmitImageParameters) => {
    const imageEncoded = params.imageURL.split(',')[1];
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify({
            image: imageEncoded,
            id: params.id,
            assignmentId: params.assignmentId,
            camera_name: {
                deviceId: params.cameraSelected?.deviceId,
                label: params.cameraSelected?.label
            },
            camera_list: params.cameraList?.map(x => {
                return {
                    deviceId: x.deviceId, 
                    label: x.label
                }
            }),
            passedTime: params.passedTime || null,
        }))
    })
        .then(res => res.json())
        .catch((err) => {
            // console.log(err);
            return null;
        });
}
