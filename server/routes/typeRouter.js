const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

// Определяем маршруты для различных HTTP-запросов
router.post('/',checkRoleMiddleware("ADMIN"), typeController.create) // Добавление нового типа аудитории
router.get('/', typeController.getAll) // Получение всех типов
router.delete('/:id',  typeController.delete) // Удаление типа по ID
router.put('/:id', typeController.update); // Редактирование типа по ID

module.exports = router