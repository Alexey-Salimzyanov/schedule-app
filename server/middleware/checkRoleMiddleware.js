const jwt = require('jsonwebtoken')
// Экспортируем функцию, которая принимает роль и возвращает middleware
module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") { next() }
        try {
            // Извлекаем токен из заголовка авторизации
            const token = req.headers.authorization.split(' ')[1]
            if (!token) { return res.status(401).json({ message: "Не авторизован" }) }
            // Проверяем токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded.role)
            // Проверяем, соответствует ли роль пользователя требуемой роли
            if (role === 'ADMIN' && decoded.role !== 'ADMIN') {
                return res.status(403).json({ message: "Нет доступа" })
            }
            // Сохраняем расшифрованные данные токена в объекте запроса
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" })
        }
    }
}