import React, { useState, useCallback, useRef, memo } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  IconButton,
  Button,
  Card,
  CardBody,
  Badge,
  Progress,
  Icon,
  useToast,
  Skeleton,
  SkeletonText,
  SimpleGrid,
  Tooltip,
  useBreakpointValue,
  ScaleFade,
  SlideFade,
} from '@chakra-ui/react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import {
  FiVolume2,
  FiHeart,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiRotateCcw,
  FiBookmark,
  FiStar,
  FiZap,
  FiTarget,
  FiClock,
  FiTrendingUp,
} from 'react-icons/fi'
import { wordsData, userProgress } from '../data/mockData'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

// 单词卡片组件
const WordCard = memo(({ word, isFlipped, onFlip, onFavorite, onMastered, onSpeak }) => {
  return (
    <Card
      w="full"
      h={{ base: '320px', md: '380px' }}
      bg={isFlipped ? 'accent.50' : 'white'}
      boxShadow="xl"
      borderRadius="2xl"
      cursor="pointer"
      onClick={onFlip}
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          /* 正面 - 英文单词 */
          <MotionBox
            key="front"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.3 }}
            position="absolute"
            w="full"
            h="full"
          >
            <CardBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={6}
              h="full"
            >
              <Badge
                position="absolute"
                top={4}
                left={4}
                colorScheme={word.difficulty === 'advanced' ? 'purple' : word.difficulty === 'intermediate' ? 'blue' : 'green'}
                borderRadius="full"
                px={3}
                py={1}
              >
                {word.difficulty === 'advanced' ? '高级' : word.difficulty === 'intermediate' ? '中级' : '初级'}
              </Badge>

              <HStack position="absolute" top={4} right={4} spacing={1}>
                <IconButton
                  icon={<FiHeart fill={word.favorite ? '#E53E3E' : 'none'} />}
                  variant="ghost"
                  colorScheme={word.favorite ? 'red' : 'gray'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFavorite()
                  }}
                  aria-label="收藏"
                />
                <IconButton
                  icon={<FiVolume2 />}
                  variant="ghost"
                  colorScheme="brand"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSpeak()
                  }}
                  aria-label="发音"
                />
              </HStack>

              <VStack spacing={4} textAlign="center">
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="bold"
                  color="gray.800"
                  letterSpacing="wide"
                >
                  {word.word}
                </Text>
                <Text fontSize="lg" color="gray.500" fontStyle="italic">
                  {word.phonetic}
                </Text>
                <Badge colorScheme="gray" fontSize="sm" px={3} py={1} borderRadius="full">
                  {word.partOfSpeech}
                </Badge>
              </VStack>

              <Text
                position="absolute"
                bottom={6}
                fontSize="sm"
                color="gray.400"
              >
                点击卡片查看释义
              </Text>
            </CardBody>
          </MotionBox>
        ) : (
          /* 背面 - 中文释义 */
          <MotionBox
            key="back"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.3 }}
            position="absolute"
            w="full"
            h="full"
          >
            <CardBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={6}
              h="full"
            >
              <VStack spacing={5} textAlign="center" maxW="90%">
                <Text
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="bold"
                  color="accent.700"
                >
                  {word.translation}
                </Text>

                <Box
                  bg="white"
                  p={4}
                  borderRadius="xl"
                  w="full"
                  boxShadow="sm"
                >
                  <Text fontSize="md" color="gray.700" fontStyle="italic" mb={2}>
                    "{word.example}"
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {word.exampleTranslation}
                  </Text>
                </Box>

                <HStack spacing={3} mt={4}>
                  <Button
                    leftIcon={<FiCheck />}
                    colorScheme="green"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMastered(true)
                    }}
                    borderRadius="full"
                  >
                    已掌握
                  </Button>
                  <Button
                    leftIcon={<FiRotateCcw />}
                    variant="outline"
                    colorScheme="orange"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMastered(false)
                    }}
                    borderRadius="full"
                  >
                    再复习
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </MotionBox>
        )}
      </AnimatePresence>
    </Card>
  )
})

WordCard.displayName = 'WordCard'

