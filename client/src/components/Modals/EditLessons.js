import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateLesson } from "../../http/lessonAPI"; // Предполагается, что у вас есть функция для обновления урока
import { getDisciplines } from "../../http/disciplineAPI";
import { getTeachers } from "../../http/TeacherAPI";
import { getGroups } from "../../http/groupAPI";
import { getAuds } from "../../http/audAPI";

const EditLessons = ({ show, onHide, lesson }) => {
    const [disciplineList, setDisciplineList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [auditoriumList, setAuditoriumList] = useState([]);

    const [formData, setFormData] = useState({
        auditorium: '',
        number: '',
        teacher: '',
        discipline: '',
        group: '',
        firstDate: '',
        period: '',
        lastDate: ''
    });

    useEffect(() => {
        if (lesson) {
            setFormData({
                auditorium: lesson.auditorium_list?.number || '',
                number: lesson.number || '',
                teacher: lesson.teacher_list?.surname_N_P || '',
                discipline: lesson.discipline_list?.short_name || '',
                group: lesson.group_list?.name || '',
                firstDate: lesson.firstDate || '',
                period: lesson.period || '',
                lastDate: lesson.lastDate || ''
            });
        }

        // Загрузка данных для выпадающих списков
        getDisciplines().then(data => setDisciplineList(data));
        getTeachers().then(data => setTeacherList(data));
        getGroups().then(data => setGroupList(data));
        getAuds().then(data => setAuditoriumList(data));
    }, [lesson]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateLesson(lesson.id, formData); // Предполагается, что updateLesson принимает id и данные для обновления
        onHide(); // Закрываем модальное окно после успешного обновления
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать занятие</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Поле для выбора аудитории */}
                    <Form.Group controlId="formAuditorium">
                        <Form.Label>№ аудитории</Form.Label>
                        <Form.Select
                            name="auditorium"
                            value={formData.auditorium}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите аудиторию</option>
                            {auditoriumList.map(aud => (
                                <option key={aud.id} value={aud.number}>
                                    {aud.number}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для ввода номера пары */}
                    <Form.Group controlId="formNumber">
                        <Form.Label>№ пары</Form.Label>
                        <Form.Control
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Поле для выбора преподавателя */}
                    <Form.Group controlId="formTeacher">
                        <Form.Label>Преподаватель</Form.Label>
                        <Form.Select
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите преподавателя</option>
                            {teacherList.map(teacher => (
                                <option key={teacher.id} value={teacher.surname_N_P}>
                                    {teacher.surname_N_P}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для выбора дисциплины */}
                    <Form.Group controlId="formDiscipline">
                        <Form.Label>Дисциплина</Form.Label>
                        <Form.Select
                            name="discipline"
                            value={formData.discipline}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите дисциплину</option>
                            {disciplineList.map(discipline => (
                                <option key={discipline.id} value={discipline.short_name}>
                                    {discipline.short_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для выбора группы */}
                    <Form.Group controlId="formGroup">
                        <Form.Label>Группа</Form.Label>
                        <Form.Select
                            name="group"
                            value={formData.group}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите группу</option>
                            {groupList.map(group => (
                                <option key={group.id} value={group.name}>
                                    {group.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для ввода даты первого занятия */}
                    <Form.Group controlId="formFirstDate">
                        <Form.Label>Дата первого занятия</Form.Label>
                        <Form.Control
                            type="date"
                            name="firstDate"
                            value={formData.firstDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Поле для ввода периода */}
                    <Form.Group controlId="formPeriod">
                        <Form.Label>Период</Form.Label>
                        <Form.Control
                            type="text"
                            name="period"
                            value={formData.period}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Поле для ввода даты последнего занятия */}
                    <Form.Group controlId="formLastDate">
                        <Form.Label>Дата последнего занятия</Form.Label>
                        <Form.Control
                            type="date"
                            name="lastDate"
                            value={formData.lastDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditLessons;