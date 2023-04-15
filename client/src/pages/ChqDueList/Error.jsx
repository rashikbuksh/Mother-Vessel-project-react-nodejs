// error state
export const errorData = {
    order_job_number: "",
    LA_name: "",
    LV_name: "",
    commodity: "",
    mode: "",
    chq_issue_date: "",
    chq_amount: "",
    part_pay: "",
    balance: "",
    payment: "",
    amount: "",
    payment_chq_no: "",
    payment_chq_amount: "",
    payment_chq_date: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "payment_chq_date":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Payment Method" : "";
            break;
        case "payment_chq_no":
            errorData[fieldName] =
                fieldValue.length !== Number ? "Invalid Cheque Number" : "";
            break;
    }
}
