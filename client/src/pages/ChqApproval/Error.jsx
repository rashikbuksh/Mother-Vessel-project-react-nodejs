// error state
export const errorData = {
    order_job_number: "",
    date_from_charpotro: "",
    cp_number_from_charpotro: "",
    LA_name: "",
    LV_name: "",
    MV_name: "",
    dest_from: "",
    dest_to: "",
    capacity_ton: "",
    rate: "",
    sixty_percent_payment_amount: "",
    sixty_percent_payment_chq_number: "",
    sixty_percent_payment_chq_date: "",
    forty_percent_payment_amount: "",
    forty_percent_payment_chq_number: "",
    forty_percent_payment_chq_date: "",
    damarage: "",
    second_trip: "",
    third_trip: "",
    direct_trip: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "dest_to":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Destination" : "";
            break;
        case "rate":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Rate" : "";
            break;
    }
}
