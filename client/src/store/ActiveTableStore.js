// Импорт функции makeAutoObservable из библиотеки mobx
import { makeAutoObservable } from "mobx";

// Экспорт класса ActiveTableStore
export default class ActiveTableStore {

    // Конструктор класса
    constructor() {
        // Инициализация активной таблицы значением "Заявки"
        this._activeTable="Заявки";
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this);
    }

    // Метод для установки активной таблицы
    setActiveTable(nameOfTable) {
        // Установка нового значения активной таблицы
        this._activeTable = nameOfTable;
    }
    // Геттер для получения активной таблицы
    get activeTable(){
        // Возвращение значения активной таблицы
        return this._activeTable;
    }
}
