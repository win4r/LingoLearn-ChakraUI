import React, { useState, useCallback, useEffect, memo } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Progress,
  Icon,
  IconButton,
  useToast,
  Skeleton,
  SimpleGrid,
  Input,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Divider,
  useBreakpointValue,
  Collapse,
  ScaleFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlay,
  FiPause,
  FiCheck,
  FiX,
  FiVolume2,
  FiArrowRight,
  FiRefreshCw,
  FiAward,
  FiClock,
  FiZap,
  FiTarget,
  FiHelpCircle,
} from 'react-icons/fi'
import { practiceData } from '../data/mockData'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

// 选择题组件
const ChoiceQuestion = memo(({ question, onAnswer, showResult, selectedAnswer }) => {
  const [selected, setSelected] = useState(selectedAnswer)

  const handleSelect = (optionId) => {
    if (showResult) return
    setSelected(optionId)
    onAnswer(optionId)
  }

  const getOptionStyle = (optionId) => {
    if (!showResult) {
      return {
        borderColor: selected === optionId ? 'brand.500' : 'gray.200',
        bg: selected === optionId ? 'brand.50' : 'white',
      }
    }

    if (optionId === question.correctAnswer) {
      return {
        borderColor: 'green.500',
        bg: 'green.50',
      }
    }

    if (selected === optionId && optionId !== question.correctAnswer) {
      return {
        borderColor: 'red.500',
        bg: 'red.50',
      }
    }

    return {
      borderColor: 'gray.200',
      bg: 'gray.50',
      opacity: 0.6,
    }
  }

  return (
    <VStack spacing={4} w="full" align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="gray.800">
        {question.question}
      </Text>

      <VStack spacing={3} w="full">
        {question.options.map((option) => (
          <Box
            key={option.id}
            w="full"
            p={4}
            borderWidth="2px"
            borderRadius="xl"
            cursor={showResult ? 'default' : 'pointer'}
            transition="all 0.2s"
            _hover={!showResult ? { borderColor: 'brand.400', transform: 'scale(1.01)' } : {}}
            _active={!showResult ? { transform: 'scale(0.99)' } : {}}
            onClick={() => handleSelect(option.id)}
            {...getOptionStyle(option.id)}
          >
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Flex
                  w={8}
                  h={8}
                  borderRadius="lg"
                  bg={selected === option.id ? 'brand.500' : 'gray.100'}
                  color={selected === option.id ? 'white' : 'gray.600'}
                  align="center"
                  justify="center"
                  fontWeight="bold"
                  fontSize="sm"
                >
                  {option.id.toUpperCase()}
                </Flex>
                <Text fontWeight="medium">{option.text}</Text>
              </HStack>

              {showResult && option.id === question.correctAnswer && (
                <Icon as={FiCheck} color="green.500" boxSize={5} />
              )}
              {showResult && selected === option.id && option.id !== question.correctAnswer && (
                <Icon as={FiX} color="red.500" boxSize={5} />
              )}
            </HStack>
          </Box>
        ))}
      </VStack>

      <Collapse in={showResult}>
        <Alert
          status={selected === question.correctAnswer ? 'success' : 'warning'}
          borderRadius="xl"
          mt={2}
        >
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm">
              {selected === question.correctAnswer ? '回答正确！' : '回答错误'}
            </AlertTitle>
            <AlertDescription fontSize="sm">
              {question.explanation}
            </AlertDescription>
          </Box>
        </Alert>
      </Collapse>
    </VStack>
  )
})

ChoiceQuestion.displayName = 'ChoiceQuestion'

