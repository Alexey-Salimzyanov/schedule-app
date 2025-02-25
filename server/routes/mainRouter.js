const Router = require('express')
const router = new Router()

// Импортируем роутеры для различных частей приложения
const userRouter = require('./userRouter')
const departmentRouter = require('./departmentRouter')
const positionRouter = require('./positionRouter')
const auditoriumRouter = require('./auditoriumRouter')
const typeRouter = require('./typeRouter')
const scheduleRouter = require('./scheduleRouter')
const teacherRouter = require('./teacherRouter')
const disciplineRouter = require('./disciplineRouter')
const groupRouter = require('./groupRouter')
const requestRouter = require('./requestRouter')

// Используем роутеры для обработки запросов к определенным путям
router.use('/department', departmentRouter)
router.use('/user',userRouter)
router.use('/position',positionRouter)
router.use('/auditorium',auditoriumRouter)
router.use('/type',typeRouter)
router.use('/schedule',scheduleRouter)
router.use('/teacher',teacherRouter)
router.use('/discipline',disciplineRouter)
router.use('/group',groupRouter)
router.use('/request',requestRouter)

// Экспортируем роутер
module.exports = router
