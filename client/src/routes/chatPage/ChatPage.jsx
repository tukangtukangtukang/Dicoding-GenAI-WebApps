import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import React from 'react';

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          // Handle server-side error
          throw new Error('Server error');
        }
        return res.json();
      }),
  });

  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending ? (
            <div className="loading-spinner"></div>
          ) : error ? (
            "Something went wrong!"
          ) : (
            data?.history?.map((message, i) => (
              <React.Fragment key={i}>
                {message.img && message.img.trim() !== "" && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                      style={{ alignSelf: 'flex-end' }}
                    />
                  </div>
                )}
                <div
                  className={message.role === "user" ? "message user" : "message"}
                >
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </React.Fragment>
            ))
          )}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;