// 滑动容器组件
const SwipeableWordCards = ({ words, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [wordStates, setWordStates] = useState(
    words.reduce((acc, word) => ({
      ...acc,
      [word.id]: { favorite: word.favorite, mastered: word.mastered }
    }), {})
  )
  const [direction, setDirection] = useState(0)
  const toast = useToast()
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const currentWord = words[currentIndex]

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped)
  }, [isFlipped])

  const handleFavorite = useCallback(() => {
    setWordStates(prev => ({
      ...prev,
      [currentWord.id]: {
        ...prev[currentWord.id],
        favorite: !prev[currentWord.id].favorite
      }
    }))
    toast({
      title: wordStates[currentWord.id]?.favorite ? '已取消收藏' : '已添加收藏',
      status: 'success',
      duration: 1500,
      position: 'top',
    })
  }, [currentWord, wordStates, toast])

  const handleMastered = useCallback((mastered) => {
    setWordStates(prev => ({
      ...prev,
      [currentWord.id]: {
        ...prev[currentWord.id],
        mastered
      }
    }))

    toast({
      title: mastered ? '太棒了！继续加油！' : '没关系，多复习几次就会了！',
      status: mastered ? 'success' : 'info',
      duration: 1500,
      position: 'top',
    })

    // 自动切换到下一个单词
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        goToNext()
      } else {
        onComplete?.()
      }
    }, 500)
  }, [currentWord, currentIndex, words.length, toast, onComplete])

  const handleSpeak = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    } else {
      toast({
        title: '浏览器不支持语音功能',
        status: 'warning',
        duration: 2000,
      })
    }
  }, [currentWord, toast])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIsFlipped(false)
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  const goToNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setDirection(1)
      setIsFlipped(false)
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, words.length])

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      goToPrev()
    } else if (info.offset.x < -100) {
      goToNext()
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  }

  return (
    <VStack spacing={6} w="full">
      {/* 进度指示 */}
      <HStack w="full" justify="space-between" align="center" px={2}>
        <Text fontSize="sm" color="gray.500">
          {currentIndex + 1} / {words.length}
        </Text>
        <Progress
          value={((currentIndex + 1) / words.length) * 100}
          size="sm"
          colorScheme="brand"
          borderRadius="full"
          flex={1}
          mx={4}
        />
        <HStack spacing={1}>
          {words.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((_, idx) => {
            const actualIdx = Math.max(0, currentIndex - 2) + idx
            return (
              <Box
                key={actualIdx}
                w={actualIdx === currentIndex ? 3 : 2}
                h={actualIdx === currentIndex ? 3 : 2}
                borderRadius="full"
                bg={actualIdx === currentIndex ? 'brand.500' : actualIdx < currentIndex ? 'accent.400' : 'gray.300'}
                transition="all 0.2s"
              />
            )
          })}
        </HStack>
      </HStack>

      {/* 单词卡片区域 */}
      <Box
        ref={constraintsRef}
        w="full"
        h={{ base: '340px', md: '400px' }}
        position="relative"
        overflow="hidden"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <MotionBox
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            position="absolute"
            w="full"
            h="full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x, rotate, opacity }}
          >
            <WordCard
              word={{ ...currentWord, ...wordStates[currentWord.id] }}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              onFavorite={handleFavorite}
              onMastered={handleMastered}
              onSpeak={handleSpeak}
            />
          </MotionBox>
        </AnimatePresence>
      </Box>

      {/* 导航按钮 */}
      <HStack spacing={4} justify="center">
        <IconButton
          icon={<FiChevronLeft />}
          variant="outline"
          colorScheme="brand"
          size="lg"
          borderRadius="full"
          isDisabled={currentIndex === 0}
          onClick={goToPrev}
          aria-label="上一个"
          _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
        />
        <Button
          leftIcon={<FiVolume2 />}
          variant="solid"
          colorScheme="brand"
          size="lg"
          borderRadius="full"
          onClick={handleSpeak}
          px={6}
        >
          播放发音
        </Button>
        <IconButton
          icon={<FiChevronRight />}
          variant="outline"
          colorScheme="brand"
          size="lg"
          borderRadius="full"
          isDisabled={currentIndex === words.length - 1}
          onClick={goToNext}
          aria-label="下一个"
          _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
        />
      </HStack>
    </VStack>
  )
}

// 统计卡片组件
const StatCard = memo(({ icon, label, value, color, trend }) => (
  <Card
    bg="white"
    boxShadow="md"
    borderRadius="xl"
    overflow="hidden"
    transition="all 0.2s"
    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
  >
    <CardBody p={4}>
      <HStack spacing={3}>
        <Flex
          w={10}
          h={10}
          borderRadius="lg"
          bg={`${color}.100`}
          align="center"
          justify="center"
        >
          <Icon as={icon} boxSize={5} color={`${color}.500`} />
        </Flex>
        <Box flex={1}>
          <Text fontSize="xs" color="gray.500">{label}</Text>
          <HStack align="baseline">
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              {value}
            </Text>
            {trend && (
              <Badge colorScheme="green" fontSize="xs">
                +{trend}%
              </Badge>
            )}
          </HStack>
        </Box>
      </HStack>
    </CardBody>
  </Card>
))

