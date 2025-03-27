import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateUser , verifyOldPassword } from "../../http/userAPI";

const ChangePassword = ({ show, onHide, user, fetchData }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setOldPassword(""); // Сбрасываем поле старого пароля при открытии модального окна
            setNewPassword(""); // Сбрасываем поле нового пароля
            setConfirmPassword(""); // Сбрасываем поле подтверждения пароля
            setError(""); // Сбрасываем ошибку
            setShowOldPassword(false); // Сбрасываем видимость старого пароля
            setShowNewPassword(false); // Сбрасываем видимость нового пароля
            setShowConfirmPassword(false); // Сбрасываем видимость подтверждения пароля
        }
    }, [user, show]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на пустые поля
        if (!oldPassword) {
            setError("Старый пароль не может быть пустым");
            return;
        }
        if (!newPassword) {
            setError("Новый пароль не может быть пустым");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Новый пароль и подтверждение пароля не совпадают");
            return;
        }
        if (oldPassword === newPassword) {
            setError("Новый пароль не может совпадать со старым");
            return;
        }
        // Проверка старого пароля
        const isOldPasswordValid = await verifyOldPassword(user.id, oldPassword);
        if (!isOldPasswordValid) {
            setError("Старый пароль неверен");
            return;
        }

        // Обновляем пользователя с новым паролем
        await updateUser (user.id, user.login, newPassword);
        fetchData();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить пароль</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Старый пароль</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Введите старый пароль"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? "Скрыть" : "Показать"}
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Новый пароль</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Введите новый пароль"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? "Скрыть" : "Показать"}
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Подтвердите новый пароль</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Подтвердите новый пароль"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "Скрыть" : "Показать"}
                            </Button>
                        </div>
                    </Form.Group>
                    {error && <div className="text-danger">{error}</div>} 
                    <Button className="mt-3" variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePassword;