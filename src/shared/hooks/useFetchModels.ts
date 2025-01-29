import { useState, useEffect } from "react";

interface Model {
    id: number;
    name: string;
    productName: string;
    typeName: string;
    models: any[];
    // Add other properties as needed
}

const useFetchModels = (url: string) => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setModels(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, [url]);

    return { models, loading, error };
};

export default useFetchModels;
