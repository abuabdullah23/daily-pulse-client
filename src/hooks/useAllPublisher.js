import { useEffect, useState } from "react";
import { getAllPublisher } from "../api/article";

const useAllPublisher = () => {
    const [allPublisher, setAllPublisher] = useState([]);

    // get all services
    useEffect(() => {
        getAllPublisher()
            .then(data => setAllPublisher(data))
    }, [])

    // refetch
    const refetch = () => {
        getAllPublisher()
            .then((data) => setAllPublisher(data))
    }

    return [allPublisher, refetch]
};

export default useAllPublisher;