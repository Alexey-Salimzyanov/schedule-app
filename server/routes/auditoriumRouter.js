const Router = require('express')
const router = new Router()
// Импортируем контроллер для аудиторий
const auditoriumController = require('../controllers/auditoriumController')

// Определяем маршруты для различных HTTP-запросов
router.post('/', auditoriumController.create) // Создание новой аудитории
router.get('/', auditoriumController.getAll) // Получение всех аудиторий
router.get('/joined', auditoriumController.getAllJoined) // Получение всех аудиторий с дополнительной информацией
router.delete('/:id',  auditoriumController.delete) // Удаление аудитории по id
router.put('/:id', auditoriumController.update); //Редактирование аудиторий по id

module.exports = router