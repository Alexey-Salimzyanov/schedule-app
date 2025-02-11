import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteTeacher, getTeachers } from "../../http/TeacherAPI";
import CreateTeacherModal from "../Modals/CreateTeacher";
import EditTeacherModal from "../Modals/EditTeacher"; // Импортируем модальное окно редактирования

// Компонент таблицы преподавателей
const TeacherTable = () => {
    // Состояние для хранения списка преподавателей
    const [teachers, setTeachers] = useState([]);
    const [showTeacherModal, setShowTeacherModal] = useState(false);
    const [showEditTeacherModal, setShowEditTeacherModal] = useState(false); // Состояние для модального окна редактирования
    const [teacherToEdit, setTeacherToEdit] = useState(null); // Состояние для хранения выбранного преподавателя

    // Функция для получения данных о преподавателях из БД
    const fetchData = async () => {
        const teacherData = await getTeachers();
        teacherData.sort((a, b) => a.surname_N_P.localeCompare(b.surname_N_P));
        setTeachers(teacherData);
    };

    // Обработчик открытия модального окна создания преподавателя
    const handleShowTeacherModal = () => {
        setShowTeacherModal(true);
    };

    // Обработчик открытия модального окна редактирования
    const handleEditTeacher = (teacher) => {
        setTeacherToEdit(teacher); // Устанавливаем выбранного преподавателя
        setShowEditTeacherModal(true); // Открываем модальное окно редактирования
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowTeacherModal}
                className="mt-3"
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона и границы
            >
                Добавить преподавателя
            </Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Фамилия И.О.</th>
                        <th>Кафедра</th>
                        <th>Должность</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список преподавателей */}
                    {teachers.map((item, index) => (
                        <tr key={index}>
                            <td>{item.surname_N_P}</td>
                            <td>{item.department_list && item.department_list.name ? item.department_list.name : 'NULL'}</td>
                            <td>{item.position_list && item.position_list.short_name ? item.position_list.short_name : 'NULL'}</td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={async () => {
                                        await deleteTeacher(item.id);
                                        fetchData();
                                    }}
                                    className="me-2" // Добавляем отступ между кнопками
                                >
                                    Удалить
                                </Button>
                                <Button
                                     variant="outline-dark"
                                    onClick={() => handleEditTeacher(item)} // Открываем модальное окно редактирования
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания нового преподавателя */}
            <CreateTeacherModal show={showTeacherModal} onHide={() => { setShowTeacherModal(false); fetchData(); }} />
            {/* Модальное окно для редактирования преподавателя */}
            <EditTeacherModal
                show={showEditTeacherModal}
                onHide={() => { setShowEditTeacherModal(false); fetchData(); }}
                teacher={teacherToEdit} // Передаем выбранного преподавателя для редактирования
            />
        </>
    );
};

export default TeacherTable;