import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getCurrentUser  } from "../http/userAPI"; 
import ChangePassword from "../components/Modals/ChangePassword";
import RequestTable from "../components/Tables/RequestTable"; 
import '../styles/MyAccount.css'; 

const MyAccount = () => {
    const [user, setUser ] = useState(null);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const fetchData = async () => {
        const currentUserData = await getCurrentUser();
        setUser(currentUserData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowChangePasswordModal = () => {
        setShowChangePasswordModal(true);
    };

    return (
        <>
            <div className="table-container">
                
                <br />
                {user ? (
                    <Table striped bordered hover className="user-table">
                        <thead>
                            <tr>
                                <th>Логин</th>
                                <th>ФИО</th> 
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.login}</td>
                                <td>{user.teacher ? user.teacher.surname_N_P : "Не назначен"}</td> 
                                <td>
                                    <Button 
                                        variant="outline-dark" 
                                        onClick={handleShowChangePasswordModal}
                                        className="change-password-button"
                                    >
                                        Изменить пароль
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    <p>Загрузка, пожалуйста, подождите...</p>
                )}
            </div>
            <ChangePassword 
                show={showChangePasswordModal}
                onHide={() => { setShowChangePasswordModal(false); }}
                user={user}
                fetchData={fetchData}
            />
            <div className="table-container mt-3">
                <h3 className="table-title-small">Заявки:</h3> 
                {user && <RequestTable extraActions={false} currentUser={user} />}
            </div>
        </>
    );
};

export default MyAccount;

