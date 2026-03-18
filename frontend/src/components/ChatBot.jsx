import { useState, useRef, useEffect } from "react";
import "../styles/chatbot.css";

// Knowledge base for the chatbot
const knowledgeBase = [
  {
    keywords: ["hello", "hi", "hey", "namaste", "vanakkam"],
    response: "Vanakkam! 🙏 Welcome to Sai Mahes Garlands! I'm your virtual assistant. How can I help you today? You can ask about our garlands, pricing, delivery, or anything else!"
  },
  {
    keywords: ["price", "cost", "rate", "how much", "charge", "expensive", "cheap", "budget"],
    response: "💰 Our garland prices vary by type:\n\n🌸 Jasmine Garlands: ₹4,499 - ₹7,999\n💎 Diamond Garlands: ₹5,499 - ₹7,999\n🌹 Rose Garlands: ₹4,999 - ₹7,999\n🌷 Orchid Garlands: ₹6,499 - ₹8,999\n🌼 Chrysanthemum: ₹150 - ₹200\n🌿 Tulasi Garland: ₹250\n🎀 Trend/Chocolate Garlands: ₹1,199 - ₹7,999\n💐 Bouquets: ₹349 - ₹2,999\n\nFor exact pricing, browse our products!"
  },
  {
    keywords: ["delivery", "deliver", "shipping", "ship", "courier", "send"],
    response: "🚚 We offer delivery services in and around Salem! For local orders, we can deliver within the same day if ordered before 2 PM. For other cities, we ship via reliable courier services. Delivery charges depend on your location. Contact us for details!"
  },
  {
    keywords: ["wedding", "marriage", "kalyanam", "function", "reception"],
    response: "💒 We specialize in wedding garlands! Our premium wedding collection includes:\n\n🌸 Lotus Rose Garlands (₹8,499)\n💎 Diamond finish Garlands (₹5,499 - ₹7,999)\n🌹 Rose Petal Garlands (₹6,499 - ₹7,999)\n🌷 Orchid Garlands (₹6,499 - ₹8,999)\n\nWe also do bulk orders for wedding decoration. Book 3-5 days in advance for best availability!"
  },
  {
    keywords: ["jasmine", "malli", "mullai"],
    response: "🌸 Our Jasmine (Malli) Garlands are handcrafted with fresh, fragrant jasmine flowers. Prices range from ₹4,499 to ₹7,999. Perfect for weddings, pooja, and special occasions. The scent is absolutely divine! 🌿"
  },
  {
    keywords: ["rose", "roja"],
    response: "🌹 We have beautiful Rose Garlands and Rose Petal Garlands! Prices range from ₹4,999 to ₹7,999. We also have gorgeous rose bouquets starting from ₹349. Perfect for anniversaries, Valentine's Day, and weddings!"
  },
  {
    keywords: ["orchid"],
    response: "🌷 Our Orchid Garlands are premium and elegant! We have regular and Blue Orchid varieties ranging from ₹6,499 to ₹8,999. We also offer beautiful Orchid Bouquets. These are very popular for modern weddings!"
  },
  {
    keywords: ["diamond"],
    response: "💎 Our Diamond Garlands feature a premium diamond-finish with artificial beads. Prices range from ₹5,499 to ₹7,999. They add a royal and luxurious look to any occasion. Available in multiple color combinations!"
  },
  {
    keywords: ["bouquet", "bunch", "flower arrangement"],
    response: "💐 We have stunning bouquets:\n\n🌹 Red Rose Bouquets: ₹349 - ₹2,499\n🌸 Baby Pink Rose Bouquet: ₹1,249\n🌷 Blue Orchid Bouquet: ₹1,649 - ₹2,199\n💜 Purple Orchid Bouquet: ₹899\n🍫 Chocolate Rose Bouquet: ₹1,049 - ₹1,649\n\nPerfect gifts for all occasions!"
  },
  {
    keywords: ["order", "book", "buy", "purchase", "want"],
    response: "🛒 To place an order:\n\n1️⃣ Browse our products on the website\n2️⃣ Click 'View Product' on any garland\n3️⃣ Click 'Add to Cart' or 'Buy Now'\n4️⃣ Complete checkout with your details\n\nYou can also contact us directly via WhatsApp for custom orders!"
  },
  {
    keywords: ["custom", "customise", "customize", "special", "bulk"],
    response: "🎨 Yes! We make custom garlands for any occasion! Whether it's a unique color combination, specific flowers, or bulk orders for events — we can handle it all. Please contact us at least 3-5 days in advance for custom orders."
  },
  {
    keywords: ["location", "address", "where", "shop", "store", "visit"],
    response: "📍 Our shop is located at:\n\nSai Mahes Garlands\n2/74, Raja Street,\nVeerapandi,\nSalem - 636308\n\nYou're welcome to visit us anytime during business hours! 🕐 Mon-Sat: 6AM - 9PM, Sun: 6AM - 1PM"
  },
  {
    keywords: ["timing", "time", "hours", "open", "close", "when"],
    response: "🕐 Our business hours:\n\nMonday - Saturday: 6:00 AM - 9:00 PM\nSunday: 6:00 AM - 1:00 PM\n\nWe recommend ordering early in the day for same-day fresh garlands!"
  },
  {
    keywords: ["pooja", "puja", "temple", "god", "prayer", "devotion"],
    response: "🙏 We have special garlands for pooja and temple offerings:\n\n🌿 Tulasi Garland: ₹250\n🌼 Chrysanthemum (Samanthi): ₹150 - ₹200\n🌸 Jasmine Garlands: ₹4,499+\n🌻 Sampangi Garlands: ₹200\n\nAll garlands are freshly made with devotion!"
  },
  {
    keywords: ["chocolate", "candy"],
    response: "🍫 Our unique Chocolate Garlands are a trendy choice for modern events! Prices range from ₹1,199 to ₹1,999. They make wonderful gifts and are perfect for birthday celebrations!"
  },
  {
    keywords: ["money garland", "cash garland", "note garland"],
    response: "💵 Our Money Garlands are decorative garlands that look like currency! They're perfect for ceremonies and celebrations. Contact us for pricing as it depends on the design and customization."
  },
  {
    keywords: ["return", "refund", "exchange", "cancel"],
    response: "📋 Since our garlands are fresh and perishable products, we don't accept returns. However, if there's a quality issue, please contact us within 2 hours of delivery and we'll resolve it. Order cancellations are accepted up to 4 hours before scheduled delivery."
  },
  {
    keywords: ["payment", "pay", "upi", "cash", "gpay", "phonepe"],
    response: "💳 We accept multiple payment methods:\n\n• Cash on Delivery (COD)\n• UPI (GPay, PhonePe, Paytm)\n• Bank Transfer\n• Online Payment via website\n\nFor advance orders, a 30% advance payment is required."
  },
  {
    keywords: ["contact", "call", "phone", "whatsapp", "reach"],
    response: "📞 You can reach us through:\n\n📱 Phone/WhatsApp: Contact via our website\n📧 Email: saimahesgarlands@gmail.com\n📍 Visit: 2/74, Raja Street, Veerapandi, Salem-636308\n🌐 Website: Browse our products anytime!\n\nWe're always happy to help! 😊"
  },
  {
    keywords: ["thank", "thanks", "ok", "okay", "bye", "good"],
    response: "Thank you for choosing Sai Mahes Garlands! 🌸 If you have any more questions, feel free to ask anytime. Have a wonderful day! 🙏✨"
  }
];

