export default function UseCasesPage() {
  const useCases = [
    {
      id: 1,
      title: "Customer Support Automation",
      industry: "E-commerce, Retail, SaaS, Banking, Healthcare",
      objective: "Reduce response time and enhance customer experience",
      functionality: [
        "24/7 automated responses to FAQs",
        "Escalation to human agents for complex queries",
        "Personalized recommendations based on user history",
        "Real-time order tracking and support",
      ],
    },
    {
      id: 2,
      title: "Lead Generation & Sales Assistance",
      industry: "Real Estate, Finance, B2B Services, Automotive",
      objective: "Convert website visitors into potential leads",
      functionality: [
        "Interactive lead capture forms",
        "Qualifying leads through pre-defined questionnaires",
        "Scheduling sales calls or meetings automatically",
        "Integrating with CRM for streamlined data handling",
      ],
    },
    {
      id: 3,
      title: "HR & Employee Support",
      industry: "Corporate, HR Services, IT Firms",
      objective: "Automate HR functions and improve employee engagement",
      functionality: [
        "Employee onboarding and policy guidance",
        "Leave management and attendance tracking",
        "Internal helpdesk for IT and administrative support",
        "Training and learning recommendations",
      ],
    },
    {
      id: 4,
      title: "Educational Support & E-learning",
      industry: "Universities, Online Learning Platforms, Schools",
      objective: "Enhance student engagement and automate academic queries",
      functionality: [
        "Course recommendations and enrollment assistance",
        "AI-powered tutoring and query resolution",
        "Assignment reminders and deadline tracking",
        "Admission guidance",
      ],
    },
    {
      id: 5,
      title: "Project Management Assistance",
      industry: "IT, Construction, Marketing, Corporate Teams",
      objective: "Improve workflow efficiency and collaboration",
      functionality: [
        "Task assignment and progress tracking",
        "Automated deadline reminders and notifications",
        "Integration with project management tools (Fendous PLS)",
        "AI-driven insights for risk assessment and resource allocation",
      ],
    },
  ];

  return (
    <div className="solution py-20 sm:py-32 mt-10">
      <div className="flex items-center flex-col px-6 lg:px-20">
        {/* Introduction Section */}
        <div className="max-w-3xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
            <span className="text-[#CB6CE6]">Fendous AI Chatbots</span>
            <br></br>
            <h2 className="text-lg">Enhancing Business Efficiency and User Experience</h2>
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Fendous AI Chatbots are designed to enhance business efficiency, automate customer interactions, and improve user experience. These intelligent chatbots cater to various industries, providing seamless communication, personalized responses, and real-time assistance.
          </p>
        </div>

        {/* Use Cases Section */}
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {useCases.map((useCase) => (
            <article
              key={useCase.id}
              className="flex max-w-xl flex-col rounded-xl pt-6 pb-20 px-4 items-center justify-between bg-indigo-800 transition-transform transform hover:scale-105"
            >
              <div className="group relative text-center">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-200 group-hover:text-pink-3">
                  {useCase.title}
                </h3>
                <p className="mt-4 text-md font-medium text-gray-300">
                  <span className="font-bold">Industry:</span> {useCase.industry}
                </p>
                <p className="mt-2 text-md font-medium text-gray-300">
                  <span className="font-bold">Objective:</span> {useCase.objective}
                </p>
                <ul className="mt-4 text-md leading-6 text-gray-400 text-left list-disc list-inside">
                  {useCase.functionality.map((func, index) => (
                    <li key={index} className="mt-2">
                      {func}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}