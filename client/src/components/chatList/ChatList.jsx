import { Link, useNavigate } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const navigate = useNavigate();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      });
      const chats = await response.json();
      return chats.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)).reverse();
    },
  });

  const handleDelete = async (chatId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      const currentChatId = window.location.pathname.split("/").pop();
      if (currentChatId === chatId) {
        navigate("/dashboard");
      }

      refetch();
    } catch (error) {
      console.error(error);
      alert("Error deleting chat!");
    }
  };

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">
        <div className="link-container">Create a new Chat</div>
      </Link>
      <Link to="/">
        <div className="link-container">Explore</div>
      </Link>
      <Link to="/">
        <div className="link-container">Contact</div>
      </Link>
      {/* Tambahkan link ke tab baru untuk upload file */}
      <Link to="/upload">
        <div className="link-container">Upload File</div>
      </Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          "Something went wrong!"
        ) : (
          data?.map((chat) => (
            <div key={chat._id}>
              <Link to={`/dashboard/chats/${chat._id}`}>
                <div className="link-container">
                  <div className="chat-title">{chat.title}</div>
                  <div className="fadeblock">
                    <button onClick={() => handleDelete(chat._id)} className="delete-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 35 35"
                        width="24"
                        height="24"
                      >
                        <path d="M28.814,30.064a1.247,1.247,0,0,1-.884-.367L5.3,7.07A1.249,1.249,0,0,1,7.07,5.3L29.7,27.93a1.251,1.251,0,0,1-.884,2.134Z" />
                        <path d="M6.186,30.064A1.251,1.251,0,0,1,5.3,27.93L27.93,5.3A1.25,1.25,0,0,1,29.7,7.07L7.07,29.7A1.247,1.247,0,0,1,6.186,30.064Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
