// 单词数据
export const wordsData = [
  {
    id: 1,
    word: 'Serendipity',
    phonetic: '/ˌserənˈdɪpɪti/',
    translation: '意外发现美好事物的运气',
    partOfSpeech: 'noun',
    example: 'Finding that rare book was pure serendipity.',
    exampleTranslation: '找到那本稀有书籍纯属意外之喜。',
    audioUrl: '/audio/serendipity.mp3',
    difficulty: 'advanced',
    mastered: false,
    favorite: false
  },
  {
    id: 2,
    word: 'Eloquent',
    phonetic: '/ˈeləkwənt/',
    translation: '雄辩的；有说服力的',
    partOfSpeech: 'adjective',
    example: 'She gave an eloquent speech about climate change.',
    exampleTranslation: '她发表了一篇关于气候变化的精彩演讲。',
    audioUrl: '/audio/eloquent.mp3',
    difficulty: 'intermediate',
    mastered: true,
    favorite: true
  },
  {
    id: 3,
    word: 'Ephemeral',
    phonetic: '/ɪˈfemərəl/',
    translation: '短暂的；转瞬即逝的',
    partOfSpeech: 'adjective',
    example: 'Fame is often ephemeral in the digital age.',
    exampleTranslation: '在数字时代，名声往往是短暂的。',
    audioUrl: '/audio/ephemeral.mp3',
    difficulty: 'advanced',
    mastered: false,
    favorite: false
  },
  {
    id: 4,
    word: 'Resilient',
    phonetic: '/rɪˈzɪliənt/',
    translation: '有弹性的；能迅速恢复的',
    partOfSpeech: 'adjective',
    example: 'Children are remarkably resilient to change.',
    exampleTranslation: '孩子们对变化的适应能力惊人。',
    audioUrl: '/audio/resilient.mp3',
    difficulty: 'intermediate',
    mastered: true,
    favorite: false
  },
  {
    id: 5,
    word: 'Ubiquitous',
    phonetic: '/juːˈbɪkwɪtəs/',
    translation: '无处不在的；普遍存在的',
    partOfSpeech: 'adjective',
    example: 'Smartphones have become ubiquitous in modern life.',
    exampleTranslation: '智能手机在现代生活中无处不在。',
    audioUrl: '/audio/ubiquitous.mp3',
    difficulty: 'advanced',
    mastered: false,
    favorite: true
  },
  {
    id: 6,
    word: 'Meticulous',
    phonetic: '/məˈtɪkjələs/',
    translation: '一丝不苟的；细致的',
    partOfSpeech: 'adjective',
    example: 'She is meticulous about keeping records.',
    exampleTranslation: '她对保存记录一丝不苟。',
    audioUrl: '/audio/meticulous.mp3',
    difficulty: 'intermediate',
    mastered: false,
    favorite: false
  },
  {
    id: 7,
    word: 'Pragmatic',
    phonetic: '/præɡˈmætɪk/',
    translation: '务实的；实用主义的',
    partOfSpeech: 'adjective',
    example: 'We need a pragmatic approach to solve this problem.',
    exampleTranslation: '我们需要用务实的方法来解决这个问题。',
    audioUrl: '/audio/pragmatic.mp3',
    difficulty: 'intermediate',
    mastered: true,
    favorite: false
  },
  {
    id: 8,
    word: 'Quintessential',
    phonetic: '/ˌkwɪntɪˈsenʃəl/',
    translation: '典型的；精髓的',
    partOfSpeech: 'adjective',
    example: 'This is the quintessential summer experience.',
    exampleTranslation: '这是典型的夏日体验。',
    audioUrl: '/audio/quintessential.mp3',
    difficulty: 'advanced',
    mastered: false,
    favorite: true
  }
]

