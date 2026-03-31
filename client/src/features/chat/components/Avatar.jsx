const COLORS = [
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
];

export const avatarColor = (id = "") =>
  COLORS[id.charCodeAt(id.length - 1) % COLORS.length];

export const initials = (name = "") => name.slice(0, 2).toUpperCase();

export default function Avatar({ name, id, size = "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br ${avatarColor(id)} flex items-center justify-center font-bold text-white shrink-0 shadow-md`}
    >
      {initials(name)}
    </div>
  );
}