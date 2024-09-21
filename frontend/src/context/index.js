import { createContext, useContext, useState} from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const [sendData, setSendData] = useState(false);

    const [tgeToggle, setTgeToggle] = useState('launchpad');

    return (
        <UserContext.Provider value={{
            isModalOpen,
            setModalOpen,
            sendData,
            setSendData,
            tgeToggle,
            setTgeToggle
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;