import tourImages from "../data/tourIMG";

const tourCards = [
  {
    id: 1,
    title: `Welcome!`,
    description: "Welcome! Let's get you familiar with the app features.",
    action: "Next",
  },
  {
    id: 2,
    title: "Themes",
    preView: tourImages.themePv,
    description: "Customize your app with different themes and colors.",
    action: "Next",
  },
  {
    id: 3,
    title: "Music",
    preView: tourImages.soundPv,
    description: "Play music to boost your mood while using the app.",
    action: "Next",
  },
  {
    id: 4,
    title: "AI Friend",
    preView: tourImages.aiPv,
    description: "Our AI assistant gives fun tips or reactions to your tasks.",
    action: "Next",
  },
  {
    id: 5,
    title: "Avatar",
    preView: tourImages.avatarPv,
    description: "Choose your favorite avatar to personalize your app experience.",
    action: "Next",
  },
  {
    id: 6,
    title: "Your Reaction",
    preView: tourImages.ContactUsPNG,
    description: (
      <div className="flex flex-col items-center gap-3">
        <p>We'd love to know what you think!</p>
        <div className="flex gap-4 w-full justify-between">
          <a
            href="https://github.com/HQ-Coding?tab=overview&from=2025-09-01&to=2025-09-22"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 border w-full"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/hadi-qasemian-9a19512b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 border w-full"
          >
            LinkedIn
          </a>
        </div>
      </div>
    ),
    action: "Next",
  },
  {
    id: 7,
    title: "Hi, I'm Hadi",
    preView: tourImages.aboutMe,
    description:
      "This is a preview of my ToDo List app. In the future, I’ll add smarter AI actions, smooth animations, and Telegram AI companion features. This is just the beginning—stay tuned!",
    action: "Next",
  },
  {
    id: 8,
    title: "Start Using App",
    preView: tourImages.logo,
    description: "You're ready to start! Enjoy your experience 😄",
    action: "Start",
  },
];

export default tourCards;
