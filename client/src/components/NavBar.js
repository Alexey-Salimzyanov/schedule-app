import React, { useContext } from 'react';
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, REQUESTS_ROUTE, SCHEDULE_ROUTE} from "../utils/consts";
import { NavLink } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';

// Компонент NavBar, меняющийся в зависимости от состояния пользователя
const NavBar = observer(() => {
    const { user } = useContext(Context); // Получение контекста пользователя
    const navigate = useNavigate(); // Использование хука для навигации
    const logOut = () => { // Функция для выхода из системы
        user.setUser ({});
        user.setIsAuth(0);
    }

    return (
        <Navbar style={{ backgroundColor: '#4682B4' }} data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }} to={SCHEDULE_ROUTE}>Главная</NavLink>

                {user.isAuth === 0 ?
                    // Если пользователь не авторизован, показать кнопку авторизации
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => { navigate(LOGIN_ROUTE) }}>Авторизация</Button>
                    </Nav>
                    :
                    user.isAuth === 1 ?
                    // Если пользователь авторизован, показать кнопки "Мои заявки" и "Выйти"
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick={() => navigate(REQUESTS_ROUTE)}>Мои заявки</Button>
                        <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    // Если пользователь - админ, показать дополнительные кнопки
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick={() => navigate(REQUESTS_ROUTE)}>Мои заявки</Button>
                        <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick={() => navigate(ADMIN_ROUTE)}>Панель админа</Button>
                        <Button variant={"outline-light"} style={{ marginLeft: '0.5rem' }} onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;