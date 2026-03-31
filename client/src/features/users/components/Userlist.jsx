import Avatar from "../../chat/components/Avatar";

export default function UserList({ users, activeChat, onSelect }) {
  return (
    <>
      {users.map((u) => {
        const isActive = activeChat?.receiverId === u._id;
        return (
          <button
            key={u._id}
            onClick={() => onSelect(u._id, u.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
              isActive
                ? "bg-indigo-600/20 ring-1 ring-indigo-500/30"
                : "hover:bg-white/5"
            }`}
          >
            <div className="relative">
              <Avatar name={u.name} id={u._id} size="md" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#111318]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isActive ? "text-indigo-300" : "text-white/80 group-hover:text-white"}`}>
                {u.name}
              </p>
              <p className="text-xs text-white/30 truncate">{u.email}</p>
            </div>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
            )}
          </button>
        );
      })}
    </>
  );
}