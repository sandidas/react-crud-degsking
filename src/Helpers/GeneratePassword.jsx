const generatePassword = () => {
    let characters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const randomPassword = Math.random().toString(36).slice(10) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5);
    return randomPassword;
}
export default generatePassword;