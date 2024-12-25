const Router = require('express')
const router = new Router()
const positionController = require('../controllers/positionController')

// Определяем маршруты для различных HTTP-запросов
router.post('/', positionController.create) // Добавление новой должности
router.get('/', positionController.getAll) // Получение всех длжностей
router.delete('/:id',  positionController.delete) // Удаление должности по ID
router.put('/:id', positionController.update); //Редактирование должности по ID

module.exports = router