// 填空题组件
const FillBlankQuestion = memo(({ question, onAnswer, showResult }) => {
  const [answer, setAnswer] = useState('')
  const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase()

  const handleSubmit = () => {
    onAnswer(answer)
  }

  return (
    <VStack spacing={4} w="full" align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="gray.800">
        {question.question.split('_____')[0]}
        <Box
          as="span"
          display="inline-block"
          borderBottomWidth="2px"
          borderColor={showResult ? (isCorrect ? 'green.500' : 'red.500') : 'brand.500'}
          minW="120px"
          mx={1}
          textAlign="center"
        >
          {showResult ? (
            <Text
              as="span"
              color={isCorrect ? 'green.600' : 'red.600'}
              fontWeight="bold"
            >
              {answer || question.correctAnswer}
            </Text>
          ) : null}
        </Box>
        {question.question.split('_____')[1]}
      </Text>

      <HStack>
        <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
          提示：{question.hint}
        </Badge>
      </HStack>

      {!showResult && (
        <HStack spacing={3}>
          <Input
            placeholder="输入答案..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            size="lg"
            borderRadius="xl"
            focusBorderColor="brand.500"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button
            colorScheme="brand"
            size="lg"
            borderRadius="xl"
            onClick={handleSubmit}
            isDisabled={!answer.trim()}
            minW="100px"
          >
            确认
          </Button>
        </HStack>
      )}

      <Collapse in={showResult}>
        <Alert
          status={isCorrect ? 'success' : 'warning'}
          borderRadius="xl"
          mt={2}
        >
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm">
              {isCorrect ? '回答正确！' : '回答错误'}
            </AlertTitle>
            <AlertDescription fontSize="sm">
              正确答案是 <strong>{question.correctAnswer}</strong>。
              {question.explanation}
            </AlertDescription>
          </Box>
        </Alert>
      </Collapse>
    </VStack>
  )
})

FillBlankQuestion.displayName = 'FillBlankQuestion'

// 听力题组件
const ListeningQuestion = memo(({ question, onAnswer, showResult, selectedAnswer }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selected, setSelected] = useState(selectedAnswer)

  const handlePlay = () => {
    setIsPlaying(true)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question.audioWord)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setIsPlaying(false), 1000)
    }
  }

  const handleSelect = (optionId) => {
    if (showResult) return
    setSelected(optionId)
    onAnswer(optionId)
  }

  return (
    <VStack spacing={5} w="full" align="stretch">
      <VStack spacing={3}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          {question.question}
        </Text>

        <Button
          leftIcon={isPlaying ? <FiPause /> : <FiVolume2 />}
          colorScheme="brand"
          variant="outline"
          size="lg"
          borderRadius="full"
          onClick={handlePlay}
          isLoading={isPlaying}
          loadingText="播放中..."
          px={8}
        >
          {isPlaying ? '播放中...' : '播放音频'}
        </Button>
      </VStack>

      <SimpleGrid columns={2} spacing={3}>
        {question.options.map((option) => {
          const isCorrectOption = option.id === question.correctAnswer
          const isSelected = selected === option.id

          let bgColor = 'white'
          let borderColor = isSelected ? 'brand.500' : 'gray.200'

          if (showResult) {
            if (isCorrectOption) {
              bgColor = 'green.50'
              borderColor = 'green.500'
            } else if (isSelected) {
              bgColor = 'red.50'
              borderColor = 'red.500'
            }
          }

          return (
            <Box
              key={option.id}
              p={4}
              borderWidth="2px"
              borderRadius="xl"
              borderColor={borderColor}
              bg={bgColor}
              cursor={showResult ? 'default' : 'pointer'}
              transition="all 0.2s"
              _hover={!showResult ? { borderColor: 'brand.400' } : {}}
              onClick={() => handleSelect(option.id)}
              textAlign="center"
            >
              <Text fontWeight="medium">{option.text}</Text>
              {showResult && isCorrectOption && (
                <Icon as={FiCheck} color="green.500" mt={1} />
              )}
            </Box>
          )
        })}
      </SimpleGrid>

      <Collapse in={showResult}>
        <Alert
          status={selected === question.correctAnswer ? 'success' : 'warning'}
          borderRadius="xl"
        >
          <AlertIcon />
          <AlertDescription fontSize="sm">
            {question.explanation}
          </AlertDescription>
        </Alert>
      </Collapse>
    </VStack>
  )
})

ListeningQuestion.displayName = 'ListeningQuestion'

