// MYRAA SAFETY NETS - CONFIGURATION FILE
// Update these settings with your actual business information

const BUSINESS_CONFIG = {
    // Business Information
    businessName: "Myraa Safety Nets",
    businessTagline: "Professional Safety Net Installation",
    
    // Contact Information (UPDATE THESE!)
    phoneNumber: "+919493948842",           // Your mobile number
    phoneNumberFormatted: "+91 9493948842", // Formatted for display
    whatsappNumber: "919493948842",         // WhatsApp number (no + sign)
    whatsappLink: "https://wa.me/919493948842", // WhatsApp link
    email: "myraa@myraasafetynets.com",      // Business email
    
    // Business Hours
    businessHours: {
        weekdays: "24x7",
        weekends: "24x7",
        holidays: "24x7"
    },
    
    // Service Cities (Add or remove as needed)
    serviceCities: [
        "Hyderabad",
        "Visakhapatnam",
        "Bangalore"
        // "Vijayawada",
        // "Chennai",
        // "Pune",
        // "Mumbai"
    ],
    
    // Services Offered
    services: [
        {
            id: "balcony",
            name: "Balcony Safety Nets",
            icon: "🏠",
            description: "Protect your family with premium balcony nets. Weather-resistant, durable, and aesthetically pleasing.",
            features: ["Weather-resistant", "High durability", "Aesthetic design", "Safe for children"]
        },
        {
            id: "pigeon",
            name: "Pigeon & Bird Safety Nets",
            icon: "🕊️",
            description: "Keep birds and pigeons away from your space. Hygienic and effective solution for apartments.",
            features: ["Hygienic", "Effective bird control", "Non-intrusive", "Durable"]
        },
        {
            id: "child",
            name: "Child Safety Nets",
            icon: "👶",
            description: "Ensure your child's safety with our reliable safety nets designed for residential balconies.",
            features: ["Child-safe", "Reliable", "Strong grip", "Certified"]
        },
        {
            id: "construction",
            name: "Construction Safety Nets",
            icon: "🏗️",
            description: "Professional-grade safety nets for construction sites, meeting all safety standards.",
            features: ["High strength", "Safety certified", "Professional grade", "Tested"]
        },
        {
            id: "grills",
            name: "Invisible Grills",
            icon: "🔒",
            description: "Modern invisible grills that provide security without compromising your view.",
            features: ["Invisible design", "Secure", "Aesthetic", "Space-saving"]
        },
        {
            id: "sports",
            name: "Sports & Badminton Nets",
            icon: "🎾",
            description: "High-quality sports nets for badminton courts, volleyball, and outdoor sports.",
            features: ["Professional quality", "Durable", "Various sizes", "Affordable"]
        }
    ],
    
    // Pricing (Update based on your rates)
    pricing: {
        balcony: {
            small: "₹5,000 - ₹8,000",
            medium: "₹8,000 - ₹12,000",
            large: "₹12,000 - ₹18,000"
        },
        pigeon: {
            small: "₹3,000 - ₹5,000",
            medium: "₹5,000 - ₹8,000",
            large: "₹8,000 - ₹12,000"
        }
    },
    
    // Warranty Coverage
    warranty: {
        standard: "2 years",
        premium: "3 years",
        extended: "5 years"
    },
    
    // Installation Timeline
    installationDays: "2-4 business days",
    installationTime: "4-6 hours",
    
    // Brand Colors
    colors: {
        primary: "#FF6B35",        // Orange - Safety & Energy
        secondary: "#004E89",      // Dark Blue - Trust
        accent: "#1ABC9C",         // Teal - Growth
        success: "#27AE60",        // Green - Safety
        warning: "#F39C12",        // Orange - Warning
        danger: "#E74C3C",         // Red - Danger
        light: "#F8F9FA",          // Light gray
        dark: "#2C3E50",           // Dark gray
        white: "#FFFFFF",          // White
        text: "#333333"            // Text color
    },
    
    // Social Media Links (Update these)
    socialMedia: {
        facebook: "https://www.facebook.com/myraasafetynets",
        instagram: "https://www.instagram.com/myraasafetynets",
        youtube: "https://www.youtube.com/myraasafetynets",
        twitter: "https://twitter.com/myraasafetynets",
        linkedin: "https://www.linkedin.com/company/myraasafetynets"
    },
    
    // Business Registration Details (For official use)
    businessRegistration: {
        gstNumber: "YOUR_GST_NUMBER_HERE",
        udyamNumber: "YOUR_UDYAM_NUMBER_HERE",
        panNumber: "YOUR_PAN_NUMBER_HERE",
        businessType: "Sole Proprietorship / Partnership / Company",
        registrationDate: "DD/MM/YYYY",
        yearsInBusiness: 5
    },
    
    // Website Information
    website: {
        domain: "myraasafetynets.com",
        description: "Professional Safety Net Installation Services in India",
        keywords: ["safety nets", "balcony nets", "pigeon nets", "installation"],
        author: "Your Name",
        createdYear: 2024
    },
    
    // SEO Setup
    seo: {
        googleBusinessId: "YOUR_GOOGLE_BUSINESS_ID",
        googleAnalyticsId: "GA_MEASUREMENT_ID",
        facebookPixelId: "YOUR_FACEBOOK_PIXEL_ID",
        googleAdsConversionId: "YOUR_GOOGLE_ADS_CONVERSION_ID"
    }
};

// Function to get a service by ID
function getServiceById(id) {
    return BUSINESS_CONFIG.services.find(service => service.id === id);
}

// Function to get all services
function getAllServices() {
    return BUSINESS_CONFIG.services;
}

// Function to get service cities
function getServiceCities() {
    return BUSINESS_CONFIG.serviceCities;
}

// Function to generate WhatsApp message
function generateWhatsAppMessage(name, service, city) {
    return `Hello Myraa Safety Nets,%0AI am interested in your ${service} in ${city}. Please provide a quote.%0A%0AName: ${name}`;
}

// Function to format phone number
function formatPhoneNumber(phone) {
    return BUSINESS_CONFIG.phoneNumberFormatted;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BUSINESS_CONFIG;
}

console.log("✅ Business Configuration Loaded Successfully!");
console.log(`📱 Contact Number: ${BUSINESS_CONFIG.phoneNumberFormatted}`);
console.log(`📧 Email: ${BUSINESS_CONFIG.email}`);
console.log(`📍 Service Cities: ${BUSINESS_CONFIG.serviceCities.join(", ")}`);
