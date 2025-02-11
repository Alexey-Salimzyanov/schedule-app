const { ClassSchedule, AuditoriumList, DisciplineList, TeacherList, GroupList } = require('../models/models')
const sequelize = require('../db')

class scheduleController {
    // Метод добавления нового занятия
    async create(req, res) {
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM class_schedules");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE class_schedules_id_seq RESTART WITH ${maxId + 1}`);
    
        const { number, firstDate, period, lastDate, teacherListId, disciplineListId, groupListId, auditoriumListId } = req.body;
    
        // Парсим дату из firstDate (формат "yyyy-MM-dd")
        const date = new Date(firstDate);
        const month = date.getMonth() + 1; // getMonth() возвращает месяц от 0 до 11
        const year = date.getFullYear();
    
        // Определяем семестр на основе месяца из firstDate
        let semester;
        if (month >= 1 && month <= 6) {
            semester = "Весенний";
        } else if (month >= 7 && month <= 12) {
            semester = "Осенний";
        }
    
        // Создаем запись в базе данных
        const request = await ClassSchedule.create({
            number,
            firstDate,
            period,
            lastDate,
            teacherListId,
            disciplineListId,
            groupListId,
            auditoriumListId,
            semester,
            year // Используем год из firstDate
        });
    
        return res.json(request);
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
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID заявки является обязательным параметром" });
        }
        const request = await ClassSchedule.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({ message: "Заявка не найдена" });
        }
        await request.destroy();
        return res.json({ message: "Заявка успешно удалена" });
    }

    async update(req, res) {
        const { id } = req.params;
        const { auditoriumId, number, teacherId, disciplineId, groupId, firstDate, period, lastDate } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID является обязательным параметром" });
        }
        const lesson = await ClassSchedule.findOne({ where: { id } });



        if (!lesson) {
            return res.status(404).json({ message: "Объект не найден" });
        }

        lesson.number = number
        lesson.auditoriumListId = auditoriumId
        lesson.groupListId = groupId
        lesson.disciplineListId = disciplineId
        lesson.teacherListId = teacherId
        lesson.firstDate = firstDate
        lesson.lastDate = lastDate
        lesson.period = period

        await lesson.save(); // Сохраняем изменения в базе данных
        return res.json({ message: "Занятие обновлено успешно", lesson });
    }
}
module.exports = new scheduleController()