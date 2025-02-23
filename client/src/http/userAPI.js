// Импорт экземпляров axios и функции для декодирования JWT
import { $authHost, $host } from "./hosts";
import { jwtDecode } from "jwt-decode";

// Функция для регистрации пользователя
export const registration = async (login, password, teacherListId) => {
    const { data } = await $host.post('api/user/registration', { login, password, role: 'USER', teacherListId });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}
export const createUser = async (login, password, role, teacherListId) => {
    const { data } = await $host.post('api/user', { login, password, role, teacherListId });
    return data;
}

// Функция для входа пользователя
export const logIn = async (login, password) => {
    const { data } = await $host.post('api/user/login', { login, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

// Функция для получения списка пользователей
export const getUsers = async () => {
    const { data } = await $host.get('api/user');
    return data;
}

// Функция для удаления пользователя
export const deleteUser  = async (id) => {
    const { data } = await $host.delete(`api/user/${id}`);
    return data;
}

// Функция для проверки авторизации пользователя
export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (e) {
    }
}

// Функция для обновления пользователя
export const updateUser = async (id, login, password, role ) => { 
    const { data } = await $host.put(`api/user/${id}`, {login, password, role} );

    return data;
}