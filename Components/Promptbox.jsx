"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
const Promptbox = ({ isLoading, setIsLoading }) => {
  const [prompt, setPrompt] = useState("");
  const { Chats, user, setChats, Selectedchat, setSelectedchat } =
    useAppContext();
  const sendPrompt = async (e) => {
    const Promptcopy = prompt;
    e.preventDefault();
    try {
        setPrompt("");
      if (!user) return toast.error("Please Sign In");
      if (isLoading)
        return toast.error("Wait for the Previous Response to Compelete");
      setIsLoading(true);
      const userPrompt = {
        role: "user",
        content: Promptcopy,
        timestamp: Date.now(),
      };
      setChats((prevchats) => {
        return prevchats.map((item) => {
          return item._id === Selectedchat._id
            ? {
                ...item,
                messages: [...item.messages, userPrompt]
              }
            : item;
        });
      });
      setSelectedchat((prev) => ({
        ...prev,
        messages: [...prev.messages, userPrompt],
      }));
      const { data } = await axios.post("/api/chat/ai", {
        chatId: Selectedchat._id,
        prompt:Promptcopy,
      });
      console.log(data);
      
      if (!data.success) {
        toast.error("message not recieved");
        console.log("message not recieved");
        setPrompt(Promptcopy);
        return;
      }

      if (data.success) {
        setChats((prevchat) => {
         return prevchat.map((item) =>{ 
            return item._id === Selectedchat._id
              ? { ...item, messages: [...item.messages, data.data] }
              : item
        });
        });
        const message = data.data.content;
        const messageTokens = message.split(" ");
        const assistantMessage = {
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };
        setSelectedchat((prevcha) => {
          return {
            ...prevcha,
            messages: [...prevcha.messages, assistantMessage],
          };
        });
        for (let i = 0; i < messageTokens.length; i++) {
          setTimeout(() => {
            assistantMessage.content = messageTokens.slice(0, i + 1).join(" ");
            setSelectedchat((prev) => {
              const updatedMessages = [
                ...prev.messages.slice(0, -1),
                assistantMessage,
              ];
              return { ...prev, message: updatedMessages };
            });
          }, i * 100);
        }
      } else {
        toast.error(data.message);
        setPrompt(Promptcopy);
      }
    } catch (error) {
      toast.error(error.message);
      setPrompt(Promptcopy);
    } finally {
      setIsLoading(false);
    }
  };
  function HandleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(e);
    }
  }
  return (
    <form
      onSubmit={sendPrompt}
      className={`w-full ${
        false ? "max-w-3xl" : "max-w-3xl"
      } bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        onKeyDown={HandleKeyDown}
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message Deepseek"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        required
      />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p
            className="flex items-center gap-2 text-xs border border-gray-400/30 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20
           transition"
          >
            <Image className="h-5" src={assets.deepthink_icon} alt="" />
            Deepthink (R1)
          </p>
          <p
            className="flex items-center gap-2 text-xs border border-gray-400/30 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20
           transition"
          >
            <Image className="h-5" src={assets.search_icon} alt="" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image className="w-4 cursor-pointer" src={assets.pin_icon} alt="" />
          <button
            className={`${
              prompt ? "bg-blue-400" : "bg-[#71717a]"
            } rounded-full p-2 cursor-pointer`}
          >
            <Image
              className="w-3.5 aspect-square cursor-pointer"
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Promptbox;
