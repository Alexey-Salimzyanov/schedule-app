import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import GeneralTable from "../components/Tables/GeneralTable";
import SideBar from "../components/SideBar";
import TableByDays from "../components/Tables/TableByDays";
import TableByAuds from "../components/Tables/TableByAuds";
import TableByDate from "../components/Tables/TableByDate";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { getInit } from "../http/initAPI";
import DatePicker from "../components/Tables/DatePicker";
// Создание компонента Schedule с использованием observer для отслеживания изменений состояния
const Schedule = observer(() => {
    const { view } = useContext(Context);
    const { aud } = useContext(Context);
    const { week } = useContext(Context);
    const { day } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [DBstartDate, setStartDate] = useState(null);
    // Массив дней недели
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const fetchData = async () => {
        const response = await getInit(1);
        const startDateFromDB = response.startDate;
        setStartDate(startDateFromDB);
    };

    useEffect(() => {
        fetchData();
    }, []);
    // Вычисление текущей даты на основе даты начала семетра и номера недели
    let startDate = new Date(DBstartDate);
    let currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.getDay() + daysOfWeek.indexOf(day.dayOfWeek) + 1);
    // Определение текущей таблицы расписания в зависимости от выбранного представления
    let scheduleTable;
    switch (view.scheduleView) {
        case "общий":
            scheduleTable = <GeneralTable />;
            break;
        case "по дням":
            scheduleTable = <TableByDays />;
            break;
        case "по аудиториям":
            scheduleTable = <TableByAuds />;
            break;
        case "по дате":
            scheduleTable = <TableByDate selectedDate={selectedDate} />;
            break;
        default:
            scheduleTable = <GeneralTable />;
    }

    // Определяем, нужно ли показывать кнопки навигации по неделям
    const showWeekNavigation = view.scheduleView === "по аудиториям" || view.scheduleView === "по дням";

    return (
        <Container>
            <Row className="mt-3">
                <Col md={{ span: 9, offset: 3 }}>
                    <h1 style={{ textAlign: "center" }}>
                        {
                            view.scheduleView === "по аудиториям" ?
                                "Расписание на " + currentDate.toLocaleDateString()
                                :
                                view.scheduleView === "по дням" ?
                                    "Занятость аудитории " + aud.numberOfAud
                                    :
                                    "Общее расписание"
                        }
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <SideBar />
                    {view.scheduleView === "по дате" && (
                        <h3 style={{ textAlign: "center", marginTop: '20px' }}>Календарь</h3>
                    )}
                    {view.scheduleView === "по дате" && <DatePicker onDateChange={setSelectedDate} />}
                </Col>
                <Col md={9}>
                    {scheduleTable}

                    {showWeekNavigation && (
                        <>
                            <h3 style={{ textAlign: "center" }}>№ Недели</h3>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="secondary"
                                    disabled={week.numberOfWeek <= 1}
                                    onClick={() => week.setNumberOfWeek(week.numberOfWeek - 1)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Предыдущая
                                </Button>
                                <h4>{week.numberOfWeek}</h4>
                                <Button
                                    variant="secondary"
                                    disabled={week.numberOfWeek >= 18}
                                    onClick={() => week.setNumberOfWeek(week.numberOfWeek + 1)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Следующая
                                </Button>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
});

export default Schedule;