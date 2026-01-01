import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails }) => {

  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector(state => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id)

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  const isSelected = userDetails?._id === selectedUser?._id;

  return (
    <div
      onClick={handleUserClick}
      className={`flex gap-4 items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 group ${
        isSelected
          ? "bg-slate-800 text-white shadow-md shadow-slate-800/20 transform scale-[1.02]"
          : "hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent hover:border-slate-200/50"
      }`}
    >
      <div className={`avatar ${isUserOnline && 'online'}`}>
        <div className={`w-12 rounded-full border-2 transition-all ${
            isSelected 
            ? "border-slate-600" 
            : "border-slate-100 group-hover:border-slate-200"
        }`}>
          <img src={userDetails?.avatar} alt="user_avatar" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h2 className={`font-bold text-sm truncate ${
            isSelected ? "text-white" : "text-slate-800"
        }`}>
            {userDetails?.fullName}
        </h2>
        <p className={`text-xs truncate font-medium ${
            isSelected ? "text-slate-400" : "text-slate-500"
        }`}>
            @{userDetails?.username}
        </p>
      </div>
    </div>
  );
};

export default User;