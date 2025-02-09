import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteGroup, getGroups } from "../../http/groupAPI";
import CreateGroupModal from "../Modals/CreateGroup";
import EditGroup from "../Modals/EditGroup"; 

// Компонент таблицы групп
const GroupTable = () => {
    // Состояние для хранения списка групп
    const [groups, setGroups] = useState([]);
    // Состояние для управления модальным окном создания группы
    const [showGroupModal, setShowGroupModal] = useState(false);
    // Состояние для управления модальным окном редактирования группы
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null); // Состояние для выбранной группы

    // Функция для получения данных о группах из БД
    const fetchData = async () => {
        const groupData = await getGroups();
        groupData.sort((a, b) => a.name.localeCompare(b.name));
        setGroups(groupData);
    };

    // Обработчик открытия модального окна создания группы
    const handleShowGroupModal = () => {
        setShowGroupModal(true);
    };

    // Обработчик открытия модального окна редактирования группы
    const handleShowEditModal = (group) => {
        setSelectedGroup(group);
        setShowEditModal(true);
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    // Функция для удаления группы с подтверждением
    const handleDeleteGroup = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту группу?");
        if (confirmDelete) {
            await deleteGroup(id);
            fetchData();
        }
    };

    return (
        <>
            <Button 
                variant="primary" 
                onClick={handleShowGroupModal} 
                className="mt-3" 
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона и границы
            >
                Добавить группу
            </Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Название группы</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список групп */}
                    {groups.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={() => handleDeleteGroup(item.id)} // Используем новую функцию для удаления
                                    className="me-2" // Добавляем отступ справа
                                >
                                    Удалить
                                </Button>
                                <Button 
                                    variant="outline-warning" // Используем "warning" для оранжевого цвета
                                    onClick={() => handleShowEditModal(item)} // Открываем модальное окно редактирования
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания новой группы */}
            <CreateGroupModal 
                show={showGroupModal} 
                onHide={() => {
                    setShowGroupModal(false);
                    fetchData();
                }} 
            />
            {/* Модальное окно для редактирования группы */}
            <EditGroup 
                show={showEditModal} 
                onHide={() => {
                    setShowEditModal(false);
                    setSelectedGroup(null);
                }} 
                group={selectedGroup} 
                onUpdate={fetchData} // Функция для обновления списка групп после редактирования
            />
        </>
    );
};

export default GroupTable;