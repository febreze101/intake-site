const BRIEF_DATA = {
  sections: [
    {
      heading: "Orientation",
      questions: [
        { id: "s2_who", name: "Who's filling this out", type: "text", label: "Who's filling this out, and what's your role?", required: true },
        {
          id: "s2_contributors", name: "Other contributors", type: "radio", label: "Is anyone else contributing answers?",
          options: ["Just me", "Me and one other person", "A few of us are contributing"],
        },
        {
          id: "s2_scope", name: "Scope", type: "checkbox", label: "Scope confirmation — what are we building?",
          help: "This one drives which sections show up below.",
          options: ["Brand identity", "Website or portfolio", "Ecommerce", "Content / copy support"], required: true,
        },
      ],
    },
    {
      heading: "You & the work",
      questions: [
        { id: "s2_what", name: "What you do", type: "textarea", label: "Describe what you do to someone who's never heard of you.", help: "Plain language. No mission-statement voice. How would you say it to a friend at dinner?", required: true },
        { id: "s2_sell", name: "What you offer", type: "textarea", label: "What do you actually offer?", help: "Products, services, packages, price points — or, if this is a personal site or portfolio, the kind of work or opportunities you want to attract.", required: true },
        { id: "s2_revenue_now", name: "Current focus", type: "textarea", label: "Where does most of your revenue, or attention, come from today?", help: "Which product, service, or type of work, and roughly what share. Pre-launch, or not revenue-driven? Say what you expect or hope for instead.", required: true },
        { id: "s2_revenue_future", name: "Future direction", type: "textarea", label: "What do you want that to be in two years?", help: "The thing you're trying to grow into — a business, a body of work, a reputation.", required: true },
        {
          id: "s2_findings", name: "How people find you", type: "checkbox", label: "How do people find you right now?",
          options: ["Word of mouth", "Instagram", "TikTok", "Google", "Foot traffic", "Press", "Email list", "Paid ads", "Wholesale", "Events", "LinkedIn / referral network", "We're not really being found"],
        },
        { id: "s2_findings_detail", name: "What's working / not", type: "textarea", label: "Which of those is working best, and which do you wish worked better?", required: true },
        { id: "s2_blocker", name: "Biggest blocker", type: "textarea", label: "What's the single biggest thing holding you back right now?", required: true },
      ],
    },
    {
      heading: "Audience",
      questions: [
        { id: "s2_customer", name: "Ideal audience", type: "textarea", label: "Describe the person you most want this site to reach, as a specific person, not a demographic.", help: "Not “women 25–40.” What's their life like, what do they care about, where do they already hang out? A client, a customer, an employer, a collaborator — give me someone I could picture.", required: true },
        {
          id: "s2_customer_match", name: "Matches reality", type: "radio", label: "Is that who's actually engaging with you today?",
          options: ["Yes, pretty much", "Partly — there's a gap", "No, we're trying to shift who we attract", "Pre-launch, so this is a guess"],
          sub: [{ id: "s2_customer_gap", name: "The gap", type: "textarea", label: "Describe the gap.", showIf: "Matches reality:Partly — there's a gap|No, we're trying to shift who we attract" }],
        },
        {
          id: "s2_groups", name: "Distinct audiences", type: "radio", label: "Are there distinct groups you're trying to reach?",
          options: ["One core audience", "Two or three distinct groups", "Many, quite fragmented"],
          sub: [{ id: "s2_groups_list", name: "Audience list", type: "textarea", label: "List them, most important first.", showIf: "Distinct audiences:Two or three distinct groups|Many, quite fragmented" }],
        },
        { id: "s2_job", name: "Job to be done", type: "textarea", label: "What is that person actually trying to accomplish when they come to you?", help: "The job they're hiring you (or your work) for.", required: true },
        { id: "s2_hesitate", name: "What makes them hesitate", type: "textarea", label: "What makes them hesitate?", help: "Price, trust, not understanding the process, a bad past experience, not being sure you're the right fit.", required: true },
        { id: "s2_happy", name: "What people say when it lands", type: "textarea", label: "What do people say when they're happy with your work?", help: "Actual quotes if you have them — reviews, DMs, emails, feedback from a hiring manager or client.", required: true },
      ],
    },
    {
      heading: "Positioning & comparison",
      questions: [
        { id: "s2_competitors", name: "Comparisons", type: "textarea", label: "Name three to five people, businesses, or portfolios you'd want to be compared against.", help: "Links please. Direct competitors, or just sites you're measured against in someone's mind.", required: true },
        { id: "s2_comp_good", name: "What they do well", type: "textarea", label: "What do they do well?", required: true },
        { id: "s2_diff", name: "What you do differently", type: "textarea", label: "What do you do that they don't?", help: "Be concrete. “Better quality” isn't an answer.", required: true },
        { id: "s2_lose_reason", name: "Why they'd pick someone else", type: "textarea", label: "If someone chose one of those instead of you, what would the reason most likely be?", help: "The honest answer is more useful than the flattering one.", required: true },
        { id: "s2_aspirational", name: "Aspirational references", type: "textarea", label: "Are there people or brands outside your field you want to be mentioned alongside?", help: "Optional." },
        { id: "s2_onlyx", name: "\"I'm the only ___ that ___\"", type: "text", label: "Complete this: “I'm the only ____ that ____.”", help: "Hard on purpose. A rough attempt is fine.", required: true },
      ],
    },
    {
      heading: "Messaging & voice",
      questions: [
        { id: "s2_one_sentence", name: "One-sentence takeaway", type: "textarea", label: "What's the one thing you need someone to understand about you, if they only read a single sentence?", required: true },
        { id: "s2_takeaways", name: "Key takeaways", type: "textarea", label: "What are the three to five things you'd want them to take away if they read the whole site?", help: "Rank them. The order shapes the page.", required: true },
        { id: "s2_misconception", name: "Common misconception", type: "textarea", label: "What do people commonly get wrong about you?", required: true },
        { id: "s2_never_say", name: "Never say", type: "textarea", label: "What should we never say about you?", help: "Words, claims, or associations that are off-limits.", required: true },
        {
          id: "s2_voice_scale", name: "Voice", type: "scale", label: "Where does your voice sit?",
          rows: ["Warm &harr; Cool", "Playful &harr; Serious", "Plainspoken &harr; Elevated", "Understated &harr; Bold", "Classic &harr; Experimental", "Expert &harr; Peer"],
        },
        {
          id: "s2_existing_copy", name: "Existing copy to keep", type: "radio", label: "Do you have existing taglines, headlines or copy you want kept?",
          options: ["Yes", "No, all of it's open"],
          sub: [{ id: "s2_existing_copy_detail", name: "Existing copy detail", type: "textarea", label: "Paste it, and say which parts are non-negotiable.", showIf: "Existing copy to keep:Yes" }],
        },
      ],
    },
    {
      heading: "Goals & success",
      questions: [
        { id: "s2_sixmonth", name: "Six-month success", type: "textarea", label: "What has to be true six months after launch for this to have been worth it?", help: "Be specific — “more bookings” is a wish, “our Tuesday nights are full” is a goal.", required: true },
        {
          id: "s2_goal_primary", name: "Primary goal", type: "radio", label: "Primary goal for this project",
          options: ["More inbound leads", "More online sales", "More bookings", "Charge more / attract better-fit clients", "Get hired / land more freelance or job opportunities", "Be taken seriously by a new audience", "Build a personal audience or following", "Reduce admin and repeated explaining", "Support a launch or raise", "Other"],
        },
        {
          id: "s2_goal_secondary", name: "Secondary goals", type: "checkbox", label: "Secondary goals",
          help: "Same list, pick up to two.",
          options: ["More inbound leads", "More online sales", "More bookings", "Charge more / attract better-fit clients", "Get hired / land more freelance or job opportunities", "Be taken seriously by a new audience", "Build a personal audience or following", "Reduce admin and repeated explaining", "Support a launch or raise"],
        },
        {
          id: "s2_has_number", name: "Number attached", type: "radio", label: "Is there a number attached?",
          options: ["Yes", "No, it's more qualitative"],
          sub: [{ id: "s2_number_detail", name: "The number", type: "textarea", label: "What is it, and where are you today?", showIf: "Number attached:Yes" }],
        },
        {
          id: "s2_success_metric", name: "How you'll know it's working", type: "checkbox", label: "How will you know it's working?",
          options: ["Inquiry volume", "Conversion rate", "Revenue or average order value", "Bookings", "Newsletter signups", "Interview or opportunity requests", "Time spent answering the same questions", "Gut feel", "We don't track much right now"],
        },
        { id: "s2_failure", name: "What failure looks like", type: "textarea", label: "What would make this project a failure, even if the site looked great?", required: true },
      ],
    },

    // ---- conditional: brand ----
    {
      heading: "Brand direction",
      sub: "Shown because Brand identity is in scope.",
      showIf: "Scope:Brand identity",
      questions: [
        { id: "s2_brand_exists", name: "Existing brand assets", type: "checkbox", label: "What exists today?", options: ["Logo", "Color palette", "Typefaces", "Imagery style", "Packaging", "Guidelines document", "Nothing formal"] },
        { id: "s2_brand_upload", name: "Brand assets upload", type: "file", label: "Upload what you have", help: "Logos, guidelines, anything." },
        { id: "s2_brand_working", name: "What's working / not", type: "textarea", label: "What's working about the current identity, and what isn't?" },
        { id: "s2_brand_untouchable", name: "Untouchable elements", type: "textarea", label: "Is anything untouchable?", help: "A name, a mark, a color with history." },
        { id: "s2_brand_person", name: "Brand as a person", type: "textarea", label: "If your brand were a person walking into a room, describe them." },
        { id: "s2_brand_feel", name: "First-three-seconds feeling", type: "text", label: "What should someone feel in the first three seconds?" },
        { id: "s2_brand_never_feel", name: "Never feel", type: "text", label: "And what should they never feel?" },
        {
          id: "s2_brand_deliverables", name: "Brand deliverables", type: "checkbox", label: "Deliverables you're expecting",
          options: ["Primary logo + variations", "Wordmark / monogram", "Color palette", "Typography system", "Guidelines document", "Patterns", "Photo art direction", "Social templates", "Packaging", "Menus / print", "Signage", "Email templates", "Other"],
        },
      ],
    },
    {
      heading: "Visual territory",
      sub: "Shown because Brand identity is in scope.",
      showIf: "Scope:Brand identity",
      questions: [
        { id: "s2_visual_admire", name: "Visual references admired", type: "textarea", label: "Brands whose visual world you admire", help: "Three to five, with links, and one line each on what you like." },
        { id: "s2_visual_dislike", name: "Visual dislikes", type: "textarea", label: "Anything you actively dislike?" },
        { id: "s2_moodboard", name: "Mood board link", type: "url", label: "Mood board link", help: "Pinterest, Are.na, Figma, a folder." },
        { id: "s2_physical", name: "Where the brand lives physically", type: "checkbox", label: "Where does this brand live in the physical world?", options: ["Nowhere — fully digital", "Storefront / interior", "Packaging", "Print", "Signage", "Uniforms / apparel", "Events / markets", "Vehicles"] },
        {
          id: "s2_photography", name: "Photography status", type: "radio", label: "Photography",
          options: ["Strong library", "Some usable, needs more", "Stock only", "Nothing yet"],
          sub: [{ id: "s2_photography_link", name: "Photography link", type: "textarea", label: "Share a link or upload samples.", showIf: "Photography status:Strong library" }],
        },
        { id: "s2_photo_budget", name: "New photography budget", type: "radio", label: "Do you have budget or plans for new photography?", options: ["Yes, budgeted", "Want to, not budgeted", "No — work with what exists"] },
      ],
    },

    // ---- conditional: website / portfolio ----
    {
      heading: "Site architecture",
      sub: "Shown because a website or portfolio is in scope.",
      showIf: "Scope:Website or portfolio",
      questions: [
        { id: "s2_site_purpose", name: "Primary purpose of site", type: "radio", label: "Primary purpose of the site", options: ["Sell products", "Generate inquiries", "Take bookings", "Showcase work", "Inform and build credibility", "Build community"] },
        { id: "s2_site_action", name: "Single desired action", type: "text", label: "The one action you most want a visitor to take" },
        {
          id: "s2_pages", name: "Required pages", type: "checkbox", label: "Pages you know you need",
          options: ["Home", "About", "Services", "Work / portfolio", "Shop", "Product", "Menu", "Locations", "Contact", "Book / reserve", "Journal / blog", "Press", "FAQ", "Events", "Newsletter", "Careers", "Wholesale", "Account", "Other"],
        },
        { id: "s2_pages_cut", name: "Pages to lose", type: "textarea", label: "Are there pages on your current site you'd be glad to lose?", help: "Optional." },
        {
          id: "s2_functionality", name: "Functionality needed", type: "checkbox", label: "Functionality you need",
          options: ["Online ordering", "Reservations / booking", "Ecommerce checkout", "Subscriptions", "Gift cards", "Memberships", "Contact forms", "Newsletter signup", "Events calendar", "Multi-location", "Multi-language", "Blog / CMS", "Customer accounts", "Reviews", "Live chat"],
          sub: [{ id: "s2_booking_system", name: "Booking system", type: "text", label: "Which system? (Resy, Tock, OpenTable, Calendly, Acuity…)", showIf: "Functionality needed:Reservations / booking" }],
        },
        {
          id: "s2_maintainer", name: "Who updates after launch", type: "radio", label: "Who will update the site after launch?",
          options: ["Me", "Someone on my team", "Nobody, ideally", "I'd like you to handle it"],
          sub: [{ id: "s2_maintainer_freq", name: "Update frequency", type: "text", label: "How often, and what kinds of updates?", showIf: "Who updates after launch:Someone on my team|I'd like you to handle it" }],
        },
        {
          id: "s2_cms_comfort", name: "CMS comfort", type: "scale", label: "How comfortable is that person with a CMS?",
          help: "1 = needs it foolproof · 5 = very comfortable.",
        },
      ],
    },
    {
      heading: "Ecommerce",
      sub: "Shown because Ecommerce is in scope.",
      showIf: "Scope:Ecommerce",
      questions: [
        { id: "s2_ecom_count", name: "Products at launch", type: "number", label: "How many products at launch?" },
        { id: "s2_ecom_change", name: "Catalog change frequency", type: "radio", label: "How often does the catalog change?", options: ["Rarely — a stable core", "Seasonally", "Monthly", "Constantly / made-to-order"] },
        { id: "s2_ecom_variants", name: "Product variants", type: "checkbox", label: "Do products have variants?", options: ["Size", "Color", "Material", "Bundles", "Made to order", "No variants"] },
        { id: "s2_ecom_inventory", name: "Inventory management", type: "text", label: "Where is inventory managed today?" },
        { id: "s2_ecom_shipping", name: "Shipping & fulfillment", type: "textarea", label: "Shipping and fulfillment", help: "Who ships, from where, domestic or international, any 3PL, local pickup." },
        { id: "s2_ecom_other_channels", name: "Other sales channels", type: "checkbox", label: "Are you also selling wholesale or in person?", options: ["Wholesale / stockists", "Retail location", "Markets or pop-ups", "Online only"] },
        { id: "s2_ecom_unusual", name: "Unusual buying experience", type: "textarea", label: "Anything that makes your buying experience unusual?", help: "Optional. Made-to-order timelines, waitlists, drops, sizing complexity." },
      ],
    },
    {
      heading: "Website experience",
      sub: "Shown because a website or portfolio is in scope.",
      showIf: "Scope:Website or portfolio",
      questions: [
        { id: "s2_sites_admire", name: "Sites admired", type: "textarea", label: "Sites you admire", help: "Three to five, with links, and one line each on what you like." },
        { id: "s2_sites_dislike", name: "Sites disliked", type: "textarea", label: "Sites you dislike, or that got it wrong", help: "Optional." },
        { id: "s2_current_frustration", name: "Current site frustrations", type: "textarea", label: "What frustrates you about your current site?", help: "Skip if there isn't one." },
        { id: "s2_faq_questions", name: "Repeated customer questions", type: "textarea", label: "What questions do customers ask you over and over?", help: "Every one of these is a page or section that isn't doing its job." },
        { id: "s2_mobile_share", name: "Mobile traffic share", type: "radio", label: "How much of your traffic is on a phone?", options: ["Almost all of it", "Mostly mobile", "Roughly even", "Mostly desktop", "No idea"] },
        { id: "s2_motion", name: "Site motion", type: "radio", label: "How should the site move?", options: ["Still and quiet", "Subtle motion, light transitions", "Noticeably animated", "Motion is the point"] },
        {
          id: "s2_accessibility", name: "Accessibility requirements", type: "radio", label: "Accessibility requirements?",
          options: ["Yes, we have a standard to meet", "No formal requirement, but do it well", "Haven't thought about it"],
          sub: [{ id: "s2_accessibility_standard", name: "Accessibility standard", type: "text", label: "Which standard, and is it contractual?", showIf: "Accessibility requirements:Yes, we have a standard to meet" }],
        },
      ],
    },
    {
      heading: "Content & assets",
      sub: "Shown because a website or portfolio is in scope.",
      showIf: "Scope:Website or portfolio",
      questions: [
        {
          id: "s2_copy_source", name: "Copy source", type: "radio", label: "Where does the written copy come from?",
          options: ["I'll write it", "I have most of it already", "I want you to write it", "I want a writer brought in", "Haven't thought about it yet"],
        },
        {
          id: "s2_content_exists", name: "Existing content", type: "checkbox", label: "What content exists today?",
          options: ["Product photography", "Lifestyle photography", "Team or founder photos", "Space or interior photos", "Video", "Logo files", "Written copy", "Testimonials or reviews", "Press mentions", "Menus or price lists", "Nothing much"],
        },
        { id: "s2_content_upload", name: "Content upload", type: "file", label: "Upload or link what you have" },
        {
          id: "s2_content_ready", name: "Content readiness", type: "radio", label: "Realistically, when can you have content ready?",
          help: "Honest answers here protect your timeline. Content is the single most common reason projects slip.",
          options: ["It's ready now", "Within two weeks", "Within a month", "I'll need help with this — it's the part I'm worried about"],
        },
      ],
    },
    {
      heading: "Content support",
      sub: "Shown because Content / copy support is in scope.",
      showIf: "Scope:Content / copy support",
      questions: [
        {
          id: "s2_copy_pieces", name: "Copy pieces needed", type: "checkbox", label: "Which pieces do you want written?",
          options: ["Homepage", "About", "Services or product descriptions", "Taglines and headlines", "Photo captions", "Email welcome sequence", "Social bios", "Press or boilerplate"],
        },
        { id: "s2_story_source", name: "Best source for the story", type: "text", label: "Is there someone who knows the story best?", help: "Who should I interview?" },
      ],
    },

    // ---- always shown ----
    {
      heading: "Platform & technical",
      questions: [
        {
          id: "s2_domain", name: "Domain status", type: "radio", label: "Do you have a domain?",
          options: ["Yes", "No, need help buying one", "Not sure"],
          sub: [{ id: "s2_domain_detail", name: "Domain detail", type: "text", label: "What is it, and who is it registered with?", showIf: "Domain status:Yes" }],
        },
        {
          id: "s2_platform_accounts", name: "Existing platform accounts", type: "checkbox", label: "Existing platform accounts",
          help: "No login emails or usernames needed here — I'll ask for a collaborator invite once we're underway.",
          options: ["Shopify", "Webflow", "Squarespace", "WordPress", "Wix", "Custom build", "None"],
        },
        {
          id: "s2_platform_pref", name: "Platform preference", type: "radio", label: "Do you have a platform preference?",
          options: ["Yes", "No — recommend what's right"],
          sub: [{ id: "s2_platform_pref_detail", name: "Platform preference detail", type: "text", label: "Which, and why?", showIf: "Platform preference:Yes" }],
        },
        {
          id: "s2_email_list", name: "Email marketing status", type: "radio", label: "Email marketing",
          options: ["Yes, active list", "Have a tool, barely use it", "Nothing yet, want to start", "Not interested"],
          sub: [{ id: "s2_email_list_detail", name: "Email platform & size", type: "text", label: "Which platform, and roughly how many subscribers?", showIf: "Email marketing status:Yes, active list" }],
        },
        { id: "s2_integrations", name: "Other integrations", type: "checkbox", label: "Other tools that need to connect", options: ["POS (Square, Toast, Clover)", "Booking system", "Inventory", "CRM", "Accounting", "Analytics", "Zapier / Make", "Loyalty program", "Other"] },
        { id: "s2_access", name: "Current access holders", type: "textarea", label: "Who currently has access to your domain, hosting and accounts?", help: "Including a past developer or agency.", required: true },
        { id: "s2_legal", name: "Legal / compliance requirements", type: "textarea", label: "Any legal, compliance or brand requirements?", help: "Optional. Licensing, allergen or health disclosures, accessibility mandates." },
      ],
    },
    {
      heading: "Working together",
      questions: [
        { id: "s2_point_of_contact", name: "Main point of contact", type: "text", label: "Who's the main point of contact?", required: true },
        { id: "s2_final_approval", name: "Final approval", type: "text", label: "Who has final approval?", help: "If it's more than one person, say who breaks a tie.", required: true },
        { id: "s2_other_voices", name: "Other stakeholders", type: "textarea", label: "Anyone else who'll weigh in?", help: "Optional." },
        { id: "s2_comm_pref", name: "Communication preference", type: "radio", label: "How do you prefer to communicate?", options: ["Email", "Scheduled calls", "Async video (Loom)", "Slack or text", "Mix"] },
        { id: "s2_turnaround", name: "Feedback turnaround", type: "radio", label: "Realistic turnaround on feedback", options: ["Same day", "Within 2 days", "Within a week", "Longer — I'm slow, plan for it"] },
        { id: "s2_hard_date", name: "Hard date", type: "date", label: "Any hard dates?", help: "Optional." },
        { id: "s2_hard_date_what", name: "What's happening on that date", type: "text", label: "What's happening on that date?", help: "Optional." },
        { id: "s2_work_style", name: "How you work", type: "textarea", label: "Anything about how you work I should know?", help: "Optional. You're visual and need to see it. You need to sit with things. You hate surprises." },
        { id: "s2_great_experience", name: "What would make it great", type: "textarea", label: "What would make this a great experience for you?", required: true },
        { id: "s2_last_word", name: "Anything unasked", type: "textarea", label: "Last one: what haven't I asked about that matters?", help: "Optional." },
      ],
    },
  ],
};
