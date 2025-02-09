import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { changeReqStatus, deleteReq, getReqLessons } from "../../http/lessonAPI";
import CreateReqModal from "../Modals/CreateReq";

// Компонент таблицы заявок
const RequestTable = ({ extraActions = false })=> {

    // Состояние для хранения списка заявок
    const [scheduleReq, setScheduleReq] = useState([]);

    // Функция для получения данных о заявках из БД
    const fetchData = async () => {
        const scheduleDataReq = await getReqLessons();
        setScheduleReq(scheduleDataReq);
    };

    // Функция для удаления заявки с подтверждением
    const handleDeleteReq = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту заявку?");
        if (confirmDelete) {
            await deleteReq(id);
            fetchData();
        }
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    // Состояние для управления модальным окном создания урока
    const [showRequestModal, setShowRequestModal] = useState(false);

    // Обработчик открытия модального окна создания урока
    const handleShowRequestModal = () => {
        setShowRequestModal(true);
    };
    return (
        <>
        <Button 
            variant="primary" 
            onClick={handleShowRequestModal} 
            className="mt-3" 
            style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Изменение фона и цвета границы
        >
            Добавить заявку
        </Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>№ заявки</th>
                        <th>Дата подачи</th>
                        <th>№ аудитории</th>
                        <th>№ пары</th>
                        <th>Преподаватель</th>
                        <th>Дисциплина</th>
                        <th>Группа</th>
                        <th>Дата первого занятия</th>
                        <th>Период</th>
                        <th>Дата последнего занятия</th>
                        <th>Статус</th>
                        <th colSpan={extraActions ? 3 : 1}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список заявок */}
                    {scheduleReq.sort((a, b) => b.id - a.id).map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{new Date(item.submissionDate).toLocaleDateString()}</td>
                            <td>{item.auditorium_list && item.auditorium_list.number ? item.auditorium_list.number : 'NULL'}</td>
                            <td>{item.number}</td>
                            <td>{item.teacher_list&& item.teacher_list.surname_N_P ? item.teacher_list.surname_N_P : 'NULL'}</td>
                            <td>{item.discipline_list && item.discipline_list.short_name ? item.discipline_list.short_name : 'NULL'}</td>
                            <td>{item.group_list && item.group_list.name ? item.group_list.name : 'NULL'}</td>
                            <td>{new Date(item.firstDate).toLocaleDateString()}</td>
                            <td>{item.period === 0 ? 'Разовое занятие' : item.period}</td>
                            <td>{new Date(item.lastDate).toLocaleDateString()}</td>
                            <td>{item.status}</td>
                            <td>
                                {/* Кнопка для удаления заявки с подтверждением */}
                                <Button 
                                    variant="outline-danger"  
                                    onClick={() => handleDeleteReq(item.id)} // Используем функцию для удаления с подтверждением
                                >
                                    Удалить
                                </Button>
                            </td>
                            {extraActions && (
                                <>
                                    {/* Кнопки для изменения статуса заявки */}
                                    <td>
                                        <Button variant="outline-primary" onClick={async () => {await changeReqStatus(item.id, 'Отклонена');fetchData();}}>Отклонить</Button>
                                    </td>
                                    <td>
                                        <Button variant="outline-success" onClick={async () => {await changeReqStatus(item.id, 'Одобрена');fetchData();}}>Одобрить</Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateReqModal show={showRequestModal} onHide={() => {setShowRequestModal(false);fetchData()}} />
        </>
    );
};

export default RequestTable;
