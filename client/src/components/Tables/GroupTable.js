import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteGroup, getGroups } from "../../http/groupAPI";
import CreateGroupModal from "../Modals/CreateGroup";
import EditGroup from "../Modals/EditGroup";

// Компонент таблицы групп
const GroupTable = () => {
    const [groups, setGroups] = useState([]);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const fetchData = async () => {
        const groupData = await getGroups();
        groupData.sort((a, b) => a.name.localeCompare(b.name));
        setGroups(groupData);
    };

    const handleShowGroupModal = () => {
        setShowGroupModal(true);
    };

    const handleShowEditModal = (group) => {
        setSelectedGroup(group);
        setShowEditModal(true);
    };

    const handleDeleteGroup = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту группу?");
        if (confirmDelete) {
            await deleteGroup(id);
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowGroupModal}
                className="mt-3"
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }}
            >
                Добавить группу
            </Button>
            <Table responsive striped bordered hover className="mt-3" style={{ position: 'relative' }}>
                <thead style={{ position: 'sticky', top: -1, backgroundColor: 'white', zIndex: 1 }}>
                    <tr>
                        <th>Название группы</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleDeleteGroup(item.id)}
                                    className="me-2"
                                >
                                    Удалить
                                </Button>
                                </td>
                                <td>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => handleShowEditModal(item)}
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateGroupModal
                show={showGroupModal}
                onHide={() => {
                    setShowGroupModal(false);
                    fetchData();
                }}
            />
            <EditGroup
                show={showEditModal}
                onHide={() => {
                    setShowEditModal(false);
                    setSelectedGroup(null);
                }}
                group={selectedGroup}
                onUpdate={fetchData}
            />
        </>
    );
};

export default GroupTable;