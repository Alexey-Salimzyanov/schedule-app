import { $host, $authHost } from "./hosts";

// Функция для получения списка типов
export const getTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
}

// Функция для удаления типа
export const deleteType = async (id) => {
    const { data } = await $host.delete(`api/type/${id}`);
    return data;
}

// Функция для создания типа
export const createType = async (name) => {
    const { data } = await $authHost.post('api/type', { name });
    return data;
}

// Функция для обновления типа
export const updateType = async (id, typeData) => {
    const { data } = await $authHost.put(`api/type/${id}`, typeData);
    return data;
}