StatCard.displayName = 'StatCard'

// 首页组件
const HomePage = ({ currentCourse }) => {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const toast = useToast()

  // 模拟加载
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleComplete = () => {
    toast({
      title: '🎉 恭喜完成今日学习！',
      description: '你已经学习了所有单词，真棒！',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  if (isLoading) {
    return (
      <VStack spacing={6} w="full">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} h="90px" borderRadius="xl" />
          ))}
        </SimpleGrid>
        <Skeleton h="400px" w="full" borderRadius="2xl" />
      </VStack>
    )
  }

  return (
    <VStack spacing={6} w="full" align="stretch">
      {/* 欢迎语和今日目标 */}
      <SlideFade in={!isLoading} offsetY={20}>
        <Card bg="gradient-to-r from-brand.500 to-brand.600" bgGradient="linear(to-r, brand.500, brand.600)" color="white" borderRadius="2xl" overflow="hidden">
          <CardBody p={5}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={2}>
                <Text fontSize="lg" fontWeight="semibold">
                  👋 欢迎回来！
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  今日目标：学习 {userProgress.todayGoal} 个单词
                </Text>
                <HStack mt={2}>
                  <Badge colorScheme="whiteAlpha" fontSize="sm" px={3} py={1}>
                    🔥 连续 {userProgress.streak} 天
                  </Badge>
                </HStack>
              </VStack>
              <VStack align="end">
                <Text fontSize="3xl" fontWeight="bold">
                  {userProgress.todayLearned}
                </Text>
                <Text fontSize="xs" opacity={0.8}>
                  已完成
                </Text>
              </VStack>
            </HStack>
            <Progress
              value={(userProgress.todayLearned / userProgress.todayGoal) * 100}
              size="sm"
              colorScheme="whiteAlpha"
              bg="whiteAlpha.300"
              borderRadius="full"
              mt={4}
            />
          </CardBody>
        </Card>
      </SlideFade>

      {/* 统计卡片 */}
      <ScaleFade in={!isLoading} initialScale={0.95}>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <StatCard
            icon={FiBookmark}
            label="已掌握"
            value={userProgress.masteredWords}
            color="accent"
            trend={12}
          />
          <StatCard
            icon={FiTarget}
            label="学习中"
            value={userProgress.learningWords}
            color="brand"
          />
          <StatCard
            icon={FiClock}
            label="学习时长"
            value={`${Math.floor(userProgress.totalMinutes / 60)}h`}
            color="purple"
          />
          <StatCard
            icon={FiTrendingUp}
            label="正确率"
            value={`${userProgress.averageAccuracy}%`}
            color="orange"
          />
        </SimpleGrid>
      </ScaleFade>

      {/* 单词学习卡片 */}
      <Box>
        <HStack justify="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            📖 今日单词
          </Text>
          <Button
            variant="ghost"
            size="sm"
            colorScheme="brand"
            rightIcon={<FiStar />}
          >
            查看收藏
          </Button>
        </HStack>

        <SwipeableWordCards
          words={wordsData}
          onComplete={handleComplete}
        />
      </Box>

      {/* 快速操作 */}
      <SimpleGrid columns={2} spacing={4}>
        <Button
          h="60px"
          bg="white"
          boxShadow="md"
          borderRadius="xl"
          leftIcon={<FiZap color="#F59E0B" />}
          justifyContent="flex-start"
          px={4}
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        >
          <VStack align="start" spacing={0} ml={2}>
            <Text fontSize="sm" fontWeight="semibold">快速复习</Text>
            <Text fontSize="xs" color="gray.500">5分钟速记</Text>
          </VStack>
        </Button>
        <Button
          h="60px"
          bg="white"
          boxShadow="md"
          borderRadius="xl"
          leftIcon={<Icon as={FiTarget} color="#8B5CF6" />}
          justifyContent="flex-start"
          px={4}
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        >
          <VStack align="start" spacing={0} ml={2}>
            <Text fontSize="sm" fontWeight="semibold">挑战模式</Text>
            <Text fontSize="xs" color="gray.500">限时测试</Text>
          </VStack>
        </Button>
      </SimpleGrid>
    </VStack>
  )
}

export default memo(HomePage)
