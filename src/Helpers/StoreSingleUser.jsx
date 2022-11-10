import generatePassword from "./GeneratePassword";

export const storeSingleUser = async (user, password, name, photoURL) => {
    let userPassword;
    if (!password) {
        userPassword = generatePassword();
    } else {
        userPassword = password;
    }

    const userInfo = {
        name: name, // come from state
        email: user.email, // come from state
        password: user.password, // come from state
        photoURL: photoURL,
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
    const uri = "https://server-side-xi.vercel.app/user";
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
            return true
        } else if (data.success === false) {
            return false;
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}