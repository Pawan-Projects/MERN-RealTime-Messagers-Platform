import { useState, useRef, useEffect } from "react";

export default function MessageInput({ onSend, receiverName }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [receiverName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSend(text);
    setText("");
  };

  return (
    <div className="px-6 py-4 border-t border-white/5 bg-[#111318]/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={`Message ${receiverName}…`}
          className="flex-1 bg-white/5 text-white text-sm rounded-xl px-4 py-3 outline-none placeholder-white/20 focus:ring-1 focus:ring-indigo-500/40 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg shadow-indigo-900/40 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white -rotate-45 translate-x-px -translate-y-px">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
      <p className="text-white/15 text-[10px] mt-2 text-center">Enter to send</p>
    </div>
  );
}