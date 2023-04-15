// error state
export const errorData = {
    id: "",
    order_job_number: "",
    date: "",
    cp_number: "",
    date_from_charpotro: "",
    commodity: "",
    capacity: "",
    LV_name: "",
    MV_name: "",
    loading_location: "",
    unloading_location: "",
    loading_start_time_stamp: "",
    loading_completion_time_stamp: "",
    sailing_time_stamp: "",
    duration_of_travel_time: "",
    unloading_start_time_stamp: "",
    unloading_completion_time_stamp: "",
    others: "",
    total_elapsed_time: "",
    voyage_time: "",
    free_time: "",
    total_despatch: "",
    daily_despatch: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "loading_location":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Loading Location" : "";
            break;
        case "unloading_location":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Unloading Location" : "";
            break;
    }
}
