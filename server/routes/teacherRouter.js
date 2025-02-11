const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/teacherController')
// Определяем маршруты для различных HTTP-запросов
router.post('/', teacherController.create) // Добавление нового преподавателя
router.get('/', teacherController.getAll) // Получение всех преподавателей
router.get('/joined', teacherController.getAllJoined) // Получение всех преподавателей с дополнительной информацией
router.delete('/:id',  teacherController.delete) // Удаление преподавателя по ID
router.put('/:id', teacherController.update); // Редактирование преподавателя по ID

module.exports = router