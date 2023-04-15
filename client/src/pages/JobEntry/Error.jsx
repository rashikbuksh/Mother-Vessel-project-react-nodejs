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
