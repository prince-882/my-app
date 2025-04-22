import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import axios, { Axios } from "axios";

import { useAuth } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
const Chatlabel = ({ openMenu, chatname, id, selId,setOpenMenu, item }) => {
  const { FetchUserChats, setSelectedchat } = useAppContext();
  console.log(id);
  const { getToken } = useAuth();
  console.log(selId);

  async function HandleChatDelete() {
    const token = await getToken();
    let confirm = window.confirm("Are you sure you want to delete this chat?");
    if (confirm) {
      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        console.log("deleted");
        await FetchUserChats();
        setOpenMenu({id:0,menu:false})
      } else {
        console.log("not deleted");
      }
    }
  }
  function HandleSelectChat() {
    setSelectedchat(item);
  }
async function HandleRename() {
  let Name = prompt("Enter new name of the Chat")
  const token = await getToken();
  const { data } = await axios.post(
        "/api/chat/rename",
        { chatId: id,name:Name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        alert("renamed")
        setOpenMenu({id:0,menu:false})
        await FetchUserChats()
      }
}
  return (
    <div
      onClick={HandleSelectChat}
      className="flex justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer items-center"
    >
      <p className={`${selId && " font-bold "} group-hover:max-w-5/6 truncate`}>
        {chatname}
      </p>
      <div
      onClick={e=>{e.stopPropagation();
      setOpenMenu({id:id,menu:!openMenu.open})}}
       className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
        <Image
          src={assets.three_dots}
          className={`w-4 ${openMenu.menu && openMenu.id===id ? "" : "hidden"} group-hover:block `}
          alt=""
        />
        <div className={`bg-gray-700 absolute -right-40 opacity-0 ${openMenu.menu && openMenu.id===id? "opacity-100":""} flex flex-col  top-6 rounded-xl w-max p-2 `}>
          <div
            onClick={HandleRename}
            className={`flex font-semibold items-center  rounded-lg gap-3 hover:bg-white/10 px-3 py-2`}
          >
            <Image src={assets.pencil_icon} alt="" className="w-4" />
            <p>Rename</p>
          </div>
          <div
            onClick={HandleChatDelete}
            className={`flex  font-semibold items-center rounded-lg gap-3 hover:bg-white/10 px-3 py-2`}
          >
            <Image src={assets.delete_icon} alt="" className="w-4" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatlabel;
