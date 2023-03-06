import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks/useAuthStore';


export const AppRouter = () => {

    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';
    const { checkAuthToken, status } = useAuthStore();
    
        useEffect(() => {
          checkAuthToken();    
        }, []);

    if (status === 'cheking') {
        return <h1> Cargando ...</h1>
    }
    

    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ?(
                    <>
                        <Route path="/auth/*" element={ <LoginPage /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>) 
                    : (
                    <>
                        <Route path="/" element={ <CalendarPage /> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                    </>)
            }

        </Routes>
    )
}
