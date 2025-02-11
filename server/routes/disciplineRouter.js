const Router = require('express')
const router = new Router()
// Импортируем контроллер для дисциплин
const disciplineController = require('../controllers/disciplineController')
// Определяем маршруты для различных HTTP-запросов
router.post('/', disciplineController.create) // Добавление новой дисциплины
router.get('/', disciplineController.getAll) // Получение всех дисциплин
router.delete('/:id',  disciplineController.delete) // Удаление дисциплины по ID
router.put('/:id', disciplineController.update); // Обновление дисциплины по ID

module.exports = router