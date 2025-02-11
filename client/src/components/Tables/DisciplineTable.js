import React, { useEffect, useState } from "react"; 
import { Table, Button } from "react-bootstrap"; 
import { deleteDiscipline, getDisciplines } from "../../http/disciplineAPI"; 
import CreateDisciplineModal from "../Modals/CreateDiscipline"; 
import EditDiscipline from "../Modals/EditDiscipline"; 

// Компонент таблицы дисциплин 
const DisciplineTable = () => { 
    // Состояние для хранения списка дисциплин 
    const [disciplines, setDisciplines] = useState([]); 
    // Состояние для управления модальным окном создания дисциплины 
    const [showDisciplineModal, setShowDisciplineModal] = useState(false); 
    // Состояние для управления модальным окном редактирования 
    const [showEditModal, setShowEditModal] = useState(false); 
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);

    // Функция для получения данных об дисциплинах из БД
    const fetchData = async () => {
        const disciplineData = await getDisciplines();
        disciplineData.sort((a, b) => a.name.localeCompare(b.name));
        setDisciplines(disciplineData);
    };

    // Обработчик открытия модального окна создания дисциплины
    const handleShowDisciplineModal = () => {
        setShowDisciplineModal(true);
    };

     // Функция для удаления дисциплины с подтверждением
     const handleDeleteDiscipline = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту дисциплину?");
        if (confirmDelete) {
            await deleteDiscipline(id);
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
                onClick={handleShowDisciplineModal} 
                className="mt-3" 
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона и границы
            >
                Добавить дисциплину
            </Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Название дисциплины</th>
                        <th>Краткое название дисциплины</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список дисциплин */}
                    {disciplines.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.short_name}</td>
                            <td>
                                <Button 
                                    variant="outline-danger" // Удалить
                                    onClick={() => handleDeleteDiscipline(item.id)} // Используем новую функцию для удаления
                                    className="me-2" // Добавляем отступ справа
                                >
                                    Удалить
                                </Button>
                                <Button 
                                     variant="outline-dark"// Редактировать
                                    onClick={() => {
                                        setSelectedDiscipline(item);
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
            <CreateDisciplineModal 
                show={showDisciplineModal} 
                onHide={() => {
                    setShowDisciplineModal(false);
                    fetchData();
                }} 
            />
            <EditDiscipline 
                show={showEditModal} 
                onHide={() => {
                    setShowEditModal(false);
                    setSelectedDiscipline(null);
                }} 
                discipline={selectedDiscipline} 
                onUpdate={fetchData} 
            />
        </>
    );
};

export default DisciplineTable;