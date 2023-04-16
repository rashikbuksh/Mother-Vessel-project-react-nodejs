// error state
export const errorData = {
    name: "",
    username: "",
    password: "",
    position: "",
    department: "",
};
export function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "username":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Username" : "";
            break;
    }
}
