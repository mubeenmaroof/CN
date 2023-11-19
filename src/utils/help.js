import Toast from 'react-native-toast-message';

function getARandomImageName() {
    const prefix = "user_";
    const randomNum = Math.random();
    return prefix + randomNum;
}
function getARandomRecipe() {
    const prefix = "recipe_";
    const randomNum = Math.random();
    return prefix + randomNum;
}

function showToast(toastType, toastMessage, toastPosition = "bottom") {
    Toast.show({
        type: toastType,
        text1: 'Hi',
        text2: toastMessage,
        position: toastPosition,
        duration: 3000,
    })
}



export { getARandomImageName, showToast, getARandomRecipe };