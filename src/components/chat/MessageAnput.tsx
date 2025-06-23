import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Send, Smile } from "lucide-react";
import { Textarea } from "../ui/textarea";

const MessageInput: React.FC<{
    message: string;
    onChange: (message: string) => void;
    onSend: () => void;
    onEmojiClick: () => void;
}> = ({ message, onChange, onSend, onEmojiClick }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [message]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="bg-card border-t border-border p-4 shadow-lg">
            <div className="flex items-end space-x-2">
                <Button variant="ghost" size="icon" onClick={onEmojiClick}>
                    <Smile className="w-5 h-5" />
                </Button>
                <div className="flex-1 relative">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="resize-none max-h-32 min-h-[40px] transition-all"
                        rows={1}
                    />
                </div>
                <Button
                    onClick={onSend}
                    disabled={!message.trim()}
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