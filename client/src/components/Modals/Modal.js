import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../..";
import { createReqLesson, getLessons, getReqLessons } from "../../http/lessonAPI";
import { getDisciplines } from "../../http/disciplineAPI";
import { getTeachers } from "../../http/TeacherAPI";
import { getGroups } from "../../http/groupAPI";
import { getAuds } from "../../http/audAPI";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const EditCellModal = ({
  show,
  handleClose,
  selectedCell,
  getSelectedSchedule,
  updateSchedule,
}) => {
  // Получаем необходимые данные из контекста
  const { day } = useContext(Context);
  const { week } = useContext(Context);
  const { startDate } = useContext(Context);
  const { aud } = useContext(Context);
  const { user } = useContext(Context);
  // Создаем необходимые состояния
  const [disciplines, setDisciplines] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [lastDate, setLastDate] = useState("");
  const [period, setPeriod] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [scheduleReq, setScheduleReq] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  // функция определения ID аудитории по ее номеру
  const getAudId = async (audNumber) => {
    const auds = await getAuds();
    const aud = auds.find((aud) => aud.number === audNumber);
    return aud ? aud.id : null;
  };


  // Используем useEffect для получения данных из БД при монтировании компонента
  useEffect(() => {
    getDisciplines().then((data) => setDisciplines(data));
    getTeachers().then((data) => setTeachers(data));
    getGroups().then((data) => setGroups(data));
    getLessons().then((data) => setSchedule(data));
    getReqLessons().then((data) => setScheduleReq(data));
  }, []);
  // Проверка даты на валидность
  const isDateValid = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // Функция проверки коллизий в расписании
  const checkCollisions = (aud, nOfPair, reqFd, reqPer, reqLd) => {


    //проверяем все записи из расписания
    for (let i = 0; i < schedule.length; i++) {

      if (schedule[i].period === 0)
        schedule[i].period = 1

      let LessonFDate = new Date(schedule[i].firstDate);
      let ReqFDate = new Date(reqFd);

      let LessonLDate = new Date(schedule[i].lastDate);
      let ReqLDate = new Date(reqLd);

      //если совпадает аудитория, номер пары и день недели
      if (
        schedule[i].auditorium_list.number === aud &&
        schedule[i].number === nOfPair &&
        LessonFDate.getDay() === ReqFDate.getDay()
      ) {
        // Создаем новую дату для проверки пересечений
        let reqCheckDate = new Date(ReqFDate);
        let lessonCheckDate = new Date(LessonFDate);
        // Пока дата проверки не превысит последнюю дату занятия
        while (reqCheckDate <= ReqLDate) {

          while (lessonCheckDate <= LessonLDate) {
            // Если дата проверки совпадает с датой запроса
            if (reqCheckDate.getTime() === lessonCheckDate.getTime()) {
              return true; // Найдено пересечение
            }
            // Переходим к следующей дате занятия, добавляя период
            lessonCheckDate.setDate(
              lessonCheckDate.getDate() + 7 * schedule[i].period
            );
          }
          lessonCheckDate = new Date(LessonFDate);
          // Переходим к следующей дате занятия, добавляя период
          reqCheckDate.setDate(reqCheckDate.getDate() + 7 * reqPer);
        }
      }
    }


    for (let i = 0; i < scheduleReq.length; i++) {

      if (scheduleReq[i].period === 0)
        scheduleReq[i].period = 1

      let LessonFDate = new Date(scheduleReq[i].firstDate);
      let ReqFDate = new Date(reqFd);

      let LessonLDate = new Date(scheduleReq[i].lastDate);
      let ReqLDate = new Date(reqLd);
      //если совпадает аудитория, номер пары и день недели
      if (
        scheduleReq[i].auditorium_list.number === aud &&
        scheduleReq[i].number === nOfPair &&
        LessonFDate.getDay() === ReqFDate.getDay() &&
        scheduleReq[i].status !== "Отклонена"
      ) {
        // Создаем новую дату для проверки пересечений
        let reqCheckDate = new Date(ReqFDate);
        let lessonCheckDate = new Date(LessonFDate);
        // Пока дата проверки не превысит последнюю дату занятия

        while (reqCheckDate <= ReqLDate) {
          while (lessonCheckDate <= LessonLDate) {
            // Если дата проверки совпадает с датой запроса
            if (reqCheckDate.getTime() === lessonCheckDate.getTime()) {
              return true; // Найдено пересечение
            }
            // Переходим к следующей дате занятия, добавляя период
            lessonCheckDate.setDate(
              lessonCheckDate.getDate() + 7 * scheduleReq[i].period
            );
          }
          lessonCheckDate = new Date(LessonFDate);
          // Переходим к следующей дате занятия, добавляя период
          reqCheckDate.setDate(reqCheckDate.getDate() + 7 * reqPer);
        }
      }
    }
    return false;
  };

  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  let currentDate = new Date(startDate.startDate);
  currentDate.setDate(
    startDate.startDate.getDate() +
    7 * (week.numberOfWeek - 1) -
    startDate.startDate.getDay() +
    daysOfWeek.indexOf(selectedCell?.day ?? day.dayOfWeek) +
    1
  );
  // Обработчик нажатия кнопки "Добавить"
  const handleRequest = async () => {
    if (
        !isDateValid(lastDate) || // Используем isDateValid
        period === 0 ? false :
        checkCollisions(
        selectedCell?.aud || aud.numberOfAud,
        Number(selectedCell?.lesson[0]),
        currentDate.toISOString().split("T")[0],
        period,
        lastDate.toISOString().split("T")[0]
      )
    ) {
      alert("Ошибка, найдена коллизия");
      handleClose();
    } else {
      const number = Number(selectedCell?.lesson[0]);
      const submissionDate = new Date().toISOString().split("T")[0];
      const firstDate = currentDate.toISOString().split("T")[0];
      const status = "Рассматривается";
      const teacherListId = selectedTeacher;
      const disciplineListId = selectedDiscipline;
      const groupListId = selectedGroup;

      const auditoriumListId = await getAudId(
        selectedCell?.aud || aud.numberOfAud
      );

      await createReqLesson(
        number,
        submissionDate,
        firstDate,
        Number(period),
        lastDate,
        status,
        teacherListId,
        disciplineListId,
        groupListId,
        auditoriumListId
      );

      setSelectedGroup(null);
      setSelectedTeacher(null);
      setSelectedDiscipline(null);
      updateSchedule();
      handleClose();
    }
  };
  const allValuesSelected =
    selectedDiscipline &&
    selectedTeacher &&
    selectedGroup &&
    period &&
    lastDate;
  // Возвращаем разметку компонента
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ user.isAuth === 0 || getSelectedSchedule()?  'Просмотр ячейки' : 'Редактирование ячейки'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "20px" }}>
              Занятие в аудитории {selectedCell?.aud || aud.numberOfAud},{" "}
              {selectedCell?.lesson}
            </Form.Label>
            {getSelectedSchedule() ? (
              <>
                <div style={{ textAlign: "center" }}>
                  <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                    Номер недели
                  </Form.Label>
                  <Form.Control type="text" value={week.numberOfWeek} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                    День недели
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedCell?.day || day.dayOfWeek}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                    Дата
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={currentDate.toLocaleDateString()}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                    Преподаватель
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={getSelectedSchedule().teacher_list.surname_N_P}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                    Дисциплина
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={getSelectedSchedule().discipline_list.short_name}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                    Группа
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={getSelectedSchedule().group_list.name}
                  />
                </div>
              </>
            ) : (
              user.isAuth !== 0 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          Номер недели
                        </Form.Label>
                        <Form.Control type="text" value={week.numberOfWeek} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          День недели
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={selectedCell?.day || day.dayOfWeek}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          Дата
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={currentDate.toLocaleDateString()}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          Приодичность занятия
                        </Form.Label>
                        <Form.Select
                          value={period}
                          onChange={(e) => { setPeriod(e.target.value); if (e.target.value === '0') setLastDate(currentDate) }}
                        >
                          <option value="">Выберите период</option>
                          {[{ val: 0, title: 'Разовое занятие' }, { val: 1, title: '1 неделя' }, { val: 2, title: '2 недели' }, { val: 4, title: '4 недели' }].map((elem) => (
                            <option value={elem.val}>{elem.title}</option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                    <div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label
                          style={{ fontWeight: "bold", display: "block" }}
                          className="mt-1"
                        >
                          Дата последнего занятия
                        </Form.Label>
                        <DatePicker
                          selected={lastDate}
                          onChange={(date) => { setLastDate(date) }}
                          dateFormat="dd.MM.yyyy"
                          locale="ru"
                          placeholderText="Выберите дату"
                          className={`form-control custom-datepicker`}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          Преподаватель
                        </Form.Label>
                        <Form.Select
                          value={selectedTeacher}
                          onChange={(e) => {
                            setSelectedTeacher(e.target.value)
                          }}
                        >
                          <option value="" disabled selected hidden>
                            Выберите преподавателя
                          </option>
                          {teachers.map((teacher) => (
                            <option value={teacher.id}>
                              {teacher.surname_N_P}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          Дисциплина
                        </Form.Label>
                        <Form.Select
                          value={selectedDiscipline}
                          onChange={(e) => setSelectedDiscipline(e.target.value)}
                        >
                          <option value="" disabled selected hidden>
                            Выберите дисциплину
                          </option>
                          {[...new Map(schedule
                            .filter((lesson) => (lesson.teacherListId === selectedTeacher))
                            .map((lesson) => [lesson.discipline_list.short_name, lesson])
                          ).values()].map((lesson) => (
                            <option key={lesson.id} value={disciplines.find(el => (el.short_name === lesson.discipline_list.short_name)).id}>
                              {lesson.discipline_list.short_name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">
                          Группа
                        </Form.Label>
                        <Form.Select
                          value={selectedGroup}
                          onChange={(e) => setSelectedGroup(e.target.value)}
                        >
                          <option value="" disabled selected hidden>
                            Выберите группу
                          </option>
                          {groups.map((group) => (
                            <option value={group.id}>{group.name}</option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Закрыть
                    </Button>
                    <Button
                      variant="primary"
                      disabled={!allValuesSelected}
                      onClick={handleRequest}
                    >
                      Отправить заявку
                    </Button>
                  </Modal.Footer>
                </>
              )
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      {getSelectedSchedule() && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default EditCellModal;
