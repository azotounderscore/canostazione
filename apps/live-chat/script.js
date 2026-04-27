      // =============================================
      // 🔧 CONFIGURA QUI LE TUE CREDENZIALI SUPABASE
      // =============================================
      const SUPABASE_URL = 'https://vjfcuewfgbvqevavtwpk.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZmN1ZXdmZ2J2cWV2YXZ0d3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzg5MzQsImV4cCI6MjA5Mjc1NDkzNH0.vGdfsWur00a9Qw3fn3WvxIOhbwgHDER97GTDeLMPphk';
      // =============================================
 
      const { createClient } = supabase;
      const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 
      const chatContainer = document.getElementById('chat-container');
      const messageInput  = document.getElementById('message-input');
      const nameInput     = document.getElementById('name-input');
      const sendBtn       = document.getElementById('send-btn');
 
      // --- Rendering messaggio ---
      function renderMessage(msg) {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `<p class='user'>${msg.username}</p><p>${msg.content}</p>`;
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
 
      // --- Carica messaggi esistenti ---
      async function loadMessages() {
        const { data, error } = await db
          .from('messages')
          .select('username, content')
          .order('created_at', { ascending: true })
          .limit(100);
 
        if (error) { console.error(error); return; }
        data.forEach(renderMessage);
      }
 
      // --- Ascolta nuovi messaggi in realtime ---
      db.channel('public:messages')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        }, payload => renderMessage(payload.new))
        .subscribe();
 
      // --- Invia messaggio ---
      async function sendMessage() {
        const content  = messageInput.value.trim();
        const username = nameInput.value.trim() || 'Anonimo';
        if (!content) return;
 
        const { error } = await db.from('messages').insert({ username, content });
        if (error) { console.error(error); return; }
        messageInput.value = '';
        messageInput.focus();
      }
 
      // --- Salva nome localmente ---
      const savedName = localStorage.getItem('chat-username');
      if (savedName) nameInput.value = savedName;
      nameInput.addEventListener('change', () => {
        localStorage.setItem('chat-username', nameInput.value.trim() || 'Anonimo');
      });
 
      sendBtn.addEventListener('click', sendMessage);
      messageInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
      });
 
      messageInput.value = '';
      loadMessages();
