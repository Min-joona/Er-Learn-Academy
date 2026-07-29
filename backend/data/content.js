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
    listenText: 'Fi al-sooq ashtaraytu khubz wa laban wa fawakeh. Al-tamat ghaliat lakin al-khiyar rakhees. Ba'duha thahabtu ila al-bayt.',
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

  // Korean — Extended
  { courseSlug: 'korean', level: 'Beginner', order: 2, title: 'Listen: Korean Greetings', type: 'Listening',
    listenText: 'Annyeonghaseyo. Je ireum-eun Sara-imnida. Mannaseo bangawoyo. Kamsahamnida. Jo-eun haru doeseyo.',
    body: 'Listen to common Korean greetings and introductions. Notice the formal verb endings (-imnida, -seyo).' },
  { courseSlug: 'korean', level: 'Beginner', order: 3, title: 'Hangul: Vowels & Consonants', type: 'Reading',
    body: `Hangul vowels:
- ㅏ (a), ㅑ (ya), ㅓ (eo), ㅕ (yeo)
- ㅗ (o), ㅛ (yo), ㅜ (u), ㅠ (yu)
- ㅡ (eu), ㅣ (i)

Block formation: consonant + vowel + (optional final consonant)

Example: 한 (h + a + n) = 한 (han)
글 (g + eu + l) = 글 (geul) => 한글 (Hangul)` },
  { courseSlug: 'korean', level: 'Intermediate', order: 1, title: 'Korean Sentence Structure', type: 'Reading',
    body: `Korean is Subject-Object-Verb (SOV).

- "I eat rice" → 저는 밥을 먹어요 (Jeoneun bap-eul meogeoyo)
  Subject: 저는 (I)
  Object: 밥을 (rice)
  Verb: 먹어요 (eat)

Particles:
- 은/는 (eun/neun) — subject/topic marker
- 을/를 (eul/reul) — object marker
- 에 (e) — location/time marker` },

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

  // Russian — Extended
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
  { courseSlug: 'russian', level: 'Beginner', order: 3, title: 'Russian Numbers 1-20', type: 'Reading',
    body: `Russian numbers 1-10:
1. один (adin)
2. два (dva)
3. три (tri)
4. четыре (chityre)
5. пять (pyat')
6. шесть (shest')
7. семь (syem')
8. восемь (vosyem')
9. девять (dyevyat')
10. десять (dyesyat')

11-20 are formed by adding -надцать (-nadtsat) to 1-9: одиннадцать (adinadtsat) = 11.` },
  { courseSlug: 'russian', level: 'Intermediate', order: 1, title: 'Russian Cases: Nominative & Accusative', type: 'Reading',
    body: `Russian has 6 grammatical cases! For now, focus on two:

**Nominative** (dictionary form): "This is a **book**." — Это **книга**.
**Accusative** (direct object): "I read a **book**." — Я читаю **книгу**.

The ending changes. For feminine nouns (-а → -у):
Книга → Книгу

For masculine nouns, no change for inanimate objects.` },
  { courseSlug: 'russian', level: 'Intermediate', order: 2, title: 'Practice: Describe Your Family in Russian', type: 'Practice',
    practiceTask: 'Write 5 sentences in Russian describing your family. Include: how many people, their names (in Russian script), and one fact about each person. Use the vocabulary you\'ve learned.' },

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
    { prompt: '"Sabah al-khayr" means:', options: ['Good evening', 'Good morning', 'Good night'], answer: 1 },
  ] },
  { courseSlug: 'korean', questions: [
    { prompt: 'The Korean alphabet is called:', options: ['Kanji', 'Hangul', 'Hiragana'], answer: 1 },
    { prompt: '"Annyeonghaseyo" means:', options: ['Thank you', 'Hello', 'Goodbye'], answer: 1 },
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
  { courseSlug: 'korean', title: 'Hangul Check', level: 'Beginner', questions: [
    { prompt: '한글 (Hangul) is:', options: ['Chinese characters', 'The Korean alphabet', 'Japanese writing'], answer: 1, explanation: 'Hangul is the Korean alphabet, created in the 15th century.' },
    { prompt: '"안녕하세요" means:', options: ['Thank you', 'Hello', 'Goodbye'], answer: 1, explanation: 'Annyeonghaseyo = Hello (formal).' },
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
  { courseSlug: 'korean', title: 'Korean Particles', cards: [
    { front: '은/는', back: 'Subject/topic marker' }, { front: '을/를', back: 'Object marker' },
    { front: '에', back: 'Time/location marker' }, { front: '에서', back: 'Action location ("at/in")' },
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
