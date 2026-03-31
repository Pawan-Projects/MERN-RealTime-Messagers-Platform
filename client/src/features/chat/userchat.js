import { useState, useEffect, useCallback } from "react";
import { createChat, getUserChats, sendMessage,getMessages } from "./chat.api";
import { getSocket } from "../../lib/scoket";

export const useChat = () => {
  const [chats, setChats]           = useState([]);
  const [activeChat, setActiveChat] = useState(null); // { chatId, receiverId, receiverName }
  const [messages, setMessages]     = useState([]);
  const [loading, setLoading]       = useState(false);

  // load sidebar chats on mount
  useEffect(() => {
    getUserChats()
      .then((res) => setChats(res.data.chats))
      .catch(console.error);
  }, []);

  // realtime incoming messages
// ❌ Current - activeChat dependency missing
useEffect(() => {
  const socket = getSocket();
  if (!socket) return;

  const handler = (msg) => {
    setMessages((prev) => {
      const duplicate = prev.some((m) => m._id?.toString() === msg._id?.toString());
      return duplicate ? prev : [...prev, msg];
    });
  };

  socket.on("receiveMessage", handler);
  return () => socket.off("receiveMessage", handler);
}, [activeChat]); // ← empty array = problem

  // open (or create) a chat window with a user
const openChat = useCallback(async (userId, userName) => {
  setLoading(true);
  try {
    const res = await createChat(userId);
    setActiveChat({
      chatId:       res.data.chat._id,
      receiverId:   userId,
      receiverName: userName,
    });

    // ✅ history load karo
    const msgRes = await getMessages(userId);
    setMessages(msgRes.data.messages || []);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, []);



  // send a message
 const send = useCallback(async (text) => {
  if (!activeChat || !text.trim()) return;
  try {
    const res = await sendMessage(activeChat.receiverId, text);
    // ✅ API response se mat add karo — socket emit karega
    // setMessages ke line hata do yahan se
  } catch (err) {
    console.error("send error:", err);
  }
}, [activeChat]);

  return { chats, activeChat, messages, loading, openChat, send };
};