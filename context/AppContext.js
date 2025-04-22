"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
export const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
};
export const AppContextProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [Chats, setChats] = useState([]);
  const [Selectedchat, setSelectedchat] = useState(null);
  const { user } = useUser();
  async function CreateNewChat() {
    try {
      if (!user) return null;
      const token = await getToken();
      await axios.post(
        "/api/chat/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      FetchUserChats();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function FetchUserChats() {
    try {
      if (!user) return null;
      const token = await getToken();
      const { data } = await axios.get(
        "/api/chat/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.data.length === 0) {
        await CreateNewChat();
        return FetchUserChats();
      } else {
        data.data.sort((a, b) => {
          new Date(b.updatedAt) - new Date(a.updatedAt);
        });
      }
      setSelectedchat(data.data[0]);
      console.log(Selectedchat);

      if (data.success) {
        setChats(data.data);
      }
    } catch (error) {
      toast.error("error in fetching chats",error.message);
    }
  }
 useEffect(() => {
  if (user) {
   FetchUserChats()
   console.log("runned");
   console.log(Chats);
  }
 }, [user])
 
  const value = {
    user,
    Chats,
    setChats,
    Selectedchat,
    setSelectedchat,
    CreateNewChat,
    FetchUserChats,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
