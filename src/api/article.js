// get all publisher
export const getAllPublisher = async () => {
    const token = localStorage.getItem('access-token')
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/get-all-publisher`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    const data = await response.json();
    return data;
}