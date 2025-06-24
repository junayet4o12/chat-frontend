'use client'

import React, { useEffect, useState, } from 'react';
import FriendsList from './FriendList';
import ChatScreen from './ChatScreen';
import { useGetFriendsQuery } from '@/src/redux/api/userApi';
import { Friend } from '@/src/types';
import { useSearchParams } from 'next/navigation';
import { connectSocket, registerSocket } from '@/src/lib/socket';
import { useAppSelector } from '@/src/redux/store';
import { useCurrentUser } from '@/src/redux/authSlice';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  isMe: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}
const initialMessages: { [key: number]: Message[] } = {
  1: [
    { id: 1, senderId: 1, content: 'Hey there! How was your weekend?', timestamp: new Date('2024-06-23T10:30:00').toString(), isMe: false, status: 'read' },
    { id: 2, senderId: 0, content: 'It was great! Went hiking with some friends.\nHow about yours?', timestamp: new Date('2024-06-23T10:32:00').toString(), isMe: true, status: 'read' },
    { id: 3, senderId: 1, content: 'That sounds amazing! I just stayed home and binged some Netflix series 😅', timestamp: new Date('2024-06-23T10:35:00').toString(), isMe: false, status: 'read' },
    { id: 4, senderId: 0, content: 'Nothing wrong with that!\nSometimes we all need a good rest day', timestamp: new Date('2024-06-23T10:36:00').toString(), isMe: true, status: 'read' },
  ],
  2: [
    { id: 6, senderId: 2, content: 'Morning! Ready for the meeting?', timestamp: new Date('2024-06-23T09:00:00').toString(), isMe: false, status: 'read' },
    { id: 7, senderId: 0, content: 'Yes, all set! See you there', timestamp: new Date('2024-06-23T09:05:00').toString(), isMe: true, status: 'delivered' },
  ]
};

// Message Status Component

// Friend List Item Component

// Friends List Component

// Message Bubble Component

// Chat Header Component

// Message Input Component


// Chat Screen Component

// Main Mobile Chat Interface Component
export default function MobileChatInterface() {
  const [friends, setFriends] = useState<Friend[]>([]);

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const { data, isLoading, error } = useGetFriendsQuery(undefined);
  const searchParams = useSearchParams();
  const friendId = searchParams.get('friendId');
  const userId = useAppSelector(useCurrentUser)?.id

  useEffect(() => {
    connectSocket();
    if (userId) {
      registerSocket(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (data?.data) {
      setFriends(data.data)
    }
  }, [data])

  if (isLoading) {
    return ''
  }

  return (
    <div className='h-screen flex justify-center items-center '>    <div className="h-screen max-h-[700px] bg-background w-full max-w-md mx-auto border-x border-border ">
      {!friendId ? (
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend || friends[0]}
        />
      ) : <ChatScreen
        messages={initialMessages[0]}
      />}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div></div>
  );
}