import { useEffect, useRef, useState } from "react";
import ChatHeader from "./CartHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageAnput";
import { useSearchParams } from "next/navigation";
import { useGetSingleUserQuery } from "@/src/redux/api/userApi";
import { useGetConversationQuery } from "@/src/redux/api/messageApi";

interface Message {
    id: number;
    senderId: number;
    content: string;
    timestamp: string;
    isMe: boolean;
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

const ChatScreen: React.FC<{
    messages: Message[];
}> = ({ messages }) => {
    const searchParams = useSearchParams();
    const friendId = searchParams.get('friendId');
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    console.log(friendId, 'fdfswd');

    const { data, isLoading } = useGetSingleUserQuery(friendId as string, {
        skip: !friendId
    });
    const { data: conversationData, isLoading: conversationIsLoading } = useGetConversationQuery({ other: friendId }, {
        skip: !friendId
    });
    const friend = data?.data
    const conversation = conversationData?.data
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    if (isLoading || conversationIsLoading) {
        return ''
    };
    console.log(data, conversation);





    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setNewMessage('');
        }
    };
    return (
        <div className="flex flex-col h-full relative">
            <ChatHeader friend={friend} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-accent/20">
                {conversation?.map((message, index) => (
                    <MessageBubble key={message.id} message={message} index={index} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput
                message={newMessage}
                onChange={setNewMessage}
                onSend={handleSendMessage}
                onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
        </div>
    );
};


export default ChatScreen