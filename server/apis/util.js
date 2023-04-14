function ToastRes(status, message) {
    this.status = status;
    this.message = message;
    switch (status) {
        case "create":
            this.message = `${message} created successfully`;
            break;
        case "update":
            this.message = `${message} updated successfully`;
            break;
        case "delete":
            this.message = `${message} deleted successfully`;
            break;
        case "error":
            this.message = `Error in ${message}`;
            break;
        default:
            this.message = message;
            break;
    }
    return { status: this.status, message: this.message };
}

module.exports.ToastRes = ToastRes;
