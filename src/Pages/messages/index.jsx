import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getCurrentUserRole } from '../../utils/auth';
import { 
  getConversations, 
  getMessages, 
  sendMessage as sendMessageService,
  getTenantListForLandlord
} from '../../services/messageService';

const Messages = () => {
  const navigate = useNavigate();
  const userRole = getCurrentUserRole();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadConversations();
    
    // Check authentication
    if (!userRole) {
      navigate('/landlord-registration');
    }
  }, [navigate, userRole]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages();
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      // Mock userId for now
      const result = await getConversations(userRole, 'userId');
      if (result.data) {
        setConversations(result.data);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    if (!selectedConversation) return;
    
    try {
      const result = await getMessages(
        selectedConversation.id,
        selectedConversation.tenantId,
        selectedConversation.landlordId
      );
      
      if (result.data) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const result = await sendMessageService({
        tenantId: selectedConversation.tenantId,
        landlordId: selectedConversation.landlordId,
        tenantName: selectedConversation.tenantName,
        landlordName: 'Property Management Office',
        subject: 'New message',
        body: messageText,
        senderRole: userRole
      });

      if (result.data) {
        setMessages(prev => [...prev, result.data]);
        setMessageText('');
        // Refresh conversations
        loadConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={userRole}
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole={userRole}
      />

      <main className={`
        transition-all duration-300 ease-in-out pt-4 pb-8
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Messages
            </h1>
            <p className="text-muted-foreground">
              {userRole === 'landlord' 
                ? 'Communicate with your tenants' 
                : 'Message your landlord'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Conversations List */}
            <div className="lg:col-span-1 bg-card border rounded-lg overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Conversations</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Icon name="Loader2" size={32} className="animate-spin text-primary" />
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No conversations yet</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`
                          w-full p-4 border-b border-border hover:bg-muted transition-smooth
                          ${selectedConversation?.id === conv.id ? 'bg-muted' : ''}
                        `}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name="User" size={20} />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="font-medium text-foreground">
                              {conv.tenantName}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.lastMessage}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTime(conv.lastMessageTime)}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Messages View */}
            <div className="lg:col-span-2 bg-card border rounded-lg overflow-hidden flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {selectedConversation.tenantName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedConversation.tenantEmail}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Phone"
                        title="Call"
                      />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderRole === userRole ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderRole === userRole
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{msg.body}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderRole === userRole ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim() || sending}
                        iconName="Send"
                        size="icon"
                      >
                        {sending ? (
                          <Icon name="Loader2" size={16} className="animate-spin" />
                        ) : (
                          <Icon name="Send" size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <Icon name="MessageSquare" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">Select a conversation</p>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;

