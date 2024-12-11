import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import { ChatBubbleLeftIcon, UserGroupIcon, BellIcon } from '@heroicons/react/24/outline';

const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
});

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
};

type User = {
  id: string;
  username: string;
  status: 'online' | 'offline';
  lastSeen: string;
};

export default function SocialDashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(messageSchema),
  });

  // WebSocket connection
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
    
    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('user-status', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch initial messages
  const { data: initialMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social/messages`);
      return res.json();
    },
  });

  // Fetch users
  const { data: initialUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social/users`);
      return res.json();
    },
  });

  // Send message
  const sendMessage = useMutation({
    mutationFn: async (data: { content: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });

  const onSubmit = (data: { content: string }) => {
    sendMessage.mutate(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Social Hub</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <UserGroupIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'chat'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'users'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                Users
              </button>
            </nav>
          </div>

          {/* Chat Interface */}
          {activeTab === 'chat' && (
            <div className="bg-white rounded-lg shadow">
              <div className="h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {message.sender[0].toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {message.sender}
                          </span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(message.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
                    <input
                      type="text"
                      {...register('content')}
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Type your message..."
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Users List */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Online Users</h2>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {user.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.username}</p>
                          <p className="text-sm text-gray-500">
                            {user.status === 'online' ? 'Online' : `Last seen ${format(new Date(user.lastSeen), 'HH:mm')}`}
                          </p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 