const {DepartmentList} = require('../models/models')
const sequelize = require('../db') 
const { Department } = require('../models/models'); 

// Определяем класс DepartmentController
class DepartmentController{
    // Метод для создания новой кафедры
    async create(req,res){
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM department_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE department_lists_id_seq RESTART WITH ${maxId + 1}`);
        const {name} = req.body
        const department = await DepartmentList.create({name})
        return res.json(department)
    }
    // Метод для получения всех кафедр
    async getAll(req,res){
        const departments = await DepartmentList.findAll()
        return res.json(departments)
    }
    // Метод для удаления кафедры по id
    async delete(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "ID заявки является обязательным параметром"});
        }
        const request = await DepartmentList.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({message: "Заявка не найдена"});
        }
        await request.destroy();
        return res.json({message: "Заявка успешно удалена"});
    }

    //Метод для редактирования кафедры по ID
    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body; // Убедитесь, что это строка

        console.log('Полученные данные:', req.body); // Отладочное сообщение

        try {
            const department = await DepartmentList.findByPk(id);
            if (!department) {
                return res.status(404).json({ message: 'Кафедра не найдена' });
            }

            if (typeof name !== 'string') {
                return res.status(400).json({ message: 'Имя должно быть строкой' });
            }

            department.name = name;

            try {
                await department.save();
                return res.status(200).json(department);
            } catch (error) {
                console.error('Ошибка при сохранении кафедры:', error); // Логируем ошибку
                return res.status(500).json({ message: 'Не удалось обновить кафедру. Пожалуйста, попробуйте еще раз.' });
            }
        } catch (error) {
            console.error('Ошибка при поиске кафедры:', error); // Логируем ошибку
            return res.status(500).json({ message: 'Не удалось обновить кафедру. Пожалуйста, попробуйте еще раз.' });
        }
    }
    
}
module.exports = new DepartmentController()
