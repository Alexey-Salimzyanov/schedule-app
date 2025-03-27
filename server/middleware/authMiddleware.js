const jwt = require('jsonwebtoken');

// Экспортируем функцию middleware для проверки авторизации
module.exports = function (req, res, next) {
    // Если метод запроса - OPTIONS, просто переходим к следующему middleware
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        // Извлекаем токен из заголовка авторизации
        const token = req.headers.authorization.split(' ')[1]; // Bearer token
        // Если токен отсутствует, отправляем ответ со статусом 401 (Не авторизован)
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        // Проверяем токен
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Сохраняем расшифрованные данные токена в объекте запроса
        req.user = decoded;

        // Переходим к следующему middleware
        next();
    } catch (e) {
        // Если произошла ошибка, отправляем ответ со статусом 401 (Не авторизован)
        return res.status(401).json({ message: "Не авторизован" });
    }
};

