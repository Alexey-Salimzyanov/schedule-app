import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getCurrentUser  } from "../http/userAPI"; 
import ChangePassword from "../components/Modals/ChangePassword";
import '../styles/MyAccount.css'; 

const MyAccount = () => {
    const [user, setUser ] = useState(null);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const fetchData = async () => {
        const currentUserData = await getCurrentUser ();
        setUser (currentUserData);
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
                <h2 className="table-title">Добро пожаловать в личный кабинет!</h2>
                <br />
                {user ? (
                    <Table striped bordered hover className="user-table">
                        <thead>
                            <tr>
                                <th>Ваш логин</th>
                                <th>Ваши инициалы</th> 
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
        </>
    );
};

export default MyAccount;