// Импорт экземпляра axios
import { $host } from "./hosts";
// Функция для получения списка групп
export const getGroups = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/group')
    // Возвращение полученных данных
    return data
}
// Функция для удаления группы
export const deleteGroup = async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/group/${id}`);
    // Возвращение полученных данных
    return data
}
// Функция для создания группы
export const CreateGroup= async (name)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/group',{name});
    // Возвращение полученных данных
    return data
}

// Функция для редактирования группы
export const updateGroup = async (id, name) => {
    // Выполнение PUT-запроса к API
    const { data } = await $host.put(`api/group/${id}`, { name }); 
    // Возвращение полученных данных
    return data;
}
