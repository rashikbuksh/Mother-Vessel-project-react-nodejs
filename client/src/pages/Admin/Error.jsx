// error state
export const errorData = {
    name: "",
    username: "",
    password: "",
    position: "",
    department: "",
};
export default function errorCheck(fieldValue, fieldName) {
    switch (fieldName) {
        case "username":
            errorData[fieldName] =
                fieldValue.length !== null ? "Invalid Username" : "";
            break;
    }
}
