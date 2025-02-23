require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/mainRouter.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

// Устанавливаем порт
const PORT = process.env.PORT || 80
const app = express()
// Используем middleware
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

// Функция для запуска сервера
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
// Запускаем сервер
start()