import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deletePosition, getPositions } from "../../http/positionAPI";
import CreatePositionModal from "../Modals/CreatePosition";
import EditPosition from "../Modals/EditPosition"; 

// Компонент таблицы должностей
const PositionTable = () => {
    // Состояние для хранения списка должностей
    const [positions, setPositions] = useState([]);
    // Состояние для управления модальным окном создания должности
    const [showPositionModal, setShowPositionModal] = useState(false);
    const [showEditPositionModal, setShowEditPositionModal] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);

    // Функция для получения данных о должности из БД
    const fetchData = async () => {
        const positionData = await getPositions();
        positionData.sort((a, b) => a.name.localeCompare(b.name));
        setPositions(positionData);
    };

    // Обработчик открытия модального окна создания должности
    const handleShowPositionModal = () => {
        setShowPositionModal(true);
    };

    const handleShowEditPosition = (position) => {
        setSelectedPosition(position);
        setShowEditPositionModal(true);
    };

    // Функция для удаления должности с подтверждением
    const handleDeletePosition = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту должность?");
        if (confirmDelete) {
            await deletePosition(id);
            fetchData();
        }
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button 
                variant="primary" 
                onClick={handleShowPositionModal} 
                className="mt-3" 
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }}
            >
                Добавить должность
            </Button>

            <Table striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>Название должности</th>
                        <th>Краткое название должности</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.short_name}</td>
                            <td>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={() => handleDeletePosition(item.id)} // Используем функцию для удаления с подтверждением
                                    className="me-2"
                                >
                                    Удалить
                                </Button>
                                </td>
                                <td>
                                <Button 
                                     variant="outline-dark"
                                    onClick={() => handleShowEditPosition(item)} // Открываем модальное окно редактирования
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <CreatePositionModal 
                show={showPositionModal} 
                onHide={() => { setShowPositionModal(false); fetchData(); }} 
            />

            <EditPosition 
                show={showEditPositionModal} 
                onHide={() => { setShowEditPositionModal(false); setSelectedPosition(null); }} 
                position={selectedPosition} 
                fetchData={fetchData} 
            />
        </>
    );
};

export default PositionTable;