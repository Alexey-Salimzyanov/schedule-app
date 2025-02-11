// Импорт необходимых библиотек и компонентов
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Импорт хранилищ состояний
import UserStore from './store/UserStore';
import ScheduleViewStore from './store/ScheduleViewStore';
import DayOfWeekStore from './store/DayOfWeekStore';
import NumberOfWeekStore from './store/NumberOfWeekStore';
import NumberOfAudStore from './store/NumburOfAudStore';
import StartDateStore from './store/StartDateStore';
import ActiveTableStore from './store/ActiveTableStore';

// Создание контекста для передачи состояний в компоненты
export const Context = createContext(null)

// Получение корневого элемента для рендеринга
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения с передачей состояний через контекст
root.render(
  <Context.Provider value={{
    user: new UserStore(), // Пользовательское состояние
    view: new ScheduleViewStore(), // Состояние представления расписания
    day: new DayOfWeekStore(), // Состояние дня недели
    week: new NumberOfWeekStore(), // Состояние номера недели
    aud: new NumberOfAudStore(), // Состояние номера аудитории
    startDate: new StartDateStore(), // Состояние даты начала семестра
    table: new ActiveTableStore(), // Состояние активной таблицы
  }}>
    <App />
  </Context.Provider>
);