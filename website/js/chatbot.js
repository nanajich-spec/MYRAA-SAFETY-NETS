/**
 * Myraa Safety Nets Chatbot
 * AI-powered customer support assistant
 */

class MyraaChatbot {
    constructor() {
        this.conversationHistory = [];
        this.isOpen = false;
        this.messageCount = 0;
        this.apiKey = this.getApiKey(); // Get from environment or config
        this.baseUrl = 'https://api.openai.com/v1/chat/completions';
        
        // Service knowledge base
        this.serviceDatabase = {
            services: {
                'balcony-safety-nets': {
                    name: 'Balcony Safety Nets',
                    description: 'Premium residential safety solutions for balconies',
                    features: ['Weather-resistant materials', 'UV protection', 'Transparent design', 'Durability up to 10 years'],
                    priceRange: '₹3,000 - ₹15,000',
                    areas: ['Hyderabad', 'Bangalore', 'Vijayawada'],
                    installation: '24-48 hours',
                    warranty: '2 years'
                },
                'pigeon-safety-nets': {
                    name: 'Pigeon & Bird Safety Nets',
                    description: 'Hygienic bird control solutions to keep birds away',
                    features: ['Mesh design', 'Humane bird control', 'Prevents diseases', 'Easy maintenance'],
                    priceRange: '₹2,500 - ₹10,000',
                    areas: ['Hyderabad', 'Visakhapatnam', 'Bangalore'],
                    installation: '24-48 hours',
                    warranty: '2 years'
                },
                'children-safety-nets': {
                    name: 'Children Safety Nets',
                    description: 'Protective nets specifically designed for child safety',
                    features: ['High tensile strength', 'Non-toxic materials', 'Soft mesh', 'Certified safety standards'],
                    priceRange: '₹4,000 - ₹12,000',
                    areas: ['Hyderabad', 'Bangalore'],
                    installation: '24-48 hours',
                    warranty: '3 years'
                },
                'invisible-grills': {
                    name: 'Invisible Grills',
                    description: 'Modern security solutions without compromising aesthetics',
                    features: ['Transparent appearance', 'Strong steel cables', 'Weather-resistant', 'Easy to maintain'],
                    priceRange: '₹5,000 - ₹18,000',
                    areas: ['Hyderabad', 'Bangalore', 'Vijayawada'],
                    installation: '2-3 days',
                    warranty: '3 years'
                }
            },
            support: {
                phone: '+91 9493948842',
                email: 'myraa@myraasafetynets.com',
                hours: '24/7 Available',
                freeInspection: 'Yes - Schedule a free site inspection',
                paymentMethods: ['Cash', 'Online Transfer', 'Credit/Debit Card', 'UPI']
            },
            faq: {
                installation: 'Installation takes 24-48 hours depending on area size',
                warranty: 'All our services come with 2-3 years warranty',
                material: 'We use high-quality, weather-resistant materials with UV protection',
                maintenance: 'Minimal maintenance required - occasional cleaning is enough',
                guarantee: 'Workmanship guarantee of 2-3 years depending on service'
            }
        };

        this.init();
    }

    init() {
        this.createChatbotWidget();
        this.attachEventListeners();
        this.addChatbotToDOM();
    }

    getApiKey() {
        // Try to get from environment, config, or fallback to local knowledge base mode
        return window.MYRAA_CHATBOT_API_KEY || null;
    }

    createChatbotWidget() {
        const chatbotHTML = `
            <div id="myraa-chatbot" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <svg class="chatbot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <span>Myraa Support</span>
                    </div>
                    <button class="chatbot-close" aria-label="Close chat">×</button>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p>👋 Hello! Welcome to Myraa Safety Nets. How can I help you today?</p>
                            <p style="font-size: 0.85em; margin-top: 8px; opacity: 0.8;">Ask me about:</p>
                            <div class="quick-replies">
                                <button class="quick-reply" data-query="Tell me about balcony safety nets">Balcony Nets</button>
                                <button class="quick-reply" data-query="What about pigeon safety nets">Pigeon Nets</button>
                                <button class="quick-reply" data-query="Children safety nets information">Child Safety</button>
                                <button class="quick-reply" data-query="Tell me about invisible grills">Invisible Grills</button>
                                <button class="quick-reply" data-query="Contact information and support">Contact Us</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-input-area">
                    <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your question...">
                    <button class="chatbot-send" aria-label="Send message">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.98722575 L3.03521743,10.4282188 C3.03521743,10.5853162 3.19218622,10.7424135 3.50612381,10.7424135 L16.6915026,11.5279004 C16.6915026,11.5279004 17.1624089,11.5279004 17.1624089,12.0991925 C17.1624089,12.6704845 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat" title="Chat with Myraa Support">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                <span class="notification-badge" id="notification-badge" style="display: none;">1</span>
            </button>
        `;

        this.chatbotWidget = document.createElement('div');
        this.chatbotWidget.innerHTML = chatbotHTML;
        this.chatbotWidget.id = 'myraa-chatbot-widget';
    }

