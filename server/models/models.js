// Импортируем sequelize и DataTypes
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// Определяем модели для различных таблиц в базе данных
const UserAcc = sequelize.define('user_acc',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}, // роль по умолчанию - "USER"
})

const TeacherList = sequelize.define('teacher_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname_N_P:{type: DataTypes.STRING}, // фамилия, имя и отчество преподавателя
})

const PositionList = sequelize.define('position_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true}, // название должности
    short_name:{type: DataTypes.STRING}, // сокращенное название должности
})

const DepartmentList = sequelize.define('department_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true}, // название отдела
})

const DisciplineList = sequelize.define('discipline_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true}, // название дисциплины
    short_name:{type: DataTypes.STRING}, // сокращенное название дисциплины
})

const GroupList = sequelize.define('group_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true}, // название группы
})

const AuditoriumList = sequelize.define('auditorium_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.STRING, unique: true}, // номер аудитории
    capacity:{type: DataTypes.INTEGER}, // вместимость аудитории
})

const ClassSchedule = sequelize.define('class_schedule',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.INTEGER}, //номер пары
    firstDate:{type: DataTypes.DATEONLY}, //дата первого занятия
    period:{type: DataTypes.INTEGER}, //периодиность занятия
    lastDate:{type: DataTypes.DATEONLY}, //дата последнего занятия
    semester:{type: DataTypes.STRING}, // Семестр (осенний либо весенний)
    year:{type: DataTypes.INTEGER}, // Год
})

const RequestList = sequelize.define('request_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.INTEGER}, //номер пары
    submissionDate:{type: DataTypes.DATEONLY}, //дата подачи заявки
    firstDate:{type: DataTypes.DATEONLY}, //дата первого занятия
    period:{type: DataTypes.INTEGER}, //периодиность занятия
    lastDate:{type: DataTypes.DATEONLY}, //дата последнего занятия
    status:{type: DataTypes.STRING},
})

const TypeList = sequelize.define('type_list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
})

// Описываем связи между моделями
TeacherList.hasMany(ClassSchedule, { onDelete: 'CASCADE' })
ClassSchedule.belongsTo(TeacherList, { onDelete: 'CASCADE' })

TeacherList.hasMany(UserAcc, { onDelete: 'CASCADE' })
UserAcc.belongsTo(TeacherList, { onDelete: 'CASCADE' })

TeacherList.hasMany(RequestList, { onDelete: 'CASCADE' })
RequestList.belongsTo(TeacherList, { onDelete: 'CASCADE' })

PositionList.hasMany(TeacherList, { onDelete: 'CASCADE' })
TeacherList.belongsTo(PositionList, { onDelete: 'CASCADE' })

DepartmentList.hasMany(TeacherList, { onDelete: 'CASCADE' })
TeacherList.belongsTo(DepartmentList, { onDelete: 'CASCADE' })

DisciplineList.hasMany(RequestList, { onDelete: 'CASCADE' })
RequestList.belongsTo(DisciplineList, { onDelete: 'CASCADE' })

GroupList.hasMany(RequestList, { onDelete: 'CASCADE' })
RequestList.belongsTo(GroupList, { onDelete: 'CASCADE' })

AuditoriumList.hasMany(RequestList, { onDelete: 'CASCADE' })
RequestList.belongsTo(AuditoriumList, { onDelete: 'CASCADE' })

DisciplineList.hasMany(ClassSchedule, { onDelete: 'CASCADE' })
ClassSchedule.belongsTo(DisciplineList, { onDelete: 'CASCADE' })

GroupList.hasMany(ClassSchedule, { onDelete: 'CASCADE' })
ClassSchedule.belongsTo(GroupList, { onDelete: 'CASCADE' })

AuditoriumList.hasMany(ClassSchedule, { onDelete: 'CASCADE' })
ClassSchedule.belongsTo(AuditoriumList, { onDelete: 'CASCADE' })

TypeList.hasMany(AuditoriumList, { onDelete: 'CASCADE' })
AuditoriumList.belongsTo(TypeList, { onDelete: 'CASCADE' })

// Экспортируем модели
module.exports = {
    UserAcc,
    TeacherList,
    PositionList,
    DepartmentList,
    DisciplineList,
    GroupList,
    AuditoriumList,
    ClassSchedule,
    RequestList,
    TypeList,
}