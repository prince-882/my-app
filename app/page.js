"use client";
import { assets } from "@/assets/assets";
import Message from "@/Components/Message";
import Promptbox from "@/Components/Promptbox";
import Sidebar from "@/Components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
[];
export default function Home() {
  const { Chats, user, setChats, Selectedchat, setSelectedchat } =
    useAppContext();
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ContainerRef = useRef(null);
  console.log(Selectedchat, "selchatinpage");
  useEffect(() => {
    if (Selectedchat) {
      setMessages(Selectedchat.messages);
    }
  }, [Selectedchat]);
  useEffect(() => {
    if (ContainerRef.current) {
      ContainerRef.current.scrollTo({
        top: ContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  console.log(messages, "messages");

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a2d]">
          <div className="md:hidden absolute top-6 px-4 items-center justify-between w-full flex">
            <Image
              className="rotate-180"
              onClick={() => (messages ? setExpand(false) : setExpand(true))}
              src={assets.menu_icon}
              alt="menu-icon"
            />
            <Image
              className="opacity-70"
              src={assets.chat_icon}
              alt="chat-icon"
            />
          </div>
          {messages.length === 0 ? (
            <>
              <div className="flex  text-white items-center gap-3">
                <Image src={assets.logo_icon} alt="logo" className="h-16" />
                <p className="text-2xl font-medium">Hi, I am  Deepseek ,</p>
              </div>
              <p className="text-white">How can i Help You Today?</p>
            </>
          ) : (
            <div ref={ContainerRef} className="overflow-y-auto relative flex flex-col items-center justify-start w-full mt-20 max-h-screen">
              <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{Selectedchat.name}</p>
              {messages.map((item, index) => {
                return <Message role={item.role} content={item.content} key={index}/>;
              })}
            </div>
          )}
          <Promptbox isLoading={isLoading} setIsLoading={setIsLoading} />
          <p className="text-xs absolute bottom-1 text-gray-500">
            Ai Generated - For reference only.
          </p>
        </div>
      </div>
    </div>
  );
}
