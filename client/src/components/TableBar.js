import React, { useContext} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from "..";
import { observer } from "mobx-react-lite";
// Компонент выбора таблицы
const TableBar = observer(() => {
    //получаем данные из контекста
    const {table} = useContext(Context);
    // Обработчик нажатия на элемент списка
    const handleItemClick = (tableName) => {
        table.setActiveTable(tableName);
    };

    // Возвращаем разметку списка
    return (
        <ListGroup className='mt-3' as="ul">
            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Заявки'} 
                onClick={() => handleItemClick('Заявки')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Заявки' ? '#4682B4' : 'transparent' }}
            >
                Заявки
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Расписание занятий'} 
                onClick={() => handleItemClick('Расписание занятий')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Расписание занятий' ? '#4682B4' : 'transparent' }}
            >
                Расписание занятий
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник учетных записей'} 
                onClick={() => handleItemClick('Справочник учетных записей')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник учетных записей' ? '#4682B4' : 'transparent' }}
            >
                Справочник учетных записей
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник преподавателей'} 
                onClick={() => handleItemClick('Справочник преподавателей')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник преподавателей' ? '#4682B4' : 'transparent' }}
            >
                Справочник преподавателей
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник групп'} 
                onClick={() => handleItemClick('Справочник групп')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник групп' ? '#4682B4' : 'transparent' }}
            >
                Справочник групп
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник дисциплин'} 
                onClick={() => handleItemClick('Справочник дисциплин')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник дисциплин' ? '#4682B4' : 'transparent' }}
            >
                Справочник дисциплин
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник аудиторий'} 
                onClick={() => handleItemClick('Справочник аудиторий')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник аудиторий' ? '#4682B4' : 'transparent' }}
            >
                Справочник аудиторий
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник типов аудиторий'} 
                onClick={() => handleItemClick('Справочник типов аудиторий')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник типов аудиторий' ? '#4682B4' : 'transparent' }}
            >
                Справочник типов аудиторий
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник должностей'} 
                onClick={() => handleItemClick('Справочник должностей')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник должностей' ? '#4682B4' : 'transparent' }}
                >
                Справочник должностей
            </ListGroup.Item>

            <ListGroup.Item 
                as="li" 
                active={table.activeTable === 'Справочник кафедр'} 
                onClick={() => handleItemClick('Справочник кафедр')} 
                style={{ cursor: 'pointer', padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: table.activeTable === 'Справочник кафедр' ? '#4682B4' : 'transparent' }}
            >
                Справочник кафедр
            </ListGroup.Item>

        </ListGroup>
    );
})
export default TableBar;
