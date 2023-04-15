export const fetchData = async (url, setData, setLoading, setError) => {
    const abortCont = new AbortController();
    try {
        await fetch(url, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json();
            })
            .then((res) => {
                setData(res);
                setLoading(false);
                setError(null);
            });
    } catch (err) {
        if (err.name === "AbortError") {
            console.log("Fetch Aborted");
        } else {
            setLoading(false);
            setError(err.message);
        }
    }
    return () => abortCont.abort();
};
