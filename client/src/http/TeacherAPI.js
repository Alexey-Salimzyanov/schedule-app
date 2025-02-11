// Импорт экземпляра axios
import {$host} from "./hosts";

// Функция для получения списка преподавателей с дополнительной информацией
export const getTeachers = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/teacher/joined')
    // Возвращение полученных данных
    return data
}

// Функция для удаления преподавателя
export const deleteTeacher= async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/teacher/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для создания преподавателя
export const CreateTeacher = async (surname_N_P, positionListId, departmentListId)=>{
    // Выполнение POST-запроса к API
    const {data} = await $host.post('api/teacher ',{surname_N_P, positionListId, departmentListId});
    // Возвращение полученных данных
    return data
}

// Функция для обновления преподавателя
export const UpdateTeacher = async (id, surname_N_P, positionListId, departmentListId) => {
    // Выполнение PUT-запроса к API
    const { data } = await $host.put(`api/teacher/${id}`, { surname_N_P, positionListId, departmentListId });
    // Возвращение полученных данных
    return data;
}