// 练习模式选择
const PracticeModeSelector = memo(({ onSelect }) => {
  const modes = [
    {
      id: 'quick',
      icon: FiZap,
      title: '快速练习',
      desc: '10道混合题目',
      time: '5分钟',
      color: 'orange',
    },
    {
      id: 'choice',
      icon: FiTarget,
      title: '选择题',
      desc: '单词释义匹配',
      time: '无限制',
      color: 'brand',
    },
    {
      id: 'fill',
      icon: FiHelpCircle,
      title: '填空题',
      desc: '根据语境填词',
      time: '无限制',
      color: 'purple',
    },
    {
      id: 'listening',
      icon: FiVolume2,
      title: '听力练习',
      desc: '听音辨词',
      time: '无限制',
      color: 'teal',
    },
  ]

  return (
    <VStack spacing={4} w="full">
      <Heading size="md" color="gray.700">选择练习模式</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
        {modes.map((mode) => (
          <MotionCard
            key={mode.id}
            bg="white"
            boxShadow="md"
            borderRadius="xl"
            overflow="hidden"
            cursor="pointer"
            onClick={() => onSelect(mode.id)}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <CardBody p={5}>
              <HStack spacing={4}>
                <Flex
                  w={14}
                  h={14}
                  borderRadius="xl"
                  bg={`${mode.color}.100`}
                  align="center"
                  justify="center"
                >
                  <Icon as={mode.icon} boxSize={7} color={`${mode.color}.500`} />
                </Flex>
                <Box flex={1}>
                  <Text fontWeight="bold" fontSize="lg">{mode.title}</Text>
                  <Text fontSize="sm" color="gray.500">{mode.desc}</Text>
                  <Badge colorScheme={mode.color} mt={2}>{mode.time}</Badge>
                </Box>
              </HStack>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>
    </VStack>
  )
})

PracticeModeSelector.displayName = 'PracticeModeSelector'

// 练习结果展示
const PracticeResult = memo(({ correct, total, onRestart, onBack }) => {
  const percentage = Math.round((correct / total) * 100)
  const getGrade = () => {
    if (percentage >= 90) return { text: '优秀', color: 'green', emoji: '🎉' }
    if (percentage >= 70) return { text: '良好', color: 'blue', emoji: '👍' }
    if (percentage >= 60) return { text: '及格', color: 'yellow', emoji: '😊' }
    return { text: '继续努力', color: 'red', emoji: '💪' }
  }

  const grade = getGrade()

  return (
    <ScaleFade in initialScale={0.9}>
      <Card bg="white" boxShadow="xl" borderRadius="2xl" overflow="hidden">
        <CardBody p={8} textAlign="center">
          <VStack spacing={6}>
            <Text fontSize="6xl">{grade.emoji}</Text>

            <CircularProgress
              value={percentage}
              size="150px"
              thickness="12px"
              color={`${grade.color}.500`}
              trackColor="gray.100"
            >
              <CircularProgressLabel>
                <VStack spacing={0}>
                  <Text fontSize="3xl" fontWeight="bold">{percentage}%</Text>
                  <Text fontSize="xs" color="gray.500">正确率</Text>
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>

            <VStack spacing={1}>
              <Badge colorScheme={grade.color} fontSize="lg" px={4} py={2} borderRadius="full">
                {grade.text}
              </Badge>
              <Text color="gray.600">
                答对 <strong>{correct}</strong> 题 / 共 <strong>{total}</strong> 题
              </Text>
            </VStack>

            <Divider />

            <HStack spacing={4}>
              <Button
                variant="outline"
                colorScheme="gray"
                size="lg"
                borderRadius="xl"
                onClick={onBack}
              >
                返回
              </Button>
              <Button
                leftIcon={<FiRefreshCw />}
                colorScheme="brand"
                size="lg"
                borderRadius="xl"
                onClick={onRestart}
              >
                再来一次
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </ScaleFade>
  )
})

PracticeResult.displayName = 'PracticeResult'

// 主练习页面
const PracticePage = () => {
  const [mode, setMode] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5分钟
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  // 倒计时
  useEffect(() => {
    if (mode === 'quick' && !isPaused && !isComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [mode, isPaused, isComplete, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startPractice = useCallback((selectedMode) => {
    setIsLoading(true)
    setMode(selectedMode)

    // 根据模式选择题目
    let selectedQuestions = []
    if (selectedMode === 'quick') {
      selectedQuestions = [
        ...practiceData.multipleChoice,
        ...practiceData.fillBlank,
        ...practiceData.listening
      ].sort(() => Math.random() - 0.5).slice(0, 10)
    } else if (selectedMode === 'choice') {
      selectedQuestions = practiceData.multipleChoice
    } else if (selectedMode === 'fill') {
      selectedQuestions = practiceData.fillBlank
    } else if (selectedMode === 'listening') {
      selectedQuestions = practiceData.listening
    }

    setTimeout(() => {
      setQuestions(selectedQuestions)
      setCurrentIndex(0)
      setAnswers({})
      setShowResult(false)
      setIsComplete(false)
      setTimeLeft(300)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleAnswer = useCallback((answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer
    }))
    setShowResult(true)
  }, [currentIndex])

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowResult(false)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, questions.length])

  const calculateScore = useCallback(() => {
    let correct = 0
    questions.forEach((q, index) => {
      const userAnswer = answers[index]
      if (q.type === 'fill') {
        if (userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase()) {
          correct++
        }
      } else if (userAnswer === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }, [questions, answers])

  const resetPractice = useCallback(() => {
    setMode(null)
    setQuestions([])
    setCurrentIndex(0)
    setAnswers({})
    setShowResult(false)
    setIsComplete(false)
    setTimeLeft(300)
  }, [])

  const currentQuestion = questions[currentIndex]

  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case 'choice':
        return (
          <ChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
            selectedAnswer={answers[currentIndex]}
          />
        )
      case 'fill':
        return (
          <FillBlankQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        )
      case 'listening':
        return (
          <ListeningQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
            selectedAnswer={answers[currentIndex]}
          />
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <VStack spacing={6} w="full">
        <Skeleton h="200px" w="full" borderRadius="2xl" />
        <Skeleton h="300px" w="full" borderRadius="2xl" />
      </VStack>
    )
  }

  // 模式选择界面
  if (!mode) {
    return <PracticeModeSelector onSelect={startPractice} />
  }

  // 完成界面
  if (isComplete) {
    return (
      <PracticeResult
        correct={calculateScore()}
        total={questions.length}
        onRestart={() => startPractice(mode)}
        onBack={resetPractice}
      />
    )
  }

  // 练习界面
  return (
    <VStack spacing={6} w="full">
      {/* 顶部信息栏 */}
      <Card bg="white" boxShadow="md" borderRadius="xl" w="full">
        <CardBody py={3} px={4}>
          <HStack justify="space-between">
            <HStack spacing={4}>
              <IconButton
                icon={<FiX />}
                variant="ghost"
                onClick={resetPractice}
                aria-label="退出"
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.500">
                  第 {currentIndex + 1} 题 / 共 {questions.length} 题
                </Text>
                <Progress
                  value={((currentIndex + 1) / questions.length) * 100}
                  size="xs"
                  colorScheme="brand"
                  borderRadius="full"
                  w="150px"
                />
              </VStack>
            </HStack>

            {mode === 'quick' && (
              <HStack>
                <Icon as={FiClock} color={timeLeft < 60 ? 'red.500' : 'gray.500'} />
                <Text
                  fontWeight="bold"
                  color={timeLeft < 60 ? 'red.500' : 'gray.700'}
                >
                  {formatTime(timeLeft)}
                </Text>
                <IconButton
                  icon={isPaused ? <FiPlay /> : <FiPause />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPaused(!isPaused)}
                  aria-label={isPaused ? '继续' : '暂停'}
                />
              </HStack>
            )}
          </HStack>
        </CardBody>
      </Card>

      {/* 题目卡片 */}
      <AnimatePresence mode="wait">
        <MotionCard
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          bg="white"
          boxShadow="lg"
          borderRadius="2xl"
          w="full"
        >
          <CardHeader pb={0}>
            <Badge
              colorScheme={
                currentQuestion?.type === 'choice' ? 'blue' :
                currentQuestion?.type === 'fill' ? 'purple' : 'teal'
              }
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
            >
              {currentQuestion?.type === 'choice' ? '选择题' :
               currentQuestion?.type === 'fill' ? '填空题' : '听力题'}
            </Badge>
          </CardHeader>
          <CardBody pt={4}>
            {renderQuestion()}

            {showResult && (
              <Button
                rightIcon={<FiArrowRight />}
                colorScheme="brand"
                size="lg"
                w="full"
                mt={6}
                borderRadius="xl"
                onClick={nextQuestion}
              >
                {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
              </Button>
            )}
          </CardBody>
        </MotionCard>
      </AnimatePresence>
    </VStack>
  )
}

export default memo(PracticePage)
