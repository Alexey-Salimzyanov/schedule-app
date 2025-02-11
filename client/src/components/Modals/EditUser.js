import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateUser } from "../../http/userAPI";

const EditUser = ({ show, onHide, user, fetchData }) => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		if (user) {
			setLogin(user.login);
			setRole(user.role);
		}
	}, [user]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		await updateUser(user.id, login, password, role)
		fetchData();
		onHide(); // Закрываем модальное окно
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Редактировать учетную запись</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Логин</Form.Label>
						<Form.Control
							type="text"
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
							<option value="USER">USER</option>
							<option value="ADMIN">ADMIN</option>
						</Form.Select>
					</Form.Group>
					<Button className="mt-3" variant="primary" type="submit">
						Сохранить изменения
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditUser;