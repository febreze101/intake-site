const BRIEF_DATA_PERSONAL = {
  sections: [
    {
      heading: "Orientation",
      questions: [
        { id: "s2_who", name: "Who's filling this out", type: "text", label: "Who's filling this out, and what's your role?", required: true },
        {
          id: "s2_scope", name: "Scope", type: "checkbox", label: "What do you need help with?",
          help: "This drives which sections show up below. Leave both unchecked if it's just the site itself.",
          options: ["Brand identity (logo, colors, look)", "Content / copy help"],
        },
      ],
    },
    {
      heading: "You & the work",
      questions: [
        { id: "s2_what", name: "What you do", type: "textarea", label: "Describe what you do to someone who's never heard of you.", help: "Plain language. No mission-statement voice. How would you say it to a friend at dinner?", required: true },
        { id: "s2_sell", name: "What you want to attract", type: "textarea", label: "What kind of work, roles, or opportunities are you hoping this site brings you?", help: "Freelance clients, a job, speaking or collaboration invites, just visibility. Be specific.", required: true },
        {
          id: "s2_findings", name: "How people find you", type: "checkbox", label: "How do people find you right now?",
          options: ["Word of mouth", "Instagram", "LinkedIn", "Portfolio sites (Dribbble, Behance, etc.)", "Google", "Referral from past work", "Not really being found yet"],
        },
        { id: "s2_blocker", name: "Biggest blocker", type: "textarea", label: "What's the single biggest thing holding you back right now?", required: true },
      ],
    },
    {
      heading: "Audience",
      questions: [
        { id: "s2_customer", name: "Ideal audience", type: "textarea", label: "Describe the person you most want this site to reach, as a specific person, not a demographic.", help: "A hiring manager, a client, a collaborator, a curator. What's their life like, what are they looking for when they land on your site? Give me someone I could picture.", required: true },
        { id: "s2_job", name: "Job to be done", type: "textarea", label: "What is that person actually trying to figure out when they land on your site?", help: "Whether you're good, whether you're available, whether you're the right fit.", required: true },
        { id: "s2_hesitate", name: "What makes them hesitate", type: "textarea", label: "What makes them hesitate to reach out?", help: "Not enough proof of work, unclear availability, price, not sure you do what they need.", required: true },
        { id: "s2_happy", name: "What people say when it lands", type: "textarea", label: "What do people say when they're happy with your work?", help: "Actual quotes if you have them: reviews, DMs, emails, feedback from a hiring manager or collaborator." },
      ],
    },
    {
      heading: "Messaging & voice",
      questions: [
        { id: "s2_one_sentence", name: "One-sentence takeaway", type: "textarea", label: "What's the one thing you need someone to understand about you, if they only read a single sentence?", required: true },
        { id: "s2_takeaways", name: "Key takeaways", type: "textarea", label: "What are the three things you'd want them to take away if they read the whole site?", help: "Rank them. The order shapes the page.", required: true },
        { id: "s2_misconception", name: "Common misconception", type: "textarea", label: "What do people commonly get wrong about you or your work?", help: "Optional." },
        {
          id: "s2_voice_scale", name: "Voice", type: "scale", label: "Where does your voice sit?",
          rows: ["Warm &harr; Cool", "Playful &harr; Serious", "Plainspoken &harr; Elevated", "Understated &harr; Bold", "Classic &harr; Experimental", "Expert &harr; Peer"],
        },
      ],
    },
    {
      heading: "Goals & success",
      questions: [
        { id: "s2_sixmonth", name: "Six-month success", type: "textarea", label: "What has to be true six months after this launches for it to have been worth it?", help: "Be specific. “Got a few interviews” is a wish, “three inbound project inquiries” is a goal.", required: true },
        {
          id: "s2_goal_primary", name: "Primary goal", type: "radio", label: "Primary goal for this project",
          options: ["Get hired / land more freelance or job opportunities", "Build a personal audience or following", "Be taken seriously by a new audience", "Support a job search or career move", "Just want an online presence that reflects me", "Other"],
        },
        {
          id: "s2_success_metric", name: "How you'll know it's working", type: "checkbox", label: "How will you know it's working?",
          options: ["Interview or opportunity requests", "Inquiry volume", "Portfolio views / traffic", "Newsletter or follower growth", "Gut feel", "We don't track much right now"],
        },
        { id: "s2_failure", name: "What failure looks like", type: "textarea", label: "What would make this project a failure, even if the site looked great?", help: "Optional." },
      ],
    },

    // ---- conditional: brand ----
    {
      heading: "Brand direction",
      sub: "Shown because Brand identity is in scope.",
      showIf: "Scope:Brand identity (logo, colors, look)",
      questions: [
        { id: "s2_brand_exists", name: "Existing brand assets", type: "checkbox", label: "What exists today?", options: ["Logo", "Color palette", "Typefaces", "Imagery style", "Guidelines document", "Nothing formal"] },
        { id: "s2_brand_upload", name: "Brand assets upload", type: "file", label: "Upload what you have", help: "Logos, guidelines, anything." },
        { id: "s2_brand_person", name: "Brand as a person", type: "textarea", label: "If your personal brand were a person walking into a room, describe them." },
        { id: "s2_brand_feel", name: "First-three-seconds feeling", type: "text", label: "What should someone feel in the first three seconds?" },
        { id: "s2_brand_never_feel", name: "Never feel", type: "text", label: "And what should they never feel?" },
        {
          id: "s2_brand_deliverables", name: "Brand deliverables", type: "checkbox", label: "Deliverables you're expecting",
          options: ["Primary logo + variations", "Wordmark / monogram", "Color palette", "Typography system", "Social templates", "Email templates", "Other"],
        },
      ],
    },
    {
      heading: "Visual territory",
      sub: "Shown because Brand identity is in scope.",
      showIf: "Scope:Brand identity (logo, colors, look)",
      questions: [
        { id: "s2_visual_admire", name: "Visual references admired", type: "textarea", label: "Sites or portfolios whose visual world you admire", help: "Three to five, with links, and one line each on what you like." },
        { id: "s2_visual_dislike", name: "Visual dislikes", type: "textarea", label: "Anything you actively dislike?", help: "Optional." },
        { id: "s2_moodboard", name: "Mood board link", type: "url", label: "Mood board link", help: "Pinterest, Are.na, Figma, a folder. Optional." },
        {
          id: "s2_photography", name: "Photography status", type: "radio", label: "Photos of you or your work",
          options: ["Strong library", "Some usable, needs more", "Nothing yet"],
          sub: [{ id: "s2_photography_link", name: "Photography link", type: "textarea", label: "Share a link or upload samples.", showIf: "Photography status:Strong library" }],
        },
      ],
    },

    {
      heading: "Site architecture",
      questions: [
        { id: "s2_site_purpose", name: "Primary purpose of site", type: "radio", label: "Primary purpose of the site", options: ["Generate inquiries", "Showcase work", "Land a job", "Inform and build credibility", "Build an audience"] },
        { id: "s2_site_action", name: "Single desired action", type: "text", label: "The one action you most want a visitor to take" },
        {
          id: "s2_pages", name: "Required pages", type: "checkbox", label: "Pages you know you need",
          options: ["Home", "About", "Work / portfolio", "Resume / CV", "Contact", "Journal / blog", "FAQ", "Other"],
        },
        {
          id: "s2_functionality", name: "Functionality needed", type: "checkbox", label: "Functionality you need",
          options: ["Contact form", "Newsletter signup", "Blog / CMS", "Password-protected pages", "Downloadable resume", "Case study / project pages"],
        },
        {
          id: "s2_maintainer", name: "Who updates after launch", type: "radio", label: "Who will update the site after launch?",
          options: ["Me", "Nobody, ideally", "I'd like you to handle it"],
        },
        {
          id: "s2_cms_comfort", name: "CMS comfort", type: "scale", label: "How comfortable are you with a CMS?",
          help: "1 = needs it foolproof · 5 = very comfortable.",
        },
      ],
    },
    {
      heading: "Website experience",
      questions: [
        { id: "s2_sites_admire", name: "Sites admired", type: "textarea", label: "Portfolio sites you admire", help: "Three to five, with links, and one line each on what you like." },
        { id: "s2_sites_dislike", name: "Sites disliked", type: "textarea", label: "Sites you dislike, or that got it wrong", help: "Optional." },
        { id: "s2_current_frustration", name: "Current site frustrations", type: "textarea", label: "What frustrates you about your current site?", help: "Skip if there isn't one." },
        { id: "s2_faq_questions", name: "Repeated questions", type: "textarea", label: "What questions do people ask you over and over about your work?", help: "Optional. Every one of these is a page or section that isn't doing its job." },
        { id: "s2_mobile_share", name: "Mobile traffic share", type: "radio", label: "How much of your traffic is on a phone?", options: ["Almost all of it", "Mostly mobile", "Roughly even", "Mostly desktop", "No idea"] },
        { id: "s2_motion", name: "Site motion", type: "radio", label: "How should the site move?", options: ["Still and quiet", "Subtle motion, light transitions", "Noticeably animated", "Motion is the point"] },
      ],
    },
    {
      heading: "Content & assets",
      questions: [
        {
          id: "s2_copy_source", name: "Copy source", type: "radio", label: "Where does the written copy come from?",
          options: ["I'll write it", "I have most of it already", "I want you to write it", "Haven't thought about it yet"],
        },
        {
          id: "s2_content_exists", name: "Existing content", type: "checkbox", label: "What content exists today?",
          options: ["Project photography / screenshots", "Personal photos", "Video or demo reels", "Logo files", "Written copy", "Testimonials or recommendations", "Press mentions", "Resume / CV", "Nothing much"],
        },
        { id: "s2_content_upload", name: "Content upload", type: "file", label: "Upload or link what you have" },
        {
          id: "s2_content_ready", name: "Content readiness", type: "radio", label: "Realistically, when can you have content ready?",
          help: "Honest answers here protect your timeline. Content is the single most common reason projects slip.",
          options: ["It's ready now", "Within two weeks", "Within a month", "I'll need help with this, it's the part I'm worried about"],
        },
      ],
    },
    {
      heading: "Content support",
      sub: "Shown because Content / copy help is in scope.",
      showIf: "Scope:Content / copy help",
      questions: [
        {
          id: "s2_copy_pieces", name: "Copy pieces needed", type: "checkbox", label: "Which pieces do you want written?",
          options: ["Homepage", "About", "Project descriptions", "Taglines and headlines", "Photo captions", "Social bios", "Resume / CV"],
        },
        { id: "s2_story_source", name: "Best source for the story", type: "text", label: "Is there someone else who knows your story well, or is it just you?", help: "Optional." },
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
          help: "No login emails or usernames needed here. I'll ask for a collaborator invite once we're underway.",
          options: ["Webflow", "Squarespace", "WordPress", "Wix", "Custom build", "None"],
        },
        {
          id: "s2_platform_pref", name: "Platform preference", type: "radio", label: "Do you have a platform preference?",
          options: ["Yes", "No, recommend what's right"],
          sub: [{ id: "s2_platform_pref_detail", name: "Platform preference detail", type: "text", label: "Which, and why?", showIf: "Platform preference:Yes" }],
        },
        { id: "s2_integrations", name: "Other integrations", type: "checkbox", label: "Other tools that need to connect", options: ["CRM", "Analytics", "Scheduling tool (Calendly, etc.)", "Zapier / Make", "None"] },
        { id: "s2_access", name: "Current access holders", type: "textarea", label: "Who currently has access to your domain, hosting and accounts?", help: "Including a past developer, if any. Optional." },
      ],
    },
    {
      heading: "Working together",
      questions: [
        { id: "s2_comm_pref", name: "Communication preference", type: "radio", label: "How do you prefer to communicate?", options: ["Email", "Scheduled calls", "Async video (Loom)", "Slack or text", "Mix"] },
        { id: "s2_turnaround", name: "Feedback turnaround", type: "radio", label: "Realistic turnaround on feedback", options: ["Same day", "Within 2 days", "Within a week", "Longer, I'm slow, plan for it"] },
        { id: "s2_hard_date", name: "Hard date", type: "date", label: "Any hard dates?", help: "Optional." },
        { id: "s2_hard_date_what", name: "What's happening on that date", type: "text", label: "What's happening on that date?", help: "Optional." },
        { id: "s2_work_style", name: "How you work", type: "textarea", label: "Anything about how you work I should know?", help: "Optional. You're visual and need to see it. You need to sit with things. You hate surprises." },
        { id: "s2_last_word", name: "Anything unasked", type: "textarea", label: "Last one: what haven't I asked about that matters?", help: "Optional." },
      ],
    },
  ],
};
