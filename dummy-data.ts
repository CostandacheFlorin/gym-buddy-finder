export const DUMMY_INTERESTS = [
  { id: "1", name: "powerlifting" },
  { id: "2", name: "bodybuilding" },
  { id: "3", name: "calisthenics" },
  { id: "4", name: "cardio" },
  { id: "5", name: "crossfit" },
];

export const COUNTRIES = [
  {
    id: "1",
    name: "Romania",
  },
  {
    id: "2",
    name: "France",
  },
  {
    id: "5",
    name: "England",
  },
  {
    id: "6",
    name: "Italy",
  },
  {
    id: "7",
    name: "Belgium",
  },
];

export const CITIES = [
  {
    id: "1",
    country: "Romania",
    name: "Galati",
  },
  {
    id: "2",
    country: "Romania",
    name: "Bucuresti",
  },
  {
    id: "3",
    country: "Romania",
    name: "Cluj",
  },
  {
    id: "4",
    country: "France",
    name: "Paris",
  },
  {
    id: "5",
    country: "Italy",
    name: "Rome",
  },
  {
    id: "6",
    country: "Belgium",
    name: "Bruxelles",
  },
  {
    id: "7",
    country: "England",
    name: "London",
  },
];
export const DUMMY_CHATS = [
  {
    users: [
      {
        id: "1",
        image: "/images/cat.jpeg",
        first_name: "Phillip",
        last_name: "Johnson",
      },
      {
        id: "2",
        image: "/images/cat.jpeg",
        first_name: "George",
        last_name: "Johnson",
      },
    ],
    messages: [
      {
        text: "Hey George, how are you?",
        date: new Date(Date.now() - 120 * 1000), // 2 minutes ago
        userId: "1",
        id: "1242411c24",
      },
      {
        text: "I'm good Phillip! How about you?",
        date: new Date(Date.now() - 110 * 1000), // 1 minute and 50 seconds ago
        userId: "2",
        id: "124d241",
      },
      {
        text: "Just working on a project. It's quite intense!",
        date: new Date(Date.now() - 100 * 1000), // 1 minute and 40 seconds ago
        userId: "1",
        id: "12421e4214241",
      },
      {
        text: "That sounds interesting. What kind of project?",
        date: new Date(Date.now() - 90 * 1000), // 1 minute and 30 seconds ago
        userId: "2",
        id: "124214f124",
      },
      {
        text: "A web development project with React.",
        date: new Date(Date.now() - 80 * 1000), // 1 minute and 20 seconds ago
        userId: "1",
        id: "214124g124",
      },
      // Additional messages
      {
        text: "How's the progress going?",
        date: new Date(Date.now() - 70 * 1000), // 1 minute and 10 seconds ago
        userId: "2",
        id: "124241h124",
      },
      {
        text: "It's going well. Almost done with the front-end.",
        date: new Date(Date.now() - 60 * 1000), // 1 minute ago
        userId: "1",
        id: "124q12424",
      },
      {
        text: "Nice! Are you using any specific libraries?",
        date: new Date(Date.now() - 50 * 1000), // 50 seconds ago
        userId: "2",
        id: "124s124f124",
      },
      {
        text: "Yes, Material-UI for UI components.",
        date: new Date(Date.now() - 40 * 1000), // 40 seconds ago
        userId: "1",
        id: "124v124124",
      },
      {
        text: "That's a good choice. It makes things easier.",
        date: new Date(Date.now() - 30 * 1000), // 30 seconds ago
        userId: "2",
        id: "1241241242",
      },
      {
        text: "Absolutely!",
        date: new Date(Date.now() - 20 * 1000), // 20 seconds ago
        userId: "1",
        id: "1241241e24",
      },
      {
        text: "We should catch up sometime.",
        date: new Date(Date.now() - 10 * 1000), // 10 seconds ago
        userId: "2",
        id: "124w124124",
      },
      // Extend the conversation further...
    ],
    last_message_date: new Date(Date.now() - 10 * 1000), // 10 seconds ago
    id: "1",
  },
  {
    users: [
      {
        id: "1",
        image: "/images/cat.jpeg",
        first_name: "Phillip",
        last_name: "Johnson",
      },
      {
        id: "3",
        image: "/images/cat.jpeg",
        first_name: "Mike",
        last_name: "Johnson",
      },
    ],
    messages: [
      {
        text: "Hey Mike, long time no see!",
        date: new Date(Date.now() - 300 * 1000), // 5 minutes ago
        userId: "1",
        id: "124h124",
      },
      {
        text: "Indeed, Phillip! How have you been?",
        date: new Date(Date.now() - 280 * 1000), // 4 minutes and 40 seconds ago
        userId: "3",
        id: "124124c124",
      },
      {
        text: "Busy with work. How about you?",
        date: new Date(Date.now() - 260 * 1000), // 4 minutes and 20 seconds ago
        userId: "1",
        id: "12d421421412",
      },
      {
        text: "Same here, just juggling a few projects.",
        date: new Date(Date.now() - 240 * 1000), // 4 minutes ago
        userId: "3",
        id: "2141s24124",
      },
      // Additional messages
      {
        text: "Anything interesting you're working on?",
        date: new Date(Date.now() - 230 * 1000), // 3 minutes and 50 seconds ago
        userId: "1",
        id: "12s4124d124",
      },
      {
        text: "I'm redesigning our company's website.",
        date: new Date(Date.now() - 220 * 1000), // 3 minutes and 40 seconds ago
        userId: "3",
        id: "124t12412d4",
      },
      {
        text: "That sounds like a big project.",
        date: new Date(Date.now() - 210 * 1000), // 3 minutes and 30 seconds ago
        userId: "1",
        id: "124hj1241",
      },
      {
        text: "It is, but it's exciting.",
        date: new Date(Date.now() - 200 * 1000), // 3 minutes and 20 seconds ago
        userId: "3",
        id: "124124th124",
      },
      {
        text: "When do you think it'll be done?",
        date: new Date(Date.now() - 190 * 1000), // 3 minutes and 10 seconds ago
        userId: "1",
        id: "12k41j24d124",
      },
      {
        text: "In about two weeks, I hope.",
        date: new Date(Date.now() - 180 * 1000), // 3 minutes ago
        userId: "3",
        id: "1241241s124",
      },
      {
        text: "Good luck with it!",
        date: new Date(Date.now() - 170 * 1000), // 2 minutes and 50 seconds ago
        userId: "1",
        id: "124124j24d124",
      },
      {
        text: "Thanks, Phillip!",
        date: new Date(Date.now() - 160 * 1000), // 2 minutes and 40 seconds ago
        userId: "3",
        id: "12412j4g124",
      },
      // Extend the conversation further...
    ],
    last_message_date: new Date(Date.now() - 160 * 1000), // 2 minutes and 40 seconds ago
    id: "2",
  },
  {
    users: [
      {
        id: "1",
        image: "/images/cat.jpeg",
        first_name: "Phillip",
        last_name: "Johnson",
      },
      {
        id: "4",
        image: "/images/cat.jpeg",
        first_name: "Sarah",
        last_name: "Johnson",
      },
    ],
    messages: [
      {
        text: "Hi Sarah, are you free this weekend?",
        date: new Date(Date.now() - 600 * 1000), // 10 minutes ago
        userId: "1",
        id: "124214214f12",
      },
      {
        text: "Hi Phillip, yes I am! What's up?",
        date: new Date(Date.now() - 580 * 1000), // 9 minutes and 40 seconds ago
        userId: "4",
        id: "124124ds124",
      },
      {
        text: "Thinking of a get-together with friends.",
        date: new Date(Date.now() - 560 * 1000), // 9 minutes and 20 seconds ago
        userId: "1",
        id: "12412412sad412",
      },
      {
        text: "That sounds great! Count me in.",
        date: new Date(Date.now() - 540 * 1000), // 9 minutes ago
        userId: "4",
        id: "1241241asd2412",
      },
      // Additional messages
      {
        text: "Who else is coming?",
        date: new Date(Date.now() - 530 * 1000), // 8 minutes and 50 seconds ago
        userId: "1",
        id: "124124as124",
      },
      {
        text: "Just a few friends from work.",
        date: new Date(Date.now() - 520 * 1000), // 8 minutes and 40 seconds ago
        userId: "4",
        id: "124124asf124",
      },
      {
        text: "Sounds like a fun gathering.",
        date: new Date(Date.now() - 510 * 1000), // 8 minutes and 30 seconds ago
        userId: "1",
        id: "124124fgs124",
      },
      {
        text: "Definitely!",
        date: new Date(Date.now() - 500 * 1000), // 8 minutes and 20 seconds ago
        userId: "4",
        id: "124124fg124",
      },
      {
        text: "What time are we meeting?",
        date: new Date(Date.now() - 490 * 1000), // 8 minutes and 10 seconds ago
        userId: "1",
        id: "124124fgd124",
      },
      {
        text: "Around 7 PM at the usual place.",
        date: new Date(Date.now() - 480 * 1000), // 8 minutes ago
        userId: "4",
        id: "124124saf124",
      },
      {
        text: "Sounds good!",
        date: new Date(Date.now() - 470 * 1000), // 7 minutes and 50 seconds ago
        userId: "1",
        id: "124124sg124",
      },
      {
        text: "Looking forward to it!",
        date: new Date(Date.now() - 460 * 1000), // 7 minutes and 40 seconds ago
        userId: "4",
        id: "124124sfd124",
      },
      {
        text: "Me too!",
        date: new Date(Date.now() - 450 * 1000), // 7 minutes and 30 seconds ago
        userId: "1",
        id: "124124sfg124",
      },
      {
        text: "See you then.",
        date: new Date(Date.now() - 440 * 1000), // 7 minutes and 20 seconds ago
        userId: "4",
        id: "124124sfgd124",
      },

      {
        text: "Bet.",
        date: new Date(Date.now() - 430 * 1000), // 7 minutes and 20 seconds ago
        userId: "1",
        id: "12412s4sfgd124",
      },
      // Extend the conversation further...
    ],
    last_message_date: new Date(Date.now() - 440 * 1000), // 7 minutes and 20 seconds ago
    id: "3",
  },
];
