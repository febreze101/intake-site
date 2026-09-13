const INQUIRY_DATA = {
  sections: [
    {
      heading: null,
      questions: [
        { id: "s1_name", name: "Name", type: "text", label: "Your name", required: true },
        { id: "s1_business", name: "Business name", type: "text", label: "Business or project name", required: true },
        { id: "s1_email", name: "Email", type: "email", label: "Email", required: true },
        { id: "s1_phone", name: "Phone", type: "tel", label: "Phone", help: "Optional." },
        { id: "s1_website", name: "Current website", type: "url", label: "Current website (if any)" },
        {
          id: "s1_findyou", name: "Where to find you", type: "textarea", label: "Where else can I find you?",
          help: "Instagram, LinkedIn, press, portfolio, anywhere that shows what you do.", required: true,
        },
        {
          id: "s1_source", name: "How they heard about you", type: "radio", label: "How did you hear about me?",
          options: ["Referral", "Instagram", "Search / portfolio", "Saw a site you built", "You reached out to me", "Other"],
        },
      ],
    },
    {
      heading: "The project",
      questions: [
        {
          id: "s1_need", name: "What they need", type: "checkbox", label: "What are you looking for?",
          options: ["New website", "Redesign", "Brand identity", "Brand refresh", "Ecommerce store", "Ongoing support", "Not sure yet"], required: true,
        },
        {
          id: "s1_why", name: "What's going on / why now", type: "textarea", label: "In a few sentences, what's going on and why now?",
          help: "What's prompting this? A launch, a rebrand, a site that's holding you back, a new direction?", required: true,
        },
        {
          id: "s1_industry", name: "Type of business", type: "radio", label: "What kind of business is it?",
          options: ["Restaurant / bar / café", "Food & beverage brand", "Fashion / apparel", "Wellness / fitness / bodywork", "Hospitality / venue", "Creative practice", "Personal site / portfolio", "Professional services", "Other"], required: true,
        },
        {
          id: "s1_stage", name: "Business stage", type: "radio", label: "How far along are you?",
          options: ["Pre-launch", "Launched under a year", "1–5 years established", "5+ years established"], required: true,
        },
        {
          id: "s1_timeline", name: "Timeline", type: "radio", label: "Timeline",
          options: ["ASAP, hard deadline", "1–2 months", "3–6 months", "Exploring, no fixed date"], required: true,
          sub: [{ id: "s1_deadline", name: "Deadline detail", type: "text", label: "What's the deadline, and what's driving it?", showIf: "Timeline:ASAP, hard deadline" }],
        },
      ],
    },
    {
      heading: "Fit",
      questions: [
        {
          id: "s1_budget", name: "Budget range", type: "radio", label: "Budget range for this project",
          help: "I ask up front so neither of us wastes time. If you're unsure, pick the last option and we'll talk it through.",
          options: ["Under $5k", "$5k – $10k", "$10k – $20k", "$20k – $40k", "$40k+", "I don't know, help me understand what's realistic"], required: true,
        },
        {
          id: "s1_decider", name: "Decision maker", type: "radio", label: "Who makes the final call on this project?",
          options: ["Me, on my own", "Me, with a partner or co-founder", "A team or committee", "Someone above me"], required: true,
        },
        {
          id: "s1_pastagency", name: "Past agency experience", type: "radio", label: "Have you worked with a designer or agency before?",
          options: ["Yes, and it went well", "Yes, and it didn't", "No, this is my first time"],
          sub: [{ id: "s1_pastagency_detail", name: "What worked or didn't", type: "textarea", label: "What worked or didn't?", showIf: "Past agency experience:Yes, and it went well|Yes, and it didn't" }],
        },
        { id: "s1_other", name: "Anything else", type: "textarea", label: "Anything else I should know before we talk?", help: "Optional." },
      ],
    },
  ],
};
