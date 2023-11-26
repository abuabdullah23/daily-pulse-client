// get all publisher
export const getAllPublisher = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/get-all-publisher`)
    const data = await response.json();
    return data;
}