import React from 'react';

// Импортируем изображения
import Image001 from '../images/image001.png';
import Image003 from '../images/image003.png';
import Image005 from '../images/image005.png';
import Image007 from '../images/image007.png';
import Image009 from '../images/image009.png';
import Image011 from '../images/image011.png';
import Image013 from '../images/image013.png';
import Image015 from '../images/image015.png';
import Image017 from '../images/image017.png';
import Image019 from '../images/image019.png';
import Image021 from '../images/image021.png';
import Image023 from '../images/image023.png';

const InfoPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>РУКОВОДСТВО ПОЛЬЗОВАТЕЛЯ</h1>

      <h2>1. Назначение программы</h2>
      <p>
        Программа предназначена для ввода, редактирования и хранения расписания занятости аудиторий на уровне факультета, а также для поиска и резервирования свободных аудиторий. Она предоставляет преподавателям, нуждающимся в проведении внеплановых мероприятий, возможность быстро и удобно найти свободные окна в текущем расписании и зарезервировать аудиторию на выбранное время.
      </p>

      <h2>2. Общие сведения о программе</h2>
      <p>
        Программа поддерживает две категории пользователей – администраторы и обычные пользователи. Каждая категория имеет собственный интерфейс и набор функциональных возможностей. Данный документ предназначен для обычных пользователей программы (далее «пользователь»), возможности администраторов описаны в отдельном документе «Руководство администратора».
      </p>
      <p>
        Программа реализована в виде веб-приложения и базы данных, которые устанавливаются на сервер администратором. После установки администратор должен ввести в базу данных расписание занятости аудиторий факультета, полученное из бюро расписаний университета, и только потом с программой могут работать пользователи.
      </p>
      <p>
        Пользователям для работы с программой достаточно иметь любой браузер и выход в сеть Интернет, а также получить у администратора сетевой адрес сервера.
      </p>

      <h2>3. Работа с программой неавторизованного пользователя</h2>
      <p>
        Пользователи программы могут быть неавторизованными и авторизованными. Неавторизованные пользователи могут только просматривать расписание занятости аудиторий и получать сведения по конкретным занятиям, проводимым в выбранной аудитории в указанное время. Чтобы начать работу с системой, необходимо перейти на главную страницу приложения, расположенную по адресу <a href="http://217.71.129.139:4114">http://217.71.129.139:4114</a> (Рис. 1).
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image001} alt="Главная страница приложения" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 1 – Главная страница приложения</strong></p>
      </div>
      <p>
        На главной странице по умолчанию отображается общее плановое расписание, сформированное в бюро расписаний университета на весь семестр по выбранной аудитории. Внеплановые мероприятия (консультации, коллоквиумы и т.д.), добавленные преподавателями, в этом случае не отображаются.
      </p>
      <p>
        Изменить вариант его отображения и номер аудитории можно в боковом меню (рис. 2).
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image003} alt="Боковое меню" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 2 – Боковое меню</strong></p>
      </div>
      <p>
        При выборе варианта “По аудиториям” будет выведено расписание для всех аудиторий на конкретный день каждой недели семестра с учетом внеплановых мероприятий (рис. 3). Максимальное количество недель в семестре – 18, нумерация недель сквозная.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image005} alt="Расписание по аудиториям" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 3 – Расписание по аудиториям</strong></p>
      </div>
      <p>
        При выборе варианта “По дням” будет выведено расписание для конкретной аудитории по всем дням указанной недели с учетом внеплановых мероприятий (рис. 4).
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image007} alt="Расписание по дням" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 4 – Расписание по дням</strong></p>
      </div>
      <p>
        Если у пользователя выбран вариант отображения “По аудиториям” или “По дням”, то он может просмотреть более подробную информацию о занятии с помощью щелчка по соответствующей клетке в расписании (рис. 5).
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image009} alt="Подробная информация о занятии" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 5 – Подробная информация о занятии</strong></p>
      </div>

      <h2>4. Работа с программой авторизованного пользователя</h2>
      <p>
        Авторизованные пользователи должны быть зарегистрированы в системе. Для регистрации необходимо нажать на кнопку “Авторизация”, которая находится в правом верхнем углу сайта и показана на рис. 6 красной стрелкой. В окне авторизации, представленном на рис. 7, необходимо выбрать ссылку «Зарегистрироваться» и задать личный логин и пароль.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image011} alt="Положение кнопки авторизации" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 6 – Положение кнопки авторизации</strong></p>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image013} alt="Форма авторизации" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 7 – Форма авторизации</strong></p>
      </div>
      <p>
        Временная учетная запись для ознакомления с программой: логин – user, и пароль – 12345. В случае успешной авторизации пользователь попадает на главную страницу приложения.
      </p>
      <p>
        Авторизованному пользователю становится доступна возможность подавать заявки на резервирование аудиторий. Для этого нужно выбрать вариант отображения “По аудиториям” или “По дням” и щелкнуть по пустой клетке в отображаемом расписании. Выбор пустой клетки в расписании показан на рис. 8.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image015} alt="Демонстрация наведения на пустую клетку" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 8 – Демонстрация наведения на пустую клетку</strong></p>
      </div>
      <p>
        После щелчка по выбранной клетке выводится окно заявки (рис. 9), для заполнения которой необходимо ввести следующие поля:
      </p>
      <ul>
        <li>периодичность занятия – период в неделях, через который ваша заявка будет дублироваться в расписании;</li>
        <li>дата последнего занятия – конечная дата, до которой будет дублироваться ваша заявка;</li>
        <li>преподаватель – фамилия преподавателя, который будет проводить занятие;</li>
        <li>дисциплина – наименование дисциплины, по которой будет проводиться занятие;</li>
        <li>группа – название группы, для которой будет проводиться занятие.</li>
      </ul>
      <p>
        Поля “Номер недели”, “День недели” и “Дата” заполняются автоматически.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image017} alt="Форма заявки" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 9 – Форма заявки</strong></p>
      </div>
      <p>
        После отправки заявки в расписании появится новое занятие, которое будет выделено желтым цветом. Желтый цвет заявки обозначает, что данная заявка находится на рассмотрении. Пример заявки в расписании представлен на рис. 10. Если заявка будет одобрена администратором, то ее цвет изменится на зеленый, а если она будет отклонена, то заявка исчезнет из расписания.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image019} alt="Пример заявки в расписании" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 10 – Пример заявки в расписании</strong></p>
      </div>
      <p>
        Авторизованный пользователь может отслеживать состояние своих заявок через вкладку “Мои заявки”, которая обозначена красной стрелкой на рис. 11.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image021} alt="Расположение вкладки “Мои заявки”" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 11 – Расположение вкладки “Мои заявки”</strong></p>
      </div>
      <p>
        В окне с заявками, представленном на рисунке 12, пользователь может ознакомиться с информацией по отправленным заявкам. Пользователь также может отменить заявку, нажав на кнопку “Удалить” в соответствующей строке таблицы.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={Image023} alt="Окно с заявками" style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Рис. 12 – Окно с заявками</strong></p>
      </div>
    </div>
  );
};

export default InfoPage;