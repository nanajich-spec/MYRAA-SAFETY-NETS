/**
 * Myraa Safety Nets Chatbot
 * AI-powered customer support assistant
 */

class MyraaChatbot {
    constructor() {
        this.conversationHistory = [];
        this.isOpen = false;
        this.messageCount = 0;
        this.sentLeadNumbers = new Set();
        this.appointmentFlow = {
            active: false,
            step: null,
            data: {}
        };
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
                    installation: '24-48 hours',
                    warranty: '2 years'
                },
                'pigeon-safety-nets': {
                    name: 'Pigeon & Bird Safety Nets',
                    description: 'Hygienic bird control solutions to keep birds away',
                    features: ['Mesh design', 'Humane bird control', 'Prevents diseases', 'Easy maintenance'],
                    priceRange: '₹2,500 - ₹10,000',
                    installation: '24-48 hours',
                    warranty: '2 years'
                },
                'children-safety-nets': {
                    name: 'Children Safety Nets',
                    description: 'Protective nets specifically designed for child safety',
                    features: ['High tensile strength', 'Non-toxic materials', 'Soft mesh', 'Certified safety standards'],
                    priceRange: '₹4,000 - ₹12,000',
                    installation: '24-48 hours',
                    warranty: '3 years'
                },
                'invisible-grills': {
                    name: 'Invisible Grills',
                    description: 'Modern security solutions without compromising aesthetics',
                    features: ['Transparent appearance', 'Strong steel cables', 'Weather-resistant', 'Easy to maintain'],
                    priceRange: '₹5,000 - ₹18,000',
                    installation: '2-3 days',
                    warranty: '3 years'
                },
                'sports-safety-nets': {
                    name: 'Sports Safety Nets',
                    description: 'Protective netting for cricket, football, badminton and multi-sport courts',
                    features: ['High-impact resistant mesh', 'Custom court sizing', 'Indoor/outdoor installation', 'Long-term durability'],
                    priceRange: '₹8,000 - ₹50,000',
                    installation: '2-4 days',
                    warranty: '2 years'
                },
                'duct-area-covering-nets': {
                    name: 'Duct Area & Utility Covering Nets',
                    description: 'Safety covering for utility shafts and open ducts in apartments/commercial buildings',
                    features: ['Strong knotless mesh', 'Rust-resistant fittings', 'Neat finishing', 'Low maintenance'],
                    priceRange: '₹3,500 - ₹14,000',
                    installation: '24-48 hours',
                    warranty: '2 years'
                },
                'construction-safety-nets': {
                    name: 'Construction Safety Nets',
                    description: 'Site safety solutions for workers, materials and perimeter protection',
                    features: ['Industrial-grade netting', 'Fall protection support', 'Dust/debris control options', 'Project-based deployment'],
                    priceRange: 'Custom quote',
                    installation: 'Project dependent',
                    warranty: 'As per project scope'
                }
            },
            serviceAreas: {
                primary: ['Hyderabad'],
                secondary: ['Bangalore', 'Visakhapatnam']
            },
            support: {
                contactName: 'Myraa Safety Nets & Invisible Grills Support Desk',
                phone: '+91 9493948842',
                whatsapp: '+91 9493948842',
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
        this.updateViewportSizing();
        this.attachViewportListeners();
    }

    getApiKey() {
        // Try to get from environment, config, or fallback to local knowledge base mode
        return window.MYRAA_CHATBOT_API_KEY || null;
    }

    getBusinessConfig() {
        return window.BUSINESS_CONFIG || null;
    }

    extractMobileNumber(text) {
        const digits = (text || '').replace(/\D/g, '');
        if (digits.length < 10) return null;
        return digits.slice(-10);
    }

    sendLeadNotification(payload) {
        const cfg = this.getBusinessConfig();
        const targetEmail = (cfg && cfg.email) ? cfg.email : 'myraa@myraasafetynets.com';
        const endpoint = `https://formsubmit.co/ajax/${targetEmail}`;

        const body = new URLSearchParams();
        body.append('_subject', 'Chatbot Booking Lead - Myraa Safety Nets');
        body.append('_captcha', 'false');
        body.append('_template', 'table');
        body.append('Source', 'Website Chatbot');
        body.append('Name', payload.name || '-');
        body.append('Mobile', payload.mobile ? `+91 ${payload.mobile}` : '-');
        body.append('City', payload.city || '-');
        body.append('Service', payload.service || '-');
        body.append('Preferred Time', payload.time || '-');
        body.append('Message', payload.message || 'Lead captured in chatbot');
        body.append('Page', window.location.href);

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Accept: 'application/json'
            },
            body: body.toString()
        }).catch(() => null);
    }

    notifyWhatsApp(payload) {
        const message = encodeURIComponent(
            `Chatbot Lead\nName: ${payload.name || '-'}\nMobile: ${payload.mobile ? `+91 ${payload.mobile}` : '-'}\nCity: ${payload.city || '-'}\nService: ${payload.service || '-'}\nPreferred Time: ${payload.time || '-'}\nSource: Website Chatbot`
        );
        const waUrl = `https://wa.me/919493948842?text=${message}`;
        window.open(waUrl, '_blank', 'noopener');
        return waUrl;
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
                            <p>👋 Hi! Welcome to Myraa Safety Nets & Invisible Grills. How can I help you today?</p>
                            <p style="font-size: 0.85em; margin-top: 8px; opacity: 0.8;">Ask me about:</p>
                            <div class="quick-replies">
                                <button class="quick-reply" data-query="What services do you provide?">All Services</button>
                                <button class="quick-reply" data-query="Tell me about invisible grills">Invisible Grills</button>
                                <button class="quick-reply" data-query="Tell me about pigeon and bird safety nets">Bird Nets</button>
                                <button class="quick-reply" data-query="Tell me about sports safety nets">Sports Nets</button>
                                <button class="quick-reply" data-query="How can I get quote for services?">Get Quote</button>
                                <button class="quick-reply" data-query="Book a free inspection">Book Inspection</button>
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
            
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat" title="Talk to support agent">
                <img src="images/support-agent.svg" class="chatbot-agent-avatar" alt="Support agent">
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

    updateViewportSizing() {
        if (!this.chatbotWidget) return;

        const vp = window.visualViewport;
        const vw = Math.max(0, Math.floor(vp ? vp.width : window.innerWidth));
        const vh = Math.max(0, Math.floor(vp ? vp.height : window.innerHeight));

        const dynWidth = Math.max(240, Math.min(340, Math.floor(vw * 0.82)));
        const dynHeight = Math.max(190, Math.min(420, Math.floor(vh * 0.40)));

        this.chatbotWidget.style.setProperty('--chatbot-dyn-width', `${dynWidth}px`);
        this.chatbotWidget.style.setProperty('--chatbot-dyn-height', `${dynHeight}px`);
    }

    attachViewportListeners() {
        const handleResize = () => this.updateViewportSizing();
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        }
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
            const systemPrompt = `You are the digital support assistant for Myraa Safety Nets & Invisible Grills.
Always greet users naturally when they say hi/hello.
If the user asks about services, list ALL services first (balcony nets, pigeon/bird nets, children safety nets, invisible grills, sports safety nets, duct area covering nets, construction safety nets) before asking a follow-up.
Never provide pricing details in chat. If asked about pricing, request user to contact phone/WhatsApp/email for quote.
Only provide service area/city details when the user explicitly asks about location/area/city coverage.
Use a friendly, interactive sales-support tone and end with a practical next step.
Always include phone +91 9493948842 for bookings.

Available services: ${JSON.stringify(this.serviceDatabase.services)}
Support info: ${JSON.stringify(this.serviceDatabase.support)}
Service areas: ${JSON.stringify(this.serviceDatabase.serviceAreas)}`;

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
        const lowerMessage = userMessage.toLowerCase().trim();

        if (this.appointmentFlow.active) {
            return this.handleAppointmentFlow(userMessage);
        }

        const hasAny = (keywords) => keywords.some((keyword) => lowerMessage.includes(keyword));

        const greetingKeywords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
        const serviceIntentKeywords = ['service', 'services', 'what do you provide', 'what do you offer', 'offerings', 'catalog'];
        const areaIntentKeywords = ['area', 'areas', 'location', 'locations', 'city', 'cities', 'where do you serve', 'serve my area'];
        const pricingKeywords = ['price', 'pricing', 'cost', 'quote', 'how much'];
        const installationKeywords = ['installation', 'install', 'time', 'duration', 'how long', 'process'];
        const warrantyKeywords = ['warranty', 'guarantee', 'guarantees'];
        const bookingKeywords = ['book', 'appointment', 'inspection', 'visit', 'site visit', 'schedule'];
        const contactKeywords = ['contact', 'call', 'phone', 'email', 'whatsapp', 'support'];

        const extractedMobile = this.extractMobileNumber(userMessage);
        if (extractedMobile && !this.sentLeadNumbers.has(extractedMobile)) {
            this.sentLeadNumbers.add(extractedMobile);
            this.sendLeadNotification({
                name: 'Chat User',
                mobile: extractedMobile,
                message: userMessage
            });
            const waUrl = this.notifyWhatsApp({
                name: 'Chat User',
                mobile: extractedMobile,
                message: userMessage
            });
            return `✅ Thanks! We received your mobile number **+91 ${extractedMobile}**.\n\nOur team has been notified by email and WhatsApp and will contact you soon to confirm booking.\n\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com\n📲 ${waUrl}`;
        }

        if (hasAny(greetingKeywords)) {
            return `👋 Hi! Welcome to **Myraa Safety Nets & Invisible Grills**.\n\nI can help you with services, installation, booking, and contact details.\n\nYou can start with:\n• "Show all services"\n• "Bird nets details"\n• "Book appointment"\n\n📞 +91 9493948842`;
        }

        if (hasAny(serviceIntentKeywords)) {
            return `🛠️ **Our Services:**\n\n• Balcony Safety Nets\n• Pigeon & Bird Safety Nets\n• Children Safety Nets\n• Invisible Grills\n• Sports Safety Nets\n• Duct Area & Utility Covering Nets\n• Construction Safety Nets\n\nTell me which one you want, and I will share features and installation details instantly.\n\n📞 For quick booking: +91 9493948842`;
        }

        if (hasAny(['balcony'])) {
            return `🏠 **Balcony Safety Nets**\n\n• Installation: 24-48 hours\n• Warranty: 2 years\n• Strong UV-resistant and weatherproof material\n\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(['pigeon', 'bird', 'birds'])) {
            return `🕊️ **Pigeon & Bird Safety Nets**\n\n• Installation: 24-48 hours\n• Warranty: 2 years\n• Humane bird control with hygienic protection\n\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(['child', 'children', 'kids', 'kid', 'baby'])) {
            return `👶 **Children Safety Nets**\n\n• Installation: 24-48 hours\n• Warranty: 3 years\n• High-tensile, soft, child-safe mesh\n\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(['invisible grill', 'invisible grills', 'grill', 'grills'])) {
            return `🔒 **Invisible Grills**\n\n• Installation: 2-3 days\n• Warranty: 3 years\n• Premium modern look with strong safety cables\n\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(['sports', 'cricket', 'football', 'badminton', 'court net'])) {
            return `🏅 **Sports Safety Nets**\n\n• Suitable for cricket, football, badminton, multi-sport courts\n• Installation: 2-4 days\n• Warranty: 2 years\n\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(['duct', 'utility', 'shaft', 'covering net'])) {
            return `🏢 **Duct Area & Utility Covering Nets**\n\n• Installation: 24-48 hours\n• Warranty: 2 years\n• Neat finishing with strong rust-resistant fittings\n\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(['construction', 'site safety', 'industrial'])) {
            return `🏗️ **Construction Safety Nets**\n\n• Industrial-grade project safety net solutions\n• Installation: As per project scope\n• Includes perimeter and fall-protection support\n\nShare project type and site size for a custom plan.\nFor quote, contact us:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com`;
        }

        if (hasAny(pricingKeywords)) {
            return `💬 We share quote details only through direct support after site details.\n\nPlease contact:\n📞 +91 9493948842\n📧 myraa@myraasafetynets.com\n📲 WhatsApp: +91 9493948842`;
        }

        if (hasAny(installationKeywords)) {
            return `⏱️ **Installation Timeline:**\n\n• Most net services: 24-48 hours\n• Invisible grills: 2-3 days\n• Sports nets: 2-4 days\n\nFlow: site inspection → quote → confirmation → installation → quality check.\n\n📞 Book inspection: +91 9493948842`;
        }

        if (hasAny(warrantyKeywords)) {
            return `✅ **Warranty & Support:**\n\n• Nets: usually 2 years\n• Children safety / invisible grills: up to 3 years\n• Material quality and workmanship assurance\n\nIf you mention your selected service, I can share exact warranty terms.\n📞 +91 9493948842`;
        }

        if (hasAny(areaIntentKeywords)) {
            return `📍 **Our Service Areas:**\n\n**Primary:** Hyderabad\n**Secondary:** Bangalore, Visakhapatnam\n\nWe provide professional installation across these cities.\n📞 Check your area now: +91 9493948842`;
        }

        if (hasAny(bookingKeywords)) {
            this.appointmentFlow = {
                active: true,
                step: 'name',
                data: {}
            };
            return `📅 Great, let's book your appointment.\n\nPlease share your **full name**.`;
        }

        if (hasAny(contactKeywords)) {
            return `📞 **Myraa Safety Nets & Invisible Grills - Contact Details**\n\n• Contact Name: ${this.serviceDatabase.support.contactName}\n• Mobile: ${this.serviceDatabase.support.phone}\n• WhatsApp: ${this.serviceDatabase.support.whatsapp}\n• Email: ${this.serviceDatabase.support.email}\n• Locations: Hyderabad, Bangalore, Visakhapatnam\n• Support Hours: ${this.serviceDatabase.support.hours}\n\n✅ Want to book now? Type: **Book appointment**`;
        }

        return `I can help with **all Myraa services**: balcony nets, bird nets, children safety nets, invisible grills, sports nets, duct covering nets, and construction safety nets.\n\nAsk me like:\n• "Show all services"\n• "Sports nets details"\n• "Bird nets details"\n• "Book free inspection"\n\n📞 +91 9493948842`;
    }

    handleAppointmentFlow(userMessage) {
        const message = userMessage.trim();
        const step = this.appointmentFlow.step;

        if (step === 'name') {
            this.appointmentFlow.data.name = message;
            this.appointmentFlow.step = 'mobile';
            return `Thanks ${message}! Please share your **mobile number** (10 digits).`;
        }

        if (step === 'mobile') {
            const digits = message.replace(/\D/g, '');
            if (digits.length < 10) {
                return `Please enter a valid **10-digit mobile number** so I can confirm your appointment.`;
            }
            this.appointmentFlow.data.mobile = digits.slice(-10);
            if (!this.sentLeadNumbers.has(this.appointmentFlow.data.mobile)) {
                this.sentLeadNumbers.add(this.appointmentFlow.data.mobile);
                this.sendLeadNotification({
                    name: this.appointmentFlow.data.name || 'Chat User',
                    mobile: this.appointmentFlow.data.mobile,
                    message: 'Appointment flow mobile captured'
                });
                this.notifyWhatsApp({
                    name: this.appointmentFlow.data.name || 'Chat User',
                    mobile: this.appointmentFlow.data.mobile,
                    message: 'Appointment flow mobile captured'
                });
            }
            this.appointmentFlow.step = 'city';
            return `Perfect. Which city do you need service in?\n\nOptions: Hyderabad, Bangalore, Visakhapatnam`;
        }

        if (step === 'city') {
            this.appointmentFlow.data.city = message;
            this.appointmentFlow.step = 'service';
            return `Got it. Which service do you need?\n\nExamples: Invisible Grills, Bird Nets, Balcony Nets, Sports Nets`;
        }

        if (step === 'service') {
            this.appointmentFlow.data.service = message;
            this.appointmentFlow.step = 'time';
            return `Great choice. Please share your preferred **date/time** for site inspection.`;
        }

        if (step === 'time') {
            this.appointmentFlow.data.time = message;

            const data = this.appointmentFlow.data;
            const summary = `📋 **Appointment Request Created**\n\n• Name: ${data.name}\n• Mobile: +91 ${data.mobile}\n• City: ${data.city}\n• Service: ${data.service}\n• Preferred Time: ${data.time}\n\nOur support team will contact you soon.`;

            const waMessage = encodeURIComponent(`Appointment Request\nName: ${data.name}\nMobile: +91 ${data.mobile}\nCity: ${data.city}\nService: ${data.service}\nPreferred Time: ${data.time}`);
            const waUrl = `https://wa.me/919493948842?text=${waMessage}`;

            this.sendLeadNotification({
                name: data.name,
                mobile: data.mobile,
                city: data.city,
                service: data.service,
                time: data.time,
                message: 'Appointment flow completed'
            });

            this.appointmentFlow = { active: false, step: null, data: {} };

            return `${summary}\n\n✅ Confirm on WhatsApp: ${waUrl}`;
        }

        this.appointmentFlow = { active: false, step: null, data: {} };
        return `Let's start again. Type **Book appointment** to continue.`;
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
