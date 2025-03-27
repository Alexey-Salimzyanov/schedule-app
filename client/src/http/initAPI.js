import { $host } from "./hosts";

// Функция для получения списка типов
export const getInit = async (id) => {
    const { data } = await $host.get(`api/init/${id}`);
    return data;
}

export const updateInit = async (id, date) => {
    const { data } = await $host.put(`api/init/${id}`, {date});
    return data;
}

