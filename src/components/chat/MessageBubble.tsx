import { Check, CheckCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Message {
    id: number;
    senderId: number;
    content: string;
    timestamp: string;
    isMe: boolean;
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

const MessageBubble: React.FC<{
    message: Message;
    index: number;
}> = ({ message, index }) => {
    const searchParams = useSearchParams();
    const friendId = searchParams.get('friendId');
    const isMe = message.receiverId === friendId;
    
    const renderMessageContent = (content: string) => {
        return content.split('\n').map((line, idx, array) => (
            <React.Fragment key={idx}>
                {line}
                {idx < array.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div
            className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className={`max-w-[85%] ${isMe ? 'order-2' : 'order-1'}`}>
                <div
                    className={`
            px-4 py-2 shadow-md transition-all duration-200 hover:shadow-lg
            ${isMe
                            ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-br-md'
                            : 'bg-card text-foreground rounded-2xl rounded-bl-md border border-border'
                        }
          `}
                >
                    <p className="text-sm whitespace-pre-wrap">{renderMessageContent(message.content)}</p>
                </div>
                <div className={`flex items-center mt-1 space-x-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <p className="text-xs text-muted-foreground">{formatMessageTime(message.createdAt)}</p>
                    {isMe && <MessageStatus status={message.status} />}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble


const MessageStatus: React.FC<{ status: Message['status'] }> = ({ status }) => {
    switch (status) {
        case 'sending':
            return <div className="w-3 h-3 border border-muted-foreground border-t-transparent rounded-full animate-spin" />;
        case 'sent':
            return <Check className="w-3 h-3 text-muted-foreground" />;
        case 'delivered':
            return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
        case 'read':
            return <CheckCheck className="w-3 h-3 text-primary" />;
        default:
            return null;
    }
};
