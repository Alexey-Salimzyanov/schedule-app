import React, { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TableBar from "../components/TableBar";
import { Context } from "../index";
import RequestTable from "../components/Tables/RequestTable";
import TypeTable from "../components/Tables/TypeTable";
import { observer } from "mobx-react-lite";
import DepartmentTable from "../components/Tables/DepartmentTable";
import GroupTable from "../components/Tables/GroupTable";
import DisciplineTable from "../components/Tables/DisciplineTable";
import PositionTable from "../components/Tables/PositionTable";
import TeacherTable from "../components/Tables/TeacherTable";
import AudTable from "../components/Tables/AudTable";
import LessonsTable from "../components/Tables/LessonsTable";
import UsersTable from "../components/Tables/UsersTable";
import SetStartDateModal from "../components/Modals/SetStartDate";

// Создание компонента AdminPage с использованием observer для отслеживания изменений состояния
const AdminPage = observer(() => {
    // Использование контекста для доступа к состоянию таблицы
    const { table } = useContext(Context);

    // Определение текущей таблицы в зависимости от активной таблицы
    let currentTable;
    switch (table.activeTable) {
        case "Заявки":
            currentTable = <RequestTable extraActions={true} />;
            break;
        case "Справочник кафедр":
            currentTable = <DepartmentTable />;
            break;
        case "Справочник групп":
            currentTable = <GroupTable />;
            break;
        case "Справочник дисциплин":
            currentTable = <DisciplineTable />;
            break;
        case "Справочник типов аудиторий":
            currentTable = <TypeTable />;
            break;
        case "Справочник должностей":
            currentTable = <PositionTable />;
            break;
        case "Справочник преподавателей":
            currentTable = <TeacherTable />;
            break;
        case "Справочник аудиторий":
            currentTable = <AudTable />;
            break;
        case "Расписание занятий":
            currentTable = <LessonsTable />;
            break;
        case "Справочник учетных записей":
            currentTable = <UsersTable />;
            break;
        default:
            currentTable = <RequestTable />;
    }
    const [showModal, setShowModal] = useState(false);

    // Обработчик открытия модального окна
    const handleShowModal = () => {
        setShowModal(true);
    };
    const onHide = () => {
        setShowModal(false)
    }
    // Возвращение разметки компонента
    return (
        <>
            <Row className="mt-3" style={{ paddingLeft: '15px' }}>
                <Col md={2}>
                    <Button style={{ backgroundColor: '#4682B4', borderColor: '#4682B4', width: '100%' }} onClick={handleShowModal} className="mt-3">Установить дату начала семестра</Button>
                    <TableBar  />
                </Col>
                <Col md={10} style={{ overflowX: 'auto', maxHeight: '80vh', position: 'relative' }}>
                    <div style={{ overflow: 'auto', maxHeight: '100%' }}>
                        {currentTable}
                    </div>
                </Col>
            </Row>
            <SetStartDateModal show={showModal} onHide={onHide}/>
        </>
    );
});

export default AdminPage;