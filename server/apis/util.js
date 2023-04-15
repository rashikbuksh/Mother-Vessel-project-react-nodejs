function ToastRes(status, message, onlyMessage = false) {
    this.status = status;
    this.message = message;
    switch (status) {
        case "create":
            this.message = onlyMessage
                ? `${message}`
                : `${message} created successfully`;
            break;
        case "update":
            this.message = onlyMessage
                ? `${message}`
                : `${message} updated successfully`;
            break;
        case "delete":
            this.message = onlyMessage
                ? `${message}`
                : `${message} deleted successfully`;
            break;
        case "error":
            this.message = onlyMessage ? `${message}` : `Error in ${message}`;
            break;
        default:
            this.message = message;
            break;
    }
    return { status: this.status, message: this.message };
}

module.exports.ToastRes = ToastRes;