    attachEventListeners() {
        const toggle = this.chatbotWidget.querySelector('#chatbot-toggle');
        const close = this.chatbotWidget.querySelector('.chatbot-close');
        const sendBtn = this.chatbotWidget.querySelector('.chatbot-send');
        const input = this.chatbotWidget.querySelector('#chatbot-input');
        const quickReplies = this.chatbotWidget.querySelectorAll('.quick-reply');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickReplies.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                input.value = query;
                this.sendMessage();
            });
        });
    }

    addChatbotToDOM() {
        document.body.appendChild(this.chatbotWidget);
    }

    toggleChat() {
        const container = this.chatbotWidget.querySelector('.chatbot-container');
        const toggle = this.chatbotWidget.querySelector('#chatbot-toggle');
        
        this.isOpen = !this.isOpen;
        container.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            this.chatbotWidget.querySelector('#chatbot-input').focus();
            // Hide notification badge
            const badge = this.chatbotWidget.querySelector('#notification-badge');
            if (badge) badge.style.display = 'none';
        }
    }

    async sendMessage() {
        const input = this.chatbotWidget.querySelector('#chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message to UI
        this.addMessageToUI(message, 'user');
        input.value = '';
        this.messageCount++;

        // Get response
        const response = await this.getResponse(message);
        this.addMessageToUI(response, 'bot');
    }

    addMessageToUI(message, sender) {
        const messagesContainer = this.chatbotWidget.querySelector('#chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = this.formatMessage(message);
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Auto scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Convert newlines to <br> and add basic formatting
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>');
    }

    async getResponse(userMessage) {
        // Try to use AI API if available, otherwise use local knowledge base
        if (this.apiKey) {
            return await this.getAIResponse(userMessage);
        } else {
            return this.getLocalResponse(userMessage);
        }
    }

    async getAIResponse(userMessage) {
        try {
            const systemPrompt = `You are a helpful customer support assistant for Myraa Safety Nets, a professional safety net and invisible grill installation company in Hyderabad. 
You provide information about:
- Balcony Safety Nets
- Pigeon & Bird Safety Nets
- Children Safety Nets
- Invisible Grills
- Construction Safety Nets

You should be professional, friendly, and helpful. Keep responses concise (2-3 sentences max).
Always encourage customers to call +91 9493948842 or email myraa@myraasafetynets.com for bookings.

Available services: ${JSON.stringify(this.serviceDatabase.services)}
Support info: ${JSON.stringify(this.serviceDatabase.support)}`;

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                console.error('AI API error:', response.status);
                return this.getLocalResponse(userMessage);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error calling AI API:', error);
            return this.getLocalResponse(userMessage);
        }
    }

    getLocalResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Match keywords and provide responses
        const responses = [
            // Balcony nets queries
            {
                keywords: ['balcony', 'net', 'residential', 'apartment'],
                response: `🏠 **Balcony Safety Nets** are our premium residential safety solutions!

**Features:**
• Weather-resistant materials with UV protection
• Transparent design for unobstructed views
• Lasts up to 10 years
• Price: ₹3,000 - ₹15,000
• Installation: 24-48 hours
• **2-year warranty**

Available in: Hyderabad, Bangalore, Vijayawada

📞 Call +91 9493948842 for a free site inspection!`
            },
            // Pigeon nets queries
            {
                keywords: ['pigeon', 'bird', 'control', 'hygienic'],
                response: `🕊️ **Pigeon & Bird Safety Nets** - Keep birds away safely!

**Features:**
• Hygienic bird control solution
• Prevents diseases and mess
• Mesh design doesn't harm birds
• Easy maintenance
• Price: ₹2,500 - ₹10,000
• Installation: 24-48 hours
• **2-year warranty**

Available in: Hyderabad, Visakhapatnam, Bangalore

📞 Schedule free inspection: +91 9493948842`
            },
            // Children safety nets
            {
                keywords: ['child', 'children', 'kids', 'baby'],
                response: `👶 **Children Safety Nets** - Keep your kids safe!

**Features:**
• High tensile strength design
• Non-toxic, soft mesh materials
• Certified safety standards
• Perfect for balconies and windows
• Price: ₹4,000 - ₹12,000
• Installation: 24-48 hours
• **3-year warranty**

Available in: Hyderabad, Bangalore

✅ Peace of mind for your family!
📞 Call +91 9493948842 for details`
            },
            // Invisible grills
            {
                keywords: ['invisible', 'grill', 'security', 'transparent'],
                response: `🔒 **Invisible Grills** - Modern security without compromising beauty!

**Features:**
• Transparent appearance - no visible bars
• Strong steel cables
• Weather-resistant & low maintenance
• Maintains aesthetic appeal
• Price: ₹5,000 - ₹18,000
• Installation: 2-3 days
• **3-year warranty**

Available in: Hyderabad, Bangalore, Vijayawada

💡 Perfect for modern homes!
📞 Free consultation: +91 9493948842`
            },
            // Price queries
            {
                keywords: ['price', 'cost', 'how much', 'expensive'],
                response: `💰 **Our Pricing:**

• **Balcony Nets:** ₹3,000 - ₹15,000
• **Pigeon Nets:** ₹2,500 - ₹10,000
• **Children Safety:** ₹4,000 - ₹12,000
• **Invisible Grills:** ₹5,000 - ₹18,000

Prices vary based on:
- Area size & dimensions
- Material quality
- Installation complexity

📞 **Call +91 9493948842** for a FREE customized quote!
We offer flexible payment options: Cash, Online Transfer, Cards, UPI`
            },
            // Installation queries
            {
                keywords: ['installation', 'how long', 'time', 'process', 'work'],
                response: `⏱️ **Installation Process:**

**Standard Installation:** 24-48 hours
**Invisible Grills:** 2-3 days

**Our Process:**
1. Free site inspection
2. Customized quote
3. Confirm order
4. Professional installation
5. Quality check

✅ All workmanship guaranteed for 2-3 years!

📞 Schedule your free inspection: +91 9493948842`
            },
            // Warranty queries
            {
                keywords: ['warranty', 'guarantee', 'guarantee'],
                response: `✅ **Our Guarantees:**

• **All Services:** 2-3 year warranty
• **Material Quality:** UV-resistant & weather-proof
• **Workmanship:** Complete guarantee
• **Free Maintenance:** During warranty period

We stand behind our work with complete peace of mind!

📞 Questions? Call +91 9493948842`
            },
            // Contact queries
            {
                keywords: ['contact', 'call', 'phone', 'email', 'whatsapp', 'support'],
                response: `📞 **Contact Myraa Safety Nets:**

**Phone:** +91 9493948842
**Email:** myraa@myraasafetynets.com
**Hours:** 24/7 Available

**Free Services:**
✓ Site inspection
✓ Customized quote
✓ Expert consultation

**Payment Methods:**
💳 Cash, Online Transfer, Credit/Debit Card, UPI

📱 WhatsApp us for quick response!`
            },
            // Service areas
            {
                keywords: ['area', 'location', 'service', 'city', 'where'],
                response: `📍 **Our Service Areas:**

**Primary:** Hyderabad
**Secondary:** Bangalore, Vijayawada, Visakhapatnam, Chennai, Pune, Mumbai

We provide professional installation across all these cities!

📞 Check if we serve your area: +91 9493948842`
            }
        ];

        // Find matching response
        for (const resp of responses) {
            if (resp.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return resp.response;
            }
        }

        // Default response
        return `Thank you for your interest in Myraa Safety Nets! 😊

I can help you with:
• **Balcony Safety Nets** - Residential protection
• **Pigeon & Bird Nets** - Hygienic bird control
• **Children Safety Nets** - Kid protection
• **Invisible Grills** - Modern security
• **Pricing & Installation** details
• **Contact & Support** information

Feel free to ask any specific questions! Or call us directly:
📞 **+91 9493948842** (24/7)
📧 **myraa@myraasafetynets.com**`;
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MyraaChatbot();
    });
} else {
    new MyraaChatbot();
}
