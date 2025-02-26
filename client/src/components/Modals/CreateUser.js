import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getTeachers } from '../../http/TeacherAPI';
import { createUser } from '../../http/userAPI';

// Компонент модального окна для создания преподавателя
const CreateUserModal = ({ show, onHide }) => {
	// Создаем необходимые состояния
	const [login, setLogin] = useState(null);
	const [password, setPassword] = useState(null);
	const [role, setRole] = useState(null);
	
	const [teachers, setTeachers] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	useEffect(() => {
		getTeachers().then(data => setTeachers(data.sort((a,b)=> a.surname_N_P.localeCompare(b.surname_N_P))));
	}, []);

	const handleAddClick = async () => {
		
		if (login && password && role && selectedTeacher) {
			await createUser(login, password, role, selectedTeacher);
			onHide();
			setSelectedTeacher(null);
			setRole(null);
			setLogin(null);
			setPassword(null)
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Создать учетную запись</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Логин</Form.Label>
						<Form.Control
							type="text"
							placeholder="Логин"
							value={login}
							onChange={e => setLogin(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="text"
							placeholder="Пароль"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Роль</Form.Label>
						<Form.Select
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value={null}>Выберите роль</option>
							<option value="USER">USER</option>
							<option value="ADMIN">ADMIN</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label style={{ fontWeight: "bold" }} className="mt-1">Преподаватель</Form.Label>
						<Form.Select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}>
							<option value="">Выберите преподавателя</option>
							{teachers.map(teacher => (
								<option value={teacher.id}>{teacher.surname_N_P}</option>
							))}
						</Form.Select>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					onClick={handleAddClick}
					style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона кнопки
				>
					Добавить
				</Button>
				<Button variant="secondary" onClick={onHide}>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default CreateUserModal;
