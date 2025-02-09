const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
// Определяем маршруты для различных HTTP-запросов
router.post('/registration', userController.registration) // Регистрация пользователя
router.post('/login', userController.login) // Вход пользователя
router.get('/auth',authMiddleware, userController.check) // Проверка аутентификации пользователя
router.get('/', userController.getAll) // Получение всех пользователей
router.delete('/:id',  userController.delete) // Удаление пользователя по id
router.put('/:id', userController.update); // Редактирование пользователя по id

module.exports = router
