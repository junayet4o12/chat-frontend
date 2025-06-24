import { useEffect, useRef, useState } from "react";
import ChatHeader from "./CartHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useSearchParams } from "next/navigation";
import { useGetSingleUserQuery } from "@/src/redux/api/userApi";
import { useGetConversationQuery } from "@/src/redux/api/messageApi";
import { socket } from "@/src/lib/socket";

interface Message {
    id: number;
    senderId: number;
    content: string;
    timestamp: string;
    isMe: boolean;
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

const ChatScreen= () => {
    const [localMessages, setLocalMessages] = useState<Message[]>([]);
    const searchParams = useSearchParams();
    const friendId = searchParams.get('friendId');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { data, isLoading } = useGetSingleUserQuery(friendId as string, {
        skip: !friendId
    });
    const { data: conversationData, isLoading: conversationIsLoading } = useGetConversationQuery({ other: friendId }, {
        skip: !friendId
    });
    const friend = data?.data
    const conversation = conversationData?.data

    useEffect(() => {
        const handleMessage = (message: Message) => {
            console.log("Received message: ", message);
            setLocalMessages(prev => [...prev, message]);
        };

        socket.on('message', handleMessage);

        return () => {
            socket.off('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        if (conversation) {
            setLocalMessages(conversation);
        }
    }, [conversation]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    };
    useEffect(() => {
        scrollToBottom();
    }, [localMessages]);
    if (isLoading || conversationIsLoading) {
        return ''
    };
    return (
        <div className="flex flex-col h-full relative ">
            <ChatHeader friend={friend} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-accent/20">
                {localMessages?.map((message, index) => (
                    <MessageBubble key={message.id} message={message} index={index} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};


export default ChatScreen