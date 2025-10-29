import { supabase } from '../config/supabase';

/**
 * Message service for tenant-landlord communication
 */

// Mock data structure (ready for Supabase integration)
const mockMessages = [
  {
    id: '1',
    tenantId: 'tenant1',
    landlordId: 'landlord1',
    tenantName: 'Sarah Johnson',
    landlordName: 'Property Management Office',
    subject: 'Leaky faucet in kitchen',
    body: 'Hello, I noticed there is a leak in the kitchen faucet. Could someone come and fix it?',
    type: 'maintenance',
    status: 'unread', // 'read' or 'unread'
    senderRole: 'tenant',
    timestamp: '2024-10-28T10:30:00Z',
    attachments: []
  },
  {
    id: '2',
    tenantId: 'tenant1',
    landlordId: 'landlord1',
    tenantName: 'Sarah Johnson',
    landlordName: 'Property Management Office',
    subject: 'Re: Leaky faucet in kitchen',
    body: 'Hi Sarah, thanks for reporting. Our maintenance team will be there tomorrow morning between 9-10am.',
    type: 'maintenance',
    status: 'read',
    senderRole: 'landlord',
    timestamp: '2024-10-28T14:45:00Z',
    attachments: []
  },
  {
    id: '3',
    tenantId: 'tenant2',
    landlordId: 'landlord1',
    tenantName: 'Michael Tjiseua',
    landlordName: 'Property Management Office',
    subject: 'Rent payment confirmation',
    body: 'Hi, I just made my rent payment via bank transfer. Transaction ID: TXN-2024-10-001',
    type: 'payment',
    status: 'unread',
    senderRole: 'tenant',
    timestamp: '2024-10-27T09:15:00Z',
    attachments: [
      { name: 'payment_receipt.pdf', url: '/receipts/october-2024.pdf' }
    ]
  }
];

const mockConversations = [
  {
    id: 'conv1',
    tenantId: 'tenant1',
    tenantName: 'Sarah Johnson',
    tenantEmail: 'sarah.johnson@email.com',
    landlordId: 'landlord1',
    lastMessage: 'Thanks, we\'ll send someone tomorrow.',
    lastMessageTime: '2024-10-28T14:45:00Z',
    unreadCount: 0,
    status: 'active'
  },
  {
    id: 'conv2',
    tenantId: 'tenant2',
    tenantName: 'Michael Tjiseua',
    tenantEmail: 'michael.tjiseua@email.com',
    landlordId: 'landlord1',
    lastMessage: 'Payment received, thank you!',
    lastMessageTime: '2024-10-27T16:30:00Z',
    unreadCount: 1,
    status: 'active'
  }
];

/**
 * Get all conversations for current user
 * @param {string} userRole - 'tenant' or 'landlord'
 * @param {string} userId - User ID
 */
export const getConversations = async (userRole, userId) => {
  try {
    // For now, return mock data
    // Later: query Supabase messages table
    
    // Filter conversations based on user role
    const conversations = mockConversations.map(conv => ({
      ...conv,
      unreadCount: conv.lastMessageTime > new Date(Date.now() - 86400000).toISOString() 
        ? conv.unreadCount 
        : 0
    }));

    return { data: conversations, error: null };
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return { data: null, error };
  }
};

/**
 * Get messages for a specific conversation
 * @param {string} conversationId - Conversation ID
 * @param {string} tenantId - Tenant ID
 * @param {string} landlordId - Landlord ID
 */
export const getMessages = async (conversationId, tenantId, landlordId) => {
  try {
    // Filter messages for this conversation
    const conversationMessages = mockMessages.filter(msg => 
      msg.tenantId === tenantId && msg.landlordId === landlordId
    );

    // Sort by timestamp
    conversationMessages.sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    return { data: conversationMessages, error: null };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { data: null, error };
  }
};

/**
 * Send a new message
 * @param {object} messageData - Message data
 */
export const sendMessage = async (messageData) => {
  try {
    // Create new message object
    const newMessage = {
      id: `msg_${Date.now()}`,
      tenantId: messageData.tenantId,
      landlordId: messageData.landlordId,
      tenantName: messageData.tenantName,
      landlordName: messageData.landlordName,
      subject: messageData.subject || 'New message',
      body: messageData.body,
      type: messageData.type || 'general',
      status: 'unread',
      senderRole: messageData.senderRole,
      timestamp: new Date().toISOString(),
      attachments: messageData.attachments || []
    };

    // In production, insert into Supabase
    // const { data, error } = await supabase
    //   .from('messages')
    //   .insert([newMessage]);

    return { data: newMessage, error: null };
  } catch (error) {
    console.error('Error sending message:', error);
    return { data: null, error };
  }
};

/**
 * Mark messages as read
 * @param {string} conversationId - Conversation ID
 * @param {string} userId - User ID
 */
export const markAsRead = async (conversationId, userId) => {
  try {
    // In production, update Supabase
    // const { data, error } = await supabase
    //   .from('messages')
    //   .update({ status: 'read' })
    //   .eq('conversation_id', conversationId)
    //   .neq('sender_role', 'tenant'); // Only update messages not sent by tenant

    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error marking as read:', error);
    return { data: null, error };
  }
};

/**
 * Get unread message count for user
 * @param {string} userRole - 'tenant' or 'landlord'
 * @param {string} userId - User ID
 */
export const getUnreadCount = async (userRole, userId) => {
  try {
    // Count unread messages
    const unreadCount = mockMessages.filter(msg => 
      userRole === 'tenant' 
        ? msg.tenantId === userId && msg.senderRole === 'landlord' && msg.status === 'unread'
        : msg.landlordId === userId && msg.senderRole === 'tenant' && msg.status === 'unread'
    ).length;

    return { data: { count: unreadCount }, error: null };
  } catch (error) {
    console.error('Error getting unread count:', error);
    return { data: { count: 0 }, error };
  }
};

/**
 * Get tenant list for landlord
 */
export const getTenantListForLandlord = async (landlordId) => {
  try {
    // Mock tenants
    const tenants = [
      {
        id: 'tenant1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        unitNumber: 'A101',
        buildingName: 'Sunset Apartments',
        lastMessage: '2 hours ago'
      },
      {
        id: 'tenant2',
        name: 'Michael Tjiseua',
        email: 'michael.tjiseua@email.com',
        unitNumber: 'B205',
        buildingName: 'Sunset Apartments',
        lastMessage: '1 day ago'
      },
      {
        id: 'tenant3',
        name: 'Anna Kavangila',
        email: 'anna.kavangila@email.com',
        unitNumber: 'C301',
        buildingName: 'Sunset Apartments',
        lastMessage: 'Never'
      }
    ];

    return { data: tenants, error: null };
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return { data: null, error };
  }
};

