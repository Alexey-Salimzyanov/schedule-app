const { TeacherList, DepartmentList, PositionList} = require('../models/models')
class TeacherController{
    // Метод добавления нового преподавателя
    async create(req,res){
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
}

module.exports = new TeacherController()