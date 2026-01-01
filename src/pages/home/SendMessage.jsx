import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    dispatch(
      sendMessageThunk({
        recieverId: selectedUser?._id,
        message,
      })
    );
    setMessage("");
  };

  const handleKeyDown = (e)=>{
   if(e.key === "Enter"){
    handleSendMessage()
   } 
  }

  return (
    <div className="w-full flex items-center gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-slate-50 text-slate-700 placeholder-slate-400 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown}
        />
      </div>
      
      <button
        onClick={handleSendMessage}
        className="p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center active:scale-95 group"
      >
        <IoIosSend className="text-xl group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default SendMessage;