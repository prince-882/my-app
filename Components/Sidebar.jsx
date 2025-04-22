import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import Chatlabel from "./Chatlabel";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const [openMenu, setOpenMenu] = useState({id:0,menu:false})
   const { Chats, user, setChats, Selectedchat, setSelectedchat,CreateNewChat } =
    useAppContext();
  return (
    <div
      className={`bg-[#212327] flex flex-col z-50 pt-7 max-md:absolute max-md:h-screen justify-between transition-all ${
        expand ? "w-64 p-4" : "md:w-20 w-0 max-md:overflow-hidden "
      }`}
    >
      <div>
        <div
          onClick={() => {
            expand ? setExpand(false) : setExpand(true);
          }}
          className={`flex ${
            expand ? "flex-row gap-10" : "flex-col items-center gap-8"
          }`}
        >
          <Image
            alt=""
            src={expand ? assets.logo_text : assets.logo_icon}
            className={`${expand ? "w-36" : "w-10"}`}
          />
          <div className="group aspect-square relative flex transition-all duration-300 hover:bg-gray-500/20 rounded-lg h-9 w-9 justify-center items-center cursor-pointer">
            <Image className="md:hidden" alt="" src={assets.menu_icon} />
            <Image
              className="w-7 hidden md:block"
              alt=""
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
            />
            <div
              className={`absolute w-max ${
                expand ? " left-1/2 top-11 -translate-x-15  " : "left-0 -top-12"
              } opacity-0 group-hover:opacity-100 bg-black text-sm  px-3 py-2 transition-all rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? "Close Sidebar" : "Open Sidebar"}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand
                    ? "left-1/2 -top-1.5 -translate-x-1/2"
                    : "left-4 -bottom-1.5"
                }`}
              ></div>
            </div>
          </div>
        </div>
        <button onClick={CreateNewChat}
          className={`flex  mt-8 items-center justify-center cursor-pointer ${
            expand
              ? "bg-blue-500 hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg "
          }`}
        >
          <Image
            className={expand ? "w-6" : "w-7"}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
          />
          <div className="absolute w-max  top-12 -right-7 opacity-0  group-hover:opacity-100 bg-black text-sm  px-3 py-2 transition cursor-pointer rounded-lg shadow-lg pointer-events-none">
             Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-1/2 -translate-x-1/2 -top-1.5"></div>
          </div>
          {expand && <p className="text-white font-medium">New Chat</p>}
        </button>
        <div
          className={`mt-8 text-white/25 text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recents</p>
          {
Chats.map((item,index)=>{
return <Chatlabel openMenu={openMenu} setOpenMenu={setOpenMenu} chatname={item.name} key={index} id={item._id} 
selId={item._id===Selectedchat._id} item={item} setSelectedchat={setSelectedchat} Selectedchat={Selectedchat} Chats={Chats} setChats={setChats}/>
})
          }
        </div>
      </div>

      <div>
        <div
          className={`flex group relative items-center cursor-pointer ${
            expand
              ? "gap-1 text-white/80 text-sm p-2.5 border border-blue-500 rounded-lg hover:bg-white/10 "
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg justify-center"
          }   `}
        >
          <Image
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            className={expand ? "w-5" : "w-6.5"}
            alt=""
          />
          <div
            className={`absolute -left-2.5 -top-60 pb-8 ${
              !expand && "-right-40"
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className="bg-black relative w-max flex justify-center items-center flex-col text-sm p-3 group rounded-lg shadow-lg">
              <Image src={assets.qrcode} alt="" className="w-44" />
              <p className="font-semibold mt-2">Scan To Get The Deepseek App</p>
              <div className="w-3 h-3 absolute bg-black rotate-45 left-1/2 -translate-x-24 -bottom-1.5 "></div>
            </div>
          </div>
          {expand && (
            <>
              <span className="font-bold"> Get App</span>
              <Image src={assets.new_icon} alt="" />
            </>
          )}
        </div>
        <div
          onClick={openSignIn}
          className={`flex items-center gap-3 ${
            expand ? "hover:bg-white/10 rounded-lg " : "justify-center w-full"
          } text-white/60 text-sm p-2 mt-2  cursor-pointer`}
        >
          {user ? (
            <UserButton />
          ) : (
            <Image src={assets.profile_icon} className="w-7" alt="" />
          )}
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
