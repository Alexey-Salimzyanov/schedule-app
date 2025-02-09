const {ClassSchedule,AuditoriumList, DisciplineList, TeacherList, GroupList} = require('../models/models')
const sequelize = require('../db') 

class scheduleController{
    // Метод добавления нового занятия
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM class_schedules");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE class_schedules_id_seq RESTART WITH ${maxId + 1}`);
         const {number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId} = req.body
         const request = await ClassSchedule.create({number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId})
        return res.json(request)
    }
    //метод получения всех занятий с дополнительной информацией
    async getAll(req, res) {
        const schedule = await ClassSchedule.findAll({
            //присоединяем необходимые поля
            include: 
            [{
                model: AuditoriumList,
                attributes: ['number'], 
            },
            {
                model: DisciplineList,
                attributes: ['short_name'], 
            },
            {
                model: TeacherList,
                attributes: ['surname_N_P'], 
            },
            {
                model: GroupList,
                attributes: ['name'], 
            }]
        });
    return res.json(schedule);
    }
    // Метод удаления занятия по id
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }
        const request = await ClassSchedule.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }
        await request.destroy();
        return res.json({message: "Заявка успешно удалена"});
    }

    async update(req, res) {
        const { id } = req.params;
        const {auditorium, number, teacher, discipline, group, firstDate, period, lastDate} = req.body;
        console.log(id);

        if (!id) {
            return res.status(400).json({ message: "ID является обязательным параметром" });
        }
        const lesson = await ClassSchedule.findOne({ where: { id } });



        if (!lesson) {
            return res.status(404).json({ message: "Объект не найден" });
        }

        // Обновляем данные о занятии
        console.log(auditorium, number, teacher, discipline, group, firstDate, period, lastDate);
        
        console.log(lesson);
        lesson.number=number
        // teacher.surname_N_P = surname_N_P || teacher.surname_N_P;
        // teacher.positionListId = positionListId || teacher.positionListId;
        // teacher.departmentListId = departmentListId || teacher.departmentListId;

        await lesson.save(); // Сохраняем изменения в базе данных
        return res.json(true);
    }
}
module.exports = new scheduleController()