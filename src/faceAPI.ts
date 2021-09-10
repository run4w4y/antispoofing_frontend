const API_URL = 'https://toloka.suricatvision.com:8443/predictions/biometric'

export const submitImage = async (imageURL: string, id: string, assignmentId: string) => {
    const imageEncoded = imageURL.split(',')[1];
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify({
            image: imageEncoded,
            id: id,
            assignmentId: assignmentId
        }))
    })
        .then(res => res.json())
        .catch((err) => {
            // console.log(err);
            return null;
        });
}
