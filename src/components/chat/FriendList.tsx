import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import FriendListItem from "./FriendListItem";
import { Friend } from "@/src/types";

const FriendsList: React.FC<{
    friends: Friend[];
    selectedFriend: Friend;
}> = ({ friends, selectedFriend }) => {
    
    return (
        <div className="flex flex-col h-full bg-card">
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">Messages</h1>
                    <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20 text-primary-foreground">
                        <MoreVertical className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto">
                {friends.map((friend, index) => (
                    <FriendListItem
                        key={friend.id}
                        friend={friend}
                        isSelected={selectedFriend.id === friend.id}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};


export default FriendsList