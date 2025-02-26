import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteDepartment, getDepartments } from "../../http/departmentAPI";
import CreateDepartmentModal from "../Modals/CreateDepartment";
import EditDepartment from "../Modals/EditDepartment";

// Компонент таблицы кафедр 
const DepartmentTable = () => {
    // Состояние для хранения списка кафедр 
    const [departments, setDepartments] = useState([]);
    // Состояние для управления модальным окном создания кафедры 
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    // Состояние для управления модальным окном редактирования 
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // Функция для получения данных о кафедрах из БД
    const fetchData = async () => {
        const departmentData = await getDepartments();
        departmentData.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(departmentData);
    };

    // Обработчик открытия модального окна создания кафедры
    const handleShowDepartmentModal = () => {
        setShowDepartmentModal(true);
    };

    // Функция для удаления кафедры с подтверждением
    const handleDeleteDepartment = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту кафедру?");
        if (confirmDelete) {
            await deleteDepartment(id);
            fetchData();
        }
    }

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowDepartmentModal}
                className="mt-3"
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона и границы
            >
                Добавить кафедру
            </Button>
            <Table responsive striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>Название кафедры</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список кафедр */}
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <Button
                                    variant="outline-danger" // Удалить
                                    onClick={() => handleDeleteDepartment(item.id)} // Используем новую функцию для удаления
                                    className="me-2" // Добавляем отступ справа
                                >
                                    Удалить
                                </Button>
                                </td>
                                <td>
                                <Button
                                     variant="outline-dark"// Редактировать
                                    onClick={() => {
                                        setSelectedDepartment(item);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateDepartmentModal
                show={showDepartmentModal}
                onHide={() => {
                    setShowDepartmentModal(false);
                    fetchData();
                }}
            />
            <EditDepartment
                show={showEditModal}
                onHide={() => {
                    setShowEditModal(false);
                    setSelectedDepartment(null);
                }}
                department={selectedDepartment}
                onUpdate={fetchData}
            />
        </>
    );
};

export default DepartmentTable;