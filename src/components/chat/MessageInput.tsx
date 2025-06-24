import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useSearchParams } from "next/navigation";
import { useSendMessageMutation } from "@/src/redux/api/messageApi";

const MessageInput = () => {
    const [writtenMessage, setWrittenMessage] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const searchParams = useSearchParams();
    const friendId = searchParams.get('friendId');
    const [sendMessage, { isLoading }] = useSendMessageMutation();
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [writtenMessage]);

    const handleSend = async () => {
        if (!writtenMessage.trim()) return;
        
        const data = {
            receiverId: friendId,
            content: writtenMessage
        }
        try {
            await sendMessage(data).unwrap()
            setWrittenMessage('')
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
        // If Shift+Enter is pressed, allow default behavior (new line)
    };

    return (
        <div className="bg-card border-t border-border p-4 shadow-lg">
            <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                    <Textarea
                        ref={textareaRef}
                        value={writtenMessage}
                        onChange={(e) => setWrittenMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="resize-none max-h-32 min-h-[40px] transition-all"
                        rows={1}
                    />
                </div>
                <Button
                    onClick={handleSend}
                    disabled={!writtenMessage.trim() || isLoading}
                    size="icon"
                    className="transition-all transform hover:scale-110 shadow-md"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default MessageInput