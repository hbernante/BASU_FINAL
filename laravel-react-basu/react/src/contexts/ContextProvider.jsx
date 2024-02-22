import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  reservations: [],
  questionTypes: [],
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {},
  getLocation: () => {},
});


export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [reservations, setReservations] = useState()
  const [questionTypes] = useState(['text', "select", "radio", "checkbox", "textarea"])
  const [toast, setToast] = useState({message: '', show: false})
  const [currentLocation, setCurrentLocation] = useState(null);

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }

  const showToast = (message) => {
    setToast({ message, show: true })
    setTimeout(() => {
      setToast({message: '', show: false})
    }, 5000)
  }

  const updateLocation = async (latitude, longitude) => {
    try {
      await axios.post('/location', { latitude, longitude });
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  };

  const getLocation = async () => {
    try {
      const response = await axios.get('/location');
      setCurrentLocation(response.data);
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        reservations,
        setReservations,
        questionTypes,
        toast,
        showToast,
        currentLocation,
        updateLocation,
        getLocation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
