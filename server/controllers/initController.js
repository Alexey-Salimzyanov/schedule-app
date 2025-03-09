const { InitList } = require('../models/models')
const sequelize = require('../db')



class InitController {

    async getOne(req, res) {
		const { id } = req.params;
		const init = await InitList.findOne({ where: { id } });
        return res.json(init)
    }

    async update(req, res) {
		const maxIdResult = await sequelize.query("SELECT MAX(id) FROM init_lists");
		const maxId = maxIdResult[0][0].max;
		await sequelize.query(`ALTER SEQUENCE init_lists_id_seq RESTART WITH ${maxId + 1}`);
        const { id } = req.params;
        const {date} = req.body

        const init = await InitList.findOne({ where: { id } });
        if (!init) {
			const startDate = date
			const el = await InitList.create({ startDate });
            return res.json({ message: "Стартовая дата создана успешно" });
        }

        init.startDate = date
        await init.save(); 
        return res.json({ message: "Стартовая дата обновлена успешно" });
    }

}
module.exports = new InitController()
