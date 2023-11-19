import { getARandomImageName } from "../utils/help";
import { firebase } from "./firebaseConfig"


// with Async Function

async function uploadImage(imgUri) {
    try {
        const imgBlob = await makeBlob(imgUri);
        const userStorageRef = firebase.storage().ref("users/");
        const imageName = getARandomImageName();
        console.log(imageName);
        await userStorageRef.child(imageName).put(imgBlob);

    } catch (error) {
        console.log(error)
    }
}
const makeBlob = async (img) => {
    const blobInMaking = await fetch(img);
    const theBlob = await blobInMaking.blob();
    return theBlob;
}

export { uploadImage, makeBlob };