function getAIResponse(userMsg) {
  const msg = userMsg.toLowerCase().trim();
  
  // Check each knowledge base entry
  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword)) {
        return entry.response;
      }
    }
  }

  // Default response
  return "Thank you for your message! 🌸 I can help you with:\n\n• Garland types & pricing\n• Wedding garlands\n• Delivery info\n• Shop location & hours\n• Custom orders\n• Payment options\n\nTry asking about any of these topics, or contact us directly for personalized help!";
}

const quickSuggestions = [
  "💰 Pricing",
  "💒 Wedding",
  "📍 Location",
  "🚚 Delivery",
  "🕐 Timings"
];

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Vanakkam! 🙏🌸 Welcome to Sai Mahes Garlands! I'm your AI assistant. Ask me anything about our garlands, pricing, delivery, or more!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    // Add user message
    setMessages(prev => [...prev, { type: "user", text: msg }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(msg);
      setIsTyping(false);
      setMessages(prev => [...prev, { type: "bot", text: response }]);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🌸</div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-name">Sai Mahes AI Assistant</div>
              <div className="chatbot-header-status">
                <span className="chatbot-status-dot"></span>
                Always online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.type}`}>
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>
            ))}
            {isTyping && (
              <div className="chat-typing">
                <span className="chat-typing-dot"></span>
                <span className="chat-typing-dot"></span>
                <span className="chat-typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="chatbot-suggestions">
            {quickSuggestions.map((s, i) => (
              <button key={i} className="chatbot-suggestion-btn" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button className="chatbot-send-btn" onClick={() => handleSend()}>
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close chat" : "Chat with us!"}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </>
  );
}

export default ChatBot;
