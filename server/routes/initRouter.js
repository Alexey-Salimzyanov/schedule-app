const Router = require('express')
const router = new Router()
const initController = require('../controllers/initController')

// Определяем маршруты для различных HTTP-запросов

router.get('/:id', initController.getOne) 
router.put('/:id', initController.update); 

module.exports = router
