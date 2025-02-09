import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteUser, getUsers } from "../../http/userAPI";
import EditUser from "../Modals/EditUser";

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
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Роль</th>
                        <th>Преподаватель</th>
                        <th>Действия</th>
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
                                <Button variant="outline-danger" onClick={async () => { await deleteUser(item.id); fetchData(); }}>Удалить</Button>
                                <Button
                                    variant="outline-warning"
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
        </>
    );
};

export default UsersTable;
