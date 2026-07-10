// Seed content for Eritrea Learn Academy.
// Instruction languages available across courses: Tigrigna, English, Arabic
// (the three widely-understood languages in Eritrea).

const TRI = ['Tigrigna', 'English', 'Arabic'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const courses = [
  {
    slug: 'english', title: 'English', titleTi: 'እንግሊዝኛ', category: 'English', flag: '🇬🇧',
    description: 'From your first words to confident conversation. Reading, listening, and daily practice — beginner to advanced.',
    price: 39, levels: LEVELS, instructionLanguages: TRI, focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
    modules: ['Alphabet & sounds', 'Greetings & introductions', 'Everyday vocabulary', 'Grammar foundations', 'Reading comprehension', 'Listening & speaking', 'Writing basics'],
  },
  {
    slug: 'computer-skills', title: 'Computer Skills', titleTi: 'ኮምፒተር', category: 'Computer', flag: '💻',
    description: 'Basic to advanced computing: files, Microsoft Office, the internet, and hands-on tasks you actually do on your computer.',
    price: 49, levels: LEVELS, instructionLanguages: TRI, focus: ['Reading', 'Practice'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    modules: ['Introduction to computers', 'Files & folders', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Internet & email', 'Staying safe online'],
  },
  {
    slug: 'arabic', title: 'Arabic', titleTi: 'ዓረብኛ', category: 'Language', flag: '🇸🇦',
    description: 'Learn Modern Standard Arabic — script, sounds, and speaking — taught in your language.',
    price: 39, levels: LEVELS, instructionLanguages: ['Tigrigna', 'English'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=500&fit=crop',
    modules: ['The Arabic alphabet', 'Vowels & pronunciation', 'Greetings', 'Numbers & time', 'Common phrases', 'Reading practice'],
  },
  {
    slug: 'amharic', title: 'Amharic', titleTi: 'ኣምሓርኛ', category: 'Language', flag: '🇪🇹',
    description: 'Master Amharic reading and conversation, building naturally on your Tigrigna.',
    price: 29, levels: LEVELS, instructionLanguages: ['Tigrigna', 'English'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1524749292158-7540c2494485?w=800&h=500&fit=crop',
    modules: ['Fidäl script', 'Greetings & politeness', 'Everyday words', 'Sentence building', 'Reading short texts'],
  },
  {
    slug: 'korean', title: 'Korean', titleTi: 'ኮርያኛ', category: 'Language', flag: '🇰🇷',
    description: 'Start with Hangul and reach real conversation — reading, listening, and practice.',
    price: 39, levels: LEVELS, instructionLanguages: ['English', 'Tigrigna'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=500&fit=crop',
    modules: ['Hangul basics', 'Greetings', 'Numbers', 'Everyday phrases', 'Listening practice'],
  },
  {
    slug: 'chinese', title: 'Chinese (Mandarin)', titleTi: 'ቻይንኛ', category: 'Language', flag: '🇨🇳',
    description: 'Pinyin, tones, characters, and speaking — Mandarin from scratch.',
    price: 39, levels: LEVELS, instructionLanguages: ['English', 'Tigrigna'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=500&fit=crop',
    modules: ['Pinyin & tones', 'Greetings', 'Numbers', 'Common characters', 'Listening practice'],
  },
  {
    slug: 'russian', title: 'Russian', titleTi: 'ሩስኛ', category: 'Language', flag: '🇷🇺',
    description: 'The Cyrillic alphabet, pronunciation, and everyday Russian — taught step by step.',
    price: 39, levels: LEVELS, instructionLanguages: ['English', 'Tigrigna', 'Arabic'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&h=500&fit=crop',
    modules: ['Cyrillic alphabet', 'Pronunciation', 'Greetings', 'Numbers & basics', 'Reading practice'],
  },
  {
    slug: 'typing', title: 'Typing Mastery', titleTi: 'ኪቦርድ', category: 'Typing', flag: '⌨️',
    description: 'Learn to type fast without looking — the fun way. Home row to full speed, with games and challenges.',
    price: 0, levels: LEVELS, instructionLanguages: ['English'], focus: ['Practice', 'Typing'],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=500&fit=crop',
    modules: ['Home row (asdf jkl;)', 'Top row', 'Bottom row', 'Capitals & punctuation', 'Numbers row', 'Speed drills', 'Real sentences'],
  },
];

const lessons = [
  // English — Beginner
  { courseSlug: 'english', level: 'Beginner', order: 1, title: 'Greetings & Introductions', type: 'Reading',
    body: `In English we greet people depending on the time of day.

- **Hello / Hi** — any time
- **Good morning** — before noon
- **Good afternoon** — 12pm–6pm
- **Good evening** — after 6pm

To introduce yourself: *"Hello, my name is ___. Nice to meet you."*
The other person replies: *"Nice to meet you too."*` },
  { courseSlug: 'english', level: 'Beginner', order: 2, title: 'Listen: Everyday Greetings', type: 'Listening',
    listenText: 'Hello. Good morning. How are you? I am fine, thank you. Nice to meet you. See you later. Goodbye.',
    body: 'Press play and listen. Then repeat each phrase out loud until it feels natural.' },
  { courseSlug: 'english', level: 'Beginner', order: 3, title: 'Practice: Introduce Yourself', type: 'Practice',
    body: 'Write three sentences about yourself in English:\n1. Your name\n2. Where you are from\n3. One thing you like\n\nExample: "My name is Sara. I am from Asmara. I like reading."',
    practiceTask: 'Type 3 sentences introducing yourself.' },
  // English — Intermediate
  { courseSlug: 'english', level: 'Intermediate', order: 1, title: 'Present Simple vs Present Continuous', type: 'Reading',
    body: `**Present simple** = habits and facts: *"I work every day."*
**Present continuous** = happening now: *"I am working right now."*

Form: am/is/are + verb-ing for the continuous.` },

  // Computer — Beginner (with practical tasks)
  { courseSlug: 'computer-skills', level: 'Beginner', order: 1, title: 'Parts of a Computer', type: 'Reading',
    body: `A computer has:
- **Monitor** — the screen you look at
- **Keyboard** — for typing
- **Mouse** — to point and click
- **CPU** — the "brain" that does the work
- **Storage** — where your files live` },
  { courseSlug: 'computer-skills', level: 'Beginner', order: 2, title: 'Practice: Create a Folder', type: 'Practice',
    body: 'Time to do it yourself on your computer!',
    practiceTask: 'On your Desktop, right-click → New → Folder. Name it "My Documents Practice". Then create a text file inside it called notes.txt. When done, mark this task complete.' },
  { courseSlug: 'computer-skills', level: 'Intermediate', order: 1, title: 'Practice: Format a Word Document', type: 'Practice',
    body: 'Open Microsoft Word (or Google Docs).',
    practiceTask: 'Type a short paragraph, then: make the title bold and size 18, change the body to Times New Roman size 12, and save the file as "practice.docx". Mark complete when finished.' },

  // Arabic — Beginner
  { courseSlug: 'arabic', level: 'Beginner', order: 1, title: 'The Arabic Alphabet', type: 'Reading',
    body: `Arabic is written right-to-left and has 28 letters. Start with these:

- ا (alif) — like "a"
- ب (baa) — like "b"
- ت (taa) — like "t"
- م (meem) — like "m"

Letters change shape depending on their position in a word.` },
  { courseSlug: 'arabic', level: 'Beginner', order: 2, title: 'Listen: Arabic Greetings', type: 'Listening',
    listenText: 'As-salaamu alaykum. Wa alaykum as-salaam. Sabah al-khayr. Masaa al-khayr. Shukran.',
    body: 'Listen and repeat these common Arabic greetings.' },

  // Russian — Beginner
  { courseSlug: 'russian', level: 'Beginner', order: 1, title: 'The Cyrillic Alphabet', type: 'Reading',
    body: `Russian uses the Cyrillic alphabet. Some letters look familiar but sound different:

- А а — "a"
- Б б — "b"
- В в — "v" (not "b"!)
- Г г — "g"
- Д д — "d"

Others are new: Ж, Ц, Ш, Щ.` },
  { courseSlug: 'russian', level: 'Beginner', order: 2, title: 'Listen: Russian Greetings', type: 'Listening',
    listenText: 'Privet. Zdravstvuyte. Kak dela? Khorosho, spasibo. Do svidaniya.',
    body: 'Listen to informal and formal Russian greetings, then repeat.' },

  // Korean, Chinese, Amharic — one reading each
  { courseSlug: 'korean', level: 'Beginner', order: 1, title: 'Hangul: The Korean Alphabet', type: 'Reading',
    body: `Hangul is famously logical. Consonants + vowels form blocks:

- ㄱ (g/k), ㄴ (n), ㅁ (m)
- ㅏ (a), ㅓ (eo), ㅗ (o)

안녕하세요 (annyeonghaseyo) = "hello".` },
  { courseSlug: 'chinese', level: 'Beginner', order: 1, title: 'Pinyin & the Four Tones', type: 'Reading',
    body: `Mandarin is tonal. The syllable "ma" changes meaning by tone:

1. mā (妈) — mother
2. má (麻) — hemp
3. mǎ (马) — horse
4. mà (骂) — to scold

你好 (nǐ hǎo) = "hello".` },
  { courseSlug: 'amharic', level: 'Beginner', order: 1, title: 'The Fidäl Script', type: 'Reading',
    body: `Amharic uses the Fidäl (ፊደል) syllabary — the same script family as Tigrigna, so you already know many symbols!

Greetings:
- ሰላም (selam) — hello / peace
- እንደምን አለህ? (ïndemïn alleh?) — how are you? (to a man)` },
];

const placements = [
  { courseSlug: 'english', questions: [
    { prompt: 'Choose the correct greeting for the morning:', options: ['Good night', 'Good morning', 'Goodbye'], answer: 1 },
    { prompt: 'Which sentence is correct?', options: ['She go to school', 'She goes to school', 'She going school'], answer: 1 },
    { prompt: 'Past tense of "eat":', options: ['eated', 'ate', 'eaten'], answer: 1 },
    { prompt: 'Choose the correct: "If I ___ rich, I would travel."', options: ['am', 'was', 'were'], answer: 2 },
  ] },
  { courseSlug: 'computer-skills', questions: [
    { prompt: 'What does the mouse do?', options: ['Type letters', 'Point and click', 'Store files'], answer: 1 },
    { prompt: 'Which program is for spreadsheets?', options: ['Word', 'Excel', 'PowerPoint'], answer: 1 },
    { prompt: 'A shortcut to copy is:', options: ['Ctrl+C', 'Ctrl+P', 'Ctrl+Z'], answer: 0 },
    { prompt: 'A "cloud" service like Google Drive lets you:', options: ['Print faster', 'Store files online', 'Type in color'], answer: 1 },
  ] },
  { courseSlug: 'russian', questions: [
    { prompt: 'The Cyrillic letter "В" sounds like:', options: ['B', 'V', 'W'], answer: 1 },
    { prompt: '"Privet" means:', options: ['Goodbye', 'Hello (informal)', 'Thank you'], answer: 1 },
  ] },
  { courseSlug: 'arabic', questions: [
    { prompt: 'Arabic is written:', options: ['Left to right', 'Right to left', 'Top to bottom'], answer: 1 },
    { prompt: '"Shukran" means:', options: ['Hello', 'Thank you', 'Please'], answer: 1 },
  ] },
];

const quizzes = [
  { courseSlug: 'english', title: 'Greetings Check', level: 'Beginner', questions: [
    { prompt: 'How do you greet someone at 8pm?', options: ['Good morning', 'Good evening', 'Good afternoon'], answer: 1, explanation: 'After 6pm we say "Good evening".' },
    { prompt: 'Reply to "Nice to meet you":', options: ['Nice to meet you too', 'Good night', 'You are welcome'], answer: 0, explanation: 'We mirror the greeting.' },
  ] },
  { courseSlug: 'computer-skills', title: 'Computer Basics Quiz', level: 'Beginner', questions: [
    { prompt: 'The "brain" of the computer is the:', options: ['Monitor', 'CPU', 'Mouse'], answer: 1, explanation: 'The CPU processes everything.' },
    { prompt: 'To save a file, press:', options: ['Ctrl+S', 'Ctrl+A', 'Ctrl+X'], answer: 0, explanation: 'Ctrl+S = Save.' },
  ] },
];

const flashcards = [
  { courseSlug: 'russian', title: 'Cyrillic Letters', cards: [
    { front: 'А', back: 'a' }, { front: 'Б', back: 'b' }, { front: 'В', back: 'v' }, { front: 'Г', back: 'g' }, { front: 'Д', back: 'd' },
  ] },
  { courseSlug: 'arabic', title: 'First Arabic Letters', cards: [
    { front: 'ا', back: 'alif — a' }, { front: 'ب', back: 'baa — b' }, { front: 'ت', back: 'taa — t' }, { front: 'م', back: 'meem — m' },
  ] },
  { courseSlug: 'english', title: 'Everyday Verbs', cards: [
    { front: 'to eat', back: 'ate / eaten' }, { front: 'to go', back: 'went / gone' }, { front: 'to see', back: 'saw / seen' }, { front: 'to have', back: 'had / had' },
  ] },
];

const exams = [
  { courseSlug: 'english', level: 'Beginner', kind: 'Theoretical', title: 'English Beginner — Final (Theory)', questions: [
    { prompt: 'Choose the correct article: "I saw ___ elephant."', options: ['a', 'an', 'the'], answer: 1 },
    { prompt: 'Plural of "child":', options: ['childs', 'children', 'childes'], answer: 1 },
    { prompt: 'Which is a question?', options: ['You are happy.', 'Are you happy?', 'Happy you are.'], answer: 1 },
  ] },
  { courseSlug: 'computer-skills', level: 'Beginner', kind: 'Practical', title: 'Computer Beginner — Final (Practical)', tasks: [
    'Create a folder named "Exam" on your Desktop.',
    'Open Word, type your full name and today\'s date, make your name bold.',
    'Save the document as "myexam.docx" inside the "Exam" folder.',
    'Take a screenshot of the saved file and keep it for your records.',
  ] },
  { courseSlug: 'computer-skills', level: 'Beginner', kind: 'Theoretical', title: 'Computer Beginner — Final (Theory)', questions: [
    { prompt: 'Which stores your files permanently?', options: ['RAM', 'Hard drive / SSD', 'Monitor'], answer: 1 },
    { prompt: 'The shortcut to paste is:', options: ['Ctrl+V', 'Ctrl+B', 'Ctrl+N'], answer: 0 },
  ] },
];

// Typing drills — structured like typing.com progression.
const typingDrills = [
  { level: 'Beginner', order: 1, title: 'Home Row: asdf jkl;', text: 'asdf jkl; asdf jkl; fjfj dkdk slsl a;a; fdsa jkl;', targetWpm: 15, tip: 'Rest your fingers on a-s-d-f and j-k-l-;. Never look down!' },
  { level: 'Beginner', order: 2, title: 'Home Row Words', text: 'dad sad lad fall glass ask flask salad gall',  targetWpm: 18, tip: 'Keep wrists floating, not resting on the desk.' },
  { level: 'Beginner', order: 3, title: 'Top Row: qwerty', text: 'qwer tyui op quiet power tower query type write', targetWpm: 20, tip: 'Reach up from the home row, then come right back.' },
  { level: 'Intermediate', order: 4, title: 'Bottom Row: zxcvbnm', text: 'zxcv bnm, zebra vacuum climb number brave mix', targetWpm: 25, tip: 'The trickiest row — slow down for accuracy first.' },
  { level: 'Intermediate', order: 5, title: 'Capitals & Punctuation', text: 'The quick Brown Fox! Is it ready? Yes, it is.', targetWpm: 30, tip: 'Use the opposite hand\'s Shift key for capitals.' },
  { level: 'Intermediate', order: 6, title: 'The Number Row', text: '1 2 3 4 5 6 7 8 9 0 room 101 has 25 chairs and 3 desks', targetWpm: 28, tip: 'Numbers are a stretch — glance only if you must.' },
  { level: 'Advanced', order: 7, title: 'Real Sentences', text: 'Practice a little every day and your speed will climb without you noticing.', targetWpm: 40, tip: 'Think in whole words, not single letters.' },
  { level: 'Advanced', order: 8, title: 'Speed Challenge', text: 'The five boxing wizards jump quickly while the lazy dog watches from afar.', targetWpm: 45, tip: 'Aim for a steady rhythm rather than bursts.' },
];

const users = [
  { name: 'Amar Hassen', email: 'amar@erilearn.io', password: 'demo123', role: 'admin', enrollments: [
    { courseSlug: 'english', instructionLanguage: 'Tigrigna', level: 'Intermediate', progress: 40, placementScore: 3 },
    { courseSlug: 'typing', instructionLanguage: 'English', level: 'Beginner', progress: 25 },
  ] },
];

module.exports = { courses, lessons, placements, quizzes, flashcards, exams, typingDrills, users };
