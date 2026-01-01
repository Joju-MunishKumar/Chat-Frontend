import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { otherUsers, userProfile } = useSelector(
    (state) => state.userReducer
  );

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers?.filter((user) => {
          return (
            user.username
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            user.fullName
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() => {
    dispatch(getOtherUsersThunk());
  }, [dispatch]);

  return (
    <aside className="w-80 h-screen bg-white border-r border-slate-200 flex flex-col shadow-xl shadow-slate-200/50 relative z-20">
      <div className="h-20 px-6 flex items-center border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform -rotate-6">
            <span className="text-white text-lg font-bold">S</span>
          </div>
          <span className="text-slate-800">Spider</span>
        </h1>
      </div>

      <div className="p-5 pb-2">
        <div className="relative group">
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-indigo-600 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search people..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="px-2 pb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Messages
          </p>
        </div>
        {users?.length > 0 ? (
          users.map((userDetails) => (
            <User key={userDetails?._id} userDetails={userDetails} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-12 text-center opacity-60">
            <div className="bg-slate-100 p-4 rounded-full mb-3">
              <IoSearch className="text-2xl text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">
              No users found
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50/50 border-t border-slate-200">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-indigo-100 transition-all">
                <img
                  src={userProfile?.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-800 leading-tight">
                {userProfile?.username || "User"}
              </p>
              <p className="text-xs text-slate-500 font-medium">Active now</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;