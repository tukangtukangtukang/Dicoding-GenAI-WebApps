import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // State untuk agen yang dipilih
  const [selectedAgent, setSelectedAgent] = useState(null);

  const mutation = useMutation({
    mutationFn: ({ text, agent }) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, agent }),  // Mengirim agen bersama dengan teks
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text || !selectedAgent) return;  // Pastikan agen dipilih

    mutation.mutate({ text, agent: selectedAgent });
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
  <form onSubmit={handleSubmit}>
    <div className="agent-selection">
      <select
        value={selectedAgent}
        onChange={(e) => setSelectedAgent(e.target.value)} // Handle perubahan agen
      >
        <option value="" disabled>
          Select an Agent
        </option>
        <option value="agent1">Agent 1</option>
        <option value="agent2">Agent 2</option>
        {/* Tambahkan opsi agen lain jika diperlukan */}
      </select>
    </div>
    <input type="text" name="text" placeholder="Ask me anything..." />
    <button>
      <svg
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        width="24px"
        fill="currentColor"
      >
        <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
      </svg>
    </button>
  </form>
</div>

    </div>
  );
};

export default DashboardPage;
