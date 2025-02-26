import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteUser, getUsers } from "../../http/userAPI";
import EditUser from "../Modals/EditUser";
import CreateUserModal from "../Modals/CreateUser";

// Компонент таблицы пользователей
const UsersTable = () => {
    // Состояние для хранения списка пользователей
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    // Функция для получения данных о пользователях из БД
    const fetchData = async () => {
        const UsersData = await getUsers();
        setUsers(UsersData);
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    const handleShowEditUserModal = (user) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    const [showUserModal, setShowUserModal] = useState(null)

    const handleShowUserModal = () => {
        setShowUserModal(true);
    };
    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowUserModal}
                className="mt-3"
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} 
            >
                Добавить пользователя
            </Button>
            <Table responsive striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Роль</th>
                        <th>Преподаватель</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список пользователей */}
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.login}</td>
                            <td>{item.password}</td>
                            <td>{item.role}</td>
                            <td>{item.teacher_list.surname_N_P}</td>
                            <td>
                                <Button variant="outline-danger" className="me-2" onClick={async () => { await deleteUser(item.id); fetchData(); }}>Удалить</Button>
                                </td>
                                <td>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => handleShowEditUserModal(item)}
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditUser
                show={showEditUserModal}
                onHide={() => { setShowEditUserModal(false); setSelectedUser(null); }}
                user={selectedUser}
                fetchData={fetchData} // Передаем функцию обновления данных
            />
            <CreateUserModal 
                show={showUserModal} 
                onHide={() => { setShowUserModal(false); fetchData(); }}
            />
        </>
    );
};

export default UsersTable;
