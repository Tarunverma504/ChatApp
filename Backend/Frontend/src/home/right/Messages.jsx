import React, { useEffect, useRef } from "react";
import useGetMessages from "../../context/useGetMessage.js";
import Message from "./Message";
import Loading from "../../assets/components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";
export default function Messages() {
  const { messages, loading } = useGetMessages();
  useGetSocketMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (!loading && messages.length === 0) {
      console.log("Say! Hi");
    }
  }, [messages, loading]);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      <div
        className="flex-1 overflow-y-auto px-4 pt-4"
        style={{ height : "calc(88vh - 10vh)" }} // or whatever suits your layout
      >
        {loading ? (
          <Loading />
        ) : messages.length > 0 ? (
          messages.map((message, index) => {
            const isLast = index === messages.length - 1;
            return (
              <div key={message._id} ref={isLast ? lastMessageRef : null}>
                <Message message={message} />
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-center font-sans text-lg">Say! Hi</p>
          </div>
        )}
      </div>
    </>
  );
}
