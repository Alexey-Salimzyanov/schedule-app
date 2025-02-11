const { DisciplineList} = require('../models/models')
const sequelize = require('../db') 

class  DisciplineController{
    // Метод для создания новой дисциплины
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM discipline_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE discipline_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {name,short_name} = req.body
        const discipline = await  DisciplineList.create({name,short_name})
        return res.json(discipline)
    }
    // Метод получения всех дисциплин
    async getAll(req,res){
        const disciplines = await  DisciplineList.findAll()
        return res.json(disciplines)
    }
    // Метод удаления дисциплины по ID
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }
        const request = await DisciplineList.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }
        await request.destroy();
        return res.json({message: "Заявка успешно удалена"});
    }

    // Метод редактирования дисциплины по ID
    async update(req, res) {
        const { id } = req.params;
        const { name, short_name } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID дисциплины является обязательным параметром" });
        }

        const discipline = await DisciplineList.findOne({ where: { id } });
        if (!discipline) {
            return res.status(404).json({ message: "Дисциплина не найдена" });
        }

        // Обновляем дисциплину
        discipline.name = name;
        discipline.short_name = short_name;
        await discipline.save();

        return res.json(discipline);
    }
}
module.exports = new  DisciplineController()