const { GroupList } = require('../models/models');
const sequelize = require('../db');

class GroupController {
    // Метод создания новой группы
    async create(req, res) {
        try {
            const { name } = req.body;

            // Проверка на наличие имени группы
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ message: "Название группы является обязательным и должно быть строкой" });
            }

            const maxIdResult = await sequelize.query("SELECT MAX(id) FROM group_lists");
            const maxId = maxIdResult[0][0].max || 0; // Если maxId равен null, устанавливаем 0
            await sequelize.query(`ALTER SEQUENCE group_lists_id_seq RESTART WITH ${maxId + 1}`);

            const group = await GroupList.create({ name });
            return res.json(group);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при создании группы" });
        }
    }

    // Метод получения всех групп 
    async getAll(req, res) {
        try {
            const groups = await GroupList.findAll();
            return res.json(groups);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при получении групп" });
        }
    }

    // Метод удаления группы по id
    async delete(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID группы является обязательным параметром" });
        }

        try {
            const group = await GroupList.findOne({ where: { id } });
            if (!group) {
                return res.status(404).json({ message: "Группа не найдена" });
            }

            await group.destroy();
            return res.json({ message: "Группа успешно удалена" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при удалении группы" });
        }
    }
    
    // Метод для редактирования группы по id
    async update(req, res) {
    const { id } = req.params; // Получаем ID группы из параметров запроса
    const { name } = req.body; // Получаем новое название группы из тела запроса

    // Проверяем, что ID и новое название переданы
    if (!id || !name) {
        return res.status(400).json({ message: "ID группы и новое название являются обязательными параметрами" });
    }

    try {
        // Находим группу по ID
        const group = await GroupList.findOne({ where: { id } });
        if (!group) {
            return res.status(404).json({ message: "Группа не найдена" });
        }
        
        if (typeof name !== 'string') {
            return res.status(400).json({ message: "Название группы должно быть строкой" });
        }
        
        // Обновляем название группы
        group.name = name;
        await group.save(); // Сохраняем изменения в базе данных

        return res.json({ message: "Группа успешно обновлена", group });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка при обновлении группы" });
    }
}
}
module.exports = new GroupController();