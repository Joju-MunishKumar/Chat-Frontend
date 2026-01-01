import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const isSender = userProfile?._id === messageDetails?.senderId;

  return (
    <div
      ref={messageRef}
      className={`flex w-full mb-4 ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[80%] md:max-w-[70%] items-end gap-2 ${
          isSender ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-sm">
            <img
              alt="User Avatar"
              className="w-full h-full object-cover"
              src={
                isSender
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>

        <div
          className={`relative px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
            isSender
              ? "bg-indigo-600 text-white rounded-2xl rounded-br-none"
              : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-none"
          }`}
        >
          <p>{messageDetails?.message}</p>
          <div
            className={`text-[10px] mt-1 w-full text-right ${
              isSender ? "text-indigo-100/80" : "text-slate-400"
            }`}
          >
            12:45
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;