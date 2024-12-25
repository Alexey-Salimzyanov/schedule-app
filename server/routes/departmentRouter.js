const Router = require('express')
const router = new Router()
// Импортируем контроллер для кафедр
const departmentController = require('../controllers/departmentController')

// Определяем маршруты для различных HTTP-запросов
router.post('/', departmentController.create) // Создание новой кафедры
router.get('/', departmentController.getAll) // Получение всех кафедр
router.delete('/:id',  departmentController.delete) // Удаление кафедры по ID
router.put('/:id', departmentController.update); // Редактирование кафедры по ID

module.exports = router