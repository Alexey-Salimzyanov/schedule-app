// Импорт экземпляра axios
import {$host} from "./hosts";

// Функция для получения списка уроков
export const getLessons = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/schedule/');
    // Возвращение полученных данных
    return data
}

// Функция для получения списка уроков из заявок
export const getReqLessons = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/request');
    // Возвращение полученных данных
    return data
}

// Функция для создания заявки
export const createReqLesson = async (number,submissionDate,firstDate,period,lastDate,
    status,teacherListId,disciplineListId,groupListId,auditoriumListId)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/request', {number,submissionDate,firstDate,period,lastDate,
    status,teacherListId,disciplineListId,groupListId,auditoriumListId});
    // Возвращение полученных данных
    return data
}

// Функция для создания урока
export const createLesson = async (number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/schedule', {number,firstDate,period,lastDate,teacherListId,disciplineListId,groupListId,auditoriumListId});
    // Возвращение полученных данных
    return data
}

// Функция для изменения статуса заявки
export const changeReqStatus = async (id,status)=>{
    // Выполнение PUT-запроса к API
    const {data} = await $host.put('api/request/status',{id,status});
    // Возвращение полученных данных
    return data
}

// Функция для удаления заявки
export const deleteReq = async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/request/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для удаления урока
export const deleteLesson = async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/schedule/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для редактирования урока
export const updateLesson = async (id, updatedData) => {
    // Выполнение PUT-запроса к API 
    const { data } = await $host.put(`api/schedule/${id}`, updatedData);
    // Возвращение полученных данных
    return data;
}
export const updateRequest = async (id, updatedData) => {
    // Выполнение PUT-запроса к API 
    
    const { data } = await $host.put(`api/request/${id}`, updatedData);
    // Возвращение полученных данных
    return data;
}

