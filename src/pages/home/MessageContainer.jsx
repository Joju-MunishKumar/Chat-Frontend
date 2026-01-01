import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";
import { IoChatbubblesOutline } from "react-icons/io5";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className="h-screen w-full flex items-center justify-center flex-col bg-slate-50 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
          
          <div className="z-10 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-2 ring-1 ring-slate-200 shadow-xl shadow-slate-200/50">
              <IoChatbubblesOutline className="text-5xl text-indigo-500" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                Welcome to Spider
              </h2>
              <p className="text-slate-500 text-lg max-w-xs mx-auto">
                Select a chat from the sidebar to start messaging instantly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col bg-white relative">
          
          {/* Subtle Chat Background Pattern */}
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

          {/* Header */}
          <div className="z-20 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 shadow-sm">
            <User userDetails={selectedUser} />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {messages?.map((messageDetails) => {
              return (
                <Message
                  key={messageDetails?._id}
                  messageDetails={messageDetails}
                />
              );
            })}
          </div>

          {/* Input Area */}
          <div className="z-20 bg-white border-t border-slate-200 p-4">
            <SendMessage />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;