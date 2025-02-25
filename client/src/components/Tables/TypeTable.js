import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteType, getTypes } from "../../http/typeAPI";
import CreateAudType from "../Modals/CreateAudType";
import EditAudType from "../Modals/EditAudType"; 

// Компонент таблицы типов аудиторий
const TypeTable = () => {
    // Состояние для хранения списка типов аудиторий
    const [types, setTypes] = useState([]);
    // Состояние для управления модальным окном создания типа аудитории
    const [showAudTypeModal, setShowAudTypeModal] = useState(false);
    const [showEditTypeModal, setShowEditTypeModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    // Функция для получения данных о типах аудиторий из БД
    const fetchData = async () => {
        const typeData = await getTypes();
        setTypes(typeData);
    };

    // Обработчик открытия модального окна создания типа аудитории
    const handleShowAudTypeModal = () => {
        setShowAudTypeModal(true);
    };

    const handleShowEditTypeModal = (type) => {
        setSelectedType(type);
        setShowEditTypeModal(true);
    };

    // Функция для удаления типа с подтверждением
    const handleDeleteType = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот тип аудитории?");
        if (confirmDelete) {
            await deleteType(id);
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
                onClick={handleShowAudTypeModal} 
                className="mt-3" 
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона и границы
            >
                Добавить тип
            </Button>

            <Table striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>Название типа аудитории</th>
                        <th colSpan={2}>Действия</th> {/* Обновленный заголовок */}
                    </tr>
                </thead>
                <tbody>
                    {types.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={() => handleDeleteType(item.id)} // Используем функцию для удаления с подтверждением
                                    className="me-2" // Добавляем отступ справа
                                >
                                    Удалить
                                </Button>
                                </td>
                                <td>
                                <Button 
                                     variant="outline-dark"
                                    onClick={() => handleShowEditTypeModal(item)}
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Модальное окно для создания нового типа аудитории */}
            <CreateAudType show={showAudTypeModal} onHide={() => { setShowAudTypeModal(false); fetchData(); }} />

            {/* Модальное окно для редактирования типа аудитории */}
            <EditAudType 
                show={showEditTypeModal} 
                onHide={() => { setShowEditTypeModal(false); setSelectedType(null); }} 
                type={selectedType} 
                onUpdate={fetchData} // Передаем функцию обновления данных
            />
        </>
    );
};

export default TypeTable;