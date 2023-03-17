import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { onCheking, onLogin, onLogout, clearErrorMessage, onLogoutCalendar } from "../store/";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onCheking());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      console.log(error)
      dispatch(onLogout("Credenciales Incorrectas"));
      setTimeout(() => {
           dispatch(clearErrorMessage()); 
      }, 10);
    }
  };

  const startRegister= async({name, email, password})=>{
      try {
        const { data } = await calendarApi.post("/auth/new",{ name, email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin({name:data.name, uid:data.uid}));
            
      } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '---'));
            setTimeout(() => {
              dispatch(clearErrorMessage()); 
         }, 10);

      }
  };

  const checkAuthToken = async()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogout());
    }
    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({name:data.name, uid:data.uid}));

    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout=()=>{
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    status, 
    user,
    errorMessage,

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};

// 22.033.379-5