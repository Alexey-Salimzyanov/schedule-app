import React, { useContext } from 'react';
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, REQUESTS_ROUTE, SCHEDULE_ROUTE, INFO_ROUTE } from "../utils/consts";
import { NavLink } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from 'react-router-dom';

// Компонент NavBar, меняющийся в зависимости от состояния пользователя
const NavBar = observer(() => {
    const { user } = useContext(Context); // Получение контекста пользователя
    const navigate = useNavigate(); // Использование хука для навигации
    const logOut = () => { // Функция для выхода из системы
        user.setUser({});
        user.setIsAuth(0);
    }
    const location = useLocation();

    return (
        <Navbar style={{ backgroundColor: '#4682B4' }} data-bs-theme="dark">
            <Container>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    <NavLink
                        to={SCHEDULE_ROUTE}
                        style={{
                            color: location.pathname === SCHEDULE_ROUTE ? '#a8a8a8' : 'white',
                            marginRight: '10px',
                            textDecoration: 'none',
                            pointerEvents: location.pathname === SCHEDULE_ROUTE ? 'none' : 'auto',
                        }}
                    >
                        Главная
                    </NavLink>
                    <span style={{ color: 'white', marginRight: '10px' }}>/</span>
                    <NavLink
                        to={INFO_ROUTE}
                        style={{
                            color: location.pathname === INFO_ROUTE ? '#a8a8a8': 'white',
                            textDecoration: 'none',
                            pointerEvents: location.pathname === INFO_ROUTE ? 'none' : 'auto',
                        }}
                    >
                        Справка
                    </NavLink>
                </div>
                {/* <NavLink style={{ color: 'white', marginRight: '10px', fontSize: '20px', textDecoration: 'none', cursor: isActive ? 'default' : 'pointer' }} to={SCHEDULE_ROUTE}>Главная</NavLink>
                    <NavLink style={{ color: 'white', fontSize: '20px', textDecoration: 'none', cursor: isActive ? 'default' : 'pointer' }} to={INFO_ROUTE}>Справка</NavLink> */}




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