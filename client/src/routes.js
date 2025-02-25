import AdminPage from "./pages/AdminPage";
import MyRequests from "./pages/MyRequests";
import Schedule from "./pages/Schedule";
import Info from "./pages/InfoPage";
import Auth from "./pages/Auth";

import { ADMIN_ROUTE, INFO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, REQUESTS_ROUTE, SCHEDULE_ROUTE} from "./utils/consts";


// Определение публичных маршрутов, доступных всем пользователям
export const publicRoutes = [
    {
        path: SCHEDULE_ROUTE, // Маршрут к странице расписания
        Component: Schedule // Компонент страницы расписания
    },
    {
        path: INFO_ROUTE, // Маршрут к странице расписания
        Component: Info // Компонент страницы расписания
    },
    {
        path: LOGIN_ROUTE, // Маршрут к странице входа
        Component: Auth // Компонент страницы аутентификации
    },
    {
        path: REGISTRATION_ROUTE, // Маршрут к странице регистрации
        Component: Auth // Компонент страницы аутентификации
    },
]

// Определение маршрутов, доступных авторизованным пользователям
export const authRoutes = [
    {
        path: REQUESTS_ROUTE, // Маршрут к странице запросов
        Component: MyRequests // Компонент страницы запросов
    },
]

// Определение маршрутов, доступных администраторам
export const adminRoutes = [
    {
        path: ADMIN_ROUTE, // Маршрут к административной странице
        Component: AdminPage // Компонент административной страницы
    },
]
