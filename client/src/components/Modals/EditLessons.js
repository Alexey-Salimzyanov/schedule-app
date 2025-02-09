import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateLesson } from "../../http/lessonAPI"; // Предполагается, что у вас есть функция для обновления урока

const EditLessons = ({ show, onHide, lesson }) => {
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
                    <Form.Group controlId="formAuditorium">
                        <Form.Label>№ аудитории</Form.Label>
                        <Form.Control
                            type="text"
                            name="auditorium"
                            value={formData.auditorium}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
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
                    <Form.Group controlId="formTeacher">
                        <Form.Label>Преподаватель</Form.Label>
                        <Form.Control
                            type="text"
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiscipline">
                        <Form.Label>Дисциплина</Form.Label>
                        <Form.Control
                            type="text"
                            name="discipline"
                            value={formData.discipline}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroup">
                        <Form.Label>Группа</Form.Label>
                        <Form.Control
                            type="text"
                            name="group"
                            value={formData.group}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
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