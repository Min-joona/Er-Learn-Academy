// Seed content for Eritrea Learn Academy.
// Instruction languages available across courses: Tigrigna, English, Arabic
// (the three widely-understood languages in Eritrea).

const TRI = ['Tigrigna', 'English', 'Arabic'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const koreanLessons = require('./korean_lessons');
const { typingLessons, typingDrills: newTypingDrills } = require('./typing_lessons');

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
    description: 'Start with Hangul and reach real conversation — reading, listening, and practice. Based on howtostudykorean.com.',
    price: 0, levels: LEVELS, instructionLanguages: ['English', 'Tigrigna'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=500&fit=crop',
    modules: ['Hangul: consonants & vowels', 'Syllable blocks & reading', 'Greetings & introductions', 'Basic sentence structure', 'Numbers & counters', 'Verbs & tenses', 'Everyday vocabulary', 'Grammar foundations', 'Shopping & food', 'Directions & travel'],
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
    price: 0, levels: LEVELS, instructionLanguages: ['English', 'Tigrigna', 'Arabic'], focus: ['Reading', 'Listening', 'Practice'],
    image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&h=500&fit=crop',
    modules: ['Alphabet & phonetics', 'Unit 1: "Hello!"', 'Unit 2: Ordering coffee', 'Unit 3: Professions', 'Unit 4: Daily activities', 'Unit 5: Where are you from?', 'Unit 6: Daily routine', 'Unit 7: Making plans', 'Unit 8: Travel experiences', 'Unit 9: Family & living', 'Unit 10: At a restaurant', 'Unit 11: Future plans', 'Unit 12: Shopping', 'Unit 13: At the supermarket', 'Unit 14: Hobbies', 'Unit 15: Describing places', 'Unit 16: Health', 'Unit 17: Clothing', 'Reading practice', 'Grammar review', 'Final review'],
  },
  {
    slug: 'typing', title: 'Typing Mastery', titleTi: 'ኪቦርድ', category: 'Typing', flag: '⌨️',
    description: 'Master touch typing with a proven progression — home row to full speed. Based on the typing.com skill-building method.',
    price: 0, levels: ['Beginner', 'Intermediate', 'Advanced'], instructionLanguages: ['English'], focus: ['Practice', 'Typing'],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=500&fit=crop',
    modules: ['Getting Started: J, F, Space', 'U, R, K & D, E, I', 'C, G, N & T, S, L', 'O, B, A, Period, Comma', 'W, X, Q, Y, P, Z, Enter', 'Common words & home row', 'Top & bottom row words', 'Shift, capitals & punctuation', 'Sentences & paragraphs', 'Speed drills & numbers'],
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
  { courseSlug: 'english', level: 'Intermediate', order: 2, title: 'Listen: Daily Routines', type: 'Listening',
    listenText: 'I wake up at six every morning. I brush my teeth and eat breakfast. Right now I am studying English. My brother is listening to music. We are learning together.',
    body: 'Listen to the paragraph about daily routines. Pay attention to which verbs use present simple (habits) and which use present continuous (now).' },
  { courseSlug: 'english', level: 'Intermediate', order: 3, title: 'Countable & Uncountable Nouns', type: 'Reading',
    body: `Some nouns can be counted: *one apple, two apples, three apples.*
Others cannot: *water, rice, information, advice.*

With countable: *many books, a few chairs, several students*
With uncountable: *much water, a little rice, some advice*

Use \`some\` for positive: "I have **some** money."
Use \`any\` for questions/negative: "Do you have **any** money?" / "I don't have **any**."` },
  { courseSlug: 'english', level: 'Intermediate', order: 4, title: 'Practice: Describe Your Day', type: 'Practice',
    body: 'Write a short paragraph about your daily routine. Use present simple for habits and present continuous for what is happening now (or around now).',
    practiceTask: 'Write 5-8 sentences describing your typical day. Use at least 2 present simple verbs and 2 present continuous verbs. Example: "I wake up at 6am. Right now I am studying English."' },
  { courseSlug: 'english', level: 'Intermediate', order: 5, title: 'Past Simple: Regular & Irregular Verbs', type: 'Reading',
    body: `**Regular past:** add -ed: *work → worked, play → played, listen → listened*

**Irregular past:** must memorize:
- go → went
- eat → ate
- see → saw
- have → had
- buy → bought
- teach → taught

Negative: "I **did not** (didn't) go."
Question: "**Did** you see the movie?"` },
  { courseSlug: 'english', level: 'Intermediate', order: 6, title: 'Listen: A Weekend Story', type: 'Listening',
    listenText: 'Last weekend I went to the market. I bought vegetables and fruit. My friend came with me. We saw many interesting things. I ate a delicious sandwich. We had a great time.',
    body: 'Listen to the story about last weekend. All the verbs are in past simple. Can you catch each one?' },
  // English — Advanced
  { courseSlug: 'english', level: 'Advanced', order: 1, title: 'Present Perfect: Experiences & Results', type: 'Reading',
    body: `**Present perfect** connects past and present: *have/has + past participle*

Use it for:
1. **Life experiences**: "I **have visited** three countries."
2. **Recent results**: "She **has finished** her homework."
3. **Unfinished time**: "We **have studied** two hours today."

Compare with past simple:
- "I **lived** in Asmara for 10 years." (finished — I no longer live there)
- "I **have lived** in Asmara for 10 years." (still true now)` },
  { courseSlug: 'english', level: 'Advanced', order: 2, title: 'Conditionals: If-Clauses', type: 'Reading',
    body: `**Zero conditional** — always true: "If you **heat** ice, it **melts**."
**First conditional** — real future: "If it **rains**, I **will stay** home."
**Second conditional** — unreal now: "If I **were** rich, I **would travel**."
**Third conditional** — unreal past: "If I **had studied**, I **would have passed**."` },
  { courseSlug: 'english', level: 'Advanced', order: 3, title: 'Listen: A News Report', type: 'Listening',
    listenText: 'Scientists have discovered a new species of butterfly in the rainforest. The team had been searching for five years. If they had given up earlier, they would never have found it. The discovery has been published in a leading journal.',
    body: 'This news report uses present perfect, past perfect, and conditionals. Listen and notice how each tense is used.' },
  { courseSlug: 'english', level: 'Advanced', order: 4, title: 'Listen & Write: Dictation Practice', type: 'Listening',
    listenText: 'Education is the most powerful weapon which you can use to change the world. — Nelson Mandela. Every student deserves access to quality learning. That is why we built this academy: to break barriers and build futures.',
    body: 'Listen to the quote and paragraph. Try to write down exactly what you hear. Check your spelling and punctuation.' },
  { courseSlug: 'english', level: 'Advanced', order: 5, title: 'Practice: Write a Formal Email', type: 'Practice',
    body: 'Formal emails have a clear structure: subject line, greeting, body, closing.',
    practiceTask: 'Write a formal email requesting information about a computer course. Include: your name, your level, what you want to learn, and ask about the schedule. Use at least one conditional sentence (if/would).' },
  { courseSlug: 'english', level: 'Advanced', order: 6, title: 'Passive Voice', type: 'Reading',
    body: `**Active:** The chef **cooks** the meal.
**Passive:** The meal **is cooked** by the chef.

Form: *be + past participle*

**Present passive**: "English **is spoken** worldwide."
**Past passive**: "The letter **was sent** yesterday."
**Future passive**: "The results **will be announced** soon."

Use passive when the action matters more than who did it.` },

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
  { courseSlug: 'computer-skills', level: 'Intermediate', order: 2, title: 'Excel: Formulas & Functions', type: 'Reading',
    body: `Excel formulas start with \`=\`. Basic examples:

- \`=SUM(A1:A10)\` — adds numbers in a range
- \`=AVERAGE(B1:B10)\` — finds the average
- \`=MAX(C1:C10)\` — largest value
- \`=MIN(C1:C10)\` — smallest value
- \`=IF(D1>50,"Pass","Fail")\` — conditional logic

Formulas update automatically when source cells change.` },
  { courseSlug: 'computer-skills', level: 'Intermediate', order: 3, title: 'Excel: Charts & Graphs', type: 'Reading',
    body: `Visualize data with charts in Excel:

| Data | Chart Type |
|------|-----------|
| Categories vs value | Bar chart |
| Trend over time | Line chart |
| Parts of a whole | Pie chart |
| Relationship | Scatter plot |

To create: select your data → Insert → Choose chart type.` },
  { courseSlug: 'computer-skills', level: 'Intermediate', order: 4, title: 'Practice: Build a Budget in Excel', type: 'Practice',
    practiceTask: 'Open Excel. Create a simple monthly budget with columns: Income, Rent, Food, Transport, Savings. Enter sample numbers. Use SUM to total each column. Create a pie chart of your expenses. Save as "MyBudget.xlsx".' },
  { courseSlug: 'computer-skills', level: 'Intermediate', order: 5, title: 'Email: Professional Communication', type: 'Reading',
    body: `Email basics for the workplace:

1. **Clear subject line** — "Application for Receptionist Position"
2. **Professional greeting** — "Dear Mr. Gebrehiwot,"
3. **Concise body** — get straight to the point
4. **Professional closing** — "Sincerely, Yonas M."
5. **Signature** — include your full name, phone, and email

Never write in ALL CAPS (looks angry). Always proofread before sending. Use CC only for people who need to know.` },
  { courseSlug: 'computer-skills', level: 'Advanced', order: 1, title: 'PowerPoint: Effective Presentations', type: 'Reading',
    body: `Rules for great slides:
- **One idea per slide** — don't crowd
- **Less text** — use bullet points, not paragraphs
- **Big fonts** — title 36pt+, body 24pt+
- **High contrast** — dark text on light background
- **Images > text** — a picture explains faster

Keyboard shortcuts: F5 = start slideshow, B = black screen (pause attention), Esc = exit.` },
  { courseSlug: 'computer-skills', level: 'Advanced', order: 2, title: 'Practice: Create a 5-Slide Presentation', type: 'Practice',
    practiceTask: 'Create a 5-slide PowerPoint presentation about a topic you know well. Slide 1: Title, Slide 2: Introduction, Slide 3: Main point, Slide 4: Example, Slide 5: Conclusion. Add at least one image and use consistent formatting.' },
  { courseSlug: 'computer-skills', level: 'Advanced', order: 3, title: 'Internet Safety & Privacy', type: 'Reading',
    body: `**Strong passwords**: at least 12 characters, mix of letters/numbers/symbols, never reuse passwords.

**Phishing**: fake emails that try to steal your info. Never click links in unexpected emails. Check the sender address carefully.

**Public Wi-Fi**: avoid banking or logging into important accounts on free Wi-Fi. Use a VPN if possible.

**Backups**: save important files in at least two places — your computer AND cloud storage (Google Drive, OneDrive).` },
  { courseSlug: 'computer-skills', level: 'Advanced', order: 4, title: 'Practice: Secure Your Accounts', type: 'Practice',
    practiceTask: 'Choose three important accounts (email, banking, social media). For each: write down their current password strength. Change any weak passwords. Enable two-factor authentication if available. When done, mark complete.' },

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
  { courseSlug: 'arabic', level: 'Beginner', order: 3, title: 'Numbers & Counting', type: 'Reading',
    body: `Arabic numbers (0-10):
0. صفر (sifr)
1. واحد (wahid)
2. اثنان (ithnan)
3. ثلاثة (thalatha)
4. أربعة (arba'a)
5. خمسة (khamsa)
6. ستة (sitta)
7. سبعة (sab'a)
8. ثمانية (thamaneya)
9. تسعة (tis'a)
10. عشرة (ashara)` },
  { courseSlug: 'arabic', level: 'Beginner', order: 4, title: 'Practice: Introduce Yourself in Arabic', type: 'Practice',
    practiceTask: 'Write three sentences introducing yourself in Arabic: (1) Your name, (2) Where you are from, (3) A greeting. Use the Arabic script. Example: "اسمي يوسف. أنا من أسمرة. السلام عليكم."' },
  { courseSlug: 'arabic', level: 'Intermediate', order: 1, title: 'Common Verbs in Arabic', type: 'Reading',
    body: `Basic Arabic verbs in present tense:

- يكتب (yaktubu) — he writes
- يقرأ (yaqra'u) — he reads
- يتكلم (yatakallamu) — he speaks
- يأكل (ya'kulu) — he eats
- يذهب (yathhabu) — he goes

Arabic verbs follow patterns based on root letters. Most roots have 3 letters.` },
  { courseSlug: 'arabic', level: 'Intermediate', order: 2, title: 'Listen: At the Market', type: 'Listening',
    listenText: 'Fi al-sooq ashtaraytu khubz wa laban wa fawakeh. Al-tamat ghaliat lakin al-khiyar rakhees. Baduha thahabtu ila al-bayt.',
    body: 'Listen to the short story about shopping at the market. Try to identify the items mentioned.' },

  // Amharic — Extended
  { courseSlug: 'amharic', level: 'Beginner', order: 2, title: 'Listen: Amharic Greetings', type: 'Listening',
    listenText: 'Selam! Endemin alleh? Dehna negn. Ameseginalehu. Dehna yihun.',
    body: 'Listen and repeat these common Amharic greetings. Pay attention to the intonation.' },
  { courseSlug: 'amharic', level: 'Beginner', order: 3, title: 'Numbers in Amharic', type: 'Reading',
    body: `Amharic numbers 1-10:
1. አንድ (and)
2. ሁለት (hulät)
3. ሦስት (sost)
4. አራት (arat)
5. አምስት (amst)
6. ስድስት (sədsət)
7. ሰባት (säbat)
8. ስምንት (səmənt)
9. ዘጠኝ (zät'äñ)
10. አስር (asər)` },
  { courseSlug: 'amharic', level: 'Intermediate', order: 1, title: 'Sentence Building in Amharic', type: 'Reading',
    body: `Amharic follows Subject-Object-Verb order (unlike English which is Subject-Verb-Object).

- "I eat bread" → እኔ እንጀራ እበላለሁ (Ene injera ebelalehu)
- "She reads a book" → እሷ መጽሐፍ ታነባለች (Esä mäts'ahaf tanäbalech)

The verb comes at the end, and it changes based on the subject.` },
  { courseSlug: 'amharic', level: 'Intermediate', order: 2, title: 'Practice: Write About Your Family', type: 'Practice',
    practiceTask: 'Write 4 sentences in Amharic about your family. Include: how many people, their names, and where they live. Use the Amharic Fidäl script.' },

  ...koreanLessons,

  // Chinese — Extended
  { courseSlug: 'chinese', level: 'Beginner', order: 2, title: 'Listen: Mandarin Greetings', type: 'Listening',
    listenText: 'Nǐ hǎo. Wǒ jiào Yīmǎ. Nǐ jiào shénme míngzì? Hěn gāoxìng rènshi nǐ. Xièxiè. Zàijiàn.',
    body: 'Listen to basic Chinese greetings. Pay attention to the four tones — the same syllable can mean very different things.' },
  { courseSlug: 'chinese', level: 'Beginner', order: 3, title: 'Numbers & Dates in Chinese', type: 'Reading',
    body: `Chinese numbers 1-10: 一 (yī), 二 (èr), 三 (sān), 四 (sì), 五 (wǔ), 六 (liù), 七 (qī), 八 (bā), 九 (jiǔ), 十 (shí)

Dates: Year-Month-Day order
- 2025年7月15日 (èr líng èr wǔ nián qī yuè shí wǔ rì)
- Today: 今天 (jīntiān)
- Tomorrow: 明天 (míngtiān)
- Yesterday: 昨天 (zuótiān)` },
  { courseSlug: 'chinese', level: 'Intermediate', order: 1, title: 'Measure Words in Chinese', type: 'Reading',
    body: `Chinese uses measure words (量词) between numbers and nouns:
- 一个朋友 (yī gè péngyou) — one friend
- 两本书 (liǎng běn shū) — two books
- 三张纸 (sān zhāng zhǐ) — three sheets of paper
- 五杯茶 (wǔ bēi chá) — five cups of tea

Common measure words: 个 (gè — general), 本 (běn — books), 张 (zhāng — flat objects), 杯 (bēi — drinks)` },

  // Russian — A1 Complete Course (21 units based on Gateway to Russia structure)
  // Unit 0: Alphabet & Phonetics
  { courseSlug: 'russian', level: 'Beginner', order: 1, title: 'The Russian Alphabet', type: 'Reading',
    body: `The Russian alphabet has 33 letters. Here are the first 10:

А а — "a" (like "father")
Б б — "b" (like "book")
В в — "v" (like "voice")
Г г — "g" (like "go")
Д д — "d" (like "door")
Е е — "ye" (like "yes")
Ё ё — "yo" (like "york")
Ж ж — "zh" (like "treasure")
З з — "z" (like "zebra")
И и — "ee" (like "see")

The next 10:
Й й — "y" (short, like "boy")
К к — "k" (like "kite")
Л л — "l" (like "love")
М м — "m" (like "mom")
Н н — "n" (like "no")
О о — "o" (like "more")
П п — "p" (like "park")
Р р — "r" (rolled r)
С с — "s" (like "sun")
Т т — "t" (like "top")

And the rest:
У у — "oo" (like "boot")
Ф ф — "f" (like "fox")
Х х — "kh" (like "Bach")
Ц ц — "ts" (like "cats")
Ч ч — "ch" (like "chip")
Ш ш — "sh" (like "shop")
Щ щ — "shch" (like "fresh cheese")
Ъ ъ — hard sign (no sound)
Ы ы — "i" (like "ill" but deeper)
Ь ь — soft sign (softens previous consonant)
Э э — "e" (like "met")
Ю ю — "yu" (like "you")
Я я — "ya" (like "yard")` },
  { courseSlug: 'russian', level: 'Beginner', order: 2, title: 'Vowels & Consonants', type: 'Reading',
    body: `Russian vowels divide into hard and soft pairs:

**Hard vowels:** А, О, У, Ы, Э
**Soft vowels:** Я, Ё, Ю, И, Е

Soft vowels make the preceding consonant soft (palatalized).

**Voiced/voiceless consonant pairs:**
Б→П, В→Ф, Г→К, Д→Т, Ж→Ш, З→С

At the end of a word, voiced consonants become voiceless:
- хлеб → sounds like "hlyep" (П sound)
- город → sounds like "gorot" (Т sound)` },
  { courseSlug: 'russian', level: 'Beginner', order: 3, title: 'Listen: Russian Sounds', type: 'Listening',
    listenText: 'Ah, oh, oo, ee, eh. Bah, vah, gah, dah, zhah. Pah, fah, kah, tah, sah. Rah, lah, mah, nah.',
    body: 'Listen to the basic Russian sounds and repeat. Focus on the difference between hard and soft vowels.' },
  { courseSlug: 'russian', level: 'Beginner', order: 4, title: 'Practice: Write the Alphabet', type: 'Practice',
    practiceTask: 'Write the full Russian alphabet from memory. Then write these words in Russian: мама (mom), папа (dad), дом (house), кот (cat). Check your writing against the alphabet chart.' },

  // Unit 1: "Hello!" — based on Gateway to Russia Unit 1
  { courseSlug: 'russian', level: 'Beginner', order: 5, title: 'Dialog: On the Train', type: 'Reading',
    body: `Read the dialog between passengers on the Moscow-Vladivostok train:

**Maria:** Здравствуйте! Давайте познакомимся. Я Мария.
*Hello! Let's get to know each other. I'm Maria.*

**John:** Здравствуйте! Я Джон.
*Hello! I'm John.*

**Anna I.:** О! Очень приятно! Меня зовут Анна Ивановна. А это Петя. Петя — мой внук.
*Oh, very nice! My name is Anna Ivanovna. And this is Petya. He's my grandson.*

**Petya:** А это мой кот Мурзик.
*And this is my cat Murzik.*` },
  { courseSlug: 'russian', level: 'Beginner', order: 6, title: 'Learn the Phrases', type: 'Reading',
    body: `Key phrases from Unit 1:

1. Здравствуйте! — Hello!
2. Как вас зовут? — What is your name? (formal)
3. Меня зовут Джон. — My name is John.
4. Я Джон. — I am John.
5. Очень приятно! — Very nice (to meet you)!
6. Это Джон. — This is John.

Note: "Меня зовут" literally means "they call me". You can also use "Я + name".` },
  { courseSlug: 'russian', level: 'Beginner', order: 7, title: 'Listen: What is Your Name?', type: 'Listening',
    listenText: 'Zdravstvuyte! Kak vas zovut? Menya zovut Mariya. A vas? Menya zovut Dzhon. Ochen priyatno!',
    body: 'Listen to two people meeting and asking each other\'s names. Notice the formal "вас" (you).' },
  { courseSlug: 'russian', level: 'Beginner', order: 8, title: 'This is John', type: 'Reading',
    body: `Introducing other people:

1. Это Джон. — This is John.
2. Я Мария. А это Джон. — I'm Maria. And this is John.
3. Это мой друг Джон. — This is my friend John.

**Vocabulary:** друг (friend), мой (my), это (this is)` },
  { courseSlug: 'russian', level: 'Beginner', order: 9, title: 'Formal & Informal Speech', type: 'Reading',
    body: `Russian distinguishes formal (вы) and informal (ты) address:

| English | Formal | Informal |
|---------|--------|----------|
| you | вы (вас) | ты (тебя) |
| What's your name? | Как вас зовут? | Как тебя зовут? |
| Hello/Hi | Здравствуйте! | Привет! |
| Excuse me | Извините! | Извини! |
| Goodbye | До свидания! | Пока! |

**Formal (вы):** older people, higher status, work, first meetings
**Informal (ты):** friends, relatives, children` },
  { courseSlug: 'russian', level: 'Beginner', order: 10, title: 'Listen: How Are You? (Formal)', type: 'Listening',
    listenText: 'Zdravstvuyte! Kak dela? Khorosho. A u vas? Normalno. Kak u vas dela? Otlichno. Kak vy? Khorosho.',
    body: `Formal ways to ask "how are you":
- Как дела? — How are things?
- Как у вас дела? — How are things with you?
- Как вы? — How are you?

Answers: Хорошо (good), Нормально (fine), Отлично (excellent).` },
  { courseSlug: 'russian', level: 'Beginner', order: 11, title: 'Listen: How Are You? (Informal)', type: 'Listening',
    listenText: 'Privet! Kak dela? Otlichno. A u tebya? Khorosho. Kak u tebya dela? Normalno. Kak ty? Khorosho.',
    body: `Informal versions using "ты" instead of "вы":
- Как дела? — How are things? (same)
- Как у тебя дела? — How are things with you?
- Как ты? — How are you?

Always use Привет (hi) in informal situations.` },
  { courseSlug: 'russian', level: 'Beginner', order: 12, title: 'Russian Names', type: 'Reading',
    body: `Russian names = First name + Patronymic + Last name

**Patronymic** comes from father's name:
- Иван → Иванович (son), Ивановна (daughter)
- Александр → Александрович, Александровна

**Common male:** Александр (Sasha), Сергей (Seryozha), Иван (Vanya)
**Common female:** Мария (Masha), Анна (Anya), Наталья (Natasha)

**Last names by gender:** Смирнов (m) / Смирнова (f) / Смирновы (family)` },
  { courseSlug: 'russian', level: 'Beginner', order: 13, title: 'Unit 1 Vocabulary Practice', type: 'Practice',
    practiceTask: `Write 5 sentences in Russian using vocabulary from this unit:

Key words to use: Здравствуйте, Привет, Меня зовут..., Это..., Очень приятно, Как дела?, Хорошо, До свидания, Пока
Example: "Здравствуйте! Меня зовут Анна. Очень приятно!"` },

  // Unit 2: Ordering coffee
  { courseSlug: 'russian', level: 'Beginner', order: 14, title: 'Listen: At the Café', type: 'Listening',
    listenText: 'Mozhno chashku kofe? Pozhaluysta. Vot, voz-mite. Spasibo. Skolko eto stoit? Eto stoit sto rubley.',
    body: `Key café phrases:
- Можно чашку кофе? — May I have a cup of coffee?
- Пожалуйста — Please / Here you are
- Сколько это стоит? — How much does it cost?
- Спасибо — Thank you` },
  { courseSlug: 'russian', level: 'Beginner', order: 15, title: 'Ordering Drinks', type: 'Reading',
    body: `Useful café vocabulary:

**Drinks:**
- кофе — coffee
- чай — tea
- сок — juice
- вода — water
- молоко — milk

**Phrases:**
- Можно... — May I have...
- Я буду... — I'll have...
- Пожалуйста — Please
- Спасибо — Thank you

Example: "Можно чашку чая, пожалуйста?" — May I have a cup of tea, please?` },
  { courseSlug: 'russian', level: 'Beginner', order: 16, title: 'Numbers 1-100', type: 'Reading',
    body: `Russian numbers:

1-10: один, два, три, четыре, пять, шесть, семь, восемь, девять, десять
11-20: одиннадцать, двенадцать, тринадцать, четырнадцать, пятнадцать, шестнадцать, семнадцать, восемнадцать, девятнадцать, двадцать

Tens: двадцать (20), тридцать (30), сорок (40), пятьдесят (50), шестьдесят (60), семьдесят (70), восемьдесят (80), девяносто (90), сто (100)

21 = двадцать один (20 + 1), 35 = тридцать пять (30 + 5)` },
  { courseSlug: 'russian', level: 'Beginner', order: 17, title: 'Practice: Order at a Café', type: 'Practice',
    practiceTask: 'Write a short dialog in Russian where you order a drink at a café. Include: greeting, what you want, saying please, asking the price, saying thank you. Example: "Здравствуйте! Можно чашку кофе, пожалуйста? Сколько это стоит? Спасибо!"' },

  // Unit 3: Professions
  { courseSlug: 'russian', level: 'Beginner', order: 18, title: 'Talking About Jobs', type: 'Reading',
    body: `Common professions in Russian:

- врач — doctor
- учитель — teacher
- инженер — engineer
- студент — student
- программист — programmer
- медсестра — nurse
- водитель — driver
- продавец — shop assistant

**Grammar:** use "Я — врач" (I am a doctor). No "am/is/are" in Russian present tense!

Example: "Кто вы по профессии?" — What is your profession?` },
  { courseSlug: 'russian', level: 'Beginner', order: 19, title: 'Listen: What Do You Do?', type: 'Listening',
    listenText: 'Kto vy po professii? Ya vrach. A kto on? On inzhener. Chem ona zanimaetsya? Ona uchitel. Ya student.',
    body: 'Listen to people talking about their professions. Notice that Russian drops the verb "to be" in the present tense.' },
  { courseSlug: 'russian', level: 'Beginner', order: 20, title: 'Gender of Professions', type: 'Reading',
    body: `Many profession names have masculine and feminine forms:

**Masculine → Feminine:**
- студент → студентка (student)
- учитель → учительница (teacher)
- продавец → продавщица (shop assistant)
- артист → артистка (performer)

Some are the same for both genders:
- врач (doctor)
- инженер (engineer)
- программист (programmer)

Example: "Она врач" — She is a doctor. "Он студент" — He is a student.` },
  { courseSlug: 'russian', level: 'Beginner', order: 21, title: 'Practice: Introduce Your Profession', type: 'Practice',
    practiceTask: 'Write 4 sentences in Russian: (1) your name, (2) your profession, (3) where you work/study, (4) one thing you like about your job. If you are a student, say "Я студент / студентка".' },

  // Unit 4: Daily Activities
  { courseSlug: 'russian', level: 'Beginner', order: 22, title: 'Common Daily Verbs', type: 'Reading',
    body: `Essential daily routine verbs:

- делать — to do
- работать — to work
- читать — to read
- писать — to write
- говорить — to speak
- слушать — to listen
- смотреть — to watch
- готовить — to cook
- есть — to eat
- пить — to drink

**Present tense conjugation (-ать verbs):**
Я делаю (I do), Ты делаешь (you do), Он/она делает (he/she does), Мы делаем (we do), Вы делаете (you do), Они делают (they do)` },
  { courseSlug: 'russian', level: 'Beginner', order: 23, title: 'Listen: A Day in the Life', type: 'Listening',
    listenText: 'Ya vstayu v sem utra. Ya zavtrakayu. Potom ya rabotayu. Vecherom ya chitayu knigu. Ya lozhus spat v odinnadtsat.',
    body: `Listen to a description of a typical day:
Я встаю в семь утра. — I wake up at 7am.
Я завтракаю. — I have breakfast.
Потом я работаю. — Then I work.
Вечером я читаю книгу. — In the evening I read a book.` },
  { courseSlug: 'russian', level: 'Beginner', order: 24, title: 'What Are You Doing?', type: 'Reading',
    body: `Asking "What are you doing?" in Russian:

**Что ты делаешь?** — What are you doing? (informal)
**Что вы делаете?** — What are you doing? (formal)

Answers:
- Я читаю — I am reading
- Я слушаю музыку — I am listening to music
- Я смотрю телевизор — I am watching TV
- Я готовлю обед — I am cooking dinner

**Present tense =** same form for "I do" and "I am doing". There is no separate present continuous in Russian.` },
  { courseSlug: 'russian', level: 'Beginner', order: 25, title: 'Practice: Describe Your Daily Routine', type: 'Practice',
    practiceTask: 'Write 6 sentences in Russian about your daily routine. Use at least 4 different verbs. Include: what time you wake up, what you eat for breakfast, what you do during the day, and what you do in the evening.' },

  // Unit 5: Where Are You From?
  { courseSlug: 'russian', level: 'Beginner', order: 26, title: 'Countries & Nationalities', type: 'Reading',
    body: `Countries in Russian:

- Россия — Russia
- Америка — America
- Англия — England
- Эритрея — Eritrea
- Франция — France
- Германия — Germany
- Китай — China
- Япония — Japan

**Question:** Откуда вы? — Where are you from? (formal)
**Answer:** Я из Эритреи. — I am from Eritrea.

Note: after "из" (from), the country name goes into genitive case: Россия → из России.` },
  { courseSlug: 'russian', level: 'Beginner', order: 27, title: 'Listen: Where Are You From?', type: 'Listening',
    listenText: 'Otkuda vy? Ya iz Rossii. A vy oktuda? Ya iz Ameriki. Ochen priyatno! Ochen priyatno!',
    body: 'Listen to people asking and answering where they are from. Pay attention to the genitive case endings after "из".' },
  { courseSlug: 'russian', level: 'Beginner', order: 28, title: 'Nationalities', type: 'Reading',
    body: `Nationalities in Russian (masculine / feminine):

- русский / русская — Russian
- американец / американка — American
- англичанин / англичанка — English
- эритреец / эритрейка — Eritrean
- француз / француженка — French
- китаец / китаянка — Chinese

**Question:** Кто вы по национальности? — What is your nationality?
**Answer:** Я русский / русская. — I am Russian (m/f).` },
  { courseSlug: 'russian', level: 'Beginner', order: 29, title: 'Practice: Introduce Your Country', type: 'Practice',
    practiceTask: 'Write 4 sentences: (1) say your name, (2) say where you are from, (3) say your nationality, (4) say what language you speak. Example: "Меня зовут Джон. Я из Америки. Я американец. Я говорю по-английски."' },

  // Unit 6: Daily Routine & Time
  { courseSlug: 'russian', level: 'Beginner', order: 30, title: 'Telling Time', type: 'Reading',
    body: `Asking and telling time:

**Который час?** — What time is it?

**Сейчас...** — It is currently...
- час — one o'clock
- два часа — two o'clock
- три часа — three o'clock
- четыре часа — four o'clock
- пять часов — five o'clock
- ... (шесть, семь, восемь, девять, десять, одиннадцать, двенадцать часов)

**Half hours:** половина второго — half past one (literally "half of two")
**Minutes:** пять минут второго — five past one (literally "five minutes of two")` },
  { courseSlug: 'russian', level: 'Beginner', order: 31, title: 'Listen: What Time Do You Wake Up?', type: 'Listening',
    listenText: 'Kotory chas? Seichas vosem chasov utra. Ya vstayu v sem chasov. Vo skolko ty vstayosh? Ya vstayu v vosem chasov.',
    body: `Key time questions:
- Во сколько ты встаёшь? — What time do you wake up?
- Я встаю в семь часов. — I wake up at 7 o'clock.
- Во сколько ты работаешь? — What time do you work?` },
  { courseSlug: 'russian', level: 'Beginner', order: 32, title: 'Days of the Week', type: 'Reading',
    body: `Days of the week in Russian:

- понедельник — Monday
- вторник — Tuesday
- среда — Wednesday
- четверг — Thursday
- пятница — Friday
- суббота — Saturday
- воскресенье — Sunday

**Useful phrases:**
- сегодня — today
- завтра — tomorrow
- вчера — yesterday
- каждый день — every day
- в понедельник — on Monday` },
  { courseSlug: 'russian', level: 'Beginner', order: 33, title: 'Practice: Describe Your Week', type: 'Practice',
    practiceTask: 'Write 5 sentences in Russian about your weekly schedule. Include: what time you wake up each day, what you do on specific days, and what you do on weekends. Example: "Я встаю в семь часов каждый день. В понедельник я работаю."' },

  // Unit 7: Making Plans
  { courseSlug: 'russian', level: 'Beginner', order: 34, title: 'Let\'s Meet Up!', type: 'Reading',
    body: `Making plans in Russian:

**Давайте встретимся...** — Let's meet...
- сегодня — today
- завтра — tomorrow
- в субботу — on Saturday
- на следующей неделе — next week

**Accepting:**
- Хорошо — OK / Good
- Да, давайте — Yes, let's
- С удовольствием — With pleasure

**Declining:**
- Извините, я занят — Sorry, I'm busy (male)
- Извините, я занята — Sorry, I'm busy (female)
- К сожалению, не могу — Unfortunately, I can't` },
  { courseSlug: 'russian', level: 'Beginner', order: 35, title: 'Listen: Let\'s Meet on Sunday', type: 'Listening',
    listenText: 'Davayte vstretimsya v voskresenye. Vo skolko? V tri chasa. Gde? V parke. Khorosho. Do vstrechi!',
    body: `Key phrases from the dialog:
- Давайте встретимся в воскресенье. — Let's meet on Sunday.
- Во сколько? — At what time?
- Где? — Where?
- До встречи! — See you!` },
  { courseSlug: 'russian', level: 'Beginner', order: 36, title: 'Places in the City', type: 'Reading',
    body: `Common city locations:

- парк — park
- ресторан — restaurant
- кафе — café
- кино — cinema
- театр — theatre
- музей — museum
- библиотека — library
- магазин — shop/store

**Question:** Где мы встретимся? — Where will we meet?
**Answer:** В парке / В кафе / В кино

Note: after "в" (in/at), some words change case: парк → в парке (prepositional case).` },
  { courseSlug: 'russian', level: 'Beginner', order: 37, title: 'Practice: Plan a Meeting', type: 'Practice',
    practiceTask: 'Write a dialog in Russian where you plan to meet a friend. Include: a greeting, suggesting a day, agreeing on a time, choosing a place, and saying goodbye. Example: "Привет! Давай встретимся в субботу. — Хорошо. В два часа? — Да, в парке. — До встречи!"' },

  // Unit 8: Travel Experiences
  { courseSlug: 'russian', level: 'Beginner', order: 38, title: 'Have You Been To...?', type: 'Reading',
    body: `Asking about travel experiences:

**Ты был(а) в...?** — Have you been to...?
- был (masculine), была (feminine)

**Я был(а) в...** — I have been to...
- Москве — Moscow (prepositional case)
- Санкт-Петербурге — St. Petersburg
- Сибири — Siberia
- Европе — Europe

**Я не был(а) в...** — I haven't been to...
- никогда — never

Example: "Ты был в Москве? — Да, я был в Москве. Очень красивый город."` },
  { courseSlug: 'russian', level: 'Beginner', order: 39, title: 'Listen: Travel Stories', type: 'Listening',
    listenText: 'Vy byli v Sibiri? Da, ya byl v Sibiri proshlym letom. Ochen krasivo! A vy? Ya ne byl, no ochen khochu.',
    body: 'Listen to people discussing their travel experiences. Notice the use of past tense and the prepositional case after "в".' },
  { courseSlug: 'russian', level: 'Beginner', order: 40, title: 'Past Tense Verbs', type: 'Reading',
    body: `Russian past tense is simpler than present!

**Form:** remove -ть from infinitive, add -л (m), -ла (f), -ло (n), -ли (pl)

| Infinitive | He (m) | She (f) | They (pl) |
|-----------|--------|---------|-----------|
| быть (to be) | был | была | были |
| читать (to read) | читал | читала | читали |
| работать (to work) | работал | работала | работали |
| говорить (to speak) | говорил | говорила | говорили |
| ехать (to go/travel) | ехал | ехала | ехали |

Example: "Я был в России." (I was in Russia.) "Она была в Москве." (She was in Moscow.)` },
  { courseSlug: 'russian', level: 'Beginner', order: 41, title: 'Practice: Talk About Travel', type: 'Practice',
    practiceTask: 'Write 5 sentences in Russian about travel. Say: (1) where you have been, (2) where you haven\'t been, (3) where you want to go, (4) what you liked, (5) one fact about a place you visited. Use past tense verbs.' },

  // Unit 9: Family
  { courseSlug: 'russian', level: 'Beginner', order: 42, title: 'Family Members', type: 'Reading',
    body: `Family vocabulary:

- мама — mom
- папа — dad
- брат — brother
- сестра — sister
- сын — son
- дочь — daughter
- дедушка — grandfather
- бабушка — grandmother
- муж — husband
- жена — wife
- дядя — uncle
- тётя — aunt

**Question:** У тебя есть брат? — Do you have a brother?
**Answer:** Да, у меня есть брат. / Нет, у меня нет брата.` },
  { courseSlug: 'russian', level: 'Beginner', order: 43, title: 'Listen: My Family', type: 'Listening',
    listenText: 'U menya bolshaya semya. U menya yest mama, papa i dve sestry. Moy brat zhivyot v Moskve. A gde zhivyot tvoya semya?',
    body: 'Listen to descriptions of families. Key pattern: "У меня есть..." (I have... literally "By me there is...").' },
  { courseSlug: 'russian', level: 'Beginner', order: 44, title: 'Possession: "I Have"', type: 'Reading',
    body: `In Russian, "I have" is expressed as "У меня есть" (literally "by me there is"):

- У меня есть брат. — I have a brother.
- У тебя есть сестра? — Do you have a sister?
- У него есть машина. — He has a car.
- У неё есть книга. — She has a book.
- У них есть дом. — They have a house.

**Negative:** У меня нет... — I don't have...
- У меня нет брата. — I don't have a brother. (note: brother goes into genitive case)` },
  { courseSlug: 'russian', level: 'Beginner', order: 45, title: 'Practice: Describe Your Family', type: 'Practice',
    practiceTask: 'Write 6 sentences in Russian about your family. Say: how many people, their names, their professions, where they live, and one interesting fact about your family.' },

  // Unit 10: At a Restaurant
  { courseSlug: 'russian', level: 'Beginner', order: 46, title: 'Restaurant Phrases', type: 'Reading',
    body: `Key restaurant phrases:

- Можно меню? — May I have the menu?
- Я хочу заказать... — I want to order...
- Приятного аппетита! — Enjoy your meal!
- Счёт, пожалуйста! — The check, please!
- Это очень вкусно! — This is very tasty!

**Vocabulary:**
- меню — menu
- закуска — appetizer
- суп — soup
- салат — salad
- горячее — main course
- десерт — dessert
- счёт — bill/check
- чаевые — tip` },
  { courseSlug: 'russian', level: 'Beginner', order: 47, title: 'Listen: At the Restaurant', type: 'Listening',
    listenText: 'Mozhno menyu? Pozhaluysta. Chto vy posovetuyete? Ya rekomenduyu sup i salat. Ya vozmu sup i salat. Nalivayte chay!',
    body: `Key phrases:
- Что вы посоветуете? — What do you recommend?
- Я возьму... — I'll take...
- Приятного аппетита! — Enjoy your meal!` },
  { courseSlug: 'russian', level: 'Beginner', order: 48, title: 'Food Vocabulary', type: 'Reading',
    body: `Common food words:

- хлеб — bread
- масло — butter
- сыр — cheese
- мясо — meat
- рыба — fish
- овощи — vegetables
- фрукты — fruits
- рис — rice
- картошка — potatoes
- сахар — sugar
- соль — salt
- перец — pepper

**Adjective:** вкусный (tasty), горячий (hot), холодный (cold)` },
  { courseSlug: 'russian', level: 'Beginner', order: 49, title: 'Practice: Order at a Restaurant', type: 'Practice',
    practiceTask: 'Write a restaurant dialog in Russian. Include: asking for the menu, ordering food and drinks, saying the food is tasty, asking for the check, and paying. Example: "Здравствуйте! Можно меню? Я хочу заказать салат и суп. Счёт, пожалуйста!"' },

  // Unit 11: Future Plans
  { courseSlug: 'russian', level: 'Beginner', order: 50, title: 'Talking About the Future', type: 'Reading',
    body: `Two ways to talk about future in Russian:

**1. Future with быть (to be) + imperfective infinitive:**
- Я буду работать. — I will work.
- Он будет читать. — He will read.
- Мы будем учиться. — We will study.

**Conjugation of быть:**
Я буду, Ты будешь, Он/она будет, Мы будем, Вы будете, Они будут

**2. Perfective verbs (single completed action):**
- Я куплю — I will buy (and complete the action)
- Я сделаю — I will do (and finish it)

**Time phrases:** завтра (tomorrow), на следующей неделе (next week), в будущем году (next year)` },
  { courseSlug: 'russian', level: 'Beginner', order: 51, title: 'Listen: Vacation Plans', type: 'Listening',
    listenText: 'Chto ty budesh delat letom? Ya budu puteshestvovat. A ya budu rabotat i uchit angliyskiy. Kogda ty poedesh? V avguste.',
    body: 'Listen to people talking about their vacation plans. Notice the use of "буду + infinitive" for future actions.' },
  { courseSlug: 'russian', level: 'Beginner', order: 52, title: 'Months & Seasons', type: 'Reading',
    body: `Months in Russian:

Январь, Февраль, Март, Апрель, Май, Июнь, Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь

Seasons:
- весна — spring
- лето — summer
- осень — autumn/fall
- зима — winter

**In which month?** — в январе, в феврале...
**In which season?** — весной, летом, осенью, зимой` },
  { courseSlug: 'russian', level: 'Beginner', order: 53, title: 'Practice: Your Future Plans', type: 'Practice',
    practiceTask: 'Write 5 sentences about your plans for next summer. Use the future tense (буду + infinitive). Say where you will go, what you will do, what you will study, etc.' },

  // Unit 12: Shopping
  { courseSlug: 'russian', level: 'Beginner', order: 54, title: 'Shopping Phrases', type: 'Reading',
    body: `Shopping vocabulary:

- магазин — shop/store
- супермаркет — supermarket
- рынок — market
- цена — price
- скидка — discount

**Key phrases:**
- Сколько стоит? — How much does it cost?
- Это дорого! — That's expensive!
- Это дёшево! — That's cheap!
- У вас есть...? — Do you have...?
- Я ищу... — I am looking for...
- Дайте, пожалуйста... — Give me, please...` },
  { courseSlug: 'russian', level: 'Beginner', order: 55, title: 'Listen: At the Shop', type: 'Listening',
    listenText: 'Zdravstvuyte! U vas yest khleb? Da, vot on. Skolko on stoit? Sorok rubley. Vozmite, pozhaluysta. Spasibo!',
    body: 'Listen to a typical shopping exchange. Notice how to ask for items and prices.' },
  { courseSlug: 'russian', level: 'Beginner', order: 56, title: 'Clothing Vocabulary', type: 'Reading',
    body: `Clothing items:

- куртка — jacket
- пальто — coat
- рубашка — shirt
- футболка — T-shirt
- брюки — pants/trousers
- джинсы — jeans
- юбка — skirt
- платье — dress
- обувь — shoes
- шапка — hat
- шарф — scarf

**Colors:** красный (red), синий (blue), зелёный (green), жёлтый (yellow), чёрный (black), белый (white), серый (grey)` },
  { courseSlug: 'russian', level: 'Beginner', order: 57, title: 'Practice: Go Shopping', type: 'Practice',
    practiceTask: 'Write a shopping dialog in Russian. Include: greeting the shop assistant, asking for an item, asking the price, saying if it is expensive or cheap, buying it, and thanking.' },

  // Unit 13: At the Supermarket
  { courseSlug: 'russian', level: 'Beginner', order: 58, title: 'Supermarket Vocabulary', type: 'Reading',
    body: `Food shopping vocabulary:

- молоко — milk
- яйца — eggs
- масло — butter
- сыр — cheese
- колбаса — sausage
- мясо — meat
- курица — chicken
- рыба — fish
- овощи — vegetables
- фрукты — fruit
- сахар — sugar
- мука — flour

**Quantities:**
- килограмм — kilogram
- грамм — gram
- литр — liter
- пакет — bag
- бутылка — bottle
- штука — piece/item

Example: "Дайте, пожалуйста, килограмм яблок и бутылку молока."` },
  { courseSlug: 'russian', level: 'Beginner', order: 59, title: 'Listen: Let\'s Go to the Supermarket!', type: 'Listening',
    listenText: 'Chto nam nuzhno kupit? Nuzhno moloko, khlheb i yaytsa. A yeshchyo nuzhna chicken? Da, i kuritsu. Poydyom v supermarket!',
    body: 'Listen to a dialog about grocery shopping. Notice "нужно" (need) and "дайте, пожалуйста" (give me, please).' },
  { courseSlug: 'russian', level: 'Beginner', order: 60, title: 'Accusative Case for Direct Objects', type: 'Reading',
    body: `When you buy or see something, the item goes into **accusative case**:

| Masculine (no change if inanimate) | Feminine (-а → -у) |
|-----------------------------------|-------------------|
| Я вижу **стол** (table) | Я вижу **книгу** (book) |
| Я покупаю **хлеб** (bread) | Я покупаю **машину** (car) |

**Animate masculine** (people/animals) changes:
- Я вижу **брата** (brother — animate)
- Я вижу **стол** (table — inanimate)

**Neuter** (no change): молоко, письмо, окно` },
  { courseSlug: 'russian', level: 'Beginner', order: 61, title: 'Practice: Shopping List', type: 'Practice',
    practiceTask: 'Write a shopping list in Russian (6+ items with quantities). Then write a short dialog where you enter a shop and buy 3 of those items. Use the accusative case correctly.' },

  // Unit 14: Hobbies
  { courseSlug: 'russian', level: 'Beginner', order: 62, title: 'Talking About Hobbies', type: 'Reading',
    body: `Hobbies and interests:

- Я люблю... — I like / I love...
  - читать — to read
  - петь — to sing
  - танцевать — to dance
  - рисовать — to draw
  - играть в футбол — to play football
  - смотреть фильмы — to watch movies
  - слушать музыку — to listen to music
  - путешествовать — to travel
  - фотографировать — to take photos

- Мне нравится... — I like... (literally "to me it pleases")
  Same verb in infinitive after it.

**Question:** Что ты любишь делать? — What do you like to do?` },
  { courseSlug: 'russian', level: 'Beginner', order: 63, title: 'Listen: My Hobby', type: 'Listening',
    listenText: 'Chto ty lyubish delat? Ya lyublyu chitat i risovat. A moy brat lyubit igrat v futbol. Mne nravitsya slushat muziku.',
    body: 'Listen to people discussing their hobbies. Note: "Я люблю + infinitive" vs "Мне нравится + infinitive".' },
  { courseSlug: 'russian', level: 'Beginner', order: 64, title: 'The Verb "To Like"', type: 'Reading',
    body: `Two ways to say "to like" in Russian:

**1. Любить (to love/like strongly) — conjugated:**
- Я люблю, Ты любишь, Он/она любит
- Мы любим, Вы любите, Они любят

**2. Нравиться (to please) — reflexive:**
After мне, тебе, ему, ей, нам, вам, им

- Мне нравится музыка. — I like music. (lit: to me music pleases)
- Мне нравятся фильмы. — I like films. (plural)
- Тебе нравится этот фильм? — Do you like this film?

Use любить for people and strong passions.
Use нравиться for things/activities you find pleasant.` },
  { courseSlug: 'russian', level: 'Beginner', order: 65, title: 'Practice: Talk About Your Hobbies', type: 'Practice',
    practiceTask: 'Write 5 sentences in Russian about your hobbies. Say: (1) what you love to do, (2) what you like, (3) what your friend/family likes, (4) what you don\'t like, (5) what you want to try. Use both люблю and нравится.' },

  // Unit 15: Describing Places
  { courseSlug: 'russian', level: 'Beginner', order: 66, title: 'Describing Things', type: 'Reading',
    body: `Russian adjectives agree with nouns in gender:

**Masculine:** -ый/-ий — хороший дом (good house)
**Feminine:** -ая/-яя — хорошая книга (good book)
**Neuter:** -ое/-ее — хорошее окно (good window)
**Plural:** -ые/-ие — хорошие дома (good houses)

**Common adjectives:**
- большой — big
- маленький — small
- красивый — beautiful
- новый — new
- старый — old
- хороший — good
- плохой — bad
- интересный — interesting` },
  { courseSlug: 'russian', level: 'Beginner', order: 67, title: 'Listen: What a Beautiful Room!', type: 'Listening',
    listenText: 'Kakaya krasivaya komnata! Zdes bolshoye okno i novaya mebel. Na stene visyat krasivye kartiny. Mne ochen nravitsya!',
    body: `Key phrases:
- Какая красивая комната! — What a beautiful room!
- Здесь большое окно — There is a big window here.
- Мне очень нравится! — I really like it!` },
  { courseSlug: 'russian', level: 'Beginner', order: 68, title: 'Rooms & Furniture', type: 'Reading',
    body: `Rooms in a house:

- комната — room
- спальня — bedroom
- гостиная — living room
- кухня — kitchen
- ванная — bathroom
- коридор — hallway

Furniture:
- стол — table
- стул — chair
- кровать — bed
- шкаф — wardrobe
- диван — sofa
- книжная полка — bookshelf
- ковёр — carpet

**Preposition:** на (on), под (under), в (in), за (behind), около (near)` },
  { courseSlug: 'russian', level: 'Beginner', order: 69, title: 'Practice: Describe Your Room', type: 'Practice',
    practiceTask: 'Write 6 sentences describing your room in Russian. Use adjectives (size, color, quality) and prepositions of location (на, в, под, около). Say what furniture is in the room and where things are located.' },

  // Unit 16: Health
  { courseSlug: 'russian', level: 'Beginner', order: 70, title: 'Health & Body', type: 'Reading',
    body: `Body parts vocabulary:

- голова — head
- рука — arm/hand
- нога — leg/foot
- спина — back
- живот — stomach
- сердце — heart
- глаз — eye
- ухо — ear

**Health phrases:**
- У меня болит голова. — I have a headache.
- У меня болит живот. — I have a stomach ache.
- Я простудился / простудилась. — I caught a cold (m/f).
- У меня температура. — I have a fever.
- Выздоравливай! — Get well soon! (informal)` },
  { courseSlug: 'russian', level: 'Beginner', order: 71, title: 'Listen: At the Doctor', type: 'Listening',
    listenText: 'Chto u vas bolit? U menya bolit golova i garlo. U vas temperatura? Da, tridtsat sem i pyat. Eto prostuda. Prinyom lekarstvo.',
    body: `At the doctor:
- Что у вас болит? — What hurts? (formal)
- У меня болит... — It hurts... (the part)
- Врач — doctor
- Лекарство — medicine
- Больница — hospital` },
  { courseSlug: 'russian', level: 'Beginner', order: 72, title: 'Modal Verbs: Need & Must', type: 'Reading',
    body: `Expressing necessity in Russian:

**Нужно** (need to / must) — impersonal:
- Мне нужно в больницу. — I need to go to the hospital.
- Вам нужно отдохнуть. — You need to rest.
- Ему нужно лекарство. — He needs medicine.

**Должен / должна / должны** (must):
- Я должен работать. — I must work. (male)
- Я должна учиться. — I must study. (female)
- Они должны прийти. — They must come.

**Можно** (may / allowed):
- Можно войти? — May I come in?
- Здесь можно курить? — Can you smoke here?` },
  { courseSlug: 'russian', level: 'Beginner', order: 73, title: 'Practice: Health Dialog', type: 'Practice',
    practiceTask: 'Write a dialog in Russian where one person is sick and the other gives advice. Include: greeting, saying what hurts, suggesting a doctor, advising rest, saying "get well soon".' },

  // Unit 17: Clothing & Shopping
  { courseSlug: 'russian', level: 'Beginner', order: 74, title: 'I Need a Jacket', type: 'Reading',
    body: `Shopping for clothes:

- Мне нужна куртка. — I need a jacket.
- Мне нужен костюм. — I need a suit.
- Мне нужно платье. — I need a dress.

**Нужен/нужна/нужно/нужны** agrees with the item:
- Masculine: нужен (костюм)
- Feminine: нужна (куртка)
- Neuter: нужно (пальто)
- Plural: нужны (джинсы)

**Trying on:**
- Можно померить? — Can I try it on?
- Где примерочная? — Where is the fitting room?
- Мне маловато. — It's a bit small for me.
- Мне великовато. — It's a bit big for me.` },
  { courseSlug: 'russian', level: 'Beginner', order: 75, title: 'Listen: Clothes Shopping', type: 'Listening',
    listenText: 'Mne nuzhna kurtka. Kakoy tsvet vy khotite? Siniy ili chorniy. Vozmite vot etu. Mozhno pomerit? Da, konechno.',
    body: 'Listen to a clothes shopping dialog. Practice asking for items by color, trying them on, and paying.' },
  { courseSlug: 'russian', level: 'Beginner', order: 76, title: 'More Clothing & Fashion', type: 'Reading',
    body: `Fashion vocabulary:

- модный — fashionable
- удобный — comfortable
- размер — size
- цвет — color
- большой — big/large
- маленький — small

**Shoe vocabulary:**
- туфли — shoes
- кроссовки — sneakers
- сапоги — boots
- тапки — slippers

**Size questions:**
- Какой у вас размер? — What size do you wear?
- Сорок второй. — Size 42.` },
  { courseSlug: 'russian', level: 'Beginner', order: 77, title: 'Practice: Go Clothes Shopping', type: 'Practice',
    practiceTask: 'Write a clothes shopping dialog in Russian. Include: greeting, saying what you need, asking for a different color, trying it on, discussing if it fits, asking the price, and buying.' },

  // Unit 18: Reading Practice
  { courseSlug: 'russian', level: 'Beginner', order: 78, title: 'Read: At the Train Station', type: 'Reading',
    body: `Read the following Russian text about a train station:

Вокзал — большое здание. Там много людей. Поезда приходят и уходят. Люди ждут свои поезда на платформе. В здании вокзала есть кассы, магазины и кафе. Я люблю путешествовать на поезде. Это удобно и интересно.

**Vocabulary:**
- вокзал — train station
- поезд — train
- платформа — platform
- касса — ticket office
- ждать — to wait
- люди — people
- путешествовать — to travel
- удобно — convenient` },
  { courseSlug: 'russian', level: 'Beginner', order: 79, title: 'Read: My City', type: 'Reading',
    body: `Read about a Russian city:

Мой город небольшой, но красивый. В центре есть парк и музей. В музее интересные выставки. Рядом с парком находится кафе. Я люблю гулять по городу с друзьями. Здесь живут мои родители и брат.

**Vocabulary:**
- город — city
- центр — center
- парк — park
- музей — museum
- выставка — exhibition
- рядом — nearby
- гулять — to walk
- родители — parents` },
  { courseSlug: 'russian', level: 'Beginner', order: 80, title: 'Read: A Letter to a Friend', type: 'Reading',
    body: `Read this letter from Masha to her friend:

Привет, Анна! Как у тебя дела? У меня всё хорошо. Я сейчас учу русский язык. Это трудно, но очень интересно. Вчера я была в парке. Там красиво. На следующей неделе я поеду в Москву. Я очень рада! Пиши мне. Целую, Маша.

**Vocabulary:**
- привет — hi
- дела — matters/things
- учить — to study/learn
- трудно — difficult
- интересно — interesting
- красиво — beautiful
- рада — glad (female)
- целую — (I) kiss/hugs` },
  { courseSlug: 'russian', level: 'Beginner', order: 81, title: 'Practice: Write a Short Letter', type: 'Practice',
    practiceTask: 'Write a short letter in Russian to a friend (5-7 sentences). Tell them how you are, what you are studying, what you did yesterday, and what your plans are for next week. End with "Целую" (hugs).' },

  // Unit 19: Grammar Review
  { courseSlug: 'russian', level: 'Beginner', order: 82, title: 'Noun Genders', type: 'Reading',
    body: `Russian nouns have three genders. You can tell by looking at the ending:

**Masculine:** consonant or -й
- дом (house), стол (table), музей (museum)

**Feminine:** -а, -я, or -ь
- книга (book), семья (family), ночь (night)

**Neuter:** -о, -е, or -мя
- окно (window), море (sea), имя (name)

**Plural endings:**
- Masculine: дом → дома (add -а / change last consonant)
- Feminine: книга → книги (-а → -ы/-и)
- Neuter: окно → окна (-о → -а)` },
  { courseSlug: 'russian', level: 'Beginner', order: 83, title: 'Basic Cases Overview', type: 'Reading',
    body: `Russian has 6 cases. Here's what each one does:

**1. Nominative (Кто? Что?) — Who? What?**
Dictionary form. Subject of sentence.
- "Это **книга**." — This is a book.

**2. Accusative (Кого? Что?) — Whom? What?**
Direct object. After "to see", "to read", "to buy".
- "Я читаю **книгу**." — I read a book.

**3. Genitive (Кого? Чего?) — Of whom? Of what?**
Possession, negation, after "from", quantity.
- "У меня нет **книги**." — I don't have a book.

**4. Dative (Кому? Чему?) — To whom? To what?**
Indirect object. After "to give", "to help".
- "Я даю книгу **другу**." — I give a book to a friend.

**5. Instrumental (Кем? Чем?) — With whom? With what?**
After "with", "by", and after the verb "to be" (in past/future).
- "Я пишу **ручкой**." — I write with a pen.

**6. Prepositional (О ком? О чём?) — About whom? About what?**
After "about", "in", "at", "on" (location).
- "Я думаю **о книге**." — I think about the book.` },
  { courseSlug: 'russian', level: 'Beginner', order: 84, title: 'Personal Pronouns', type: 'Reading',
    body: `Personal pronouns in Russian:

| Case | I | You (inf) | He | She | We | You (for) | They |
|------|---|-----------|----|-----|----|-----------|------|
| Nom | я | ты | он | она | мы | вы | они |
| Acc | меня | тебя | его | её | нас | вас | их |
| Gen | меня | тебя | его | её | нас | вас | их |
| Dat | мне | тебе | ему | ей | нам | вам | им |
| Ins | мной | тобой | ним | ней | нами | вами | ними |
| Pre | мне | тебе | нём | ней | нас | вас | них |

**Important:** after prepositions, the 3rd person pronouns add an "н-": у него, с ней, о них` },
  { courseSlug: 'russian', level: 'Beginner', order: 85, title: 'Practice: Grammar Exercises', type: 'Practice',
    practiceTask: `Complete these exercises in Russian:
1. Write the plural forms of: дом, книга, окно, сад, ручка
2. Put these into accusative case: Я вижу (стол), Я читаю (книга), Я покупаю (хлеб)
3. Translate: "I don't have a sister", "I give a book to my friend", "I write with a pen"` },

  // Unit 20: Prepositions & Directions
  { courseSlug: 'russian', level: 'Beginner', order: 86, title: 'Directions & Location', type: 'Reading',
    body: `Asking for and giving directions:

**Questions:**
- Где находится...? — Where is... located?
- Как пройти в...? — How do I get to...?
- Это далеко? — Is it far?

**Directions:**
- прямо — straight ahead
- налево — to the left
- направо — to the right
- за углом — around the corner
- рядом с — next to
- напротив — opposite

**Prepositions of location:**
- в / внутри — in / inside
- на — on
- под — under
- над — above / over
- между — between
- около — near / around` },
  { courseSlug: 'russian', level: 'Beginner', order: 87, title: 'Listen: Finding Your Way', type: 'Listening',
    listenText: 'Gde nakhoditsya biblioteka? Idite pryamo, potom na parvo. Biblioteka za uglom, ryadom s parkom. Spasibo!',
    body: 'Listen to directions being given. Practice understanding and remembering the sequence of movements.' },
  { courseSlug: 'russian', level: 'Beginner', order: 88, title: 'Transport Vocabulary', type: 'Reading',
    body: `Getting around:

- автобус — bus
- троллейбус — trolleybus
- трамвай — tram
- метро — metro
- такси — taxi
- поезд — train
- самолёт — airplane
- машина — car

**Phrases:**
- Где остановка автобуса? — Where is the bus stop?
- Сколько стоит билет? — How much is a ticket?
- Мне нужен билет до Москвы. — I need a ticket to Moscow.
- Это место занято? — Is this seat taken?` },
  { courseSlug: 'russian', level: 'Beginner', order: 89, title: 'Practice: Ask for Directions', type: 'Practice',
    practiceTask: 'Write a dialog in Russian where you ask for directions to a museum. Include: greeting, asking for directions, following the instructions, thanking. Then write directions from your school/home to a nearby landmark.' },

  // Unit 21: Final Review
  { courseSlug: 'russian', level: 'Beginner', order: 90, title: 'Review: Phrases & Greetings', type: 'Reading',
    body: `**Comprehensive review of essential phrases:**

**Greetings:**
- Здравствуйте — Hello (formal)
- Привет! — Hi (informal)
- Доброе утро! — Good morning!
- Добрый день! — Good afternoon!
- Добрый вечер! — Good evening!
- До свидания! — Goodbye!
- Пока! — Bye! (informal)

**Introductions:**
- Меня зовут... — My name is...
- Очень приятно! — Nice to meet you!
- Откуда вы? — Where are you from?

**Courtesies:**
- Спасибо / Большое спасибо — Thank you / Thank you very much
- Пожалуйста — Please / You're welcome
- Извините! — Excuse me / Sorry (formal)
- Не за что! — Don't mention it!` },
  { courseSlug: 'russian', level: 'Beginner', order: 91, title: 'Review: Verbs & Tenses', type: 'Reading',
    body: `**Verb conjugation review (present tense):**

Говорить (to speak):
Я говорю, Ты говоришь, Он/она говорит, Мы говорим, Вы говорите, Они говорят

**Past tense:**
говорил (m), говорила (f), говорили (pl)

**Future tense:**
Я буду говорить, Ты будешь говорить...

**Key irregular verbs:**
- быть (to be): я есть (but usually omitted in present)
- есть (to eat): я ем, ты ешь, он ест, мы едим, вы едите, они едят
- хотеть (to want): я хочу, ты хочешь, он хочет, мы хотим, вы хотите, они хотят` },
  { courseSlug: 'russian', level: 'Beginner', order: 92, title: 'Review: Numbers & Time', type: 'Reading',
    body: `**Numbers 1-100 review:**

1-10: один, два, три, четыре, пять, шесть, семь, восемь, девять, десять
11-20: одиннадцать, двенадцать, тринадцать, четырнадцать, пятнадцать, шестнадцать, семнадцать, восемнадцать, девятнадцать, двадцать

Tens: тридцать, сорок, пятьдесят, шестьдесят, семьдесят, восемьдесят, девяносто, сто

**Time expressions:**
- сейчас — now
- сегодня — today
- завтра — tomorrow
- вчера — yesterday
- каждый день — every day
- обычно — usually
- иногда — sometimes
- всегда — always
- никогда — never` },
  { courseSlug: 'russian', level: 'Beginner', order: 93, title: 'Final Practice: Tell Me About Yourself', type: 'Practice',
    practiceTask: `Write 10 sentences in Russian introducing yourself and telling about your life. Include:

1. Your name and where you are from
2. Your profession / what you study
3. Where you live
4. Your family (how many people)
5. What you like to do (hobbies)
6. Your daily routine
7. What languages you speak
8. Where you have been or want to go
9. Your future plans
10. A question for the reader

This is your final speaking/writing practice for the A1 course!` },

  ...typingLessons,

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
    { prompt: 'Formal "you" in Russian is:', options: ['ты', 'вы', 'он'], answer: 1 },
    { prompt: 'How do you say "Goodbye" formally?', options: ['Пока', 'Привет', 'До свидания'], answer: 2 },
    { prompt: 'Russian for "thank you":', options: ['Пожалуйста', 'Спасибо', 'Извините'], answer: 1 },
  ] },
  { courseSlug: 'arabic', questions: [
    { prompt: 'Arabic is written:', options: ['Left to right', 'Right to left', 'Top to bottom'], answer: 1 },
    { prompt: '"Shukran" means:', options: ['Hello', 'Thank you', 'Please'], answer: 1 },
    { prompt: '"Sabah al-khayr" means:', options: ['Good evening', 'Good morning', 'Good night'], answer: 1 },
  ] },
  { courseSlug: 'korean', title: 'Korean Placement — Basic', level: 'Beginner',
    questions: [
      { question: 'Do you already know how to read Hangul?', options: ['Yes, I can read all of it', 'I know some letters', 'No, I cannot', 'What is Hangul?'], correctIndex: 0 },
      { question: 'What does "안녕하세요" mean?', options: ['Thank you', 'Hello', 'Goodbye', 'Please'], correctIndex: 1 },
      { question: 'How do you say "rice/meal" in Korean?', options: ['물', '밥', '김치', '고기'], correctIndex: 1 },
      { question: 'Which is the correct sentence structure in Korean?', options: ['Subject-Verb-Object', 'Subject-Object-Verb', 'Verb-Subject-Object', 'Object-Subject-Verb'], correctIndex: 1 },
      { question: 'What does "감사합니다" mean?', options: ['Sorry', 'Hello', 'Thank you', 'Goodbye'], correctIndex: 2 },
    ] },
  { courseSlug: 'korean', title: 'Korean Placement — Full', level: 'Beginner',
    questions: [
      { question: 'How do you say "I want to eat kimchi"?', options: ['김치 먹어요', '김치 먹고 싶어요', '김치 먹을 거예요', '김치 먹어도 돼요'], correctIndex: 1 },
      { question: 'Which of these means "expensive"?', options: ['싸요', '비싸요', '좋아요', '맛있어요'], correctIndex: 1 },
      { question: 'What is "Let\'s go" in Korean?', options: ['갑시다', '가요', '가지 마요', '가고 있어요'], correctIndex: 0 },
      { question: 'How do you say "I can speak Korean"?', options: ['한국어를 해요', '한국어를 할 수 있어요', '한국어를 하고 싶어요', '한국어를 해야 돼요'], correctIndex: 1 },
      { question: 'Which is correct: "I am a student"?', options: ['저는 학생이에요', '저는 학생이 아니에요', '저는 선생님이에요', '저는 의사예요'], correctIndex: 0 },
    ] },
  { courseSlug: 'chinese', questions: [
    { prompt: 'Mandarin Chinese uses:', options: ['An alphabet', 'Characters (hanzi)', 'A syllabary'], answer: 1 },
    { prompt: '"Nǐ hǎo" means:', options: ['Thank you', 'Hello', 'Goodbye'], answer: 1 },
    { prompt: 'How many tones does Mandarin have?', options: ['2', '4', '6'], answer: 1 },
  ] },
  { courseSlug: 'amharic', questions: [
    { prompt: 'The Amharic script is called:', options: ['Fidäl', 'Hangul', 'Cyrillic'], answer: 0 },
    { prompt: '"Selam" means:', options: ['Goodbye', 'Peace/Hello', 'Thank you'], answer: 1 },
  ] },
  { courseSlug: 'russian', questions: [
    { prompt: '"Privet" means:', options: ['Goodbye', 'Hello (informal)', 'Thank you'], answer: 1 },
    { prompt: 'The Cyrillic letter "В" sounds like:', options: ['B', 'V', 'W'], answer: 1 },
    { prompt: 'Russian for "I have" (literally "by me there is"):', options: ['Я имею', 'У меня есть', 'У меня нет'], answer: 1 },
    { prompt: '"Меня зовут" means:', options: ['I am called', 'I live', 'I work'], answer: 0 },
    { prompt: 'What case does the preposition "в" use for locations?', options: ['Accusative', 'Prepositional', 'Genitive'], answer: 1 },
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
  { courseSlug: 'english', title: 'Tenses Check', level: 'Intermediate', questions: [
    { prompt: 'Which sentence is present continuous?', options: ['She walks to work', 'She is walking to work', 'She walked to work'], answer: 1, explanation: '"is walking" = action happening now.' },
    { prompt: 'Past of "to buy":', options: ['Buyed', 'Bought', 'Brought'], answer: 1, explanation: 'Buy → bought (irregular).' },
    { prompt: 'Uncountable noun:', options: ['Apple', 'Water', 'Chair'], answer: 1, explanation: 'Water cannot be counted (not "two waters").' },
    { prompt: '"I have lived here ___ 2019."', options: ['since', 'for', 'from'], answer: 0, explanation: 'Use "since" with a specific point in time.' },
  ] },
  { courseSlug: 'english', title: 'Advanced Grammar', level: 'Advanced', questions: [
    { prompt: '"If I ___ you, I would study harder."', options: ['am', 'were', 'be'], answer: 1, explanation: 'Second conditional uses "were" for unreal situations.' },
    { prompt: 'Passive: "The letter ___ yesterday."', options: ['was sent', 'sent', 'is sent'], answer: 0, explanation: 'Past passive = was/were + past participle.' },
    { prompt: '"He ________ (already/finish) his homework."', options: ['already finished', 'has already finished', 'have already finished'], answer: 1, explanation: 'Present perfect: has + already + past participle (he = third person singular).' },
  ] },
  { courseSlug: 'computer-skills', title: 'Excel & Email', level: 'Intermediate', questions: [
    { prompt: 'Which Excel function adds numbers?', options: ['AVERAGE', 'SUM', 'COUNT'], answer: 1, explanation: 'SUM adds a range of cells.' },
    { prompt: 'A pie chart shows:', options: ['Trend over time', 'Parts of a whole', 'Comparison of categories'], answer: 1, explanation: 'Pie charts show proportions of a total.' },
    { prompt: 'What should a professional email include?', options: ['Only the message', 'Subject line, greeting, body, closing', 'Just "Hi" and the message'], answer: 1, explanation: 'Professional emails have a clear structure.' },
  ] },
  { courseSlug: 'arabic', title: 'Arabic Basics', level: 'Beginner', questions: [
    { prompt: 'Arabic is written:', options: ['Left to right', 'Right to left', 'Top to bottom'], answer: 1, explanation: 'Arabic and other Semitic languages are written right-to-left.' },
    { prompt: '"Shukran" means:', options: ['Hello', 'Thank you', 'Goodbye'], answer: 1, explanation: 'Shukran = thank you in Arabic.' },
    { prompt: 'How many letters in the Arabic alphabet?', options: ['26', '28', '32'], answer: 1, explanation: 'Arabic has 28 letters.' },
  ] },
  { courseSlug: 'korean', title: 'Unit 0: Hangul Basics', level: 'Beginner',
    questions: [
      { question: 'How many basic consonants does Hangul have?', options: ['8', '10', '14', '24'], correctIndex: 1 },
      { question: 'Which Hangul vowel sounds like "a" in "father"?', options: ['ㅓ', 'ㅏ', 'ㅗ', 'ㅡ'], correctIndex: 1 },
      { question: 'What is the silent consonant used at the start of a syllable?', options: ['ㄱ', 'ㅇ', 'ㅎ', 'ㄴ'], correctIndex: 1 },
      { question: 'Which is the correct way to write "ga" in Hangul?', options: ['아', '가', '카', '나'], correctIndex: 1 },
      { question: 'What is the 받침 (batchim)?', options: ['A vowel', 'The final consonant in a block', 'A double consonant', 'A tense sound'], correctIndex: 1 },
    ] },
  { courseSlug: 'korean', title: 'Unit 1 Part 1: Greetings & Basics', level: 'Beginner',
    questions: [
      { question: 'What does 안녕하세요 mean?', options: ['Thank you', 'Hello', 'Goodbye', 'Sorry'], correctIndex: 1 },
      { question: 'In Korean sentence structure, where does the verb go?', options: ['Beginning', 'Middle', 'End', 'Anywhere'], correctIndex: 2 },
      { question: 'Which particle marks the topic of a sentence?', options: ['을/를', '에', '은/는', '이/가'], correctIndex: 2 },
      { question: 'How do you say "I am a student"?', options: ['저는 학생이에요', '저는 학생이 아니에요', '저는 선생님이에요', '학생은 저예요'], correctIndex: 0 },
      { question: 'What is the object particle for a word ending in a consonant?', options: ['를', '은', '을', '는'], correctIndex: 2 },
    ] },
  { courseSlug: 'korean', title: 'Unit 1 Part 2: Verbs & Numbers', level: 'Beginner',
    questions: [
      { question: 'What is the Sino-Korean number for 5?', options: ['오', '육', '삼', '칠'], correctIndex: 0 },
      { question: 'What is the Native Korean number for 1?', options: ['일', '하나', '둘', '한'], correctIndex: 1 },
      { question: 'How do you say "I want to go" in Korean?', options: ['가고 싶어요', '가요', '갈 수 있어요', '가야 돼요'], correctIndex: 0 },
      { question: 'What is the past tense of 가다 (to go)?', options: ['가요', '갔어요', '갈 거예요', '가고 있어요'], correctIndex: 1 },
      { question: 'How do you say "delicious" in Korean?', options: ['비싸요', '맛있어요', '재미있어요', '좋아요'], correctIndex: 1 },
    ] },
  { courseSlug: 'korean', title: 'Unit 2: More Grammar', level: 'Beginner',
    questions: [
      { question: 'What does 왼쪽 mean?', options: ['Right', 'Straight', 'Left', 'Behind'], correctIndex: 2 },
      { question: 'How do you say "Let\'s go" in Korean?', options: ['갑시다', '가요', '가고 있어요', '갈 거예요'], correctIndex: 0 },
      { question: 'How do you say "must not" in Korean?', options: ['아/어도 돼요', '(으)면 안 돼요', '안 ~아/어요', '(으)ㄹ 수 있어요'], correctIndex: 1 },
      { question: 'What is the counter for people?', options: ['개', '명', '권', '잔'], correctIndex: 1 },
      { question: 'How do you say "more expensive than" in Korean?', options: ['보다 싸요', '보다 비싸요', '제일 비싸요', '더 싸요'], correctIndex: 1 },
    ] },
  { courseSlug: 'russian', title: 'Alphabet & Greetings', level: 'Beginner', questions: [
    { prompt: 'How many letters does the Russian alphabet have?', options: ['26', '33', '31'], answer: 1, explanation: 'The Russian alphabet has 33 letters — 10 vowels, 21 consonants, and 2 signs.' },
    { prompt: '"Здравствуйте" is:', options: ['Goodbye (formal)', 'Hello (formal)', 'Thank you'], answer: 1, explanation: 'Здравствуйте is the formal way to say hello in Russian.' },
    { prompt: '"Меня зовут Анна" means:', options: ['I like Anna', 'My name is Anna', 'I see Anna'], answer: 1, explanation: 'Меня зовут literally means "they call me".' },
    { prompt: '"Привет" is used with:', options: ['Strangers', 'Friends (informal)', 'Bosses'], answer: 1, explanation: 'Привет is informal, used between friends and relatives.' },
    { prompt: 'Fill in: "До ___!" (Goodbye formal)', options: ['свидания', 'встречи', 'завтра'], answer: 0, explanation: 'До свидания! is the formal goodbye.' },
  ] },
  { courseSlug: 'russian', title: 'Phrases & Introductions', level: 'Beginner', questions: [
    { prompt: '"Очень приятно" means:', options: ['Very nice (to meet you)', 'Very tasty', 'Very big'], answer: 0, explanation: 'Очень приятно = "very pleasant/very nice to meet you".' },
    { prompt: '"Как вас зовут?" is addressed to:', options: ['A friend', 'A stranger (formal)', 'A child'], answer: 1, explanation: 'Как вас зовут uses formal "вас".' },
    { prompt: '"Это мой друг" means:', options: ['This is my friend', 'That is my dog', 'This is good'], answer: 0, explanation: 'Друг = friend, мой = my.' },
    { prompt: 'Russian for "How are things?":', options: ['Как дела?', 'Как вы?', 'Что это?'], answer: 0, explanation: 'Как дела? literally means "how are things/affairs?".' },
    { prompt: 'Respond to "Как дела?" with "Good":', options: ['Плохо', 'Хорошо', 'Нормально'], answer: 1, explanation: 'Хорошо = good/well.' },
  ] },
  { courseSlug: 'russian', title: 'Daily Life & Numbers', level: 'Beginner', questions: [
    { prompt: 'What is 15 in Russian?', options: ['Пять', 'Пятнадцать', 'Пятьдесят'], answer: 1, explanation: 'Пятнадцать = 15 (пять + надцать).' },
    { prompt: '"Я читаю" means:', options: ['I am reading', 'I am writing', 'I am speaking'], answer: 0, explanation: 'Читать = to read.' },
    { prompt: '"Во сколько ты встаёшь?" asks:', options: ['Where do you live?', 'What time do you wake up?', 'How are you?'], answer: 1, explanation: 'Вставать = to get up/wake.' },
    { prompt: 'Saturday in Russian:', options: ['Воскресенье', 'Суббота', 'Пятница'], answer: 1, explanation: 'Суббота = Saturday, Воскресенье = Sunday.' },
    { prompt: '"У меня есть брат" means:', options: ['I have a brother', 'My brother is here', 'I like my brother'], answer: 0, explanation: 'У меня есть = I have (literally "by me there is").' },
  ] },
  { courseSlug: 'russian', title: 'Restaurant & Shopping', level: 'Beginner', questions: [
    { prompt: '"Счёт, пожалуйста!" is said:', options: ['When entering a shop', 'When asking for the bill', 'When greeting someone'], answer: 1, explanation: 'Счёт = bill/check, said at the end of a meal.' },
    { prompt: '"Сколько это стоит?" means:', options: ['How much does this cost?', 'What is this?', 'Where is this?'], answer: 0, explanation: 'Сколько = how much, стоит = costs.' },
    { prompt: 'Russian for "tasty":', options: ['Красивый', 'Вкусный', 'Интересный'], answer: 1, explanation: 'Вкусный means tasty/delicious.' },
    { prompt: '"Мне нужна куртка" uses нужна because куртка is:', options: ['Masculine', 'Feminine', 'Neuter'], answer: 1, explanation: 'Куртка (jacket) is feminine, so the form is нужна.' },
    { prompt: '"Приятного аппетита!" is said:', options: ['Before a meal', 'After a meal', 'When meeting someone'], answer: 0, explanation: 'It means "Enjoy your meal!" and is said before eating.' },
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
  { courseSlug: 'english', title: 'Irregular Verbs', cards: [
    { front: 'to speak', back: 'spoke / spoken' }, { front: 'to take', back: 'took / taken' }, { front: 'to write', back: 'wrote / written' }, { front: 'to teach', back: 'taught / taught' },
    { front: 'to buy', back: 'bought / bought' }, { front: 'to think', back: 'thought / thought' }, { front: 'to bring', back: 'brought / brought' }, { front: 'to catch', back: 'caught / caught' },
  ] },
  { courseSlug: 'computer-skills', title: 'Keyboard Shortcuts', cards: [
    { front: 'Ctrl+C', back: 'Copy' }, { front: 'Ctrl+V', back: 'Paste' }, { front: 'Ctrl+X', back: 'Cut' }, { front: 'Ctrl+Z', back: 'Undo' },
    { front: 'Ctrl+S', back: 'Save' }, { front: 'Ctrl+P', back: 'Print' }, { front: 'Ctrl+A', back: 'Select all' }, { front: 'Ctrl+F', back: 'Find' },
  ] },
  { courseSlug: 'computer-skills', title: 'Excel Functions', cards: [
    { front: '=SUM(A1:A10)', back: 'Adds all numbers in range' }, { front: '=AVERAGE(B1:B10)', back: 'Average of numbers' },
    { front: '=MAX(C1:C10)', back: 'Largest value' }, { front: '=MIN(C1:C10)', back: 'Smallest value' },
  ] },
  { courseSlug: 'arabic', title: 'Arabic Verbs', cards: [
    { front: 'يكتب (yaktubu)', back: 'He writes' }, { front: 'يقرأ (yaqra\'u)', back: 'He reads' },
    { front: 'يتكلم (yatakallamu)', back: 'He speaks' }, { front: 'يذهب (yathhabu)', back: 'He goes' },
  ] },
  { courseSlug: 'korean', title: 'Hangul', level: 'Beginner',
    cards: [
      { front: 'ㄱ', back: 'g/k (giyeok)' },
      { front: 'ㄴ', back: 'n (nieun)' },
      { front: 'ㄷ', back: 'd/t (digeut)' },
      { front: 'ㄹ', back: 'r/l (rieul)' },
      { front: 'ㅁ', back: 'm (mieum)' },
      { front: 'ㅂ', back: 'b/p (bieup)' },
      { front: 'ㅅ', back: 's (siot)' },
      { front: 'ㅇ', back: 'silent/ng (ieung)' },
      { front: 'ㅏ', back: 'a (father)' },
      { front: 'ㅓ', back: 'eo (um)' },
    ] },
  { courseSlug: 'korean', title: 'Greetings & Basics', level: 'Beginner',
    cards: [
      { front: '안녕하세요', back: 'Hello', example: '안녕하세요, 만나서 반가워요' },
      { front: '감사합니다', back: 'Thank you', example: '감사합니다, 선생님' },
      { front: '죄송합니다', back: 'I\'m sorry', example: '죄송합니다, 늦었어요' },
      { front: '네', back: 'Yes' },
      { front: '아니요', back: 'No' },
      { front: '저', back: 'I / me (humble)' },
      { front: '학생', back: 'student', example: '저는 학생이에요' },
      { front: '선생님', back: 'teacher', example: '선생님이에요?' },
      { front: '만나서 반가워요', back: 'Nice to meet you' },
      { front: '이름', back: 'name', example: '이름이 뭐예요?' },
    ] },
  { courseSlug: 'korean', title: 'Numbers', level: 'Beginner',
    cards: [
      { front: '일', back: '1 (Sino-Korean)' },
      { front: '이', back: '2 (Sino-Korean)' },
      { front: '삼', back: '3 (Sino-Korean)' },
      { front: '사', back: '4 (Sino-Korean)' },
      { front: '오', back: '5 (Sino-Korean)' },
      { front: '하나', back: '1 (Native Korean)' },
      { front: '둘', back: '2 (Native Korean)' },
      { front: '셋', back: '3 (Native Korean)' },
      { front: '넷', back: '4 (Native Korean)' },
      { front: '다섯', back: '5 (Native Korean)' },
    ] },
  { courseSlug: 'korean', title: 'Common Verbs', level: 'Beginner',
    cards: [
      { front: '가다', back: 'to go', example: '학교에 가요' },
      { front: '오다', back: 'to come', example: '친구가 와요' },
      { front: '먹다', back: 'to eat', example: '밥을 먹어요' },
      { front: '마시다', back: 'to drink', example: '물을 마셔요' },
      { front: '보다', back: 'to see/watch', example: '영화를 봐요' },
      { front: '듣다', back: 'to listen', example: '음악을 들어요' },
      { front: '읽다', back: 'to read', example: '책을 읽어요' },
      { front: '쓰다', back: 'to write/use', example: '편지를 써요' },
      { front: '하다', back: 'to do', example: '공부해요' },
      { front: '배우다', back: 'to learn', example: '한국어를 배워요' },
    ] },
  { courseSlug: 'korean', title: 'Food & Shopping', level: 'Beginner',
    cards: [
      { front: '김치', back: 'kimchi' },
      { front: '비빔밥', back: 'bibimbap' },
      { front: '불고기', back: 'bulgogi' },
      { front: '떡볶이', back: 'spicy rice cakes' },
      { front: '물', back: 'water' },
      { front: '커피', back: 'coffee' },
      { front: '얼마예요?', back: 'How much is it?' },
      { front: '주세요', back: 'Please give me', example: '물 주세요' },
      { front: '비싸요', back: 'It\'s expensive' },
      { front: '할인', back: 'discount' },
    ] },
  { courseSlug: 'russian', title: 'Russian Alphabet', cards: [
    { front: 'А а', back: 'a (like "father")' }, { front: 'Б б', back: 'b (like "book")' },
    { front: 'В в', back: 'v (like "voice")' }, { front: 'Г г', back: 'g (like "go")' },
    { front: 'Д д', back: 'd (like "door")' }, { front: 'Е е', back: 'ye (like "yes")' },
    { front: 'Ё ё', back: 'yo (like "york")' }, { front: 'Ж ж', back: 'zh (like "treasure")' },
    { front: 'З з', back: 'z (like "zebra")' }, { front: 'И и', back: 'ee (like "see")' },
    { front: 'Й й', back: 'y (short, like "boy")' }, { front: 'К к', back: 'k (like "kite")' },
    { front: 'Л л', back: 'l (like "love")' }, { front: 'М м', back: 'm (like "mom")' },
    { front: 'Н н', back: 'n (like "no")' }, { front: 'О о', back: 'o (like "more")' },
    { front: 'П п', back: 'p (like "park")' }, { front: 'Р р', back: 'r (rolled r)' },
    { front: 'С с', back: 's (like "sun")' }, { front: 'Т т', back: 't (like "top")' },
    { front: 'У у', back: 'oo (like "boot")' }, { front: 'Ф ф', back: 'f (like "fox")' },
    { front: 'Х х', back: 'kh (like "Bach")' }, { front: 'Ц ц', back: 'ts (like "cats")' },
    { front: 'Ч ч', back: 'ch (like "chip")' }, { front: 'Ш ш', back: 'sh (like "shop")' },
    { front: 'Щ щ', back: 'shch (like "fresh cheese")' }, { front: 'Ы ы', back: 'i (deep "ill")' },
    { front: 'Ь ь', back: 'soft sign (softens consonant)' }, { front: 'Ъ ъ', back: 'hard sign (no sound)' },
    { front: 'Э э', back: 'e (like "met")' }, { front: 'Ю ю', back: 'yu (like "you")' },
    { front: 'Я я', back: 'ya (like "yard")' },
  ] },
  { courseSlug: 'russian', title: 'Greetings & Basics', cards: [
    { front: 'Здравствуйте!', back: 'Hello! (formal)' }, { front: 'Привет!', back: 'Hi! (informal)' },
    { front: 'До свидания!', back: 'Goodbye (formal)' }, { front: 'Пока!', back: 'Bye! (informal)' },
    { front: 'Спасибо', back: 'Thank you' }, { front: 'Пожалуйста', back: 'Please / You\'re welcome' },
    { front: 'Извините!', back: 'Excuse me! (formal)' }, { front: 'Как дела?', back: 'How are things?' },
    { front: 'Хорошо', back: 'Good / Well' }, { front: 'Нормально', back: 'Fine / Okay' },
    { front: 'Отлично', back: 'Excellent' }, { front: 'Да / Нет', back: 'Yes / No' },
  ] },
  { courseSlug: 'russian', title: 'Numbers 1-20', cards: [
    { front: '1', back: 'один' }, { front: '2', back: 'два' }, { front: '3', back: 'три' },
    { front: '4', back: 'четыре' }, { front: '5', back: 'пять' }, { front: '6', back: 'шесть' },
    { front: '7', back: 'семь' }, { front: '8', back: 'восемь' }, { front: '9', back: 'девять' },
    { front: '10', back: 'десять' }, { front: '11', back: 'одиннадцать' }, { front: '15', back: 'пятнадцать' },
    { front: '20', back: 'двадцать' }, { front: '50', back: 'пятьдесят' }, { front: '100', back: 'сто' },
  ] },
  { courseSlug: 'russian', title: 'Common Verbs', cards: [
    { front: 'читать', back: 'to read' }, { front: 'писать', back: 'to write' },
    { front: 'говорить', back: 'to speak' }, { front: 'слушать', back: 'to listen' },
    { front: 'работать', back: 'to work' }, { front: 'готовить', back: 'to cook' },
    { front: 'делать', back: 'to do' }, { front: 'смотреть', back: 'to watch' },
    { front: 'любить', back: 'to love / to like' }, { front: 'есть / кушать', back: 'to eat' },
    { front: 'пить', back: 'to drink' }, { front: 'идти / ходить', back: 'to go / to walk' },
    { front: 'ехать', back: 'to go (by transport)' }, { front: 'быть', back: 'to be' },
  ] },
  { courseSlug: 'russian', title: 'Food & Drink', cards: [
    { front: 'хлеб', back: 'bread' }, { front: 'молоко', back: 'milk' },
    { front: 'вода', back: 'water' }, { front: 'мясо', back: 'meat' },
    { front: 'рыба', back: 'fish' }, { front: 'сыр', back: 'cheese' },
    { front: 'яйцо', back: 'egg' }, { front: 'сахар', back: 'sugar' },
    { front: 'соль', back: 'salt' }, { front: 'фрукты', back: 'fruit' },
    { front: 'овощи', back: 'vegetables' }, { front: 'кофе', back: 'coffee' },
    { front: 'чай', back: 'tea' }, { front: 'сок', back: 'juice' },
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
  { courseSlug: 'english', level: 'Intermediate', kind: 'Theoretical', title: 'English Intermediate — Final', questions: [
    { prompt: 'This book is ___ than that one.', options: ['more interesting', 'interesting', 'most interesting'], answer: 0 },
    { prompt: '"How ___ sugar do you want?"', options: ['many', 'much', 'some'], answer: 1 },
    { prompt: '"I have ___ finished my homework." (already)', options: ['I have finished already my homework.', 'I have already finished my homework.', 'I already have finished my homework.'], answer: 1 },
    { prompt: 'Choose the correct passive: "The cake ___ by my mother."', options: ['was made', 'made', 'is making'], answer: 0 },
    { prompt: '"We have studied here ___ three months."', options: ['since', 'for', 'during'], answer: 1 },
  ] },
  { courseSlug: 'english', level: 'Advanced', kind: 'Theoretical', title: 'English Advanced — Final', questions: [
    { prompt: '"By the time she arrived, we ___ dinner."', options: ['finished', 'had finished', 'have finished'], answer: 1 },
    { prompt: '"I wish I ___ more time to study."', options: ['have', 'had', 'would have'], answer: 1 },
    { prompt: '"The report ___ by Friday." (future passive)', options: ['will submit', 'will be submitted', 'is submitting'], answer: 1 },
    { prompt: '"She is the woman ___ helped me."', options: ['which', 'who', 'what'], answer: 1 },
  ] },
  { courseSlug: 'computer-skills', level: 'Advanced', kind: 'Practical', title: 'Computer Advanced — Final Project', tasks: [
    'Create a folder named "FinalProject" on your Desktop.',
    'Open Excel and create a table of your monthly expenses for 3 months.',
    'Add a SUM row and create a line chart showing the trend.',
    'Open Word and write a 1-page summary of what you learned in this course.',
    'Save the Word document as "CourseSummary.docx" inside the FinalProject folder.',
    'Take a screenshot showing both files in the folder.',
  ] },
  { courseSlug: 'arabic', level: 'Beginner', kind: 'Theoretical', title: 'Arabic Beginner — Final', questions: [
    { prompt: 'Which direction is Arabic written?', options: ['Left to right', 'Right to left', 'Both'], answer: 1 },
    { prompt: 'How many letters in the Arabic alphabet?', options: ['24', '28', '30'], answer: 1 },
    { prompt: '"As-salaamu alaykum" means:', options: ['Good morning', 'Peace be upon you', 'Thank you'], answer: 1 },
    { prompt: '"Shukran" is:', options: ['Hello', 'Please', 'Thank you'], answer: 2 },
    { prompt: '"Wahid" is the number:', options: ['One', 'Two', 'Three'], answer: 0 },
  ] },
  { courseSlug: 'russian', level: 'Beginner', kind: 'Theoretical', title: 'Russian A1 — Final Exam', questions: [
    { prompt: 'How many letters does the Russian alphabet have?', options: ['26', '33', '31'], answer: 1 },
    { prompt: '"Здравствуйте" is used when:', options: ['Greeting a friend', 'Greeting formally', 'Saying goodbye'], answer: 1 },
    { prompt: '"Извините" is:', options: ['Thank you', 'Excuse me / Sorry (formal)', 'Please'], answer: 1 },
    { prompt: 'Which is correct for "I am reading"?', options: ['Я читаю', 'Я читал', 'Я буду читать'], answer: 0 },
    { prompt: '"До свидания" means:', options: ['Hello', 'Goodbye', 'See you tomorrow'], answer: 1 },
    { prompt: 'Formal "you" in Russian:', options: ['ты', 'вы', 'они'], answer: 1 },
    { prompt: '"У меня есть" means:', options: ['I have', 'I am', 'I need'], answer: 0 },
    { prompt: 'The letter "В" sounds like:', options: ['B', 'V', 'W'], answer: 1 },
    { prompt: '"Сколько это стоит?" asks about:', options: ['Time', 'Price', 'Distance'], answer: 1 },
    { prompt: 'Russian for "good":', options: ['Хорошо', 'Плохо', 'Красиво'], answer: 0 },
    { prompt: '"Меня зовут Джон" means:', options: ['I like John', 'My name is John', 'I see John'], answer: 1 },
    { prompt: 'Which month is "январь"?', options: ['January', 'June', 'December'], answer: 0 },
    { prompt: '"Приятного аппетита!" is said:', options: ['Before eating', 'After eating', 'When meeting'], answer: 0 },
    { prompt: 'The plural of "книга" (book) is:', options: ['книги', 'книгу', 'книгой'], answer: 0 },
    { prompt: '"Я хочу" means:', options: ['I can', 'I want', 'I have'], answer: 1 },
  ] },
  { courseSlug: 'russian', level: 'Beginner', kind: 'Practical', title: 'Russian A1 — Speaking Practice', tasks: [
    'Introduce yourself in Russian: say your name, where you are from, and one hobby.',
    'Count from 1 to 20 in Russian out loud.',
    'Say 3 foods you like in Russian: "Я люблю..."',
    'Ask "How are you?" in formal and informal Russian.',
    'Describe your family in 3 sentences.',
    'Say what time you wake up and what you do in the morning.',
    'Order a coffee in Russian: ask for it, say please, ask the price, thank.',
    'Name 3 countries in Russian and say "I am from..."',
    'Say "I have a brother/friend" and "I don\'t have a sister" in Russian.',
    'Say goodbye in both formal and informal Russian.',
  ] },
  { courseSlug: 'korean', level: 'Beginner', kind: 'Theoretical', title: 'Korean A1 — Theoretical Exam',
    sections: [
      {
        title: 'Hangul & Pronunciation', type: 'multiple-choice',
        questions: [
          { question: 'Which vowel is horizontal?', options: ['ㅏ', 'ㅗ', 'ㅓ', 'ㅣ'], correctIndex: 1 },
          { question: 'How many representative final consonant sounds are there?', options: ['5', '7', '10', '14'], correctIndex: 1 },
          { question: 'Which is a tense consonant?', options: ['ㅋ', 'ㄲ', 'ㅌ', 'ㅊ'], correctIndex: 1 },
        ]
      },
      {
        title: 'Grammar & Vocabulary', type: 'multiple-choice',
        questions: [
          { question: 'What does "저는 물을 마셔요" mean?', options: ['I drink water', 'I eat rice', 'I see water', 'I want water'], correctIndex: 0 },
          { question: 'Which is correct future tense of 가다?', options: ['가요', '갔어요', '갈 거예요', '가고 있어요'], correctIndex: 2 },
          { question: 'What particle marks the location of an action?', options: ['에', '에서', '은/는', '을/를'], correctIndex: 1 },
        ]
      },
    ] },
  { courseSlug: 'korean', level: 'Beginner', kind: 'Practical', title: 'Korean A1 — Practical Speaking',
    sections: [
      {
        title: 'Self-Introduction', type: 'speaking',
        questions: [
          { question: 'Introduce yourself in Korean: say your name, where you are from, and one thing about yourself.' },
          { question: 'Say 3 foods you like in Korean.' },
          { question: 'Describe your daily routine: what time you wake up and what you do in the morning.' },
        ]
      },
      {
        title: 'Situational Speaking', type: 'speaking',
        questions: [
          { question: 'Order a dish at a Korean restaurant. Include a greeting, what you want, and saying thank you.' },
          { question: 'Ask for directions to the subway station.' },
          { question: 'Count from 1 to 10 in both Sino-Korean and Native Korean.' },
        ]
      },
    ] },
];

const typingDrills = newTypingDrills;

const users = [
  { name: 'Amar Hassen', email: 'amar@erilearn.io', password: 'demo123', role: 'admin', enrollments: [
    { courseSlug: 'english', instructionLanguage: 'Tigrigna', level: 'Intermediate', progress: 40, placementScore: 3 },
    { courseSlug: 'typing', instructionLanguage: 'English', level: 'Beginner', progress: 25 },
  ] },
];

module.exports = { courses, lessons, placements, quizzes, flashcards, exams, typingDrills, users };
