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
        auditoriumId: '',
        number: '',
        teacherId: '',
        disciplineId: '',
        groupId: '',
        firstDate: '',
        period: '',
        lastDate: ''
    });

    // Варианты для периода
    const periodOptions = [
        { label: "разовое занятие", value: 0 },
        { label: "1 неделя", value: 1 },
        { label: "2 недели", value: 2 },
        { label: "4 недели", value: 4 }
    ];

    useEffect(() => {
        if (lesson) {
            setFormData({
                auditoriumId: lesson.auditoriumListId || '',
                number: lesson.number || '',
                teacherId: lesson.teacherListId || '',
                disciplineId: lesson.disciplineListId || '',
                groupId: lesson.groupListId || '',
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

        // Если изменяется firstDate и период равен 0, обновляем lastDate
        if (name === "firstDate" && formData.period === "0") {
            setFormData({
                ...formData,
                [name]: value,
                lastDate: value
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handlePeriodChange = (e) => {
        const { value } = e.target;

        // Если выбран период "разовое занятие", обновляем lastDate
        if (value === "0") {
            setFormData({
                ...formData,
                period: value,
                lastDate: formData.firstDate
            });
        } else {
            setFormData({
                ...formData,
                period: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateLesson(lesson.id, formData); // Передаем formData с идентификаторами
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
                            name="auditoriumId"
                            value={formData.auditoriumId}
                            onChange={handleChange}
                            required
                        >
                            {auditoriumList.map(aud => (
                                <option key={aud.id} value={aud.id}>
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
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleChange}
                            required
                        >
                            {teacherList.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.surname_N_P}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для выбора дисциплины */}
                    <Form.Group controlId="formDiscipline">
                        <Form.Label>Дисциплина</Form.Label>
                        <Form.Select
                            name="disciplineId"
                            value={formData.disciplineId}
                            onChange={handleChange}
                            required
                        >
                            {disciplineList.map(discipline => (
                                <option key={discipline.id} value={discipline.id}>
                                    {discipline.short_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для выбора группы */}
                    <Form.Group controlId="formGroup">
                        <Form.Label>Группа</Form.Label>
                        <Form.Select
                            name="groupId"
                            value={formData.groupId}
                            onChange={handleChange}
                            required
                        >
                            {groupList.map(group => (
                                <option key={group.id} value={group.id}>
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

                    {/* Поле для выбора периода */}
                    <Form.Group controlId="formPeriod">
                        <Form.Label>Период</Form.Label>
                        <Form.Select
                            name="period"
                            value={formData.period}
                            onChange={handlePeriodChange}
                            required
                        >
                            {periodOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Поле для ввода даты последнего занятия (условно отображается) */}
                    {formData.period !== "0" && (
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
                    )}

                    <Button className="mt-3" variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditLessons;