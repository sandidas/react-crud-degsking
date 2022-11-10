const getJwtToken = async (currentUser) => {
    const location = `https://server-side-xi.vercel.app/jwt`;
    const settings = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser)
    };
    try {
        const fetchResponse = await fetch(location, settings);
        const data = await fetchResponse.json();
        if (data.success === true) {
            // local storage is not the best place to store token, but easiest.
            localStorage.setItem('ds-token', data.token)

        } else if (data.success === false) {
            showAlert('error', data.message)
        } else {
            showAlert('danger', data.message)
        }
    } catch (error) {
        // console.log(error);
        showAlert('danger', "fail to communicate with server: Token")
    }
}

export default getJwtToken;