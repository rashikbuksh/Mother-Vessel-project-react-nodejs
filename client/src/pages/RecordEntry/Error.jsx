// error state
export const errorData = {
    order_number: "",
    job_number: "",
    date_from_charpotro: "",
    cp_number_from_charpotro: "",
    LA_name: "",
    LV_name: "",
    dest_from: "",
    dest_to: "",
    capacity: "",
    rate: "",
    LV_master_name: "",
    LV_master_contact_number: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "LV_master_contact_number":
            errorData[fieldName] =
                fieldValue.length !== 11 ? "Invalid Number" : "";
            break;
        case "LV_master_name":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Name" : "";
            break;
    }
}
