import { useRef, useEffect } from "react";
import Avatar from "../../chat/components/Avatar";

const fmt = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function MessageList({ messages, activeChat, currentUserId, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 scroll-smooth">
      {loading && (
        <div className="flex justify-center py-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {messages.length === 0 && !loading && (
        <div className="flex items-center justify-center h-full py-16">
          <p className="text-white/20 text-xs">No messages yet — say hello! 👋</p>
        </div>
      )}

      {messages.map((msg, idx) => {
        const isMine = msg.sender?.toString() === currentUserId?.toString();
        const prevMsg = messages[idx - 1];
        const sameGroup = prevMsg?.sender?.toString() === msg.sender?.toString();

        return (
          <div
            key={msg._id}
            className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"} ${sameGroup ? "mt-0.5" : "mt-3"}`}
          >
            <div className="w-7 shrink-0">
              {!isMine && !sameGroup && (
                <Avatar name={activeChat.receiverName} id={activeChat.receiverId} size="sm" />
              )}
            </div>

            <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} max-w-[65%]`}>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                  isMine
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-[#1e2130] text-white/85 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-white/20 mt-0.5 px-1">
                {fmt(msg.createdAt)}
              </span>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}