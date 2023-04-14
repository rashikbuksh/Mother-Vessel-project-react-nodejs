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

// error state
export const errorData = {
    order_number: "",
    importer_name: "",
    mother_vessel_name: "",
    eta: "",
    commodity: "",
    mv_location: "",
    bl_quantity: "",
    stevedore_name: "",
    stevedore_contact_number: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "stevedore_contact_number":
            errorData[fieldName] =
                fieldValue.length !== 11 ? "Invalid Number" : "";
            break;
    }
}
