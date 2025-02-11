const Router = require('express')
const router = new Router()
const requestController = require('../controllers/requestController')
// Определяем маршруты для различных HTTP-запросов
router.post('/', requestController.create) // Добавление новой заявки
router.get('/', requestController.getAll) // Получение всех заявок
router.put('/status', requestController.updateStatus) // Изменение статуса заявки
router.put('/:id', requestController.update) //Редактирование заявки по ID
router.delete('/:id', requestController.delete); // Удаление заявки по ID
module.exports = router