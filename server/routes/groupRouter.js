const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupController');

// Определяем маршруты для различных HTTP-запросов
router.post('/', groupController.create); // Добавление новой группы
router.get('/', groupController.getAll); // Получение всех групп
router.delete('/:id', groupController.delete) // Удаление группы по ID
router.put('/:id', groupController.update); // Редактирование группы по ID

module.exports = router;