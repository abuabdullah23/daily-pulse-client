// save a user to database
export const saveUser = user => {
    const currentUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
    }

    fetch(`${import.meta.env.VITE_BASE_API_URL}/save-user`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
    })
        .then(res => res.json())
        .then(data => console.log(data))
}