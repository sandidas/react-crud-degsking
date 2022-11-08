import generatePassword from "./GeneratePassword";

export const storeSingleUser = async (user, password) => {
    let userPassword;
    if (!password) {
        userPassword = generatePassword();
    } else {
        userPassword = password;
    }

    const userInfo = {
        name: user.name, // come from state
        email: user.email, // come from state
        password: userPassword, // come from state
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
        description: '',
        email_temp: '',
        remember_token: '',
        emailVerified: user.emailVerified,
        user_type: 'client',
        is_admin: false,
        soft_delete: false,
        deleted_at: '',
        updated_at: '',
        created_at: Date.now(),
    }
    const uri = "http://localhost:5000/user";
    const settings = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    };
    try {
        const fetchResponse = await fetch(uri, settings);
        const data = await fetchResponse.json();
        if (data.success === true) {
            return result = { 'status': true, 'Message': data.message };
        } else if (data.success === false) {
            return result = { 'status': false, 'Message': data.message };
        } else {
            return result = { 'status': false, 'Message': data.message };
        }
    } catch (error) {
        console.log(error);
    }
}