// 练习题数据
export const practiceData = {
  multipleChoice: [
    {
      id: 1,
      type: 'choice',
      question: 'What does "Serendipity" mean?',
      options: [
        { id: 'a', text: '悲伤的情绪' },
        { id: 'b', text: '意外发现美好事物的运气' },
        { id: 'c', text: '强烈的愤怒' },
        { id: 'd', text: '深深的思念' }
      ],
      correctAnswer: 'b',
      explanation: 'Serendipity 指的是意外发现美好事物的好运气。'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Choose the correct translation for "Ephemeral":',
      options: [
        { id: 'a', text: '永恒的' },
        { id: 'b', text: '重要的' },
        { id: 'c', text: '短暂的' },
        { id: 'd', text: '巨大的' }
      ],
      correctAnswer: 'c',
      explanation: 'Ephemeral 意为短暂的、转瞬即逝的。'
    },
    {
      id: 3,
      type: 'choice',
      question: 'Which word means "无处不在的"?',
      options: [
        { id: 'a', text: 'Meticulous' },
        { id: 'b', text: 'Ubiquitous' },
        { id: 'c', text: 'Eloquent' },
        { id: 'd', text: 'Resilient' }
      ],
      correctAnswer: 'b',
      explanation: 'Ubiquitous 表示无处不在的、普遍存在的。'
    }
  ],
  fillBlank: [
    {
      id: 4,
      type: 'fill',
      question: 'She gave an _____ speech about environmental protection.',
      hint: '雄辩的',
      correctAnswer: 'eloquent',
      explanation: 'Eloquent 形容演讲有说服力、雄辩的。'
    },
    {
      id: 5,
      type: 'fill',
      question: 'Children are remarkably _____ to life changes.',
      hint: '有弹性的',
      correctAnswer: 'resilient',
      explanation: 'Resilient 表示能够快速恢复、有弹性的。'
    }
  ],
  listening: [
    {
      id: 6,
      type: 'listening',
      audioWord: 'Quintessential',
      question: 'Listen and select the word you hear:',
      options: [
        { id: 'a', text: 'Quintessential' },
        { id: 'b', text: 'Questionable' },
        { id: 'c', text: 'Quantitative' },
        { id: 'd', text: 'Quarantine' }
      ],
      correctAnswer: 'a',
      explanation: 'The word is "Quintessential" meaning 典型的、精髓的。'
    }
  ]
}

// 用户进度数据
export const userProgress = {
  streak: 15,
  totalWords: 850,
  masteredWords: 320,
  learningWords: 180,
  newWords: 350,
  todayGoal: 20,
  todayLearned: 12,
  totalMinutes: 2450,
  averageAccuracy: 85,
  weeklyData: [
    { day: '周一', words: 25, minutes: 45 },
    { day: '周二', words: 30, minutes: 52 },
    { day: '周三', words: 22, minutes: 38 },
    { day: '周四', words: 28, minutes: 48 },
    { day: '周五', words: 35, minutes: 60 },
    { day: '周六', words: 40, minutes: 70 },
    { day: '周日', words: 18, minutes: 32 }
  ],
  monthlyProgress: [
    { week: '第1周', mastered: 45 },
    { week: '第2周', mastered: 62 },
    { week: '第3周', mastered: 78 },
    { week: '第4周', mastered: 95 }
  ]
}

// 成就徽章
export const achievements = [
  {
    id: 1,
    name: '初学者',
    description: '完成第一次学习',
    icon: '🌱',
    unlocked: true,
    unlockedDate: '2024-01-15'
  },
  {
    id: 2,
    name: '坚持不懈',
    description: '连续学习7天',
    icon: '🔥',
    unlocked: true,
    unlockedDate: '2024-01-22'
  },
  {
    id: 3,
    name: '词汇达人',
    description: '掌握100个单词',
    icon: '📚',
    unlocked: true,
    unlockedDate: '2024-02-01'
  },
  {
    id: 4,
    name: '学霸',
    description: '单次测试正确率100%',
    icon: '🏆',
    unlocked: true,
    unlockedDate: '2024-02-10'
  },
  {
    id: 5,
    name: '月度冠军',
    description: '连续学习30天',
    icon: '👑',
    unlocked: false,
    progress: 50
  },
  {
    id: 6,
    name: '词汇大师',
    description: '掌握500个单词',
    icon: '🎓',
    unlocked: false,
    progress: 64
  },
  {
    id: 7,
    name: '速度之星',
    description: '5分钟内完成20道题',
    icon: '⚡',
    unlocked: false,
    progress: 0
  },
  {
    id: 8,
    name: '收藏家',
    description: '收藏50个单词',
    icon: '⭐',
    unlocked: false,
    progress: 30
  }
]

// 课程数据
export const courses = [
  { id: 1, name: '日常英语', level: '初级', progress: 75, totalWords: 200 },
  { id: 2, name: '商务英语', level: '中级', progress: 45, totalWords: 300 },
  { id: 3, name: '学术英语', level: '高级', progress: 20, totalWords: 400 },
  { id: 4, name: 'GRE词汇', level: '高级', progress: 10, totalWords: 500 }
]
