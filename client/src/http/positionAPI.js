// Импорт экземпляра axios
import {$host} from "./hosts";

// Функция для получения списка должностей
export const getPositions = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/position')
    // Возвращение полученных данных
    return data
}

// Функция для удаления должности
export const deletePosition= async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/position/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для создания должности
export const CreatePosition= async (name, short_name)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/position',{name, short_name});
    // Возвращение полученных данных
    return data
}

// Функция для редактирования должности
export const updatePosition = async (id, name, short_name) => {
    // Выполнение PUT-запроса к API
    const { data } = await $host.put(`api/position/${id}`, { name, short_name });
    // Возвращение полученных данных
    return data;
}


