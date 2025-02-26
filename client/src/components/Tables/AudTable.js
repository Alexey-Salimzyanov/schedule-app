import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteAud, getJoinedAuds } from "../../http/audAPI";
import CreateAudModal from "../Modals/CreateAud";
import EditAudModal from "../Modals/EditAud";

// Компонент таблицы аудиторий
const AudTable = () => {
    // Состояние для хранения списка аудиторий
    const [auditoriums, setAuditoriums] = useState([]);
    // Состояние для управления модальным окном
    const [showAudModal, setShowAudModal] = useState(false);
    const [selectedAud, setSelectedAud] = useState(null);

    // Функция для получения данных об аудиториях из БД
    const fetchData = async () => {
        const audData = await getJoinedAuds();
        audData.sort((a, b) => a.number.localeCompare(b.number));
        setAuditoriums(audData);
    };
    // Обработчик открытия модального окна
    const handleShowAudModal = () => {
        setSelectedAud(null); // Сбрасываем выбранную аудиторию для создания новой
        setShowAudModal(true);
    };

    const handleEditClick = (aud) => {
        setSelectedAud(aud);
        setShowAudModal(true);
    };

    // Функция для удаления аудитории с подтверждением
    const handleDeleteAud = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту аудиторию?");
        if (confirmDelete) {
            await deleteAud(id);
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
                onClick={handleShowAudModal}
                className="mt-3"
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }}
            >
                Добавить аудиторию
            </Button>
            <Table responsive striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>Номер аудитории</th>
                        <th>Вместимость</th>
                        <th>Тип аудитории</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {auditoriums.map((item, index) => (
                        <tr key={index}>
                            <td>{item.number}</td>
                            <td>{item.capacity}</td>
                            <td>{item.type_list && item.type_list.name ? item.type_list.name : 'NULL'}</td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleDeleteAud(item.id)} 
                                    className="me-2"
                                >
                                    Удалить
                                </Button>
                                </td>
                                <td>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => handleEditClick(item)}
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания или редактирования аудитории */}
            {selectedAud ? (
                <EditAudModal
                    show={showAudModal}
                    onHide={() => { setShowAudModal(false); setSelectedAud(null); fetchData(); }} // Сбрасываем выбранную аудиторию при закрытии
                    auditorium={selectedAud} // Передаем выбранную аудиторию для редактирования
                />
            ) : (
                <CreateAudModal
                    show={showAudModal}
                    onHide={() => { setShowAudModal(false); fetchData(); }} // Сбрасываем выбранную аудиторию при закрытии
                />
            )}
        </>
    );
};

export default AudTable;