const { TypeList } = require('../models/models');
const sequelize = require('../db');

class TypeController {
    // Метод добавления нового типа
    async create(req, res) {
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM type_lists");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE type_lists_id_seq RESTART WITH ${maxId + 1}`);
        const { name } = req.body;
        const type = await TypeList.create({ name });
        return res.json(type);
    }

    // Метод получения всех типов
    async getAll(req, res) {
        const types = await TypeList.findAll();
        return res.json(types);
    }

    // Метод удаления типа по id
    async delete(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID является обязательным параметром" });
        }
        const type = await TypeList.findOne({ where: { id } });
        if (!type) {
            return res.status(404).json({ message: "Объект не найден" });
        }
        await type.destroy(); // Удаляем тип
        return res.json({ message: "Тип удален успешно" });
    }

    // Метод обновления типа по id
    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID является обязательным параметром" });
        }

        const type = await TypeList.findOne({ where: { id } });
        if (!type) {
            return res.status(404).json({ message: "Объект не найден" });
        }

        type.name = name; // Обновляем имя типа
        await type.save(); // Сохраняем изменения

        return res.json({ message: "Тип обновлен успешно", type });
    }
}

module.exports = new TypeController();