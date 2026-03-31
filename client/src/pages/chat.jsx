// // import { useEffect, useRef, useState } from "react";
// // import { useAuth }  from "../features/auth/useAuth";
// // import { useUsers } from "../features/users/userUsers";
// // import { useChat }  from "../features/chat/userchat";
// // import { connectSocket, disconnectSocket } from "../lib/scoket";

// // // ── tiny helpers ──────────────────────────────────────────────
// // const initials = (name = "") => name.slice(0, 2).toUpperCase();

// // const COLORS = [
// //   "from-violet-500 to-purple-600",
// //   "from-sky-500 to-blue-600",
// //   "from-emerald-500 to-teal-600",
// //   "from-rose-500 to-pink-600",
// //   "from-amber-500 to-orange-500",
// // ];
// // const avatarColor = (id = "") =>
// //   COLORS[id.charCodeAt(id.length - 1) % COLORS.length];

// // function Avatar({ name, id, size = "md" }) {
// //   const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
// //   return (
// //     <div
// //       className={`${sz} rounded-full bg-gradient-to-br ${avatarColor(id)} flex items-center justify-center font-bold text-white shrink-0 shadow-md`}
// //     >
// //       {initials(name)}
// //     </div>
// //   );
// // }

// // // ── timestamps ────────────────────────────────────────────────
// // const fmt = (iso) => {
// //   if (!iso) return "";
// //   const d = new Date(iso);
// //   return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// // };

// // // ─────────────────────────────────────────────────────────────
// // export default function ChatPage() {
// //   const { user }                                                        = useAuth();
// //   const { users, loading: usersLoading }                                = useUsers();
// //   const { activeChat, messages, loading: chatLoading, openChat, send }  = useChat();

// //   const [text, setText]       = useState("");
// //   const [search, setSearch]   = useState("");
// //   const bottomRef             = useRef(null);
// //   const inputRef              = useRef(null);

// //   /* socket */
// //   useEffect(() => {
// //     if (user?._id) connectSocket(user._id);
// //     return () => disconnectSocket();
// //   }, [user?._id]);

// //   /* auto-scroll */
// //   useEffect(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   /* focus input when chat opens */
// //   useEffect(() => {
// //     if (activeChat) inputRef.current?.focus();
// //   }, [activeChat]);

// //   const handleSend = async (e) => {
// //     e.preventDefault();
// //     if (!text.trim()) return;
// //     await send(text);
// //     setText("");
// //   };

// //   const filtered = (users || []).filter(
// //     (u) =>
// //       u._id !== user?._id &&
// //       u.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="flex h-screen w-full bg-[#0d0f14] font-sans overflow-hidden">

// //       {/* ══════════════ SIDEBAR ══════════════ */}
// //       <aside className="w-72 shrink-0 flex flex-col border-r border-white/5 bg-[#111318]">

// //         {/* brand + current user */}
// //         <div className="px-5 py-4 border-b border-white/5">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-2">
// //               <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
// //                 <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
// //                   <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
// //                 </svg>
// //               </div>
// //               <span className="text-white font-semibold text-sm tracking-wide">Pulse</span>
// //             </div>
// //             {user && <Avatar name={user.name} id={user._id} size="sm" />}
// //           </div>

// //           {/* search */}
// //           <div className="relative">
// //             <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// //               <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// //             </svg>
// //             <input
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search people…"
// //               className="w-full bg-white/5 text-white/70 text-xs rounded-lg pl-8 pr-3 py-2 outline-none placeholder-white/25 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/50 transition"
// //             />
// //           </div>
// //         </div>

