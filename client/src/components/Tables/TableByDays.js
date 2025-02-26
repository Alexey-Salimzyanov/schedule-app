import React, { useContext, useEffect, useState } from "react";
import {Table} from "react-bootstrap";
import '../../styles/Table.css'; 
import { Context } from "../.."; 
import { getLessons, getReqLessons } from "../../http/lessonAPI";
import EditCellModal from "../Modals/Modal";

// Компонент таблицы по дням
const TableByDays = () => {
    // Списки для номеров занятий и дней недели
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const lessons = ['1 пара', '2 пара', '3 пара', '4 пара', '5 пара', '6 пара', '7 пара'];
    // Получаем необходимые данные из контекста 
    const {aud} = useContext(Context);
    const {week} = useContext(Context);
    const {startDate} = useContext(Context);
     // Создаем необходимые состояния  
    const [show, setShow] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    const [schedule, setSchedule] = useState([]); 
    const [scheduleReq, setScheduleReq] = useState([]); 

    // Обработчик закрытия модального окна
    const handleClose = () => setShow(false);
    // Обработчик открытия модального окна  
    const handleShow = (day, lesson) => {
        setSelectedCell({ day, lesson });
        setShow(true);
    };
    // Функция получения данных из бд
    const fetchData = async () => {
        const scheduleData = await getLessons();
        const scheduleDataReq = await getReqLessons();
        setSchedule(scheduleData); 
        setScheduleReq(scheduleDataReq); 
    };
    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);
    // Функция для получения выбранного расписания
    const getSelectedSchedule = () => {
        if (selectedCell) {
            const selectedLessonNumber = lessons.indexOf(selectedCell.lesson) + 1;
        for(let i=0;i<schedule.length;i++){
            if(schedule[i].number ===selectedLessonNumber){
                if(schedule[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + daysOfWeek.indexOf(selectedCell.day) + 1);
                    let tempDate = new Date(schedule[i].firstDate);
                    let tempLastDate = new Date(schedule[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                        return schedule[i];
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * schedule[i].period);
                    }
                }
            }
        }

        for(let i=0;i<scheduleReq.length;i++){
            if(scheduleReq[i].number === selectedLessonNumber && scheduleReq[i].status !=="Отклонена"){
                if(scheduleReq[i].auditorium_list.number===aud.numberOfAud){
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + daysOfWeek.indexOf(selectedCell.day) + 1);
                    let tempDate = new Date(scheduleReq[i].firstDate);
                    let tempLastDate = new Date(scheduleReq[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                            return scheduleReq[i]
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * scheduleReq[i].period);
                    }
                }
            }
        }
    }
        return null;
    }
    // Функция поиска занятия по номеру пары и дню недели
    const findLesson = (dayOfWeek,nOfPair,schedule)=>{

        for(let i=0;i<schedule.length;i++){
            if(schedule[i].number ===nOfPair){
                if(schedule[i].auditorium_list.number===aud.numberOfAud){
                                    //Чтобы не зацикливалось если период равен 0
                 if(schedule[i].period === 0) schedule[i].period = 1
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + dayOfWeek + 1);
                    let tempDate = new Date(schedule[i].firstDate);
                    let tempLastDate = new Date(schedule[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                        return{ text: (schedule[i].discipline_list.short_name + " " + schedule[i].group_list.name), color: "white" };
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * schedule[i].period);
                    }
                }
            }
        }

        for(let i=0;i<scheduleReq.length;i++){
            if(scheduleReq[i].number === nOfPair){
                if(scheduleReq[i].auditorium_list.number===aud.numberOfAud){
                                    //Чтобы не зацикливалось если период равен 0
                if(scheduleReq[i].period === 0) scheduleReq[i].period = 1
                    let currentDate = new Date(startDate.startDate); 
                    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + dayOfWeek + 1);
                    let tempDate = new Date(scheduleReq[i].firstDate);
                    let tempLastDate = new Date(scheduleReq[i].lastDate);
                    tempDate.setDate(tempDate.getDate());
                   
                    for(let j = 0; tempDate <= tempLastDate; j++){
                       if(currentDate.toLocaleDateString()===tempDate.toLocaleDateString()){
                        if(scheduleReq[i].status === "Рассматривается"){
                            return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "#FFDB8B" };
                        }
                        else if(scheduleReq[i].status === "Одобрена"){
                            return { text: (scheduleReq[i].discipline_list.short_name + " " + scheduleReq[i].group_list.name), color: "#BADBAD" };
                        }
                       }
                       tempDate.setDate(tempDate.getDate() + 7 * scheduleReq[i].period);
                    }
                }
            }
        }
        return { text: "", color: "white" };
    }

    // Возвращаем разметку компонента
    return (
        <>
            <Table responsive striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>День недели</th>
                        {lessons.map((lesson, index) => (
                            <th key={index}>{lesson}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {daysOfWeek.map((day, index) => (
                        <tr key={index}>
                            <td>{day}</td>
                            {lessons.map((lesson, index2) => (
                                <td key={index2}  onClick={() => handleShow(day, lesson)} style={{backgroundColor: findLesson(index,index2+1,schedule).color, cursor: 'pointer'}} className="hoverable" >
                                {
                                    findLesson(index,index2+1,schedule).text
                                }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditCellModal
            show={show}
            handleClose={handleClose}
            selectedCell={selectedCell}
            getSelectedSchedule={getSelectedSchedule}
            updateSchedule={fetchData}
        />
        </>
    );
};

export default TableByDays;