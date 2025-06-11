import AdminPage from "./pages/AdminPage";
import MyRequests from "./pages/MyRequests";
import Schedule from "./pages/Schedule";
import Info from "./pages/InfoPage";
import Auth from "./pages/Auth";
import MyAccount from "./pages/MyAccount"; 

import { ADMIN_ROUTE, INFO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, REQUESTS_ROUTE, SCHEDULE_ROUTE, MY_ACCOUNT_ROUTE } from "./utils/consts"; 

// Определение публичных маршрутов, доступных всем пользователям
export const publicRoutes = [
    {
        path: SCHEDULE_ROUTE, // Маршрут к странице расписания
        Component: Schedule // Компонент страницы расписания
    },
    {
        path: INFO_ROUTE, // Маршрут к странице справки
        Component: Info // Компонент страницы справки
    },
    {
        path: LOGIN_ROUTE, // Маршрут к странице входа
        Component: Auth // Компонент страницы аутентификации
    },
    {
        path: REGISTRATION_ROUTE, // Маршрут к странице регистрации
        Component: Auth // Компонент страницы аутентификации
    },
];

// Определение маршрутов, доступных авторизованным пользователям
export const authRoutes = [
    
    {
        path: MY_ACCOUNT_ROUTE, // Маршрут к странице "Личный кабинет"
        Component: MyAccount // Компонент страницы "Личный кабинет"
    },
];

// Определение маршрутов, доступных администраторам
export const adminRoutes = [
    {
        path: REQUESTS_ROUTE, // Маршрут к странице запросов
        Component: MyRequests // Компонент страницы запросов
    },
    {
        path: ADMIN_ROUTE, // Маршрут к административной странице
        Component: AdminPage // Компонент административной страницы
    },
];