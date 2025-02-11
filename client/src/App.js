// Импорт необходимых библиотек и компонентов
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import { Context } from ".";

// Создание компонента App с использованием observer для отслеживания изменений состояния
const App = observer(() => {
  // Использование контекста для доступа к пользовательскому состоянию
  const { user } = useContext(Context);
  // Создание состояния для отслеживания загрузки
  const [loading, setLoading] = useState(true);

  // Использование useEffect для выполнения проверки при монтировании компонента
  useEffect(() => {
    check().then(data => {
      // Если данные получены, устанавливаем пользователя и его роль
      if (data) {
        user.setUser (true);
        let role;
        if (data.role === "ADMIN") {
          role = 2;
        } else {
          role = 1;
        }
        user.setIsAuth(role);
      }
    }).finally(() => setLoading(false)); // Завершение загрузки
  }, [user]);

  // Если идет загрузка, отображаем спиннер
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spinner animation={"grow"} />
      </div>
    );
  }

  // Если загрузка завершена, отображаем приложение
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App; // Экспорт компонента App