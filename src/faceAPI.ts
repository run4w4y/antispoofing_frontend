const API_URL = 'http://91.232.134.183:8080/predictions/biometric'

export const submitImage = async (imageURL: string, id: string) => {
    const imageEncoded = imageURL.split(',')[1];
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            image: imageEncoded,
            id: id
        })
    })
        .then(res => res.json())
        .catch((err) => {
            console.log(err);
            return null;
        });
}
