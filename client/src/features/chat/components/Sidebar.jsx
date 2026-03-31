import { useState } from "react";
import Avatar from "./Avatar";
import UserList from "../../users/components/Userlist";

export default function Sidebar({ user, users, usersLoading, activeChat, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = (users || []).filter(
    (u) =>
      u._id !== user?._id &&
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-72 shrink-0 flex flex-col border-r border-white/5 bg-[#111318]">

      {/* brand + current user */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">Pulse</span>
          </div>
          {user && <Avatar name={user.name} id={user._id} size="sm" />}
        </div>

        {/* search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people…"
            className="w-full bg-white/5 text-white/70 text-xs rounded-lg pl-8 pr-3 py-2 outline-none placeholder-white/25 focus:ring-1 focus:ring-indigo-500/50 transition"
          />
        </div>
      </div>

      {/* user list */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-none">
        {usersLoading ? (
          <div className="flex flex-col gap-2 px-3 py-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-white/8 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-white/8 rounded w-3/4" />
                  <div className="h-2 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-white/25 text-xs text-center py-8">No users found</p>
        ) : (
          <UserList users={filtered} activeChat={activeChat} onSelect={onSelect} />
        )}
      </div>

      {/* footer */}
      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-white/20 text-[10px] text-center">
          {filtered.length} people online
        </p>
      </div>
    </aside>
  );
}