// error state
export const errorData = {
    LV_name: "",
    date_from_charpotro: "",
    commodity: "",
    LA_name: "",
    dest_from: "",
    dest_to: "",
    current_location: "",
    remark: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "current_location":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Location" : "";
            break;
    }
}
