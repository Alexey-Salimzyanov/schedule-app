import { makeAutoObservable } from "mobx";
import { getInit } from "../http/initAPI";

export default class StartDateStore {
    // Приватное свойство для хранения даты начала семестра
    _startDate = null;

    // Конструктор класса
    constructor() {
        // Делаем все свойства и методы наблюдаемыми
        makeAutoObservable(this);
        // Загружаем дату начала семестра из базы данных
        this.fetchStartDate();
    }

    // Асинхронный метод для загрузки даты начала семестра из базы данных
    async fetchStartDate() {
        try {
            // Выполняем запрос к API
            const response = await getInit(1);
            const startDateFromDB = response.startDate;
            // Устанавливаем дату из базы данных
            this.setStartDate(new Date(startDateFromDB));
        } catch (error) {
            console.error("Ошибка при загрузке даты начала семестра:", error);
            // Устанавливаем значение по умолчанию в случае ошибки
            this.setStartDate(new Date("2024-09-02"));
        }
    }

    // Метод для установки даты начала семестра
    setStartDate(date) {
        this._startDate = date;
    }

    // Геттер для получения даты начала семестра
    get startDate() {
        return this._startDate;
    }
}