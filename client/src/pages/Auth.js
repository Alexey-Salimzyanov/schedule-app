import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SCHEDULE_ROUTE } from "../utils/consts";
import { logIn, registration } from "../http/userAPI"; 
import { getTeachers } from "../http/TeacherAPI"; 
import { observer } from "mobx-react-lite";
import { Context } from "..";

// Создание компонента Auth с использованием observer для отслеживания изменений состояния
const Auth = observer(() => {
    const { user } = useContext(Context); // Получаем контекст пользователя
    const location = useLocation(); // Получаем текущий маршрут
    const navigate = useNavigate(); // Функция для навигации
    const isLogin = location.pathname === LOGIN_ROUTE; // Проверяем, находимся ли мы на странице входа
    const [login, setLogin] = useState(''); // Состояние для хранения логина
    const [password, setPassword] = useState(''); // Состояние для хранения пароля
    const [showPassword, setShowPassword] = useState(false); // Состояние для управления видимостью пароля
    const [selectedTeacher, setSelectedTeacher] = useState(null); // Состояние для хранения выбранного преподавателя
    const [teachers, setTeachers] = useState([]); // Состояние для хранения списка преподавателей

    // useEffect для получения списка преподавателей при загрузке компонента
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await getTeachers(); 
                setTeachers(response); 
            } catch (error) {
                console.error("Ошибка при получении преподавателей:", error); 
            }
        };

        fetchTeachers();
    }, []);

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                // Если находимся на странице входа, выполняем вход
                data = await logIn(login, password);
            } else {
                // Если находимся на странице регистрации, выполняем регистрацию
                data = await registration(login, password, selectedTeacher); // Передаем ID выбранного преподавателя
            }
            user.setUser (user); 
            if (data.role === "ADMIN") {
                user.setIsAuth(2); 
            } else if (data.role === "USER") {
                user.setIsAuth(1); 
            }
            navigate(SCHEDULE_ROUTE); // Перенаправляем на страницу расписания
        } catch (e) {
            alert(e.response.data.message); // Показываем сообщение об ошибке
        }
    };

    // Обработчик нажатия клавиш
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            click(); 
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card 
                style={{ 
                    width: 600, 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Добавляем тень
                    borderRadius: '15px' // Закругленные углы
                }} 
                className="p-5"
            >
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column" onKeyDown={handleKeyDown}>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={login}
                        onChange={e => setLogin(e.target.value)} // Обновляем состояние логина
                    />
                    <div className="mt-3">
                        <InputGroup>
                            <Form.Control
                                placeholder="Введите ваш пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)} // Обновляем состояние пароля
                                type={showPassword ? "text" : "password"} // Управляем видимостью пароля
                            />
                            <Button
                                variant="outline-secondary" // Стиль кнопки
                                onClick={() => setShowPassword(!showPassword)} // Переключаем видимость пароля
                            >
                                {showPassword ? 'Скрыть' : 'Показать'}
                            </Button>
                        </InputGroup>
                    </div>
                    {/* Поле выбора преподавателя */}
                    {!isLogin && (
                        <Form.Group className="mt-3">
                            <Form.Label>Выберите преподавателя</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTeacher}
                                onChange={e => setSelectedTeacher(e.target.value)} // Обновляем состояние выбранного преподавателя
                            >
                                <option value="">Выберите преподавателя</option>
                                {teachers.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.surname_N_P} 
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    )}
                    <Row className="mt-3">
                        {isLogin ?
                            <Col>
                                <span>
                                    <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>, если у вас нет аккаунта.
                                </span>
                            </Col>
                            :
                            <Col>
                                <span>
                                    <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>, если у вас уже есть аккаунт.
                                </span>
                            </Col>
                        }
                        <Col className="d-flex justify-content-end">
                            <Button
                                variant={"outline-success"}
                                onClick={click} 
                            >
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;