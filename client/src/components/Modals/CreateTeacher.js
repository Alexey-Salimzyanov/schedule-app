import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateTeacher } from '../../http/TeacherAPI';
import { getPositions } from '../../http/positionAPI';
import { getDepartments } from '../../http/departmentAPI';

const CreateTeacherModal = ({show, onHide}) => {
    const [TeacherSurname_N_P, setTeacherSurname_N_P] = useState('');
    const [PositionName, setPositionName] = useState('');
    const [DepartmentName, setDepartmentName] = useState('');

    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        getPositions().then(data => setPositions(data));
        getDepartments().then(data => setDepartments(data));
    }, []);



    const handleNameInputChange = (event) => {
        setTeacherSurname_N_P(event.target.value);
    };

    const handleAddClick = async () => {
        if (TeacherSurname_N_P && selectedDepartment && selectedPosition) {
            await CreateTeacher(TeacherSurname_N_P,selectedPosition,selectedDepartment);
            onHide();
        }
        setSelectedPosition(null);
        setSelectedDepartment(null);
        setTeacherSurname_N_P('');
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить преподавателя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Фамилия И.О. преподавателя</Form.Label>
                        <Form.Control type="text" placeholder="Фамилия И.О." value={TeacherSurname_N_P} onChange={handleNameInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Кафедра</Form.Label>
                        <Form.Select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                            <option value="">Выберите кафедру</option>
                            {departments.map(department => (
                            <option value={department.id}>{department.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Должность</Form.Label>
                        <Form.Select value={selectedPosition} onChange={e => setSelectedPosition(e.target.value)}>
                            <option value="">Выберите должность</option>
                            {positions.map(position => (
                            <option value={position.id}>{position.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!TeacherSurname_N_P || !selectedDepartment || !selectedPosition} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateTeacherModal;