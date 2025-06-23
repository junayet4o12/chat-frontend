import { Friend } from "@/src/types";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
const getProfileColor = (letter: string): string => {
    const colors: Record<string, string> = {
        A: 'bg-red-500',
        B: 'bg-orange-500',
        C: 'bg-amber-500',
        D: 'bg-yellow-500',
        E: 'bg-lime-500',
        F: 'bg-green-500',
        G: 'bg-emerald-500',
        H: 'bg-teal-500',
        I: 'bg-cyan-500',
        J: 'bg-sky-500',
        K: 'bg-blue-500',
        L: 'bg-indigo-500',
        M: 'bg-violet-500',
        N: 'bg-purple-500',
        O: 'bg-fuchsia-500',
        P: 'bg-pink-500',
        Q: 'bg-rose-500',
        R: 'bg-red-400',
        S: 'bg-orange-400',
        T: 'bg-amber-400',
        U: 'bg-yellow-400',
        V: 'bg-lime-400',
        W: 'bg-green-400',
        X: 'bg-emerald-400',
        Y: 'bg-teal-400',
        Z: 'bg-cyan-400',
    };

    const upper = letter.toUpperCase();
    return colors[upper] || 'bg-gray-400';
};

const FriendListItem: React.FC<{
    friend: Friend;
    isSelected: boolean;
    index: number;
}> = ({ friend, isSelected, index }) => {
    const imageText = friend.firstName.split('')[0]
    const router = useRouter();

    const handleClick = () => {
        router.push(`?friendId=${friend.id}`);
    };
    return (
        <div
            onClick={handleClick}
            className={`
        p-4 hover:bg-accent cursor-pointer border-b border-border transition-all duration-200
        ${isSelected ? 'bg-primary/10 border-l-4 border-l-primary shadow-inner' : ''}
      `}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <div className={`w-12 h-12 shadow-md rounded-full flex justify-center items-center ${getProfileColor(imageText)}`}>
                        {imageText}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground truncate">{friend.firstName} {friend.lastName}</h3>
                        <span className="text-xs text-muted-foreground">....</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm text-muted-foreground truncate">.,..</p>
                        </div>
                        <Badge variant="destructive" className="animate-pulse min-w-[20px] text-center">
                            ....
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendListItem
