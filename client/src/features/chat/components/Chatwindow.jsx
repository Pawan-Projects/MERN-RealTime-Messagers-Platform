import Avatar from "./Avatar";
import MessageList from "../../message/components/Messagelist";
import MessageInput from "../../message/components/MessageInput";

export default function ChatWindow({ activeChat, messages, loading, currentUserId, onSend }) {
  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 select-none">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-white/5 flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-indigo-400/60 fill-current">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white/50 font-medium text-sm">No conversation selected</p>
          <p className="text-white/20 text-xs mt-1">Pick someone from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* header */}
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-white/5 bg-[#111318]/80 backdrop-blur-sm">
        <div className="relative">
          <Avatar name={activeChat.receiverName} id={activeChat.receiverId} />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#111318]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{activeChat.receiverName}</p>
          <p className="text-emerald-400 text-xs">Online</p>
        </div>
      </div>

      {/* messages */}
      <MessageList
        messages={messages}
        activeChat={activeChat}
        currentUserId={currentUserId}
        loading={loading}
      />

      {/* input */}
      <MessageInput onSend={onSend} receiverName={activeChat.receiverName} />
    </>
  );
}