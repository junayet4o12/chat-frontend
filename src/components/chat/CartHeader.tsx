import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Friend } from "@/src/types";

const ChatHeader: React.FC<{
    friend: Friend;
}> = ({ friend }) => {
    return (
        <div className="bg-card border-b border-border p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="relative">
                    <Avatar className="w-10 h-10 shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-medium">
                            {friend.firstName}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                </div>
                <div>
                    <h2 className="font-semibold text-foreground">{friend.firstName} {friend.lastName}</h2>
                    <p className="text-sm text-muted-foreground">
                        Online
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default ChatHeader