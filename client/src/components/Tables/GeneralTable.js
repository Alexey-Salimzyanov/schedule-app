import React, { useState, useEffect, useContext } from "react";
import {Table} from "react-bootstrap";
import '../../styles/Table.css'; 
import { Context } from "../.."; 
import { getLessons } from "../../http/lessonAPI";
import { observer } from "mobx-react-lite";

// Списки для дней недели, недель и уроков
const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const weeks = ['Четная', 'Нечетная'];
const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара', '7 пара'];

// Компонент общей таблицы
const GeneralTable = observer( () =>{
    const {startDate} = useContext(Context); 
    const [schedule, setSchedule] = useState([]); 
    const {aud} = useContext(Context); 

    // Функция для получения данных о уроках из БД
    const fetchData = async () => {
         const scheduleData = await getLessons();
         setSchedule(scheduleData); 
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    // Функция для получения недель между двумя датами с учетом периода
    const getWeeks = (firstDate, lastDate, period) => {
 
        let weeks = [];
        let currentDate = new Date(firstDate);
        let endDate = new Date(lastDate);
        while (currentDate <= endDate) {
            let weekNumber = Math.floor((currentDate - new Date(startDate.startDate)) / (7 * 24 * 60 * 60 * 1000)) + 1;
            if (!weeks.includes(weekNumber)) {
                weeks.push(weekNumber);
            }
            currentDate.setDate(currentDate.getDate() + 7 * period);
        }
        return weeks;

    }

    const getCellContent = (day, weekType, lesson) => {
        let cellContent = [];

        for (let scheduleItem of schedule) {
            if(new Date(scheduleItem.lastDate) >= new Date(startDate.startDate)){
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
    }
    
    // Возвращаем разметку таблицы
    return(
        <Table striped bordered hover>
            <thead>
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
                            {lessons.map((lesson, index3) => (
                                <td key={index3} className="hoverable">
                                    {getCellContent(index+1, index2, index3+1)}
                                </td>
                            ))}
                        </tr>
                    ))
                ))}
            </tbody>
        </Table>
    );
});

export default GeneralTable;
