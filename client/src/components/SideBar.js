import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuds } from "../http/audAPI";
import { getInit } from "../http/initAPI";

// Компонент боковой панели
const SideBar = observer(() => {
    // Получаем необходимые данные из контекста
    const { view } = useContext(Context);
    const { day } = useContext(Context);
    const { week } = useContext(Context);
    const { aud } = useContext(Context);

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

    // Получение списка аудиторий
    const [auditoriums, setAuditoriums] = useState([]);
    const [DBstartDate, setStartDate] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuds();
            setAuditoriums(data.map(aud => aud.number));

            const response = await getInit(1);
            const startDateFromDB = response.startDate;
            setStartDate(startDateFromDB)
        };
        fetchData();
    }, []);


    // Вычисление текущей даты на основе даты начала семетра и номера недели
    let startDate = new Date(DBstartDate);
    // Вычисление текущей даты

    let currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.getDay() + daysOfWeek.indexOf(day.dayOfWeek) + 1);

    // Обработчик изменения представления
    const handleChange = (event) => {
        view.setScheduleView(event.target.value);
    };

    // Состояние для ручного ввода номера недели
    const [inputValue, setInputValue] = useState(week.numberOfWeek);

    // Обработчик изменения ввода
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    // Обработчик потери фокуса (валидация и сохранение значения)
    const handleInputBlur = () => {
        const parsedValue = parseInt(inputValue, 10);
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 18) {
            week.setNumberOfWeek(parsedValue);
        } else {
            setInputValue(week.numberOfWeek); // Сброс значения, если оно невалидно
        }
    };

    // Обработчик клика на поле ввода (остановка всплытия события)
    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
            <h6 style={{ textAlign: "center" }}>Вариант отображения</h6>
            <div>
                <label>
                    <input
                        type="radio"
                        value="общий"
                        checked={view.scheduleView === "общий"}
                        onChange={handleChange}
                        style={{ marginRight: '5px' }}
                    />
                    Общий
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="по аудиториям"
                        checked={view.scheduleView === "по аудиториям"}
                        onChange={handleChange}
                        style={{ marginRight: '5px' }}
                    />
                    По аудиториям
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="по дням"
                        checked={view.scheduleView === "по дням"}
                        onChange={handleChange}
                        style={{ marginRight: '5px' }}
                    />
                    По дням
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="radio"
                        value="по дате"
                        checked={view.scheduleView === "по дате"}
                        onChange={handleChange}
                        style={{ marginRight: '5px' }}
                    />
                    По дате
                </label>
            </div>
            {/* В зависимости от выбранного представления отображаются разные элементы управления */}
            {view.scheduleView === "по дням" ? (
                <div>
                    <h6 style={{ textAlign: "center" }}>№ Аудитории</h6>
                    <div className="d-flex justify-content-center">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="" style={{ outline: '1px solid #000' }}>{aud.numberOfAud}</Button>
                            <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{ outline: '1px solid #000' }} />
                            <Dropdown.Menu className="super-colors" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {auditoriums.map((NumberOfAud, index) => (
                                    <Dropdown.Item key={index} onClick={() => aud.setNumberOfAud(NumberOfAud)}>
                                        {NumberOfAud}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h6 style={{ textAlign: "center" }}>№ Недели</h6>
                    <div className="d-flex justify-content-center">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="" style={{ outline: '1px solid #000' }}>{week.numberOfWeek}</Button>
                            <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{ outline: '1px solid #000' }} />
                            <Dropdown.Menu className="super-colors" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <Dropdown.Item>
                                    <Form.Control
                                        type="number"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        onClick={handleInputClick}
                                        min="1"
                                        max="18"
                                        style={{ width: '100%' }}
                                    />
                                </Dropdown.Item>
                                {weeks.map((NumberOfWeek, index) => (
                                    <Dropdown.Item key={index} onClick={() => week.setNumberOfWeek(NumberOfWeek)}>
                                        {NumberOfWeek}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            ) : view.scheduleView === "по аудиториям" ? (
                <div>
                    <h6 style={{ textAlign: "center", marginTop: '5px' }}>День недели</h6>
                    <div className="d-flex justify-content-center">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="" style={{ outline: '1px solid #000' }}>{day.dayOfWeek}</Button>
                            <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{ outline: '1px solid #000' }} />
                            <Dropdown.Menu className="super-colors" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {daysOfWeek.map((dayOfWeek, index) => (
                                    <Dropdown.Item key={index} onClick={() => day.setDayOfWeek(dayOfWeek)}>
                                        {dayOfWeek}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h6 style={{ textAlign: "center", marginTop: '5px' }}>№ Недели</h6>
                    <div className="d-flex justify-content-center">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="" style={{ outline: '1px solid #000' }}>{week.numberOfWeek}</Button>
                            <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{ outline: '1px solid #000' }} />
                            <Dropdown.Menu className="super-colors" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <Dropdown.Item>
                                    <Form.Control
                                        type="number"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        onClick={handleInputClick}
                                        min="1"
                                        max="18"
                                        style={{ width: '100%' }}
                                    />
                                </Dropdown.Item>
                                {weeks.map((NumberOfWeek, index) => (
                                    <Dropdown.Item key={index} onClick={() => week.setNumberOfWeek(NumberOfWeek)}>
                                        {NumberOfWeek}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h6 style={{ textAlign: "center", marginTop: '5px' }}>Дата</h6>
                    <label style={{ display: 'block', textAlign: 'center' }}>{currentDate.toLocaleDateString()}</label>
                </div>
            ) : (
                <div>
                    <h6 style={{ textAlign: "center" }}>№ Аудитории</h6>
                    <div className="d-flex justify-content-center">
                        <Dropdown as={ButtonGroup}>
                            <Button variant="" style={{ outline: '1px solid #000' }}>{aud.numberOfAud}</Button>
                            <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" style={{ outline: '1px solid #000' }} />
                            <Dropdown.Menu className="super-colors" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {auditoriums.map((NumberOfAud, index) => (
                                    <Dropdown.Item key={index} onClick={() => aud.setNumberOfAud(NumberOfAud)}>
                                        {NumberOfAud}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            )}
        </div>
    );
});

export default SideBar;