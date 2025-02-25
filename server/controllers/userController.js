const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserAcc, TeacherList } = require('../models/models')
const sequelize = require('../db')

// Функция для генерации JWT
const generateJwt = (id, login, role, teacherListId) => {
    return jwt.sign(
        { id, login, role, teacherListId },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}
// Определяем класс UserController
class UserController {
    // Метод для регистрации пользователя
    async registration(req, res, next) {
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM user_accs");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE user_accs_id_seq RESTART WITH ${maxId + 1}`);
        const { login, password, role } = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Неверный email или password'))
        }
        const candidate = await UserAcc.findOne({ where: { login } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        let teacherListId = 1;
        const user = await UserAcc.create({ login, password: hashPassword, role, teacherListId })
        const token = generateJwt(user.id, user.login, user.role, user.teacherListId)
        return res.json({ token })
    }
    // Метод для создания пользователя
    async create(req, res) {
        const maxIdResult = await sequelize.query("SELECT MAX(id) FROM user_accs");
        const maxId = maxIdResult[0][0].max;
        await sequelize.query(`ALTER SEQUENCE user_accs_id_seq RESTART WITH ${maxId + 1}`);
        const { login, password, role, teacherListId } = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Неверный email или password'))
        }
        const candidate = await UserAcc.findOne({ where: { login } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await UserAcc.create({ login, password: hashPassword, role, teacherListId })
        return res.json(user)
    }

    // Метод для входа пользователя
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await UserAcc.findOne({ where: { login } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role, user.teacherListId)
        return res.json({ token })
    }
    // Метод для проверки авторизации пользователя
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role, req.user.teacherListId)
        return res.json({ token })
    }

    // Метод для получения всех пользователей
    async getAll(req, res) {
        const users = await UserAcc.findAll({
            include: [{
                model: TeacherList,
                attributes: ['surname_N_P'],
            }]
        });
        return res.json(users)
    }
    // Метод для удаления пользователя по id
    async delete(req, res) {
        const { id } = req.params;
        console.log(req);

        if (!id) {
            return res.status(400).json({ message: "ID  является обязательным параметром" });
        }
        const request = await UserAcc.findOne({ where: { id } });
        if (!request) {
            return res.status(404).json({ message: "Объект не найден" });
        }
        await request.destroy();
        return res.json({ message: "Удаление прошло успешно" });
    }
    // Метод обновления типа по id
    async update(req, res) {
        const { id } = req.params;
        const { login, password, role } = req.body

        const user = await UserAcc.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "Объект не найден" });
        }

        user.login = login
        const hashPassword = await bcrypt.hash(password, 5)
        user.password = hashPassword
        user.role = role

        await user.save(); // Сохраняем изменения
        return res.json({ message: "Пользователь обновлен успешно" });
    }

}
module.exports = new UserController()
