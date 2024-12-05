// Импорт необходимых библиотек и компонентов
import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SCHEDULE_ROUTE } from "../utils/consts";
import { logIn, registration } from "../http/userAPI";
import {observer} from "mobx-react-lite"
import {Context} from ".."
// Создание компонента Auth с использованием observer для отслеживания изменений состояния
const Auth = observer (() =>{
    // Использование контекста для доступа к пользовательскому состоянию
    const {user}=useContext(Context)
    // Получение текущего маршрута и функции для навигации
    const location = useLocation()
    const navigate = useNavigate()
    // Определение, является ли текущий маршрут страницей входа
    const isLogin = location.pathname === LOGIN_ROUTE
    // Создание состояний для логина и пароля
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    // Функция для обработки клика по кнопке входа/регистрации
    const click = async () =>{
        try{       
            let data;
            // Если это страница входа, выполняем вход, иначе - регистрацию
            if(isLogin){
                data = await logIn(login, password)
            }else{
                data = await registration(login, password, 1)
            }
            // Устанавливаем пользователя
            user.setUser(user)
            // Устанавливаем состояние аутентификации в зависимости от роли пользователя
            if(data.role === "ADMIN"){
                user.setIsAuth(2)
            }else if(data.role === "USER"){
                user.setIsAuth(1)
            }
            // Переходим на страницу расписания
            navigate(SCHEDULE_ROUTE)
        }catch(e){
            // В случае ошибки выводим сообщение об ошибке
            alert(e.response.data.message)
        }
    }
    // Возвращаем разметку компонента
    return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight - 54}}
    >
<Card style={{width: 600}} className="p-5">
    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
    <Form className="d-flex flex-column">
        <Form.Control 
            className="mt-3"
            placeholder="Введите ваш email"
            value = {login}
            onChange={e => setLogin(e.target.value)}

        />
        <Form.Control 
            className="mt-3"
            placeholder="Введите ваш пароль"
            value = {password}
            onChange={e => setPassword(e.target.value)} //ЛЕША 
            type="password"
        />
        <Row className="mt-3">
            {isLogin ?
                    <Col>
                        <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>, если у вас нет аккаунта. 
                    </Col>
                    :
                    <Col>
                        <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>, если у вас уже есть аккаунт.
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
