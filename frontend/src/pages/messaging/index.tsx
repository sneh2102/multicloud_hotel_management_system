import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createMessage, getMessages, Message } from "../../api/queriesApi";
import { toast } from "react-toastify";
import { getUser, User } from "../../api/authApis";
import { useAuth } from "../../context/Auth";

/**
 * Author: Ketul Patel
 * This component renders messaging inbox for customer and agent where they can chat with each other
 * @returns
 */
export const Messaging = () => {
  const params = useParams();

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { getSession } = useAuth();

  const [userId, setUserId] = useState<number | undefined>(undefined);

  const [user, setUser] = useState<User>();

  const fetchUserDetails = async () => {
    try {
      const session = await getSession();
      const email = session.getIdToken().payload.email;

      const data = await getUser(email);
      setUserId(data.data.userId);
      setUser(data.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchMessage = useCallback(async () => {
    setMessages(
      (
        await getMessages(
          params.customerId || "",
          params.agentId || "",
          params.bookingId || ""
        )
      ).data
    );
  }, [params.agentId, params.bookingId, params.customerId]);

  useEffect(() => {
    if (params) {
      fetchMessage();
    }
  }, [fetchMessage, params]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    await fetchMessage();
    if (newMessage.trim()) {
      const newMsg: Message = {
        message: newMessage,
        agentId: (params.agentId || 0) as number,
        customerId: (params.customerId || 0) as number,
        bookingId: (params.bookingId || "") as string,
        owner: userId,
      };

      await createMessage(newMsg);
      setMessages([...messages, newMsg]);
      toast("Message send successfully", {
        type: "success",
      });
      await fetchMessage();
      setNewMessage("");
      scrollToBottom();
    }
  };

  return (
    <div>
      <h1 className='my-2'>Messaging</h1>
      <div className='flex items-center justify-center'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg z-10 shadow-md'>
          <div
            className='flex flex-col space-y-4 h-96 overflow-y-auto'
            id='messagesContainer'
          >
            {messages.map((msg) => {
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-2 ${
                    msg.owner == userId ? "self-start" : "self-end"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      msg.owner == userId
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <div>{msg.message}</div>
                    <div className='flex flex-row'>
                      <div className='text-xs text-gray-500 pr-1'>
                        {msg.owner == userId
                          ? "You"
                          : msg.customerId == userId
                          ? msg.agentId
                          : msg.customerId}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {msg?.date
                          ? new Date(msg.date).toLocaleString()
                          : new Date().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className='mt-4'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Type your message...'
            />
            <button
              onClick={handleSend}
              className='w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none'
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
