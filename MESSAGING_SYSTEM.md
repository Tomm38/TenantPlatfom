# Messaging System

## Overview

The messaging system enables direct communication between landlords and tenants within the platform. It provides a chat-like interface for property-related discussions.

## Features

### ✅ Implemented

1. **Message Service Layer** (`src/services/messageService.js`)
   - Get all conversations
   - Get messages for a conversation
   - Send new messages
   - Mark messages as read
   - Get unread message count
   - Get tenant list for landlords

2. **Messages Page** (`src/Pages/messages/index.jsx`)
   - Conversation list sidebar
   - Individual message view
   - Real-time message display
   - Send new messages
   - Unread message indicators
   - Time formatting

3. **Navigation Integration**
   - Added `/messages` route
   - Sidebar links for both landlords and tenants
   - Role-based navigation

## How to Use

### For Tenants

1. Navigate to Messages from the sidebar
2. Select a conversation with your landlord
3. View previous messages
4. Type and send new messages
5. Message history is preserved

### For Landlords

1. Navigate to Messages from the sidebar
2. See all tenant conversations
3. Unread message count indicators
4. Click on a tenant to view conversation
5. Send replies to tenant messages
6. View message history

## Mock Data

Currently uses mock data structure for demonstration. The service layer is ready for Supabase integration.

### Mock Conversations

- Sarah Johnson (Tenant)
  - Last message about leaky faucet
  - Recent activity
  
- Michael Tjiseua (Tenant)
  - Payment confirmation
  - Has unread message

### Mock Messages

- Maintenance requests
- Payment confirmations
- General inquiries
- With timestamps and sender information

## Supabase Integration

To connect to Supabase, you need to create the following tables:

```sql
-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES users(id),
  landlord_id UUID REFERENCES users(id),
  tenant_name VARCHAR,
  tenant_email VARCHAR,
  last_message TEXT,
  last_message_time TIMESTAMP DEFAULT NOW(),
  unread_count INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id),
  tenant_id UUID REFERENCES users(id),
  landlord_id UUID REFERENCES users(id),
  tenant_name VARCHAR,
  landlord_name VARCHAR,
  subject VARCHAR,
  body TEXT NOT NULL,
  type VARCHAR DEFAULT 'general', -- 'general', 'maintenance', 'payment'
  status VARCHAR DEFAULT 'unread', -- 'read', 'unread'
  sender_role VARCHAR NOT NULL, -- 'tenant', 'landlord'
  timestamp TIMESTAMP DEFAULT NOW(),
  attachments JSONB DEFAULT '[]'::jsonb
);
```

### Update Service Functions

Replace mock data calls in `messageService.js` with Supabase queries:

```javascript
export const getConversations = async (userRole, userId) => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq(userRole === 'tenant' ? 'tenant_id' : 'landlord_id', userId)
    .order('last_message_time', { ascending: false });
  
  return { data, error };
};

export const getMessages = async (conversationId, tenantId, landlordId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('landlord_id', landlordId)
    .order('timestamp', { ascending: true });
  
  return { data, error };
};

export const sendMessage = async (messageData) => {
  // Insert conversation if doesn't exist
  let { data: conversation } = await supabase
    .from('conversations')
    .select('id')
    .eq('tenant_id', messageData.tenantId)
    .eq('landlord_id', messageData.landlordId)
    .single();
  
  if (!conversation) {
    // Create new conversation
    const { data } = await supabase
      .from('conversations')
      .insert([{
        tenant_id: messageData.tenantId,
        landlord_id: messageData.landlordId,
        tenant_name: messageData.tenantName,
        landlord_name: messageData.landlordName,
        last_message: messageData.body,
        unread_count: 1
      }])
      .select()
      .single();
    conversation = data;
  }
  
  // Insert message
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      conversation_id: conversation.id,
      ...messageData
    }])
    .select()
    .single();
  
  // Update conversation
  await supabase
    .from('conversations')
    .update({
      last_message: messageData.body,
      last_message_time: new Date().toISOString(),
      unread_count: messageData.senderRole === 'tenant' ? unread_count + 1 : 0
    })
    .eq('id', conversation.id);
  
  return { data, error };
};
```

## Real-time Updates (Optional)

For real-time messaging, use Supabase Realtime:

```javascript
import { supabase } from '../config/supabase';

// Subscribe to new messages
const channel = supabase
  .channel('messages')
  .on('postgres_changes', 
    { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`
    }, 
    (payload) => {
      setMessages(prev => [...prev, payload.new]);
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

## Features to Add

- [ ] Message search functionality
- [ ] File attachments
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] Push notifications
- [ ] Email notifications
- [ ] Message templates
- [ ] Bulk messaging
- [ ] Archived conversations
- [ ] Starred messages

## Testing

1. Login as a landlord
2. Navigate to Messages
3. View tenant conversations
4. Select a conversation
5. Send a test message
6. Login as a tenant
7. Check for messages from landlord
8. Reply to messages

## UI Components

- Conversation list with search
- Message bubbles
- Timestamp formatting
- Unread indicators
- Online status (future)
- Typing indicators (future)

## Security Considerations

1. Implement Row Level Security (RLS) in Supabase
2. Verify users can only access their own conversations
3. Validate sender role on message creation
4. Prevent unauthorized message sending
5. Rate limiting on message sending
6. Content moderation (optional)

