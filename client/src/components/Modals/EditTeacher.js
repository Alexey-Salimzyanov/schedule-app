import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UpdateTeacher } from "../../http/TeacherAPI"; 
import { getPositions } from "../../http/positionAPI"; 
import { getDepartments } from "../../http/departmentAPI"; 

const EditTeacherModal = ({ show, onHide, teacher }) => {
    const [teacherSurname_N_P, setTeacherSurname_N_P] = useState('');
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        // Получаем должности и кафедры
        getPositions().then(data => setPositions(data));
        getDepartments().then(data => setDepartments(data));

        // Если передан преподаватель, заполняем поля формы
        if (teacher) {
            setTeacherSurname_N_P(teacher.surname_N_P);
            setSelectedPosition(teacher.positionId);
            setSelectedDepartment(teacher.departmentId);
        }
    }, [teacher]);

    const handleSaveClick = async () => {
        if (teacherSurname_N_P && selectedDepartment && selectedPosition) {
            await UpdateTeacher(teacher.id, teacherSurname_N_P, selectedPosition, selectedDepartment);
            onHide(); // Закрываем модальное окно
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать преподавателя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия И.О. преподавателя</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Фамилия И.О." 
                            value={teacherSurname_N_P} 
                            onChange={e => setTeacherSurname_N_P(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Кафедра</Form.Label>
                        <Form.Select 
                            value={selectedDepartment} 
                            onChange={e => setSelectedDepartment(e.target.value)}
                        >
                            <option value="">Выберите кафедру</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Должность</Form.Label>
                        <Form.Select 
                            value={selectedPosition} 
                            onChange={e => setSelectedPosition(e.target.value)}
                        >
                            <option value="">Выберите должность</option>
                            {positions.map(position => (
                                <option key={position.id} value={position.id}>{position.short_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTeacherModal;