import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import '../../styles/Table.css'; 
import { Context } from "../.."; 
import { getLessons } from "../../http/lessonAPI";
import { observer } from "mobx-react-lite";
import { getInit } from "../../http/initAPI";

// Списки для дней недели, недель и уроков
const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const weeks = ['Четная', 'Нечетная'];
const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара', '7 пара'];

// Компонент общей таблицы
const TableByDate = observer(({ selectedDate }) => { // <-- Добавлено selectedDate
    const [schedule, setSchedule] = useState([]); 
    const { aud } = useContext(Context); 
    const [DBstartDate, setStartDate] = useState(null);

    // Функция для получения данных о уроках из БД
    const fetchData = async () => {
        const scheduleData = await getLessons();
        setSchedule(scheduleData); 

        const response = await getInit(1);
        const startDateFromDB = response.startDate;
        setStartDate(startDateFromDB);   
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    let startDate = new Date(DBstartDate);

    // Функция для получения недель между двумя датами с учетом периода
    const getWeeks = (firstDate, lastDate, period) => {
        let weeks = [];
        let currentDate = new Date(firstDate);
        let endDate = new Date(lastDate);
        while (currentDate <= endDate) {
            let weekNumber = Math.floor((currentDate - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000)) + 1;
            if (!weeks.includes(weekNumber)) {
                weeks.push(weekNumber);
            }
            currentDate.setDate(currentDate.getDate() + 7 * period);
        }
        return weeks;
    };

    const getCellContent = (day, weekType, lesson) => {
        let cellContent = [];

        for (let scheduleItem of schedule) {
            if (new Date(scheduleItem.lastDate) >= new Date(startDate)) {
                let scheduleItemDayOfWeek = new Date(scheduleItem.firstDate).getDay();
                if (aud.numberOfAud === scheduleItem.auditorium_list.number && scheduleItemDayOfWeek === day && scheduleItem.number === lesson) {
                    let weeks = getWeeks(scheduleItem.firstDate, scheduleItem.lastDate, scheduleItem.period);
                    let filteredWeeks = weeks.filter(week => week % 2 === weekType % 2);
                    if (filteredWeeks.length > 0) {
                        // Проверяем, есть ли уже группа в cellContent
                        let groupExists = cellContent.some(content => content.props.children.includes(scheduleItem.group_list.name));
                        if (!groupExists) {
                            cellContent.push(<div key={scheduleItem.id}>{`${scheduleItem.group_list.name} ${scheduleItem.discipline_list.short_name} (${filteredWeeks.join(', ')})`}</div>);
                        }
                    }
                }
            }
        }
        return cellContent;
    };

    // Функция для проверки, соответствует ли ячейка выбранной дате
    const isCellForSelectedDate = (day, weekType, lesson) => {
        if (!selectedDate || !startDate) return false;

        const selectedDay = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay(); // Приводим к вашему формату
        if (day !== selectedDay) return false;

        // Вычисляем номер недели относительно startDate
        const diffWeeks = Math.floor((selectedDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
        if (diffWeeks < 1) return false;
        const selectedWeekParity = diffWeeks % 2;

        return weekType % 2 === selectedWeekParity;
    };

    // Возвращаем разметку таблицы
    return (
        <Table striped bordered hover className="mt-3" style={{ position: 'relative' }}>
            <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                <tr>
                    <th>День недели</th>
                    <th>Неделя</th>
                    {lessons.map((lesson, index) => (
                        <th key={index}>{lesson}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {daysOfWeek.map((day, index) => (
                    weeks.map((weekType, index2) => (
                        <tr key={index * 2 + index2}>
                            {index2 === 0 && <td rowSpan="2">{day}</td>}
                            <td>{weekType}</td>
                            {lessons.map((lesson, index3) => {
                                const highlighted = isCellForSelectedDate(index + 1, index2, index3 + 1);
                                const style = highlighted ? { backgroundColor: '#ADD8E6' } : {}; // Голубой цвет
                                return (
                                    <td key={index3} className="hoverable" style={style}>
                                        {getCellContent(index + 1, index2, index3 + 1)}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                ))}
            </tbody>
        </Table>
    );
});

export default TableByDate;
