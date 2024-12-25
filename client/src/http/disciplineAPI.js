// Импорт экземпляра axios
import {$host} from "./hosts";

// Функция для получения списка дисциплин
export const getDisciplines = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/discipline')
    // Возвращение полученных данных
    return data
}

// Функция для удаления дисциплины
export const deleteDiscipline= async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/discipline/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для создания дисциплины
export const CreateDiscipline = async (name, short_name)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/discipline ',{name, short_name});
    // Возвращение полученных данных
    return data
}

// Функция для обновления дисциплины
export const updateDiscipline = async (id, updatedData) => {
    // Выполнение PUT-запроса к API
    const { data } = await $host.put(`api/discipline/${id}`, updatedData);
    // Возвращение полученных данных
    return data;
}