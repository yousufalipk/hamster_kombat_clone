import { createContext, useContext} from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    return (
        <UserContext.Provider value={{

        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;