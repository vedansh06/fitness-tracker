import { createContext, useContext, useState } from "react";
import {
  initialState,
  type ActivityEntry,
  type Credentials,
  type FoodEntry,
  type User,
} from "../types";
import { useNavigate } from "react-router-dom";
import mockApi from "../assets/mockApi";

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([]);
  const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([]);

  const signup = async (credentials: Credentials) => {
    const { data } = await mockApi.auth.register(credentials);
    setUser(data.user);
    if (data?.user.age && data?.user.weight && data?.user.goal) {
      setOnboardingCompleted(true);
    }
    localStorage.setItem("token", data.jwt);
  };

  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
