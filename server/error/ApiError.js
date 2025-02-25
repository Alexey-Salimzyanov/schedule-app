// Определяем класс ApiError, который наследуется от встроенного класса Error
class ApiError extends Error {
    constructor(status, message){
        super(); 
        this.status = status 
        this.message = message 
    }
    // Статический метод для создания ошибки с статусом 404 (Не найдено)
    static badRequest(message){
        return new ApiError (404, message)
    }
    // Статический метод для создания ошибки с статусом 500 (Внутренняя ошибка сервера)
    static internal(message){
        return new ApiError (500, message)
    }
    // Статический метод для создания ошибки с статусом 403 (Запрещено)
    static forbidden(message){
        return new ApiError (403, message)
    }
}
module.exports = ApiError
