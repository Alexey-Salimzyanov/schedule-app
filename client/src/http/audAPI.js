// Импорт экземпляров axios и функции для декодирования JWT
import {$host} from "./hosts";

// Функция для получения списка аудиторий
export const getAuds = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/auditorium')
    // Возвращение полученных данных
    return data
}

// Функция для получения списка аудиторий с дополнительной информацией
export const getJoinedAuds = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/auditorium/joined')
    // Возвращение полученных данных
    return data
}

// Функция для удаления аудитории
export const deleteAud = async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/auditorium/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для создания аудитории
export const CreateAud = async (number, capacity, typeListId)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/auditorium ',{number, capacity, typeListId});
    // Возвращение полученных данных
    return data
}

// Функция для обновления аудитории
export const updateAud = async (auditorium) => {
    // Выполнение PUT-запроса к API
    const { data } = await $host.put(`api/auditorium/${auditorium.id}`, auditorium);
    // Возвращение полученных данных
    return data;
}


