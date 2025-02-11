const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')
// Определяем маршруты для различных HTTP-запросов
router.post('/', scheduleController.create) // Добавление нового занятия
router.get('/', scheduleController.getAll) // Получение всех занятий
router.delete('/:id', scheduleController.delete); // Удаление занятия по ID
router.put('/:id', scheduleController.update); //Редактирование занятия по ID
module.exports = router