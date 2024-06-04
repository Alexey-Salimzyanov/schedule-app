// Импорт библиотеки axios
import axios from "axios";

// Создание экземпляра axios для общих запросов
const $host = axios.create({
    // Базовый URL берется из переменных окружения
    baseURL: process.env.REACT_APP_API_URL
})

// Создание экземпляра axios для авторизованных запросов
const $authHost = axios.create({
    // Базовый URL берется из переменных окружения
    baseURL: process.env.REACT_APP_API_URL
})

// Создание перехватчика запросов для добавления токена авторизации в заголовки
const authInterceptor = config =>{
    // Добавление токена авторизации в заголовки
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    // Возвращение конфигурации для выполнения запроса
    return config
}

// Добавление перехватчика запросов к экземпляру axios для авторизованных запросов
$authHost.interceptors.request.use(authInterceptor)

// Экспорт экземпляров axios
export{
    $host,
    $authHost
}
