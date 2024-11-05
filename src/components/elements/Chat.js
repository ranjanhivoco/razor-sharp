import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const Chat = () => {
  return (
    <div style={{ position: "relative", height: "500px",fontSize:"14px" }}>
      <MainContainer style={{ background: "#F8F8F8" }}>
        <ChatContainer>
          <MessageList>
            {/* Received message*/}
            <Message
              // className="sent-message"
              model={{
                message: "Hey, Ask me anything",
                sentTime: "just now",
                sender: "Joe",
                direction: "incoming",
              }}
            />

            {/* Sent message*/}
            <Message
              model={{
                message: "xxxx?",
                sentTime: "just now",
                sender: "User",
                direction: "outgoing",
              }}
            />
          </MessageList>
          <MessageInput attachButton={false} placeholder="Type message here"/>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