// //         {/* user list */}
// //         <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-none">
// //           {usersLoading ? (
// //             <div className="flex flex-col gap-2 px-3 py-4">
// //               {[...Array(5)].map((_, i) => (
// //                 <div key={i} className="flex items-center gap-3 animate-pulse">
// //                   <div className="w-10 h-10 rounded-full bg-white/8 shrink-0" />
// //                   <div className="flex-1 space-y-1.5">
// //                     <div className="h-2.5 bg-white/8 rounded w-3/4" />
// //                     <div className="h-2 bg-white/5 rounded w-1/2" />
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : filtered.length === 0 ? (
// //             <p className="text-white/25 text-xs text-center py-8">No users found</p>
// //           ) : (
// //             filtered.map((u) => {
// //               const isActive = activeChat?.receiverId === u._id;
// //               return (
// //                 <button
// //                   key={u._id}
// //                   onClick={() => openChat(u._id, u.name)}
// //                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
// //                     isActive
// //                       ? "bg-indigo-600/20 ring-1 ring-indigo-500/30"
// //                       : "hover:bg-white/5"
// //                   }`}
// //                 >
// //                   <div className="relative">
// //                     <Avatar name={u.name} id={u._id} size="md" />
// //                     <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#111318]" />
// //                   </div>
// //                   <div className="flex-1 min-w-0">
// //                     <p className={`text-sm font-medium truncate ${isActive ? "text-indigo-300" : "text-white/80 group-hover:text-white"}`}>
// //                       {u.name}
// //                     </p>
// //                     <p className="text-xs text-white/30 truncate">{u.email}</p>
// //                   </div>
// //                   {isActive && (
// //                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
// //                   )}
// //                 </button>
// //               );
// //             })
// //           )}
// //         </div>

// //         {/* footer */}
// //         <div className="px-4 py-3 border-t border-white/5">
// //           <p className="text-white/20 text-[10px] text-center">
// //             {filtered.length} people online
// //           </p>
// //         </div>
// //       </aside>

// //       {/* ══════════════ CHAT WINDOW ══════════════ */}
// //       <main className="flex-1 flex flex-col min-w-0">
// //         {!activeChat ? (
// //           /* empty state */
// //           <div className="flex-1 flex flex-col items-center justify-center gap-4 select-none">
// //             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-white/5 flex items-center justify-center shadow-xl">
// //               <svg viewBox="0 0 24 24" className="w-9 h-9 text-indigo-400/60 fill-current">
// //                 <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
// //               </svg>
// //             </div>
// //             <div className="text-center">
// //               <p className="text-white/50 font-medium text-sm">No conversation selected</p>
// //               <p className="text-white/20 text-xs mt-1">Pick someone from the sidebar to start chatting</p>
// //             </div>
// //           </div>
// //         ) : (
// //           <>
// //             {/* ── chat header ── */}
// //             <div className="flex items-center gap-3 px-6 py-3.5 border-b border-white/5 bg-[#111318]/80 backdrop-blur-sm">
// //               <div className="relative">
// //                 <Avatar name={activeChat.receiverName} id={activeChat.receiverId} />
// //                 <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#111318]" />
// //               </div>
// //               <div>
// //                 <p className="text-white font-semibold text-sm">{activeChat.receiverName}</p>
// //                 <p className="text-emerald-400 text-xs">Online</p>
// //               </div>
// //             </div>

// //             {/* ── messages ── */}
// //             <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 scroll-smooth">
// //               {chatLoading && (
// //                 <div className="flex justify-center py-4">
// //                   <div className="flex gap-1.5">
// //                     {[0,1,2].map(i => (
// //                       <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {messages.length === 0 && !chatLoading && (
// //                 <div className="flex flex-col items-center justify-center h-full gap-2 py-16">
// //                   <p className="text-white/20 text-xs">No messages yet — say hello! 👋</p>
// //                 </div>
// //               )}

// //               {messages.map((msg, idx) => {
// //                 const isMine = msg.sender?.toString() === user?._id?.toString();
// //                 const prevMsg = messages[idx - 1];
// //                 const sameGroup = prevMsg?.sender === msg.sender;

// //                 return (
// //                   <div
// //                     key={msg._id}
// //                     className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"} ${sameGroup ? "mt-0.5" : "mt-3"}`}
// //                   >
// //                     {/* avatar — show only for last in group */}
// //                     <div className="w-7 shrink-0">
// //                       {!isMine && !sameGroup && (
// //                         <Avatar name={activeChat.receiverName} id={activeChat.receiverId} size="sm" />
// //                       )}
// //                     </div>

// //                     <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} max-w-[65%]`}>
// //                       <div
// //                         className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
// //                           isMine
// //                             ? "bg-indigo-600 text-white rounded-br-sm"
// //                             : "bg-[#1e2130] text-white/85 rounded-bl-sm"
// //                         }`}
// //                       >
// //                         {msg.text}
// //                       </div>
// //                       <span className="text-[10px] text-white/20 mt-0.5 px-1">
// //                         {fmt(msg.createdAt)}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //               <div ref={bottomRef} />
// //             </div>

// //             {/* ── input bar ── */}
// //             <div className="px-6 py-4 border-t border-white/5 bg-[#111318]/80 backdrop-blur-sm">
// //               <form onSubmit={handleSend} className="flex items-center gap-3">
// //                 <input
// //                   ref={inputRef}
// //                   value={text}
// //                   onChange={(e) => setText(e.target.value)}
// //                   onKeyDown={(e) => {
// //                     if (e.key === "Enter" && !e.shiftKey) {
// //                       e.preventDefault();
// //                       handleSend(e);
// //                     }
// //                   }}
// //                   placeholder={`Message ${activeChat.receiverName}…`}
// //                   className="flex-1 bg-white/5 text-white text-sm rounded-xl px-4 py-3 outline-none placeholder-white/20 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/40 transition"
// //                 />
// //                 <button
// //                   type="submit"
// //                   disabled={!text.trim()}
// //                   className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg shadow-indigo-900/40 active:scale-95"
// //                 >
// //                   <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white -rotate-45 translate-x-px -translate-y-px">
// //                     <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
// //                   </svg>
// //                 </button>
// //               </form>
// //               <p className="text-white/15 text-[10px] mt-2 text-center">Enter to send</p>
// //             </div>
// //           </>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }


// import { useEffect, useRef, useState } from "react";
// import { useAuth } from "../features/auth/useAuth";
// import { useUsers } from "../features/users/userUsers";
// import { useChat } from "../features/chat/userchat";
// import { connectSocket, disconnectSocket } from "../lib/scoket";

// import Sidebar from "../features/chat/components/Sidebar";
// import ChatWindow from "../features/chat/components/";

// export default function ChatPage() {
//   const { user } = useAuth();
//   const { users, loading: usersLoading } = useUsers();
//   const { activeChat, messages, loading: chatLoading, openChat, send } = useChat();

//   const [text, setText] = useState("");
//   const [search, setSearch] = useState("");

//   const bottomRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (user?._id) connectSocket(user._id);
//     return () => disconnectSocket();
//   }, [user?._id]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     if (activeChat) inputRef.current?.focus();
//   }, [activeChat]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     await send(text);
//     setText("");
//   };

//   const filtered = (users || []).filter(
//     (u) =>
//       u._id !== user?._id &&
//       u.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex h-screen w-full bg-[#0d0f14] font-sans overflow-hidden">
      
//       <Sidebar
//         user={user}
//         search={search}
//         setSearch={setSearch}
//         users={users}
//         usersLoading={usersLoading}
//         filtered={filtered}
//         activeChat={activeChat}
//         openChat={openChat}
//       />

//       <ChatWindow
//         activeChat={activeChat}
//         messages={messages}
//         chatLoading={chatLoading}
//         user={user}
//         bottomRef={bottomRef}
//         inputRef={inputRef}
//         text={text}
//         setText={setText}
//         handleSend={handleSend}
//       />
//     </div>
//   );
// }

import { useEffect } from "react";
import { useAuth }   from "../features/auth/useAuth";
import { useUsers }  from "../features/users/userUsers";
import { useChat }   from "../features/chat/userchat";
import { connectSocket, disconnectSocket } from "../lib/scoket";
import Sidebar      from "../features/chat/components/Sidebar";
import ChatWindow   from "../features/chat/components/Chatwindow";

export default function ChatPage() {
  const { user }                                               = useAuth();
  const { users, loading: usersLoading }                       = useUsers();
  const { activeChat, messages, loading, openChat, send }      = useChat();

  useEffect(() => {
    if (user?._id) connectSocket(user._id);
    return () => disconnectSocket();
  }, [user?._id]);

  return (
    <div className="flex h-screen w-full bg-[#0d0f14] font-sans overflow-hidden">
      <Sidebar
        user={user}
        users={users}
        usersLoading={usersLoading}
        activeChat={activeChat}
        onSelect={openChat}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          loading={loading}
          currentUserId={user?._id}
          onSend={send}
        />
      </main>
    </div>
  );
}