const koreanLessons = [
  // ========== UNIT 0: HANGUL (Lessons 1-8) ==========
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 1,
    title: 'Basic Consonants: ㄱㄴㄷㄹㅁㅂㅅㅈㅎ',
    type: 'Reading',
    body: 'Korean has 14 basic consonants. ㄱ (giyeok) sounds like g/k, as in 가구 (gagu, furniture). ㄴ (nieun) is like n in "net", e.g. 나 (na, I/me). ㄷ (digeut) is like d in "dog", e.g. 다리 (dari, bridge/leg). ㄹ (rieul) is a flap r between vowels, like in 라디오 (ladio, radio). ㅁ (mieum) is like m in "mother", e.g. 마음 (ma-eum, heart). ㅂ (bieup) is like b in "bed", e.g. 바지 (baji, pants). ㅅ (siot) is like s in "sun", e.g. 사과 (sagwa, apple). ㅈ (jieut) is like j in "jump", e.g. 자다 (jada, to sleep). ㅎ (hieut) is like h in "hat", e.g. 하나 (hana, one). Practice these shapes as they form the foundation for all Korean writing.',
    vocabulary: [
      { korean: '가구', english: 'furniture', romanization: 'gagu' },
      { korean: '나', english: 'I/me', romanization: 'na' },
      { korean: '다리', english: 'bridge/leg', romanization: 'dari' },
      { korean: '사과', english: 'apple', romanization: 'sagwa' },
      { korean: '하나', english: 'one', romanization: 'hana' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 2,
    title: 'Basic Vowels: ㅣㅏㅓㅡㅜㅗ',
    type: 'Reading',
    body: 'Korean vowels are written as vertical or horizontal lines. ㅣ (i) is like ee in "see", e.g. 이 (i, tooth). ㅏ (a) is like ah in "father", e.g. 아기 (agi, baby). ㅓ (eo) is like u in "cup", e.g. 어머니 (eomeoni, mother). ㅡ (eu) is like oo in "good" but with unrounded lips, e.g. 쓰다 (sseuda, to write). ㅜ (u) is like oo in "boot", e.g. 우리 (uri, we/us). ㅗ (o) is like o in "go", e.g. 오다 (oda, to come). Unlike English, Korean vowels are pure and do not glide. Practice combining consonants and vowels: 가 (ga), 거 (geo), 구 (gu), 고 (go).',
    vocabulary: [
      { korean: '이', english: 'tooth', romanization: 'i' },
      { korean: '아기', english: 'baby', romanization: 'agi' },
      { korean: '어머니', english: 'mother', romanization: 'eomeoni' },
      { korean: '우리', english: 'we/us', romanization: 'uri' },
      { korean: '오다', english: 'to come', romanization: 'oda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 3,
    title: 'Syllable Block Structure',
    type: 'Reading',
    body: 'Korean syllables are written in blocks. Each block = (optional initial consonant) + (vowel) + (optional final consonant). For example, 한 is ㅎ + ㅏ + ㄴ. Blocks can be horizontal (vowel on right like 가: ㄱ+ㅏ), vertical (vowel below like 고: ㄱ+ㅗ), or combined. The vowel determines shape: ㅏ and ㅓ go to the right of the consonant; ㅗ and ㅜ go below. For example: 나 (ㄴ+ㅏ), 너 (ㄴ+ㅓ), 누 (ㄴ+ㅜ), 노 (ㄴ+ㅗ). With final consonants (받침): 눈 (ㄴ+ㅜ+ㄴ, snow), 문 (ㅁ+ㅜ+ㄴ, door). Notice how syllables fit neatly into square blocks of equal size. This makes Korean script very uniform and easy to read once you know the rules.',
    vocabulary: [
      { korean: '한', english: 'Korean (han) / one', romanization: 'han' },
      { korean: '문', english: 'door', romanization: 'mun' },
      { korean: '눈', english: 'snow/eye', romanization: 'nun' },
      { korean: '산', english: 'mountain', romanization: 'san' },
      { korean: '물', english: 'water', romanization: 'mul' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 4,
    title: 'Reading Practice: Syllables',
    type: 'Practice',
    body: 'Let\'s practice reading syllable blocks. Read each block from left-to-right, top-to-bottom within each block. Start with two-letter blocks: 가 (ga), 나 (na), 다 (da), 라 (ra), 마 (ma), 바 (ba), 사 (sa), 자 (ja), 하 (ha). Now try three-letter blocks: 간 (gan), 반 (ban), 달 (dal), 발 (bal), 삼 (sam), 장 (jang). Practice with four-letter blocks (rare): 읽 (ilk, to read stem), 앉 (anj, to sit stem). Read these words aloud: 한국 (Hanguk, Korea), 서울 (Seoul), 사람 (saram, person), 물고기 (mulgogi, fish), 학교 (hakgyo, school). Focus on each block as a single syllable - do not sound out consonants and vowels separately.',
    vocabulary: [
      { korean: '한국', english: 'Korea', romanization: 'Hanguk' },
      { korean: '사람', english: 'person', romanization: 'saram' },
      { korean: '학교', english: 'school', romanization: 'hakgyo' },
      { korean: '물고기', english: 'fish', romanization: 'mulgogi' },
      { korean: '서울', english: 'Seoul', romanization: 'Seoul' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 5,
    title: 'Compound Vowels: ㅑㅕㅛㅠㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ',
    type: 'Reading',
    body: 'Compound vowels add a y sound or combine two vowels. The y-series: ㅑ (ya, like yah), ㅕ (yeo, like yuh), ㅛ (yo), ㅠ (yu). Examples: 야구 (yagu, baseball), 여자 (yeoja, woman), 요리 (yori, cooking), 우유 (uyu, milk). The ae/e series: ㅐ (ae, like a in "cat"), ㅒ (yae), ㅔ (e, like e in "bed"), ㅖ (ye). Examples: 개 (gae, dog), 게 (ge, crab). W-sounds: ㅘ (wa = ㅗ+ㅏ), ㅙ (wae = ㅗ+ㅐ), ㅚ (oe = ㅗ+ㅣ), ㅝ (wo = ㅜ+ㅓ), ㅞ (we = ㅜ+ㅔ), ㅟ (wi = ㅜ+ㅣ), ㅢ (ui = ㅡ+ㅣ). Examples: 과일 (gwail, fruit), 뭐 (mwo, what), 의사 (uisa, doctor). These appear frequently so practice them well.',
    vocabulary: [
      { korean: '야구', english: 'baseball', romanization: 'yagu' },
      { korean: '여자', english: 'woman', romanization: 'yeoja' },
      { korean: '개', english: 'dog', romanization: 'gae' },
      { korean: '과일', english: 'fruit', romanization: 'gwail' },
      { korean: '의사', english: 'doctor', romanization: 'uisa' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 6,
    title: 'Tense & Aspirated Consonants',
    type: 'Reading',
    body: 'Korean has three-way contrast for some consonants: plain, tense, and aspirated. Tense consonants (쌍자음, ssangjaeum) are ㄲ (kk), ㄸ (tt), ㅃ (pp), ㅆ (ss), ㅉ (jj). They are pronounced with a tensed throat, no air burst. Examples: 까다 (kkada, to peel), 떡 (tteok, rice cake), 쓰다 (sseuda, to write/wear). Aspirated consonants are ㅋ (k with air), ㅌ (t with air), ㅍ (p with air), ㅊ (ch with air). Examples: 코 (ko, nose), 토마토 (tomato), 피자 (pija, pizza), 친구 (chingu, friend). Compare: 가 (ga) vs 까 (kka) vs 카 (ka); 다 (da) vs 따 (tta) vs 타 (ta); 바 (ba) vs 빠 (ppa) vs 파 (pa). The difference is subtle but crucial for understanding.',
    vocabulary: [
      { korean: '떡', english: 'rice cake', romanization: 'tteok' },
      { korean: '친구', english: 'friend', romanization: 'chingu' },
      { korean: '코', english: 'nose', romanization: 'ko' },
      { korean: '쓰다', english: 'to write/wear', romanization: 'sseuda' },
      { korean: '피자', english: 'pizza', romanization: 'pija' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 7,
    title: 'Final Consonants (받침)',
    type: 'Reading',
    body: 'Final consonants are called 받침 (batchim, support). Seven basic sounds represent all final consonants: ㄱ (k), ㄴ (n), ㄷ (t), ㄹ (l), ㅁ (m), ㅂ (p), ㅇ (ng). Double consonants simplify: ㄳ reads as ㄱ, ㄵ as ㄴ, ㄶ as ㄴ, ㄺ as ㄱ, ㄻ as ㅁ, ㄼ as ㄹ, ㄽ as ㄹ, ㄾ as ㄹ, ㄿ as ㅂ, ㅀ as ㄹ, ㄲ as ㄱ, ㅆ as ㄷ. Examples: 값 (gap, price, reads as 갑), 앉다 (antda, to sit, reads as 안따), 많다 (manta, many, reads as 만타), 읽다 (ikda, to read, reads as 익따), 젊다 (jeomda, young, reads as 점따), 여덟 (yeodeol, eight, reads as 여덜), 핥다 (haltda, to lick, reads as 할타), 없다 (eopda, to not have, reads as 업따). Practice is key.',
    vocabulary: [
      { korean: '값', english: 'price', romanization: 'gap' },
      { korean: '앉다', english: 'to sit', romanization: 'antda' },
      { korean: '많다', english: 'many/much', romanization: 'manta' },
      { korean: '읽다', english: 'to read', romanization: 'ikda' },
      { korean: '없다', english: 'to not have', romanization: 'eopda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 8,
    title: 'Letter Names & Pronunciation Tips',
    type: 'Reading',
    body: 'Korean consonant names follow the pattern: consonant + ㅣ + eu + consonant. For example: ㄱ is 기역 (giyeok), ㄴ is 니은 (nieun), ㄷ is 디귿 (digeut), ㄹ is 리을 (rieul), ㅁ is 미음 (mieum), ㅂ is 비읍 (bieup), ㅅ is 시옷 (siot), ㅇ is 이응 (ieung), ㅈ is 지읒 (jieut), ㅊ is 치읓 (chieut), ㅋ is 키읔 (kieuk), ㅌ is 티읕 (tieut), ㅍ is 피읖 (pieup), ㅎ is 히읗 (hieut). Tense consonants are called 쌍 (ssang, double): 쌍기역 (ㄲ), 쌍디귿 (ㄸ), 쌍비읍 (ㅃ), 쌍시옷 (ㅆ), 쌍지읒 (ㅉ). Tip: When saying Korean names aloud, remember that ㅅ at the end of a syllable block sounds like t, not s. For example, 옷 (ot, clothes), not "os".',
    vocabulary: [
      { korean: '옷', english: 'clothes', romanization: 'ot' },
      { korean: '쌍', english: 'double', romanization: 'ssang' },
      { korean: '이응', english: '(name of ㅇ)', romanization: 'ieung' },
      { korean: '히읗', english: '(name of ㅎ)', romanization: 'hieut' },
      { korean: '시옷', english: '(name of ㅅ)', romanization: 'siot' }
    ]
  },

  // ========== UNIT 1: BASIC SENTENCES & GRAMMAR (Lessons 9-40) ==========
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 9,
    title: 'Greetings: 안녕하세요, 감사합니다',
    type: 'Practice',
    body: 'The most essential Korean greeting is 안녕하세요 (annyeonghaseyo), meaning "Hello" / "How are you?". It is polite and works at any time of day. 감사합니다 (gamsahamnida) means "Thank you" in formal polite form. For good-bye: when leaving (you are the one leaving), say 안녕히 계세요 (annyeonghi gyeseyo, stay in peace). When staying (the other person is leaving), say 안녕히 가세요 (annyeonghi gaseyo, go in peace). 네 (ne) means "yes" and 아니요 (aniyo) means "no". 잠시만요 (jamsimanyo) is "excuse me / just a moment". 괜찮아요 (gwaenchanayo) means "It\'s okay / I\'m fine". Practice these daily greetings until they feel natural.',
    vocabulary: [
      { korean: '안녕하세요', english: 'Hello / How are you', romanization: 'annyeonghaseyo' },
      { korean: '감사합니다', english: 'Thank you', romanization: 'gamsahamnida' },
      { korean: '네', english: 'yes', romanization: 'ne' },
      { korean: '아니요', english: 'no', romanization: 'aniyo' },
      { korean: '괜찮아요', english: 'It\'s okay', romanization: 'gwaenchanayo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 10,
    title: 'SOV Sentence Structure',
    type: 'Reading',
    body: 'Korean follows Subject-Object-Verb (SOV) order, unlike English\'s Subject-Verb-Object (SVO). In English: "I eat an apple." In Korean: "I an apple eat" = 나는 사과를 먹어요 (naneun sagwareul meogeoyo). The verb always comes at the end of the sentence. Particles mark the role of each word: 은/는 marks the topic, 을/를 marks the object, and 에/에서 mark location. For example: 저는 커피를 마셔요 (jeoneun keopireul masyeoyo, I coffee drink), 학생은 책을 읽어요 (haksaengeun chaegeul ilgeoyo, the student book reads). This takes practice for English speakers because the verb is the final element you hear.',
    vocabulary: [
      { korean: '나는', english: 'I (topic)', romanization: 'naneun' },
      { korean: '사과', english: 'apple', romanization: 'sagwa' },
      { korean: '먹다', english: 'to eat', romanization: 'meokda' },
      { korean: '커피', english: 'coffee', romanization: 'keopi' },
      { korean: '학생', english: 'student', romanization: 'haksaeng' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 11,
    title: 'Subject Particles 은/는',
    type: 'Reading',
    body: '은/는 are topic particles marking the subject or theme of the sentence. Use 은 after a consonant (e.g., 학생은, haksaengeun) and 는 after a vowel (e.g., 나는, naneun). They contrast with 이/가 (subject markers) by adding nuance: 은/는 can mean "as for" or "speaking of". Example: 나는 학생이에요 (naneun haksaengieyo, as for me, I am a student). 저는 선생님이에요 (jeoneun seonsaengnimieyo, as for me, I am a teacher). 물은 차가워요 (mureun chagawoyo, as for the water, it is cold). The particle can also show contrast: 이 커피는 좋아요, 그런데 저 커피는 안 좋아요 (i keopineun joayo, geureonde jeo keopineun an joayo, this coffee is good, but that coffee is not good).',
    vocabulary: [
      { korean: '저는', english: 'I (humble, topic)', romanization: 'jeoneun' },
      { korean: '선생님', english: 'teacher', romanization: 'seonsaengnim' },
      { korean: '물', english: 'water', romanization: 'mul' },
      { korean: '차갑다', english: 'to be cold', romanization: 'chagapda' },
      { korean: '커피', english: 'coffee', romanization: 'keopi' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 12,
    title: 'To Be: 이다 / 예요/이에요',
    type: 'Reading',
    body: '이다 (ida) is the Korean copula meaning "to be". In polite present tense, it becomes 예요 (yeyo) after a vowel or 이에요 (ieyo) after a consonant. For example: 저는 학생이에요 (jeoneun haksaengieyo, I am a student). 이건 책이에요 (igeon chaejieyo, this is a book). 저는 의사예요 (jeoneun uisayeyo, I am a doctor). For questions, just raise intonation: 학생이에요? (haksaengieyo?, are you a student?). The negative is 아니에요 (anieyo, is not): 저는 학생이 아니에요 (jeoneun haksaeingi anieyo, I am not a student). Unlike English, Korean omits the subject when it is clear from context.',
    vocabulary: [
      { korean: '학생이에요', english: '(I) am a student', romanization: 'haksaengieyo' },
      { korean: '의사예요', english: '(I) am a doctor', romanization: 'uisayeyo' },
      { korean: '책', english: 'book', romanization: 'chaek' },
      { korean: '아니에요', english: 'is not / it\'s not', romanization: 'anieyo' },
      { korean: '이거', english: 'this thing', romanization: 'igeo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 13,
    title: 'This/That: 이, 그, 저, 이것, 그것, 저것',
    type: 'Reading',
    body: 'Korean has three demonstratives: 이 (i, this, near speaker), 그 (geu, that, near listener), 저 (jeo, that, away from both). As pronouns: 이것 (igeot, this thing), 그것 (geugeot, that thing), 저것 (jeogeot, that thing over there). Examples: 이 책은 재미있어요 (i chaegeun jaemiisseoyo, this book is interesting). 그 가방은 비싸요 (geu gabangeun bissayo, that bag is expensive). 저 건물은 커요 (jeo geonmureun keoyo, that building over there is big). 이것은 뭐예요? (igeoseun mwoyeyo?, what is this?). Colloquially, 이것 contracts to 이거, and it follows: 이거는 뭐예요? (igeoneun mwoyeyo?).',
    vocabulary: [
      { korean: '이것', english: 'this (thing)', romanization: 'igeot' },
      { korean: '그것', english: 'that (thing near listener)', romanization: 'geugeot' },
      { korean: '저것', english: 'that (thing over there)', romanization: 'jeogeot' },
      { korean: '가방', english: 'bag', romanization: 'gabang' },
      { korean: '건물', english: 'building', romanization: 'geonmul' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 14,
    title: 'Object Particles 을/를',
    type: 'Reading',
    body: '을/를 marks the direct object of a verb. Use 을 after a consonant and 를 after a vowel. For example: 저는 사과를 먹어요 (jeoneun sagwareul meogeoyo, I eat an apple). 저는 물을 마셔요 (jeoneun mureul masyeoyo, I drink water). 책을 읽어요 (chaegeul ilgeoyo, I read a book). In conversation, the object particle is sometimes dropped, but using it makes your Korean clear and grammatically correct. Note that the object comes before the verb in SOV order: subject + object + verb. Examples: 나는 김치를 먹어요 (naneun kimchireul meogeoyo), 나는 영화를 봐요 (naneun yeonghwareul bwayo, I watch a movie).',
    vocabulary: [
      { korean: '영화', english: 'movie', romanization: 'yeonghwa' },
      { korean: '김치', english: 'kimchi', romanization: 'kimchi' },
      { korean: '물', english: 'water', romanization: 'mul' },
      { korean: '보다', english: 'to see/watch', romanization: 'boda' },
      { korean: '마시다', english: 'to drink', romanization: 'masida' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 15,
    title: 'Sino-Korean Numbers: 일이삼사오...',
    type: 'Reading',
    body: 'Sino-Korean numbers come from Chinese and are used for dates, minutes, phone numbers, money, and counting above 99. 1-10: 일 (il), 이 (i), 삼 (sam), 사 (sa), 오 (o), 육 (yuk), 칠 (chil), 팔 (pal), 구 (gu), 십 (sip). 11 is 십일 (sip-il), 20 is 이십 (i-sip), 25 is 이십오 (i-sip-o). 100 is 백 (baek), 1000 is 천 (cheon), 10,000 is 만 (man). Examples: 2024년 = 이천이십사년 (icheon-isipsa-nyeon, year 2024). 3,000원 = 삼천원 (samcheon-won). 15분 = 십오 분 (sibo bun, 15 minutes). Use Sino-Korean for telephone numbers: 010-1234-5678 = 공일공에 일이삼사에 오육칠팔 (gong-il-gong-e il-i-sam-sa-e o-yuk-chil-pal).',
    vocabulary: [
      { korean: '일', english: 'one (Sino)', romanization: 'il' },
      { korean: '십', english: 'ten (Sino)', romanization: 'sip' },
      { korean: '백', english: 'hundred', romanization: 'baek' },
      { korean: '천', english: 'thousand', romanization: 'cheon' },
      { korean: '만', english: 'ten thousand', romanization: 'man' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 16,
    title: 'Native Korean Numbers: 하나둘셋넷다섯...',
    type: 'Reading',
    body: 'Native Korean numbers are used for counting objects (with counters), age, hours, and for numbers under 100. 1-10: 하나 (hana), 둘 (dul), 셋 (set), 넷 (net), 다섯 (daseot), 여섯 (yeoseot), 일곱 (ilgop), 여덟 (yeodeol), 아홉 (ahop), 열 (yeol). Note: 하나, 둘, 셋, 넷 become 한, 두, 세, 네 before counters (e.g., 한 명, two people; 두 개, two items; 세 시, three o\'clock; 네 명, four people). 11 is 열하나 (yeolhana), 20 is 스물 (seumul), 30 is 서른 (seoreun), 40 is 마흔 (maheun), 50 is 쉰 (swin), 60 is 예순 (yesun), 70 is 일흔 (ilheun), 80 is 여든 (yeodeun), 90 is 아흔 (aheun). Examples: 사과 세 개 (sagwa se gae, three apples), 친구 두 명 (chingu du myeong, two friends).',
    vocabulary: [
      { korean: '하나', english: 'one (Native)', romanization: 'hana' },
      { korean: '둘', english: 'two (Native)', romanization: 'dul' },
      { korean: '셋', english: 'three (Native)', romanization: 'set' },
      { korean: '넷', english: 'four (Native)', romanization: 'net' },
      { korean: '열', english: 'ten (Native)', romanization: 'yeol' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 17,
    title: 'Counters: 개, 명',
    type: 'Reading',
    body: 'Korean uses counters after numbers, similar to "two sheets of paper" in English. 개 (gae) is the general counter for objects. 명 (myeong) counts people. 분 (bun) is a polite counter for people. Examples: 책 세 개 (chaek se gae, three books). 커피 두 개 (keopi du gae, two coffees). 학생 네 명 (haksaeng ne myeong, four students). 선생님 다섯 분 (seonsaengnim daseot bun, five teachers [polite]). When using native numbers with counters, 하나 > 한, 둘 > 두, 셋 > 세, 넷 > 네: 한 개 (one item), 두 개 (two items), 세 명 (three people), 네 명 (four people). Sino-Korean numbers use 일 개, 이 개, etc. but native is more common with 개 and 명.',
    vocabulary: [
      { korean: '개', english: 'counter for objects', romanization: 'gae' },
      { korean: '명', english: 'counter for people', romanization: 'myeong' },
      { korean: '분', english: 'polite counter for people', romanization: 'bun' },
      { korean: '한 개', english: 'one item', romanization: 'han gae' },
      { korean: '두 명', english: 'two people', romanization: 'du myeong' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 18,
    title: '있다/없다 (Have/Don\'t Have)',
    type: 'Reading',
    body: '있다 (itda) means "to have/exist" and 없다 (eopda) means "to not have/not exist". Conjugated: 있어요 (isseoyo, have/exist) and 없어요 (eopseoyo, don\'t have/doesn\'t exist). Examples: 나는 시간이 있어요 (naneun sigani isseoyo, I have time). 나는 돈이 없어요 (naneun doni eopseoyo, I don\'t have money). To ask if someone has something: 휴대폰이 있어요? (hyudaeponi isseoyo?, do you have a cell phone?). Use 이/가 with the item, not 을/를. For existence/location: 학교가 있어요 (hakgyoga isseoyo, there is a school). 화장실이 없어요 (hwajangsiri eopseoyo, there is no bathroom). Use 주세요 (juseyo) when requesting: 물 있어요? 물 주세요 (mul isseoyo? mul juseyo, do you have water? Give me water please).',
    vocabulary: [
      { korean: '있다', english: 'to have/exist', romanization: 'itda' },
      { korean: '없다', english: 'to not have', romanization: 'eopda' },
      { korean: '돈', english: 'money', romanization: 'don' },
      { korean: '시간', english: 'time', romanization: 'sigan' },
      { korean: '휴대폰', english: 'cell phone', romanization: 'hyudaepon' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 19,
    title: 'Basic Verbs: 가다, 오다, 하다, 먹다, 마시다',
    type: 'Reading',
    body: 'Five essential Korean verbs: 가다 (gada, to go), 오다 (oda, to come), 하다 (hada, to do), 먹다 (meokda, to eat), 마시다 (masida, to drink). Their dictionary form ends in 다 (da). To use them in polite speech, you conjugate to the 아/어요 form. 가다 > 가요 (gayo, go), 오다 > 와요 (wayo, come), 하다 > 해요 (haeyo, do), 먹다 > 먹어요 (meogeoyo, eat), 마시다 > 마셔요 (masyeoyo, drink). Examples: 저는 학교에 가요 (jeoneun hakgyoe gayo, I go to school). 친구가 집에 와요 (chinguga jibe wayo, my friend comes home). 뭐 해요? (mwo haeyo?, what are you doing?). 밥을 먹어요 (babeul meogeoyo, I eat rice/meal). 물을 마셔요 (mureul masyeoyo, I drink water).',
    vocabulary: [
      { korean: '가다', english: 'to go', romanization: 'gada' },
      { korean: '오다', english: 'to come', romanization: 'oda' },
      { korean: '하다', english: 'to do', romanization: 'hada' },
      { korean: '먹다', english: 'to eat', romanization: 'meokda' },
      { korean: '마시다', english: 'to drink', romanization: 'masida' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 20,
    title: 'Present Tense: 아/어요 Conjugation',
    type: 'Reading',
    body: 'The polite present tense adds 아요 or 어요 to the verb stem (remove 다). If the last vowel of the stem is ㅏ or ㅗ, add 아요: 가다 > 가요 (gada > gayo), 보다 > 봐요 (boda > bwayo), 살다 > 살아요 (salda > sarayo). If the last vowel is anything else, add 어요: 먹다 > 먹어요 (meokda > meogeoyo), 읽다 > 읽어요 (ikda > ilgeoyo), 마시다 > 마셔요 (masida > masyeoyo). Verbs ending in 하다 become 해요: 공부하다 > 공부해요 (gongbuhada > gongbuhaeyo, to study), 일하다 > 일해요 (ilhada > ilhaeyo, to work). Irregulars: 듣다 (deutda, to listen) > 들어요 (deureoyo), 걷다 (geotda, to walk) > 걸어요 (georeoyo). Practice conjugating each new verb you learn.',
    vocabulary: [
      { korean: '보다', english: 'to see/watch', romanization: 'boda' },
      { korean: '살다', english: 'to live', romanization: 'salda' },
      { korean: '공부하다', english: 'to study', romanization: 'gongbuhada' },
      { korean: '듣다', english: 'to listen', romanization: 'deutda' },
      { korean: '걷다', english: 'to walk', romanization: 'geotda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 21,
    title: 'Negation: 안 + Verb',
    type: 'Reading',
    body: 'To negate a verb or adjective, place 안 (an, not) before it. For example: 가다 > 안 가요 (an gayo, don\'t go), 먹다 > 안 먹어요 (an meogeoyo, don\'t eat), 예쁘다 > 안 예뻐요 (an yeppeoyo, not pretty). Another form is using 지 않다: 먹다 > 먹지 않아요 (meokji anayo, don\'t eat), but 안 is simpler for beginners. For 있다/없다, the negative of 있다 is 없다 directly (no 안 있다). For the copula 이다, use 아니에요 (anieyo, is not). Examples: 저는 커피를 안 마셔요 (jeoneun keopireul an masyeoyo, I don\'t drink coffee). 그 영화는 안 재미있어요 (geu yeonghwaneun an jaemiisseoyo, that movie is not interesting). 학교에 안 가요 (hakgyoe an gayo, I don\'t go to school).',
    vocabulary: [
      { korean: '안', english: 'not (negation)', romanization: 'an' },
      { korean: '재미있다', english: 'to be interesting/fun', romanization: 'jaemiitda' },
      { korean: '예쁘다', english: 'to be pretty', romanization: 'yeppeuda' },
      { korean: '크다', english: 'to be big', romanization: 'keuda' },
      { korean: '작다', english: 'to be small', romanization: 'jakda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 22,
    title: 'Question Words: 뭐, 누구, 어디',
    type: 'Reading',
    body: 'Key question words: 뭐 (mwo, what), 누구 (nugu, who), 어디 (eodi, where), 왜 (wae, why), 언제 (eonje, when), 어떻게 (eotteoke, how), 몇 (myeot, how many). Examples: 이거 뭐예요? (igeo mwoyeyo?, what is this?). 누구예요? (nuguyeyo?, who is it?). 어디에 가요? (eodie gayo?, where are you going?). 왜 안 와요? (wae an wayo?, why aren\'t you coming?). 언제 만나요? (eonje mannayo?, when do we meet?). 어떻게 지내요? (eotteoke jinaeyo?, how are you doing?). 몇 개 있어요? (myeot gae isseoyo?, how many are there?). Place question words at the same position as the answer: 가방은 어디에 있어요? (gabang-eun eodie isseoyo?, where is the bag?) - 책상 위에 있어요 (chaeksang wie isseoyo, it\'s on the desk).',
    vocabulary: [
      { korean: '뭐', english: 'what', romanization: 'mwo' },
      { korean: '누구', english: 'who', romanization: 'nugu' },
      { korean: '어디', english: 'where', romanization: 'eodi' },
      { korean: '왜', english: 'why', romanization: 'wae' },
      { korean: '언제', english: 'when', romanization: 'eonje' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 23,
    title: 'Location Words + 에 있어요',
    type: 'Reading',
    body: 'Use 에 (e) for location with 있다 (to exist). Pattern: (location) + 에 + (item) + 이/가 + 있어요/없어요. Location words: 위 (wi, on top), 아래 (arae, below), 앞 (ap, in front), 뒤 (dwi, behind), 옆 (yeop, next to), 안 (an, inside), 밖 (bak, outside). Examples: 책이 책상 위에 있어요 (chaegi chaeksang wie isseoyo, the book is on top of the desk). 고양이가 의자 아래에 있어요 (goyangiga uija araee isseoyo, the cat is under the chair). 학교가 병원 앞에 있어요 (hakgyoga byeongwon ape isseoyo, the school is in front of the hospital). 화장실이 어디에 있어요? (hwajangsiri eodie isseoyo?, where is the bathroom?). Note: 에 is attached to the location word, and the location word comes before it.',
    vocabulary: [
      { korean: '위', english: 'on top', romanization: 'wi' },
      { korean: '아래', english: 'below', romanization: 'arae' },
      { korean: '앞', english: 'in front', romanization: 'ap' },
      { korean: '옆', english: 'next to', romanization: 'yeop' },
      { korean: '안', english: 'inside', romanization: 'an' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 24,
    title: 'Action Location: 에서',
    type: 'Reading',
    body: 'While 에 indicates static location (where something exists), 에서 (eseo) indicates where an action takes place. Pattern: (place) + 에서 + (verb). Examples: 도서관에서 공부해요 (doseogwaneseo gongbuhaeyo, I study at the library). 집에서 밥을 먹어요 (jibeseo babeul meogeoyo, I eat at home). 학교에서 한국어를 배워요 (hakgyoseo hangugeoreul baewoyo, I learn Korean at school). 카페에서 친구를 만나요 (kapeseo chingureul mannayo, I meet a friend at a cafe). Compare: 학교에 있어요 (hakgyoe isseoyo, I am at school - existence) vs 학교에서 공부해요 (hakgyoseo gongbuhaeyo, I study at school - action). This distinction is important for natural Korean.',
    vocabulary: [
      { korean: '도서관', english: 'library', romanization: 'doseogwan' },
      { korean: '집', english: 'home/house', romanization: 'jib' },
      { korean: '카페', english: 'cafe', romanization: 'kape' },
      { korean: '만나다', english: 'to meet', romanization: 'mannada' },
      { korean: '배우다', english: 'to learn', romanization: 'baeuda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 25,
    title: 'Time Words + 에 Particle',
    type: 'Reading',
    body: 'Use the particle 에 with time words to indicate when something happens. Examples: 아침에 (achime, in the morning), 점심에 (jeomsime, at lunch), 저녁에 (jeonyeoge, in the evening), 오늘에 (oneure, today - but often omitted with 오늘), 내일 (naeil, tomorrow), 어제 (eoje, yesterday). Time + 에 + action: 아침에 일어나요 (achime ireonayo, I wake up in the morning). 점심에 밥을 먹어요 (jeomsime babeul meogeoyo, I eat lunch). 내일 학교에 가요 (naeil hakgyoe gayo, I go to school tomorrow). Note: 에 is often omitted with 오늘, 내일, 어제, 지금 (jigeum, now). But with specific clock times, always use 에: 9시에 (aheop sie, at 9 o\'clock). 몇 시에 만나요? (myeot sie mannayo?, what time shall we meet?).',
    vocabulary: [
      { korean: '아침', english: 'morning/breakfast', romanization: 'achim' },
      { korean: '점심', english: 'lunch', romanization: 'jeomsim' },
      { korean: '저녁', english: 'evening/dinner', romanization: 'jeonyeok' },
      { korean: '오늘', english: 'today', romanization: 'oneul' },
      { korean: '내일', english: 'tomorrow', romanization: 'naeil' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 26,
    title: '"And": 하고, 와/과, (이)랑',
    type: 'Reading',
    body: 'Korean has several ways to say "and". 하고 (hago) is the most common and neutral: 책하고 연필 (chaekhago yeonpil, a book and a pencil). 와/과 is more formal/literary: use 와 after a vowel, 과 after a consonant: 친구와 가족 (chingugwa gajok, friends and family), 책과 공책 (chaekgwa gongchaek, a book and a notebook). (이)랑 is casual, used in spoken Korean: use 랑 after a vowel, 이랑 after a consonant: 커피랑 빵 (keopirang ppang, coffee and bread), 물이랑 주스 (murirang juseu, water and juice). Examples: 사과하고 바나나를 샀어요 (sagwahago bananareul sasseoyo, I bought an apple and a banana). 친구랑 영화를 봤어요 (chingurang yeonghwareul bwasseoyo, I watched a movie with a friend).',
    vocabulary: [
      { korean: '하고', english: 'and (neutral)', romanization: 'hago' },
      { korean: '와/과', english: 'and (formal)', romanization: 'wa/gwa' },
      { korean: '이랑/랑', english: 'and (casual)', romanization: 'irang/rang' },
      { korean: '연필', english: 'pencil', romanization: 'yeonpil' },
      { korean: '가족', english: 'family', romanization: 'gajok' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 27,
    title: 'Days of the Week',
    type: 'Reading',
    body: 'Korean days of the week end in 요일 (yoil). 월요일 (woryoil, Monday), 화요일 (hwayoil, Tuesday), 수요일 (suyoil, Wednesday), 목요일 (mogyoil, Thursday), 금요일 (geumyoil, Friday), 토요일 (toyoil, Saturday), 일요일 (iryoil, Sunday). To say "on Monday", add 에: 월요일에 (woryoire). Example sentences: 오늘은 월요일이에요 (oneureun woryoilieyo, today is Monday). 내일은 화요일이에요 (naeireun hwayoilieyo, tomorrow is Tuesday). 토요일에 뭐 해요? (toyoire mwo haeyo?, what do you do on Saturday?). 일요일에 쉬어요 (iryoire swieoyo, I rest on Sunday). The week starts on Monday in Korea. 주말 (jumal, weekend) is 토요일 and 일요일. 평일 (pyeongil, weekdays) are Monday through Friday.',
    vocabulary: [
      { korean: '월요일', english: 'Monday', romanization: 'woryoil' },
      { korean: '수요일', english: 'Wednesday', romanization: 'suyoil' },
      { korean: '금요일', english: 'Friday', romanization: 'geumyoil' },
      { korean: '토요일', english: 'Saturday', romanization: 'toyoil' },
      { korean: '일요일', english: 'Sunday', romanization: 'iryoil' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 28,
    title: 'Basic Adjectives: 크다, 작다, 길다, 짧다',
    type: 'Reading',
    body: 'Korean adjectives (descriptive verbs) conjugate like verbs. 크다 (keuda, to be big) > 커요 (keoyo). 작다 (jakda, to be small) > 작아요 (jagayo). 길다 (gilda, to be long) > 길어요 (gireoyo). 짧다 (jjalpda, to be short) > 짧아요 (jjalbayo). 좋다 (jota, to be good) > 좋아요 (joayo). 나쁘다 (nappeuda, to be bad) > 나빠요 (nappayo). Use them like verbs: 집이 커요 (jibi keoyo, the house is big). 연필이 길어요 (yeonpiri gireoyo, the pencil is long). To modify nouns, add (으)ㄴ to the stem: 큰 집 (keun jip, big house), 작은 고양이 (jageun goyangi, small cat), 좋은 사람 (joheun saram, good person). Examples: 큰 가방을 샀어요 (keun gabangeul sasseoyo, I bought a big bag). 작은 커피 주세요 (jageun keopi juseyo, please give me a small coffee).',
    vocabulary: [
      { korean: '크다', english: 'to be big', romanization: 'keuda' },
      { korean: '작다', english: 'to be small', romanization: 'jakda' },
      { korean: '길다', english: 'to be long', romanization: 'gilda' },
      { korean: '짧다', english: 'to be short', romanization: 'jjalpda' },
      { korean: '좋다', english: 'to be good', romanization: 'jota' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 29,
    title: 'Past Tense: 았/었어요',
    type: 'Reading',
    body: 'Past tense adds 았어요 or 었어요 to the verb stem. For stems ending with ㅏ or ㅗ: use 았어요. 가다 > 갔어요 (gasseoyo, went). 보다 > 봤어요 (bwasseoyo, saw). 사다 > 샀어요 (sasseoyo, bought). For other vowels: use 었어요. 먹다 > 먹었어요 (meogeosseoyo, ate). 마시다 > 마셨어요 (masyeosseoyo, drank). 쓰다 > 썼어요 (sseosseoyo, wrote). 하다 verbs: 하다 > 했어요 (haesseoyo, did). Examples: 어제 학교에 갔어요 (eoje hakgyoe gasseoyo, I went to school yesterday). 김치를 먹었어요 (kimchireul meogeosseoyo, I ate kimchi). 친구를 만났어요 (chingureul mannasseoyo, I met a friend). 뭘 샀어요? (mwol sasseoyo?, what did you buy?). 책을 샀어요 (chaegeul sasseoyo, I bought a book). Note the double ㅆ in past tense forms.',
    vocabulary: [
      { korean: '가다', english: 'to go', romanization: 'gada' },
      { korean: '사다', english: 'to buy', romanization: 'sada' },
      { korean: '만나다', english: 'to meet', romanization: 'mannada' },
      { korean: '어제', english: 'yesterday', romanization: 'eoje' },
      { korean: '뭐', english: 'what (contracted)', romanization: 'mwo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 30,
    title: 'Future Tense: (으)ㄹ 거예요',
    type: 'Reading',
    body: 'Future tense is formed with (으)ㄹ 거예요. If the verb stem ends in a vowel, add ㄹ 거예요. If it ends in a consonant, add 을 거예요. 가다 > 갈 거예요 (gal geoyeyo, will go). 먹다 > 먹을 거예요 (meogeul geoyeyo, will eat). 하다 > 할 거예요 (hal geoyeyo, will do). Irregular: 살다 > 살 거예요 (sal geoyeyo, will live - stem already ends in ㄹ, so just add 거예요). Examples: 내일 친구를 만날 거예요 (naeil chingureul mannal geoyeyo, I will meet a friend tomorrow). 뭐 할 거예요? (mwo hal geoyeyo?, what will you do?). 한국어를 공부할 거예요 (hangugeoreul gongbuhal geoyeyo, I will study Korean). 이거 먹을 거예요? (igeo meogeul geoyeyo?, will you eat this?). The future tense is less certain than English - it can also mean "plan to" or "probably will".',
    vocabulary: [
      { korean: '갈 거예요', english: 'will go', romanization: 'gal geoyeyo' },
      { korean: '할 거예요', english: 'will do', romanization: 'hal geoyeyo' },
      { korean: '만날 거예요', english: 'will meet', romanization: 'mannal geoyeyo' },
      { korean: '공부할 거예요', english: 'will study', romanization: 'gongbuhal geoyeyo' },
      { korean: '먹을 거예요', english: 'will eat', romanization: 'meogeul geoyeyo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 31,
    title: 'Want To: 고 싶어요',
    type: 'Reading',
    body: 'To express desire, add 고 싶어요 (go sipeoyo) to the verb stem. Verb stem + 고 싶어요: 가다 > 가고 싶어요 (gago sipeoyo, want to go). 먹다 > 먹고 싶어요 (meokgo sipeoyo, want to eat). 하다 > 하고 싶어요 (hago sipeoyo, want to do). Examples: 한국에 가고 싶어요 (hanguge gago sipeoyo, I want to go to Korea). 김치를 먹고 싶어요 (kimchireul meokgo sipeoyo, I want to eat kimchi). 뭐 하고 싶어요? (mwo hago sipeoyo?, what do you want to do?). 친구를 만나고 싶어요 (chingureul mannago sipeoyo, I want to meet a friend). The negative is 고 싶지 않아요 (go sipji anayo, don\'t want to) or 안 + 고 싶어요: 안 가고 싶어요 (an gago sipeoyo, don\'t want to go). For third person (he/she wants), use 고 싶어해요 (go sipeohaeyo): 동생이 먹고 싶어해요 (dongsaengi meokgo sipeohaeyo, my younger sibling wants to eat).',
    vocabulary: [
      { korean: '가고 싶어요', english: 'want to go', romanization: 'gago sipeoyo' },
      { korean: '먹고 싶어요', english: 'want to eat', romanization: 'meokgo sipeoyo' },
      { korean: '만나고 싶어요', english: 'want to meet', romanization: 'mannago sipeoyo' },
      { korean: '하고 싶어요', english: 'want to do', romanization: 'hago sipeoyo' },
      { korean: '보고 싶어요', english: 'want to see/miss', romanization: 'bogo sipeoyo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 32,
    title: 'Shopping: 얼마예요? 비싸요, 싸요',
    type: 'Practice',
    body: 'Shopping phrases: 얼마예요? (eolmayeyo?, how much is it?). 비싸요 (bissayo, it is expensive). 싸요 (ssayo, it is cheap). 너무 비싸요 (neomu bissayo, too expensive). 깎아 주세요 (kkakka juseyo, please give a discount). 계산서 주세요 (gyesanseo juseyo, please give me the bill). Examples: 이거 얼마예요? (igeo eolmayeyo?, how much is this?). 만 원이에요 (man wonieyo, it is 10,000 won). 너무 비싸요! 깎아 주세요 (neomu bissayo! kkakka juseyo, too expensive! Please discount it). 그럼 팔천 원이에요 (geureom palcheon wonieyo, then it is 8,000 won). 네, 살게요 (ne, salgeyo, yes, I will buy it). Money in Korean: 원 (won). 천 원 (cheon won, 1,000 won), 만 원 (man won, 10,000 won), 오만 원 (oman won, 50,000 won). Practice these for your next trip to Korea!',
    vocabulary: [
      { korean: '얼마예요', english: 'how much is it', romanization: 'eolmayeyo' },
      { korean: '비싸요', english: 'it is expensive', romanization: 'bissayo' },
      { korean: '싸요', english: 'it is cheap', romanization: 'ssayo' },
      { korean: '계산서', english: 'bill/check', romanization: 'gyesanseo' },
      { korean: '원', english: 'Korean won', romanization: 'won' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 33,
    title: 'Food Vocabulary',
    type: 'Reading',
    body: 'Essential Korean foods: 김치 (kimchi, fermented cabbage), 비빔밥 (bibimbap, mixed rice with vegetables), 불고기 (bulgogi, grilled marinated beef), 떡볶이 (tteokbokki, spicy rice cakes), 김밥 (gimbap, seaweed rice rolls), 삼겹살 (samgyeopsal, grilled pork belly), 된장찌개 (doenjang jjigae, soybean paste stew), 잡채 (japchae, glass noodle stir-fry), 순두부찌개 (sundubu jjigae, soft tofu stew), 냉면 (naengmyeon, cold noodles). Example sentences: 비빔밥을 먹고 싶어요 (bibimbapeul meokgo sipeoyo, I want to eat bibimbap). 불고기는 맛있어요 (bulgogineun masisseoyo, bulgogi is delicious). 김치는 매워요 (kimchineun maewoyo, kimchi is spicy). 삼겹살을 먹었어요 (samgyeopsareul meogeosseoyo, I ate samgyeopsal). 떡볶이 주세요 (tteokbokki juseyo, please give me tteokbokki).',
    vocabulary: [
      { korean: '김치', english: 'kimchi', romanization: 'kimchi' },
      { korean: '비빔밥', english: 'mixed rice', romanization: 'bibimbap' },
      { korean: '불고기', english: 'grilled beef', romanization: 'bulgogi' },
      { korean: '떡볶이', english: 'spicy rice cakes', romanization: 'tteokbokki' },
      { korean: '맛있다', english: 'to be delicious', romanization: 'masitda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 34,
    title: 'Ordering: 주세요',
    type: 'Practice',
    body: 'Use 주세요 (juseyo, please give me) to order items. Pattern: item + 주세요. Examples: 김치 주세요 (kimchi juseyo, kimchi please). 물 주세요 (mul juseyo, water please). 비빔밥 하나 주세요 (bibimbap hana juseyo, one bibimbap please). 메뉴판 주세요 (menyupan juseyo, menu please). For polite requests: (item) + 좀 주세요 (jom juseyo, adds politeness): 물 좀 주세요 (mul jom juseyo, water please). To ask "May I have this?": 이거 주세요 (igeo juseyo, this please). In restaurants: 뭐 드시겠어요? (mwo deusigesseoyo?, what would you like to eat?). 저는 비빔밥으로 할게요 (jeoneun bibimbabeuro halgeyo, I will have bibimbap). 계산서 주세요 (gyesanseo juseyo, please give me the bill). The verb 주다 (juda) means "to give".',
    vocabulary: [
      { korean: '주세요', english: 'please give me', romanization: 'juseyo' },
      { korean: '메뉴판', english: 'menu', romanization: 'menyupan' },
      { korean: '하나', english: 'one', romanization: 'hana' },
      { korean: '물', english: 'water', romanization: 'mul' },
      { korean: '할게요', english: 'I will do/have', romanization: 'halgeyo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 35,
    title: 'Can/Can\'t: (으)ㄹ 수 있어요/없어요',
    type: 'Reading',
    body: 'To express ability, use (으)ㄹ 수 있어요 (eul su isseoyo, can) or (으)ㄹ 수 없어요 (eul su eopseoyo, cannot). Attach to the verb stem: if stem ends in vowel, add ㄹ 수 있어요. If consonant, add 을 수 있어요. 가다 > 갈 수 있어요 (gal su isseoyo, can go). 먹다 > 먹을 수 있어요 (meogeul su isseoyo, can eat). Examples: 한국어를 할 수 있어요? (hangugeoreul hal su isseoyo?, can you speak Korean?). 네, 조금 할 수 있어요 (ne, jogeum hal su isseoyo, yes, I can speak a little). 수영할 수 있어요? (suyeonghal su isseoyo?, can you swim?). 술을 마실 수 있어요? (sureul masil su isseoyo?, can you drink alcohol?). 저는 운전할 수 없어요 (jeoneun unjeonhal su eopseoyo, I cannot drive). The informal version is (으)ㄹ 수 있어 (eul su isseo) and (으)ㄹ 수 없어 (eul su eopseo).',
    vocabulary: [
      { korean: '할 수 있어요', english: 'can do', romanization: 'hal su isseoyo' },
      { korean: '할 수 없어요', english: 'cannot do', romanization: 'hal su eopseoyo' },
      { korean: '수영', english: 'swimming', romanization: 'suyeong' },
      { korean: '운전', english: 'driving', romanization: 'unjeon' },
      { korean: '조금', english: 'a little', romanization: 'jogeum' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 36,
    title: 'Family Vocabulary',
    type: 'Reading',
    body: 'Family terms in Korean depend on whether the speaker is male or female. For a male: 형 (hyeong, older brother), 누나 (nuna, older sister), 동생 (dongsaeng, younger sibling). For a female: 오빠 (oppa, older brother), 언니 (eonni, older sister), 동생 (dongsaeng, younger sibling). Parents: 아버지 (abeoji, father), 어머니 (eomeoni, mother). Grandparents: 할아버지 (harabeoji, grandfather), 할머니 (halmeoni, grandmother). Spouse: 남편 (nampyeon, husband), 아내 (anae, wife). Children: 아들 (adeul, son), 딸 (ttal, daughter). Example: 제 누나는 의사예요 (je nunaneun uisayeyo, my older sister is a doctor). 우리 형은 키가 커요 (uri hyeongeun kiga keoyo, my older brother is tall). 저는 딸이 한 명 있어요 (jeoneun ttari han myeong isseoyo, I have one daughter).',
    vocabulary: [
      { korean: '어머니', english: 'mother', romanization: 'eomeoni' },
      { korean: '아버지', english: 'father', romanization: 'abeoji' },
      { korean: '형', english: 'older brother (male)', romanization: 'hyeong' },
      { korean: '누나', english: 'older sister (male)', romanization: 'nuna' },
      { korean: '동생', english: 'younger sibling', romanization: 'dongsaeng' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 37,
    title: 'Hobby Vocabulary',
    type: 'Reading',
    body: 'Talking about hobbies: 취미 (chwimi, hobby). 독서 (dokseo, reading), 운동 (undong, exercise), 영화 보기 (yeonghwa bogi, watching movies), 음악 듣기 (eumak deutgi, listening to music), 여행 (yeohaeng, traveling), 요리 (yori, cooking), 사진 찍기 (sajin jjikgi, taking photos), 게임 (geim, gaming), 등산 (deungsan, hiking), 그림 그리기 (geurim geurigi, drawing). Example sentences: 제 취미는 독서예요 (je chwimineun dokseoyeyo, my hobby is reading). 저는 운동하는 것을 좋아해요 (jeoneun undonghaneun geoseul joahaeyo, I like exercising). 취미가 뭐예요? (chwimiga mwoyeyo?, what is your hobby?). 저는 영화 보는 것을 좋아해요 (jeoneun yeonghwa boneun geoseul joahaeyo, I like watching movies). 주말에 등산을 가요 (jumare deungsaneul gayo, I go hiking on weekends). 음악 듣기를 좋아해요 (eumak deutgireul joahaeyo, I like listening to music).',
    vocabulary: [
      { korean: '취미', english: 'hobby', romanization: 'chwimi' },
      { korean: '독서', english: 'reading', romanization: 'dokseo' },
      { korean: '운동', english: 'exercise', romanization: 'undong' },
      { korean: '여행', english: 'travel', romanization: 'yeohaeng' },
      { korean: '요리', english: 'cooking', romanization: 'yori' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 38,
    title: 'Weather Vocabulary',
    type: 'Reading',
    body: 'Weather words: 날씨 (nalssi, weather). 덥다 (deopda, to be hot), 춥다 (chupda, to be cold), 따뜻하다 (ttatteuthada, to be warm), 시원하다 (siwonhada, to be cool), 맑다 (markda, to be clear/sunny), 흐리다 (heureuda, to be cloudy), 비 (bi, rain), 눈 (nun, snow), 바람 (baram, wind), 습하다 (seuphada, to be humid). Examples: 오늘 날씨가 어때요? (oneul nalssiga eottaeyo?, how is the weather today?). 오늘 더워요 (oneul deowoyo, it is hot today). 내일 추워요 (naeil chuwoyo, it will be cold tomorrow). 날씨가 맑아요 (nalssiga malgayo, the weather is clear). 비가 와요 (biga wayo, it is raining). 눈이 와요 (nuni wayo, it is snowing). 바람이 불어요 (barami bureoyo, the wind is blowing). 봄 (bom, spring), 여름 (yeoreum, summer), 가을 (ga-eul, fall), 겨울 (gyeoul, winter).',
    vocabulary: [
      { korean: '날씨', english: 'weather', romanization: 'nalssi' },
      { korean: '덥다', english: 'to be hot', romanization: 'deopda' },
      { korean: '춥다', english: 'to be cold', romanization: 'chupda' },
      { korean: '비', english: 'rain', romanization: 'bi' },
      { korean: '눈', english: 'snow', romanization: 'nun' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 39,
    title: 'Time & Date: 몇 시, 몇 월, 몇 일',
    type: 'Reading',
    body: 'Time: 몇 시예요? (myeot siyeyo?, what time is it?). 1시 (han si, 1 o\'clock), 2시 (du si), 3시 (se si), 4시 (ne si), 5시 (daseot si), 6시 (yeoseot si), 7시 (ilgop si), 8시 (yeodeol si), 9시 (ahop si), 10시 (yeol si), 11시 (yeolhan si), 12시 (yeoldu si). Minutes: uses Sino-Korean numbers. 1분 (il bun), 10분 (sip bun), 30분 (samsip bun). Example: 3시 15분이에요 (se si sibo bunieyo, it is 3:15). Date: 몇 월 (myeot wol, what month), 몇 일 (myeot il, what day). 1월 (irwol, January), 2월 (iwol), etc. 오늘은 7월 15일이에요 (oneureun chirwol sibo ilieyo, today is July 15th). 생일이 몇 월 몇 일이에요? (saengiri myeot wol myeot ilieyo?, when is your birthday?).',
    vocabulary: [
      { korean: '시', english: 'hour/o\'clock', romanization: 'si' },
      { korean: '분', english: 'minute', romanization: 'bun' },
      { korean: '월', english: 'month', romanization: 'wol' },
      { korean: '일', english: 'day (date)', romanization: 'il' },
      { korean: '생일', english: 'birthday', romanization: 'saengil' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 40,
    title: 'Unit 1 Review',
    type: 'Practice',
    body: 'Let\'s review Unit 1. Key grammar: SOV word order (Subject-Object-Verb). Particles: 은/는 (topic), 을/를 (object), 에 (time/location), 에서 (action location). Tenses: present (아/어요), past (았/었어요), future ((으)ㄹ 거예요). Copula: 이에요/예요 (is/am/are). Negation: 안 before verbs. Numbers: Sino-Korean (일이삼) for dates/money; Native Korean (하나둘셋) for counting. Want: 고 싶어요. Can: (으)ㄹ 수 있어요. Practice translating: "I ate kimchi at home" = 집에서 김치를 먹었어요 (jibeseo kimchireul meogeosseoyo). "I want to go to Korea next year" = 내년에 한국에 가고 싶어요 (naenyeone hanguge gago sipeoyo). Review all vocabulary and try to make 5 sentences about yourself using what you have learned.',
    listenText: '안녕하세요. 저는 학생이에요. 어제 학교에 갔어요. 내일 친구를 만날 거예요. 김치를 좋아해요?',
    vocabulary: [
      { korean: '복습', english: 'review', romanization: 'bokseup' },
      { korean: '문법', english: 'grammar', romanization: 'munbeop' },
      { korean: '내년', english: 'next year', romanization: 'naenyeon' },
      { korean: '연습', english: 'practice', romanization: 'yeonseup' }
    ]
  },

  // ========== UNIT 2: MORE GRAMMAR (Lessons 41-55) ==========
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 41,
    title: 'Direction & Transportation',
    type: 'Reading',
    body: 'Transportation: 버스 (beoseu, bus), 지하철 (jihacheol, subway), 택시 (taeksi, taxi), 기차 (gicha, train), 비행기 (bihaenggi, airplane), 자전거 (jajeonge, bicycle), 도보 (dobo, walking). Use 타다 (tada, to ride) and 내리다 (naerida, to get off). Pattern: (transport) + 을/를 + 타요/내려요. Examples: 버스를 타요 (beoseureul tayo, I ride the bus). 지하철을 타고 학교에 가요 (jihacheoreul tago hakgyoe gayo, I take the subway and go to school). Where to take it: (line number)호선 (hoseon, line): 2호선 (i hoseon, line 2). How to get there: (place)에 어떻게 가요? (eotteoke gayo?, how do you get to...?). 에서 (place of departure) + until + 까지 (kkaji, until): 집에서 학교까지 버스로 30분 걸려요 (jibeseo hakgyokkaji beoseuro samsip bun geollyeoyo, it takes 30 minutes by bus from home to school).',
    vocabulary: [
      { korean: '버스', english: 'bus', romanization: 'beoseu' },
      { korean: '지하철', english: 'subway', romanization: 'jihacheol' },
      { korean: '택시', english: 'taxi', romanization: 'taeksi' },
      { korean: '타다', english: 'to ride', romanization: 'tada' },
      { korean: '걸리다', english: 'to take (time)', romanization: 'geollida' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 42,
    title: 'Giving Directions: 왼쪽, 오른쪽, 직진',
    type: 'Practice',
    body: 'Direction words: 왼쪽 (oenjjok, left side), 오른쪽 (oreunjjok, right side), 직진 (jikjin, straight ahead), 건너편 (geonneopyeon, opposite side), 모퉁이 (motongi, corner), 사거리 (sageori, intersection), 횡단보도 (hoengdanbodo, crosswalk). Key verbs: 가다 (gada, go), 돌다 (dolda, turn), 건너다 (geonneoda, cross). Examples: 왼쪽으로 가세요 (oenjjokeuro gaseyo, go left). 오른쪽으로 도세요 (oreunjjokeuro doseyo, turn right). 직진하세요 (jikjinhaseyo, go straight). 사거리에서 오른쪽으로 도세요 (sageorieseo oreunjjokeuro doseyo, turn right at the intersection). 은행은 약국 건너편에 있어요 (eunhaengeun yakguk geonneopyeone isseoyo, the bank is opposite the pharmacy). To ask: (place)이 어디에 있어요? (eodie isseoyo?). Polite command ending: (으)세요.',
    vocabulary: [
      { korean: '왼쪽', english: 'left side', romanization: 'oenjjok' },
      { korean: '오른쪽', english: 'right side', romanization: 'oreunjjok' },
      { korean: '직진', english: 'straight ahead', romanization: 'jikjin' },
      { korean: '건너편', english: 'opposite side', romanization: 'geonneopyeon' },
      { korean: '사거리', english: 'intersection', romanization: 'sageori' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 43,
    title: '"And Then": ~고',
    type: 'Reading',
    body: 'The connective ~고 (go) attaches to verb stems to mean "and then" or simply "and". Pattern: verb stem + 고 + second verb. Examples: 학교에 가고 친구를 만나요 (hakgyoe gago chingureul mannayo, I go to school and then meet a friend). 밥을 먹고 영화를 봐요 (babeul meokgo yeonghwareul bwayo, I eat and then watch a movie). 일어나고 샤워해요 (ireonago syawohaeyo, I get up and then shower). The subject is usually the same for both actions. If different subjects, use other structures. Time order is implied: the first action happens before the second. For simultaneous actions, use ~면서 (myeonseo, while). Examples with ~고: 노래를 듣고 공부해요 (noraereul deutgo gongbuhaeyo, I listen to music and study). It can also simply list states: 키가 크고 예뻐요 (kiga keugo yeppeoyo, she is tall and pretty).',
    vocabulary: [
      { korean: '가고', english: 'go and', romanization: 'gago' },
      { korean: '먹고', english: 'eat and', romanization: 'meokgo' },
      { korean: '듣고', english: 'listen and', romanization: 'deutgo' },
      { korean: '일어나다', english: 'to get up', romanization: 'ireonada' },
      { korean: '샤워하다', english: 'to shower', romanization: 'syawohada' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 44,
    title: '"But": ~지만',
    type: 'Reading',
    body: 'The connective ~지만 (jiman) means "but" or "although". Attach to verb/adjective stems: stem + 지만. Examples: 비싸지만 맛있어요 (bissajiman masisseoyo, it is expensive but delicious). 날씨가 춥지만 학교에 가요 (nalssiga chupjiman hakgyoe gayo, the weather is cold but I go to school). 한국어를 공부하지만 아직 어려워요 (hangugeoreul gongbuhajiman ajik eoryeowoyo, I study Korean but it is still difficult). 그 영화는 재미있지만 길어요 (geu yeonghwaneun jaemijiman gireoyo, that movie is interesting but long). For the copula: 이지만 (ijiman): 학생이지만 돈이 없어요 (haksaengijiman doni eopseoyo, I am a student but I have no money). Note: ~지만 can also mean "although" and is used in formal and informal speech alike.',
    vocabulary: [
      { korean: '하지만', english: 'but/however', romanization: 'hajiman' },
      { korean: '비싸다', english: 'to be expensive', romanization: 'bissada' },
      { korean: '어렵다', english: 'to be difficult', romanization: 'eoryeopda' },
      { korean: '아직', english: 'still/yet', romanization: 'ajik' },
      { korean: '재미있다', english: 'to be interesting', romanization: 'jaemiitda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 45,
    title: '"Because": ~아/어서',
    type: 'Reading',
    body: 'To express reason or cause, use ~아/어서 (a/eoseo) meaning "because" or "so". Attach to verb/adjective stems with the same vowel rule as present tense: ㅏ/ㅗ stems take 아서; others take 어서. 하다 > 해서. Examples: 배가 고파서 밥을 먹어요 (baega gopaseo babeul meogeoyo, I am hungry so I eat). 날씨가 추워서 집에 있어요 (nalssiga chuwoseo jibe isseoyo, because it is cold, I stay home). 시간이 없어서 안 가요 (sigani eopseoseo an gayo, because I have no time, I don\'t go). 피곤해서 일찍 자요 (pigonhaeseo iljjik jayo, I am tired so I sleep early). 비가 와서 밖에 못 가요 (biga waseo bakke mot gayo, because it is raining, I cannot go out). Note: Cannot use ~아/어서 in the same clause with past tense or command. For past reason, use (았/었)기 때문에.',
    vocabulary: [
      { korean: '배고프다', english: 'to be hungry', romanization: 'baegopeuda' },
      { korean: '피곤하다', english: 'to be tired', romanization: 'pigonhada' },
      { korean: '일찍', english: 'early', romanization: 'iljjik' },
      { korean: '자다', english: 'to sleep', romanization: 'jada' },
      { korean: '못', english: 'cannot (negative)', romanization: 'mot' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 46,
    title: '"Let\'s": (으)ㅂ시다',
    type: 'Reading',
    body: 'To make a suggestion or invitation meaning "let\'s", use (으)ㅂ시다 (eusipsida / psida). If the verb stem ends in a vowel, add ㅂ시다. If it ends in a consonant, add 읍시다. 가다 > 갑시다 (gapsida, let\'s go). 먹다 > 먹읍시다 (meogeupsida, let\'s eat). 하다 > 합시다 (hapsida, let\'s do). 보다 > 봅시다 (bopsida, let\'s see). 읽다 > 읽읍시다 (ilgeupsida, let\'s read). Examples: 같이 갑시다 (gachi gapsida, let\'s go together). 여기서 먹읍시다 (yeogiseo meogeupsida, let\'s eat here). 내일 만납시다 (naeil mannapsida, let\'s meet tomorrow). 한국어를 공부합시다 (hangugeoreul gongbuhapsida, let\'s study Korean). For negative suggestion, use ~지 맙시다 (ji mapsida, let\'s not): 걱정하지 맙시다 (geokjeonghaji mapsida, let\'s not worry). This form is polite but not overly formal. A softer suggestion is ~을까요? (eulkkayo?, shall we?).',
    vocabulary: [
      { korean: '갑시다', english: 'let\'s go', romanization: 'gapsida' },
      { korean: '합시다', english: 'let\'s do', romanization: 'hapsida' },
      { korean: '만납시다', english: 'let\'s meet', romanization: 'mannapsida' },
      { korean: '같이', english: 'together', romanization: 'gachi' },
      { korean: '여기', english: 'here', romanization: 'yeogi' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 47,
    title: '"Must/Have To": 아/야 해요',
    type: 'Reading',
    body: 'To express obligation ("must" or "have to"), use ~아/야 되다 (doeda) or ~아/야 하다 (hada). Both attach to verb stems with the same vowel rule: ㅏ/ㅗ + 아야 해요; others + 어야 해요. 하다 > 해야 해요. Examples: 학교에 가야 해요 (hakgyoe gaya haeyo, I have to go to school). 숙제를 해야 해요 (sukjereul haeya haeyo, I have to do homework). 약을 먹어야 해요 (yageul meogeoya haeyo, I have to take medicine). 일찍 일어나야 해요 (iljjik ireonaya haeyo, I have to wake up early). The negative (don\'t have to) uses 안 아/어도 돼요 (an a/eodo dwaeyo): 안 가도 돼요 (an gado dwaeyo, you don\'t have to go). To say "must not", use (으)면 안 돼요 (see next lesson). Examples of obligation: 한국에서는 술을 마실 수 있어야 해요? (hangugeseoneun sureul masil su isseoya haeyo?, in Korea, do you have to be able to drink?).',
    vocabulary: [
      { korean: '가야 해요', english: 'have to go', romanization: 'gaya haeyo' },
      { korean: '해야 해요', english: 'have to do', romanization: 'haeya haeyo' },
      { korean: '숙제', english: 'homework', romanization: 'sukje' },
      { korean: '약', english: 'medicine', romanization: 'yak' },
      { korean: '일어나다', english: 'to get up', romanization: 'ireonada' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 48,
    title: '"May": 아/어도 돼요',
    type: 'Reading',
    body: 'To give permission ("may" or "it is okay to"), use ~아/어도 돼요 (a/eodo dwaeyo). Same vowel rule: ㅏ/ㅗ + 아도 돼요; others + 어도 돼요. 하다 > 해도 돼요. Examples: 여기 앉아도 돼요? (yeogi anjado dwaeyo?, may I sit here?). 네, 앉아도 돼요 (ne, anjado dwaeyo, yes, you may sit). 사진을 찍어도 돼요? (sajineul jjigeodo dwaeyo?, may I take pictures?). 핸드폰을 사용해도 돼요? (haendeuponeul sayonghaedo dwaeyo?, may I use my cell phone?). 여기서 담배를 피워도 돼요? (yeogiseo dambaereul piwodo dwaeyo?, may I smoke here?). The negative form is (으)면 안 돼요 (must not, see next lesson). The structure is: verb stem + 아/어도 + 돼요 (literally: even if you do, it is okay). For formal situations, use ~아/어도 괜찮아요 (a/eodo gwaenchanayo).',
    vocabulary: [
      { korean: '돼요', english: 'it is okay/it works', romanization: 'dwaeyo' },
      { korean: '앉다', english: 'to sit', romanization: 'antda' },
      { korean: '사진', english: 'photo', romanization: 'sajin' },
      { korean: '사용하다', english: 'to use', romanization: 'sayonghada' },
      { korean: '괜찮아요', english: 'it is fine', romanization: 'gwaenchanayo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 49,
    title: 'Prohibition: (으)면 안 돼요',
    type: 'Reading',
    body: 'To say "must not" or "may not", use (으)면 안 돼요 (eumyeon an dwaeyo / myeon an dwaeyo). If verb stem ends in consonant, add 으면 안 돼요; if vowel, add 면 안 돼요. Examples: 여기서 담배를 피우면 안 돼요 (yeogiseo dambaereul piumyeon an dwaeyo, you must not smoke here). 수업 중에 핸드폰을 사용하면 안 돼요 (sueop junge haendeuponeul sayonghamyeon an dwaeyo, you must not use your phone during class). 늦으면 안 돼요 (neujeumyeon an dwaeyo, you must not be late). 음식을 교실에 가져오면 안 돼요 (eumsigeul gyosire gajyeoomyeon an dwaeyo, you must not bring food into the classroom). The structure literally means "if you do, it is not okay". For a softer prohibition, use ~지 마세요 (ji maseyo, please don\'t): 뛰지 마세요 (ttwiji maseyo, please don\'t run). Compare: 안 돼요 (an dwaeyo) alone means "no/not allowed" in general.',
    vocabulary: [
      { korean: '안 돼요', english: 'not allowed', romanization: 'an dwaeyo' },
      { korean: '피우다', english: 'to smoke', romanization: 'piuda' },
      { korean: '늦다', english: 'to be late', romanization: 'neutda' },
      { korean: '가져오다', english: 'to bring', romanization: 'gajyeooda' },
      { korean: '마세요', english: 'please don\'t', romanization: 'maseyo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 50,
    title: 'Comparing: ~보다 더',
    type: 'Reading',
    body: 'To make comparisons, use ~보다 (boda, "than") with 더 (deo, "more"). Pattern: A + 가 B + 보다 더 + adjective. A is compared to B. Examples: 한국어가 영어보다 더 어려워요 (hangugeoga yeongeoboda deo eoryeowoyo, Korean is more difficult than English). 지하철이 버스보다 더 빨라요 (jihacheori beoseuboda deo ppallayo, the subway is faster than the bus). 이 가방이 저 가방보다 더 비싸요 (i gabangi jeo gabangboda deo bissayo, this bag is more expensive than that bag). To say "less", use 덜 (deol, less): 이게 저거보다 덜 매워요 (ige jeogeoboda deol maewoyo, this is less spicy than that). For "the most", use 제일 (jeil) or 가장 (gajang): 제일 큰 게 뭐예요? (jeil keun ge mwoyeyo?, which is the biggest?). Examples: 서울이 제일 커요 (seouri jeil keoyo, Seoul is the biggest).',
    vocabulary: [
      { korean: '~보다', english: 'than', romanization: 'boda' },
      { korean: '더', english: 'more', romanization: 'deo' },
      { korean: '제일', english: 'the most', romanization: 'jeil' },
      { korean: '빠르다', english: 'to be fast', romanization: 'ppareuda' },
      { korean: '늦다', english: 'to be late/slow', romanization: 'neutda' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 51,
    title: 'Frequency Adverbs',
    type: 'Reading',
    body: 'Frequency adverbs describe how often you do something, from most to least: 항상 (hangsang, always), 자주 (jaju, often), 가끔 (gakkeum, sometimes), 별로 (byeollo, not really - used with negative), 전혀 (jeonhyeo, never/not at all - used with negative). Examples: 저는 항상 아침 7시에 일어나요 (jeoneun hangsang achim ilgopsie ireonayo, I always wake up at 7 AM). 저는 자주 영화를 봐요 (jeoneun jaju yeonghwareul bwayo, I often watch movies). 가끔 커피를 마셔요 (gakkeum keopireul masyeoyo, I sometimes drink coffee). 별로 안 피곤해요 (byeollo an pigonhaeyo, I\'m not really tired). 전혀 안 매워요 (jeonhyeo an maewoyo, it is not spicy at all). Other useful adverbs: 항상 vs. 맨날 (maennal, every day, more casual). 자주 and 가끔 can also be placed before the verb. Remember that 별로 and 전혀 must be followed by a negative verb.',
    vocabulary: [
      { korean: '항상', english: 'always', romanization: 'hangsang' },
      { korean: '자주', english: 'often', romanization: 'jaju' },
      { korean: '가끔', english: 'sometimes', romanization: 'gakkeum' },
      { korean: '별로', english: 'not really', romanization: 'byeollo' },
      { korean: '전혀', english: 'not at all', romanization: 'jeonhyeo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 52,
    title: 'Before/After: ~전에/~후에',
    type: 'Reading',
    body: 'To say "before" use ~전에 (jeone), "after" use ~후에 (hue). For verbs: verb stem + 기 전에 (before doing), verb stem + (으)ㄴ 후에 (after doing). Examples: 밥을 먹기 전에 손을 씻어요 (babeul meokgi jeone soneul ssiseoyo, I wash my hands before eating). 수업하기 전에 커피를 마셔요 (sueopagi jeone keopireul masyeoyo, I drink coffee before class). 집에 가기 전에 친구를 만나요 (jibe gagi jeone chingureul mannayo, I meet a friend before going home). For after: 밥을 먹은 후에 양치질해요 (babeul meogeun hue yangchijilhaeyo, I brush my teeth after eating). 영화를 본 후에 집에 가요 (yeonghwareul bon hue jibe gayo, I go home after watching the movie). Also: 식사 전에 (siksa jeone, before the meal), 식사 후에 (siksa hue, after the meal).',
    vocabulary: [
      { korean: '전에', english: 'before', romanization: 'jeone' },
      { korean: '후에', english: 'after', romanization: 'hue' },
      { korean: '씻다', english: 'to wash', romanization: 'ssitda' },
      { korean: '양치질', english: 'teeth brushing', romanization: 'yangchijil' },
      { korean: '식사', english: 'meal', romanization: 'siksa' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 53,
    title: 'At the Restaurant: Ordering Dialog',
    type: 'Practice',
    body: 'A typical restaurant dialog: 손님: 여기요! (sonnim: yeogiyo!, Excuse me!). 종업원: 네, 잠시만요. 뭐 드시겠어요? (jongeopwon: ne, jamsimanyo. mwo deusigesseoyo?, Yes, just a moment. What would you like to eat?). 손님: 메뉴판 주세요 (menyupan juseyo, Please give me the menu). 종업원: 여기 있습니다 (yeogi itseumnida, Here it is). (after looking) 손님: 비빔밥 하나하고 김치 주세요 (bibimbap hanahago kimchi juseyo, One bibimbap and kimchi please). 종업원: 네, 비빔밥 하나하고 김치요. 음료수는 뭐 드시겠어요? (ne, bibimbap hanahago kimchiyo. eumryosuneun mwo deusigesseoyo?, Yes, one bibimbap and kimchi. What beverage would you like?). 손님: 물 주세요 (mul juseyo, Water please). (after eating) 손님: 계산서 주세요 (gyesanseo juseyo, Check please). 종업원: 네, 여기 있습니다. 총 만 오천 원입니다 (ne, yeogi itseumnida. chong man ocheon wonimnida, Here it is. Total 15,000 won).',
    listenText: '여기요! 메뉴판 주세요. 비빔밥 하나 주세요. 물 주세요. 계산서 주세요.',
    vocabulary: [
      { korean: '여기요', english: 'excuse me (here!)', romanization: 'yeogiyo' },
      { korean: '드시다', english: 'to eat (honorific)', romanization: 'deusida' },
      { korean: '음료수', english: 'beverage', romanization: 'eumryosu' },
      { korean: '총', english: 'total', romanization: 'chong' },
      { korean: '오천 원', english: '5,000 won', romanization: 'ocheon won' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 54,
    title: 'At the Store: Shopping Dialog',
    type: 'Practice',
    body: 'A typical shopping dialog: 손님: 안녕하세요 (sonnim: annyeonghaseyo, Hello). 점원: 네, 어서 오세요. 무엇을 찾으세요? (jeomwon: ne, eoseo oseyo. mueoseul chajeuseyo?, Welcome. What are you looking for?). 손님: 저는 가방을 찾고 있어요 (jeoneun gabangeul chatgo isseoyo, I am looking for a bag). 점원: 이거 어때요? 디자인이 예뻐요 (igeo eottaeyo? dijaini yeppeoyo, How about this? The design is pretty). 손님: 얼마예요? (eolmayeyo?, How much is it?). 점원: 삼만 오천 원이에요 (samman ocheon wonieyo, It is 35,000 won). 손님: 너무 비싸요. 깎아 주세요 (neomu bissayo. kkakka juseyo, Too expensive. Give me a discount). 점원: 그럼 삼만 원에 드릴게요 (geureom samman wone deurilgeyo, Then I will give it to you for 30,000 won). 손님: 네, 살게요. 카드 돼요? (ne, salgeyo. kadeu dwaeyo?, Yes, I\'ll buy it. Is card okay?). 점원: 네, 돼요 (ne, dwaeyo, Yes, it is).',
    listenText: '얼마예요? 너무 비싸요. 깎아 주세요. 네, 살게요. 카드 돼요?',
    vocabulary: [
      { korean: '어서 오세요', english: 'welcome', romanization: 'eoseo oseyo' },
      { korean: '찾다', english: 'to look for', romanization: 'chatda' },
      { korean: '디자인', english: 'design', romanization: 'dijain' },
      { korean: '카드', english: 'card', romanization: 'kadeu' },
      { korean: '드릴게요', english: 'I will give (polite)', romanization: 'deurilgeyo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 55,
    title: 'Unit 2 Final Review & Practice',
    type: 'Practice',
    body: 'Unit 2 review: Direction & transport (버스, 지하철, 타다). Giving directions (왼쪽, 오른쪽, 직진). Connective ~고 (and then). Contrast ~지만 (but). Reason ~아/어서 (because). Suggestion (으)ㅂ시다 (let\'s). Obligation 아/야 해요 (must). Permission 아/어도 돼요 (may). Prohibition (으)면 안 돼요 (must not). Comparison ~보다 더 (than). Frequency adverbs (항상, 자주, 가끔). Before/After ~전에/~후에. Practice: Make sentences combining grammar. 지하철을 타고 학교에 가요 (jihacheoreul tago hakgyoe gayo, I take the subway and go to school). 비싸지만 예뻐요 (bissajiman yeppeoyo, it is expensive but pretty). 시간이 없어서 택시를 타야 해요 (sigani eopseoseo taeksireul taya haeyo, because I have no time, I have to take a taxi). Try writing a short paragraph about your daily routine using at least 5 different grammar points from Unit 2.',
    listenText: '지하철을 타고 학교에 가요. 비싸지만 예뻐요. 시간이 없어서 택시를 타야 해요. 항상 일찍 일어나요.',
    vocabulary: [
      { korean: '복습', english: 'review', romanization: 'bokseup' },
      { korean: '연습', english: 'practice', romanization: 'yeonseup' },
      { korean: '일상', english: 'daily routine', romanization: 'ilsang' },
      { korean: '문장', english: 'sentence', romanization: 'munjang' }
    ]
  },

  // ========== ADDITIONAL LESSONS (56-61) ==========
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 56,
    title: 'Writing Practice: Self-Introduction',
    type: 'Practice',
    body: 'Write a self-introduction in Korean. Structure: Greeting (안녕하세요), Name (저는 [name]이에요/예요), Nationality (저는 [country] 사람이에요), Occupation (저는 학생이에요 / 회사원이에요), Hobbies (제 취미는 [hobby]예요), Family (가족이 [number] 명이에요), Closing (잘 부탁드립니다, please take care of me). Example: 안녕하세요. 저는 마이클이에요. 저는 미국 사람이에요. 저는 학생이에요. 제 취미는 독서예요. 가족이 네 명이에요. 잘 부탁드립니다 (annyeonghaseyo. jeoneun maikeulieyo. jeoneun miguk saramieyo. jeoneun haksaengieyo. je chwimineun dokseoyeyo. gajogi ne myeongieyo. jal butakdeurimnida). Practice writing your own version with your real information. Try to use at least 5 sentences.',
    vocabulary: [
      { korean: '자기소개', english: 'self-introduction', romanization: 'jagisogae' },
      { korean: '이름', english: 'name', romanization: 'ireum' },
      { korean: '국적', english: 'nationality', romanization: 'gukjeok' },
      { korean: '회사원', english: 'office worker', romanization: 'hoesawon' },
      { korean: '잘 부탁드립니다', english: 'please take care of me', romanization: 'jal butakdeurimnida' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 57,
    title: 'Reading: Family Description',
    type: 'Reading',
    body: 'Read this family description: 우리 가족은 네 명이에요. 아버지, 어머니, 남동생, 그리고 제가 있어요 (uri gajogeun ne myeongieyo. abeoji, eomeoni, namdongsaeng, geurigo jegayo, Our family has four people: father, mother, younger brother, and me). 아버지는 의사예요. 병원에서 일하세요 (abeojineun uisayeyo. byeongwoneseo ilhasseyo, Father is a doctor. He works at a hospital). 어머니는 선생님이세요. 학교에서 가르치세요 (eomeonineun seonsaengnimiseyo. hakgyoseo gareuchiseyo, Mother is a teacher. She teaches at a school). 남동생은 학생이에요. 동생은 축구를 좋아해요 (namdongsaengeun haksaengieyo. dongsaengeun chukgureul joahaeyo, My younger brother is a student. He likes soccer). 저는 한국어를 공부해요. 우리 가족은 행복해요 (jeoneun hangugeoreul gongbuhaeyo. uri gajogeun haengbokhaeyo, I study Korean. Our family is happy). Notice how family terms and job vocabulary are used naturally.',
    vocabulary: [
      { korean: '남동생', english: 'younger brother', romanization: 'namdongsaeng' },
      { korean: '그리고', english: 'and (between clauses)', romanization: 'geurigo' },
      { korean: '가르치다', english: 'to teach', romanization: 'gareuchida' },
      { korean: '축구', english: 'soccer', romanization: 'chukgu' },
      { korean: '행복하다', english: 'to be happy', romanization: 'haengbokhada' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 58,
    title: 'Reading: Daily Schedule',
    type: 'Reading',
    body: 'Read about a daily schedule: 저는 매일 아침 7시에 일어나요 (jeoneun maeil achim ilgopsie ireonayo, I wake up at 7 AM every day). 세수하고 이를 닦아요 (sesuhago ireul dakkayo, I wash my face and brush my teeth). 아침을 먹고 8시에 학교에 가요 (achimeul meokgo yeodeol sie hakgyoe gayo, I eat breakfast and go to school at 8). 학교에서 9시부터 3시까지 공부해요 (hakgyoseo ahop siebuto se si kkaji gongbuhaeyo, I study at school from 9 AM to 3 PM). 점심은 12시에 먹어요 (jeomsimeun yeoldu sie meogeoyo, I eat lunch at 12). 학교가 끝난 후에 집에 와요 (hakgyoga kkeun nan hue jibe wayo, After school ends, I come home). 저녁을 먹고 숙제를 해요 (jeonyeogeul meokgo sukjereul haeyo, I eat dinner and do homework). 10시에 자요 (yeol sie jayo, I sleep at 10 PM). Notice the use of time markers and connectors.',
    vocabulary: [
      { korean: '매일', english: 'every day', romanization: 'maeil' },
      { korean: '세수하다', english: 'to wash face', romanization: 'sesuhada' },
      { korean: '닦다', english: 'to brush/polish', romanization: 'dakda' },
      { korean: '~부터', english: 'from (time)', romanization: 'buteo' },
      { korean: '~까지', english: 'until (time)', romanization: 'kkaji' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 59,
    title: 'Listening Practice: Directions',
    type: 'Listening',
    body: 'Listen to these direction dialogues. A person asks for directions and gets a response. Focus on understanding location words and direction verbs.',
    listenText: '가: 실례합니다. 서울역에 어떻게 가요? (sillyehamnida. seouryeoge eotteoke gayo?, Excuse me. How do I get to Seoul Station?). 나: 직진하세요. 그리고 사거리에서 왼쪽으로 도세요 (jikjinhaseyo. geurigo sageorieseo oenjjokeuro doseyo, Go straight. Then turn left at the intersection). 가: 네, 감사합니다 (ne, gamsahamnida, Yes, thank you). 나: 천만에요 (cheonmaneyo, You are welcome).',
    vocabulary: [
      { korean: '실례합니다', english: 'excuse me (polite)', romanization: 'sillyehamnida' },
      { korean: '서울역', english: 'Seoul Station', romanization: 'seouryeok' },
      { korean: '돌다', english: 'to turn', romanization: 'dolda' },
      { korean: '천만에요', english: 'you are welcome', romanization: 'cheonmaneyo' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 60,
    title: 'Culture Note: Korean Honorifics Basics',
    type: 'Reading',
    body: 'Korean has a complex honorific system reflecting social hierarchy. The most basic level is 해요체 (haeyoche), polite informal, used in most daily conversations. The formal polite level is 합쇼체 (hapsyoche), ending in ㅂ니다/습니다, used in formal settings like news, presentations, or with strangers. Honorific verbs add (으)시: 가시다 (gasida, to go honorific), 하시다 (hasida, to do honorific). Example: 선생님께서 말씀하세요 (seonsaengnimkkeseo malsseumhaseyo, the teacher speaks [honorific]). Key honorific words: 계시다 (gyesida, to be/exist for respected people), 주무시다 (jumusida, to sleep for respected people), 진지 (jinji, meal honorific), 말씀 (malsseum, words/speech honorific). Age and status determine speech level. Always use polite forms (요 endings) with strangers, elders, and in professional settings until invited to use casual speech.',
    vocabulary: [
      { korean: '존댓말', english: 'honorific speech', romanization: 'jondaenmal' },
      { korean: '반말', english: 'casual speech', romanization: 'banmal' },
      { korean: '시', english: 'honorific infix', romanization: 'si' },
      { korean: '계시다', english: 'to be (honorific)', romanization: 'gyesida' },
      { korean: '말씀', english: 'speech/words (honorific)', romanization: 'malsseum' }
    ]
  },
  {
    courseSlug: 'korean',
    level: 'Beginner',
    order: 61,
    title: 'Course Wrap-Up & Next Steps',
    type: 'Practice',
    body: 'Congratulations on completing the Korean A1 Beginner course! You have learned: Hangul reading and writing, SOV sentence structure, particles (은/는, 을/를, 에, 에서), present/past/future tenses, negation, question words, numbers (Sino and Native), counters, location words, time expressions, connectors (~고, ~지만, ~아/어서), suggestions ((으)ㅂ시다), obligation/permission/prohibition, comparisons, and essential vocabulary covering food, family, hobbies, weather, shopping, and directions. Next steps: Practice with native speakers through language exchanges. Expand vocabulary to 1000+ words. Study the next level A2 covering more complex grammar like: relative clauses (~는/은/을), indirect speech, conditional (~으면), passive voice, and more advanced connectors. Keep studying Korean every day - consistency is key! 화이팅! (hwaiting!, fighting/cheers!).',
    vocabulary: [
      { korean: '수고하셨습니다', english: 'good work /辛苦了', romanization: 'sugohasyeotseumnida' },
      { korean: '화이팅', english: 'fighting / cheers', romanization: 'hwaiting' },
      { korean: '다음', english: 'next', romanization: 'daeum' },
      { korean: '계속', english: 'continue', romanization: 'gyesok' },
      { korean: '성공', english: 'success', romanization: 'seonggong' }
    ]
  }
];

module.exports = koreanLessons;
