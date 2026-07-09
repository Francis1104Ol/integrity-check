class ApiResponse{
    constructor(success, message, data = null){
        this.success = success;
        this.message = message;
        this.data = data;
    }
    static success(message, data = null){
        return new ApiResponse(true, message, data);
    }
}

export default ApiResponse;