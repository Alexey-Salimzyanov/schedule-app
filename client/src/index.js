import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ScheduleViewStore from './store/ScheduleViewStore';
import DayOfWeekStore from './store/DayOfWeekStore';
import NumberOfWeekStore from './store/NumberOfWeekStore';
import NumberOfAudStore from './store/NumburOfAudStore';
import ActiveTableStore from './store/ActiveTableStore';

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
    table: new ActiveTableStore(), // Состояние активной таблицы
  }}>
    <App />
  </Context.Provider>
);