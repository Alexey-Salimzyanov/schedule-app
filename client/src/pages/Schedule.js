import React, { useContext } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import GeneralTable from "../components/Tables/GeneralTable";
import SideBar from "../components/SideBar";
import TableByDays from "../components/Tables/TableByDays";
import TableByAuds from "../components/Tables/TableByAuds";
import { Context } from "..";
import { observer } from "mobx-react-lite";
// Создание компонента Schedule с использованием observer для отслеживания изменений состояния
const Schedule = observer(() => {
    // Использование контекста для доступа к состояниям
    const { view } = useContext(Context);
    const { aud } = useContext(Context);
    const { week } = useContext(Context);
    const { day } = useContext(Context);
    const { startDate } = useContext(Context);
    // Массив дней недели
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    // Вычисление текущей даты на основе даты начала семетра и номера недели
    let currentDate = new Date(startDate.startDate);
    currentDate.setDate(startDate.startDate.getDate() + 7 * (week.numberOfWeek - 1) - startDate.startDate.getDay() + daysOfWeek.indexOf(day.dayOfWeek) + 1);

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
        default:
            scheduleTable = <GeneralTable />;
    }
    // Возвращаем разметку компонента
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
                </Col>
                <Col md={9}>
                    {scheduleTable}

                    {
                        view.scheduleView === "общий" ?
                            ""
                            :
                            <>
                                <h3 style={{ textAlign: "center" }}>№ Недели</h3>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="secondary" disabled={week.numberOfWeek <= 1} onClick={() => week.setNumberOfWeek(week.numberOfWeek - 1)} style={{ marginRight: '10px' }}>Предыдущая</Button>
                                    <h4>{week.numberOfWeek}</h4>
                                    <Button variant="secondary" disabled={week.numberOfWeek >= 18} onClick={() => week.setNumberOfWeek(week.numberOfWeek + 1)} style={{ marginLeft: '10px' }}>Следующая</Button>
                                </div>
                            </>
                    }
                </Col>
            </Row>
        </Container>
    );
});
export default Schedule;