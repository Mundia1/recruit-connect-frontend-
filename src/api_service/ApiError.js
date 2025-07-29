class ApiError extends Error {
    constructor(message, status = 500, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        // Capturing stack trace, excluding constructor call from it
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

export default ApiError;