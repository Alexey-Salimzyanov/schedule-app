// Импорт экземпляра axios
import {$host}  from "./hosts";

// Функция для получения списка кафедр
export const getDepartments = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/department')
    // Возвращение полученных данных
    return data
}
// Функция для удаления кафедры
export const deleteDepartment = async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/department/${id}`);
    // Возвращение полученных данных
    return data
}
// Функция для создания кафедры
export const CreateDepartment= async (name)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/department',{name});
    // Возвращение полученных данных
    return data
}

// Функция для редактирования кафедры
export const updateDepartment = async (id, name) => {
    // Выполнение PUT-запроса к API
    const { data } = await $host.put(`api/department/${id}`, { name });
    // Возвращение полученных данных
    return data;
}