import axios from "axios";

// Создание экземпляра axios для общих запросов
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Создание экземпляра axios для авторизованных запросов
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Создание перехватчика запросов для добавления токена авторизации в заголовки
const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// Добавление перехватчика запросов к экземпляру axios для авторизованных запросов
$authHost.interceptors.request.use(authInterceptor)

export{
    $host,
    $authHost
}
