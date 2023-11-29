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


// get all approve article : Route: ?pageNumber=4&perPage=3
export const getAllApprovedArticle = async (pageNumber, perPage) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/get-approved-articles?pageNumber=${pageNumber}&perPage=${perPage}`)
    const data = await response.json();
    return data;
}

// get all trending
export const getTrendingArticles = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/trending-articles`)
    const data = await response.json();
    return data;
}