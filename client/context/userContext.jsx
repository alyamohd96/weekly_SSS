import axios from 'axios';
import { useInsertionEffect } from 'react';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {

    const [user, setUser] = useState(null);

    // calls the getProfile API each time it load the page
    useEffect( () => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}