/* GREYTONE STUDIO — AI Chat Widget
   Replace CLAUDE_API_KEY with your Anthropic API key.
   Route through a serverless function to keep key server-side in production. */

const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE';
const CLAUDE_MODEL   = 'claude-opus-4-7';

const SYSTEM_PROMPT = `You are a warm, knowledgeable assistant for Greytone Studio,
a bespoke charcoal artwork studio based in Orange County, California.
You help visitors learn about commissions, pricing, the artistic process, and timeline.

Key facts:
- All artwork is hand-drawn in charcoal by the Greytone Studio artist
- Pricing: 9x12 = $225 | 14x17 = $395 | 24x36 = $650 | Private commissions = custom quote
- Categories: Lifestyle, Luxury Vehicles, Maritime & Coastal, Still Life & Artifacts, Private Commissions
- Turnaround: typically 3-6 weeks depending on size and complexity
- Process: Consult, Create, Deliver (professionally framed)
- Contact: hello@greytonestudio.com | @greytonestudio
- Location: Orange County, California

Keep responses concise, warm, and sophisticated. Match the luxury art gallery tone of the studio.
Encourage visitors to reach out via the contact form for commissions.`;

const FALLBACK = {
  pricing: "Our pricing starts at $225 for a 9x12, $395 for a 14x17, and $650 for a 24x36. For private commissions, we invite you to inquire directly.",
  process: "Every commission follows three steps: Consult - we discuss your vision; Create - your artwork is hand-drawn in charcoal; Deliver - it arrives professionally framed.",
  timeline: "Typical turnaround is 3-6 weeks. Rush commissions may be accommodated - please reach out to discuss your timeline.",
  contact: "Reach us at hello@greytonestudio.com or via the contact form. Follow our work on Instagram @greytonestudio.",
  default: "Thank you for your interest in Greytone Studio. For questions about a commission, please reach out at hello@greytonestudio.com."
};

const chatBtn    = document.getElementById('chatBtn');
const chatPanel  = document.getElementById('chatPanel');
const chatClose  = document.getElementById('chatClose');
const chatInput  = document.getElementById('chatInput');
const chatSend   = document.getElementById('chatSend');
const chatMsgs   = document.getElementById('chatMessages');
const chatTyping = document.getElementById('chatTyping');

let isOpen = false;
const history = [];

function toggleChat() {
  isOpen = !isOpen;
  chatPanel.classList.toggle('open', isOpen);
  if (isOpen && chatInput) chatInput.focus();
}
if (chatBtn) chatBtn.addEventListener('click', toggleChat);
if (chatClose) chatClose.addEventListener('click', toggleChat);

function addMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg chat-msg--' + (role === 'assistant' ? 'bot' : 'user');
  msg.innerHTML = '<div class="chat-msg__bubble">' + text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') + '</div>';
  chatMsgs.appendChild(msg);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function showTyping(show) {
  if (chatTyping) chatTyping.classList.toggle('visible', show);
  if (show && chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function fallbackReply(text) {
  const t = text.toLowerCase();
  if (/price|cost|how much|\$|pric/.test(t)) return FALLBACK.pricing;
  if (/process|how.*work|steps|creat/.test(t)) return FALLBACK.process;
  if (/time|long|week|when|turnaround/.test(t)) return FALLBACK.timeline;
  if (/contact|email|reach|touch|instagram/.test(t)) return FALLBACK.contact;
  return FALLBACK.default;
}

async function sendToClaude(userText) {
  history.push({ role: 'user', content: userText });
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({ model: CLAUDE_MODEL, max_tokens: 300, system: SYSTEM_PROMPT, messages: history })
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const reply = (data.content && data.content[0] && data.content[0].text) || FALLBACK.default;
    history.push({ role: 'assistant', content: reply });
    return reply;
  } catch (e) {
    const reply = fallbackReply(userText);
    history.push({ role: 'assistant', content: reply });
    return reply;
  }
}

async function handleSend() {
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  addMessage('user', text);
  const suggestions = document.getElementById('chatSuggestions');
  if (suggestions) suggestions.remove();
  showTyping(true);
  const reply = CLAUDE_API_KEY === 'YOUR_CLAUDE_API_KEY_HERE'
    ? await new Promise(r => setTimeout(() => r(fallbackReply(text)), 900))
    : await sendToClaude(text);
  showTyping(false);
  addMessage('assistant', reply);
}

if (chatSend) chatSend.addEventListener('click', handleSend);
if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(); });

document.querySelectorAll('.chat-suggestion').forEach(chip => {
  chip.addEventListener('click', () => {
    if (chatInput) chatInput.value = chip.textContent;
    handleSend();
  });
});
