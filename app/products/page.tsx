export default function ProductsPage() {
  const plsBotFeatures = [
    {
      id: 1,
      title: "AI-Driven Communication",
      description:
        "Like ChatGPT, the PLS Bot leverages OpenAI's powerful generative capabilities to understand natural language, allowing you to interact with it conversationally. Simply ask questions, assign tasks, or request updates, and the bot will handle the rest.",
    },
    {
      id: 2,
      title: "Text-to-Speech & Voice Recorder Integration",
      description:
        "Enhance your interactions with the PLS Bot through its text-to-speech feature, allowing you to listen to updates and responses. Additionally, the integrated voice recorder lets you give voice commands or record project details directly, which the bot can transcribe and act upon.",
    },
    {
      id: 3,
      title: "Automated Task Management with Google Integration",
      description:
        "The PLS Bot not only manages tasks but also integrates seamlessly with Google Workspace. Automate task assignments, set reminders in Google Calendar, and track progress in Google Sheets—all without leaving the chat interface.",
    },
    {
      id: 4,
      title: "Real-Time Collaboration",
      description:
        "Enable seamless communication and collaboration across teams, with real-time updates and notifications, keeping everyone aligned and informed.",
    },
    {
      id: 5,
      title: "Advanced Analytics & Reporting",
      description:
        "Access powerful analytics to monitor project performance, identify bottlenecks, and make data-driven decisions that enhance productivity.",
    },
    {
      id: 6,
      title: "Customizable Workflow",
      description:
        "Tailor the bot to fit your unique project requirements with customizable workflows, ensuring maximum efficiency and effectiveness.",
    },
  ];

  const crmBotFeatures = [
    {
      id: 1,
      title: "Conversational AI for Customer Engagement",
      description:
        "Leveraging AI like ChatGPT, the CRM Bot interacts with your customers in a natural, conversational manner, providing personalized responses and handling queries efficiently. Powered by OpenAI, it generates human-like text that makes your customer interactions feel more authentic.",
    },
    {
      id: 2,
      title: "Text-to-Speech & Voice Recorder Integration",
      description:
        "Improve accessibility and convenience with text-to-speech capabilities, allowing you to listen to customer insights or instructions. The voice recorder feature enables you to capture voice notes or customer feedback, which the bot can process and incorporate into its responses.",
    },
    {
      id: 3,
      title: "360° Customer View",
      description:
        "Get a comprehensive view of each customer, including their history, preferences, and interactions, to tailor your communication and service.",
    },
    {
      id: 4,
      title: "Automated Follow-Ups with Google Integration",
      description:
        "The CRM Bot integrates with Google Workspace to automate follow-ups, schedule meetings in Google Calendar, and manage customer data in Google Sheets, ensuring a seamless workflow.",
    },
    {
      id: 5,
      title: "Lead Management",
      description:
        "Efficiently track and nurture leads through the sales funnel, with real-time insights on lead status and next steps.",
    },
    {
      id: 6,
      title: "Customizable Workflow",
      description:
        "Tailor the bot to fit your unique project requirements with customizable workflows, ensuring maximum efficiency and effectiveness.",
    },
  ];

  return (
    <div className="solution py-20 sm:py-32 mt-10 ">
      <div className="flex items-center flex-col  px-6 lg:px-20">
        {/* Fendous PLS Bot Section */}
        <div className="max-w-3xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
            <span className="text-[#CB6CE6]">FENDOUS PLS BOT</span>
            <br></br>{" "}
            <h2 className="text-lg">Your Project Management Powerhouse</h2>
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Managing projects can be complex and time-consuming. The Fendous
            Project Leading Software (PLS) Bot, powered by advanced OpenAI
            similar to AI Assistants, is designed to streamline your project
            management processes, making it easier to track, manage, and execute
            projects of any scale.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plsBotFeatures.map((feature) => (
            <article
              key={feature.id}
              className="flex max-w-xl flex-col rounded-xl pt-6 pb-20 px-4 items-center justify-between bg-indigo-800 transition-transform transform hover:scale-105"
            >
              <div className="group relative text-center">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-200 group-hover:text-pink-3">
                  {feature.title}
                </h3>
                <p className="mt-5 text-lg leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Fendous CRM Bot Section */}
        <div className="mt-16 mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
            <span className="text-[#CB6CE6]">Fendous CRM Bot</span>
            <br></br>
            <h2 className="text-lg">Empower Your Customer Relations</h2>
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            In today's competitive landscape, exceptional customer service is a
            key differentiator. The Fendous CRM Bot, powered by OpenAI similar
            to AI Assistants, is your ultimate tool for managing customer
            relationships, ensuring that every interaction is meaningful and
            contributes to long-term loyalty.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {crmBotFeatures.map((feature) => (
            <article
              key={feature.id}
              className="flex max-w-xl flex-col rounded-xl pt-6 pb-20 px-4 items-center justify-between bg-indigo-800 transition-transform transform hover:scale-105"
            >
              <div className="group relative text-center">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-200 group-hover:text-pink-3">
                  {feature.title}
                </h3>
                <p className="mt-5 text-lg leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
