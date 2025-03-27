const { TeacherList, DepartmentList, PositionList} = require('../models/models')
const sequelize = require('../db') 
class TeacherController{
    // Метод добавления нового преподавателя
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM teacher_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE teacher_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {surname_N_P,positionListId,departmentListId} = req.body
        const teacher = await TeacherList.create({surname_N_P,positionListId,departmentListId})
        return res.json(teacher)
    }
    // Метод получения всех преподавателей
    async getAll(req,res){
        const teachers = await TeacherList.findAll()
        return res.json(teachers)
    }
     // Метод получения всех преподавателей с дополнительной информацией
    async getAllJoined(req,res){
        const teachers = await TeacherList.findAll({
            include: [{
                model: DepartmentList,
                attributes: ['name'], 
            },
            {
                model: PositionList,
                attributes: ['short_name'], 
            }]
        })
        return res.json(teachers)
    }
     // Метод удаления преподавателя по id
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID является обязательным параметром"});
        }
        const request = await TeacherList.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({message: "Объект не найден"});
        }
        await request.destroy();
        return res.json({message: "Удаление прошло успешно"});
    }

    // Метод редактирования преподавателя
    async update(req, res) {
        const { id } = req.params;
        const { surname_N_P, positionListId, departmentListId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID является обязательным параметром" });
        }

        const teacher = await TeacherList.findOne({ where: { id } });
        if (!teacher) {
            return res.status(404).json({ message: "Объект не найден" });
        }

        // Обновляем данные преподавателя
        teacher.surname_N_P = surname_N_P || teacher.surname_N_P;
        teacher.positionListId = positionListId || teacher.positionListId;
        teacher.departmentListId = departmentListId || teacher.departmentListId;

        await teacher.save(); // Сохраняем изменения в базе данных
        return res.json(teacher);
    }

      // Метод для получения всех преподавателей при регистрации
      async getTeachers(req, res) {
        try {
            const teachers = await teacherList.findAll(); 
            return res.json(teachers); // Возвращаем список преподавателей в формате JSON
        } catch (error) {
            console.error("Ошибка при получении преподавателей:", error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
        }
}

module.exports = new TeacherController()