import React, { useState, memo } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Progress,
  Icon,
  Heading,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Skeleton,
  useBreakpointValue,
  Tooltip,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  FiTrendingUp,
  FiBook,
  FiAward,
  FiClock,
  FiTarget,
  FiCalendar,
  FiZap,
  FiStar,
  FiCheckCircle,
  FiLock,
} from 'react-icons/fi'
import { userProgress, achievements } from '../data/mockData'

// 统计卡片
const StatCard = memo(({ icon, label, value, subValue, trend, color }) => (
  <Card bg="white" boxShadow="md" borderRadius="xl">
    <CardBody p={4}>
      <HStack spacing={4}>
        <Flex
          w={12}
          h={12}
          borderRadius="xl"
          bg={`${color}.100`}
          align="center"
          justify="center"
        >
          <Icon as={icon} boxSize={6} color={`${color}.500`} />
        </Flex>
        <Box flex={1}>
          <Text fontSize="xs" color="gray.500" fontWeight="medium">{label}</Text>
          <HStack align="baseline" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {value}
            </Text>
            {subValue && (
              <Text fontSize="sm" color="gray.500">{subValue}</Text>
            )}
          </HStack>
          {trend && (
            <HStack spacing={1}>
              <Icon
                as={FiTrendingUp}
                color="green.500"
                boxSize={3}
              />
              <Text fontSize="xs" color="green.500">
                +{trend}% 本周
              </Text>
            </HStack>
          )}
        </Box>
      </HStack>
    </CardBody>
  </Card>
))

StatCard.displayName = 'StatCard'

// 成就徽章
const AchievementBadge = memo(({ achievement }) => (
  <Tooltip
    label={
      <Box p={2}>
        <Text fontWeight="bold">{achievement.name}</Text>
        <Text fontSize="sm">{achievement.description}</Text>
        {achievement.unlocked && (
          <Text fontSize="xs" color="gray.300" mt={1}>
            解锁于 {achievement.unlockedDate}
          </Text>
        )}
        {!achievement.unlocked && achievement.progress !== undefined && (
          <Text fontSize="xs" color="gray.300" mt={1}>
            进度: {achievement.progress}%
          </Text>
        )}
      </Box>
    }
    placement="top"
    hasArrow
  >
    <Card
      bg={achievement.unlocked ? 'white' : 'gray.100'}
      boxShadow={achievement.unlocked ? 'md' : 'none'}
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      opacity={achievement.unlocked ? 1 : 0.7}
      transition="all 0.2s"
      _hover={{ transform: achievement.unlocked ? 'scale(1.05)' : 'none' }}
      cursor="pointer"
    >
      <CardBody p={4} textAlign="center">
        <Text fontSize="3xl" mb={2}>{achievement.icon}</Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.700" noOfLines={1}>
          {achievement.name}
        </Text>
        {!achievement.unlocked && (
          <>
            <Icon
              as={FiLock}
              position="absolute"
              top={2}
              right={2}
              color="gray.400"
            />
            {achievement.progress !== undefined && (
              <Progress
                value={achievement.progress}
                size="xs"
                colorScheme="brand"
                borderRadius="full"
                mt={2}
              />
            )}
          </>
        )}
        {achievement.unlocked && (
          <Icon
            as={FiCheckCircle}
            position="absolute"
            top={2}
            right={2}
            color="green.500"
          />
        )}
      </CardBody>
    </Card>
  </Tooltip>
))

AchievementBadge.displayName = 'AchievementBadge'

// 日历热力图
const CalendarHeatmap = memo(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const weeks = 12 // 显示最近12周

  // 生成模拟数据
  const generateHeatmapData = () => {
    const data = []
    const today = new Date()

    for (let week = weeks - 1; week >= 0; week--) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (week * 7 + (6 - day)))

        // 随机生成学习数据
        const intensity = Math.random()
        let level = 0
        if (intensity > 0.8) level = 4
        else if (intensity > 0.6) level = 3
        else if (intensity > 0.4) level = 2
        else if (intensity > 0.2) level = 1

        data.push({
          date: date.toISOString().split('T')[0],
          level,
          words: Math.floor(Math.random() * 50),
        })
      }
    }
    return data
  }

  const heatmapData = generateHeatmapData()

  const getColor = (level) => {
    const colors = [
      'gray.100',
      'green.100',
      'green.300',
      'green.500',
      'green.700',
    ]
    return colors[level] || colors[0]
  }

  return (
    <VStack spacing={2} align="stretch">
      <HStack spacing={1} justify="flex-end" pr={2}>
        {days.map((day) => (
          <Text key={day} fontSize="xs" color="gray.400" w={4} textAlign="center">
            {day}
          </Text>
        ))}
      </HStack>

      <Flex gap={1} flexWrap="wrap" justify="flex-end">
        {heatmapData.map((item, index) => (
          <Tooltip
            key={index}
            label={`${item.date}: ${item.words} 个单词`}
            placement="top"
            hasArrow
          >
            <Box
              w={4}
              h={4}
              borderRadius="sm"
              bg={getColor(item.level)}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: 'scale(1.2)' }}
            />
          </Tooltip>
        ))}
      </Flex>

      <HStack justify="flex-end" spacing={2} mt={2}>
        <Text fontSize="xs" color="gray.400">少</Text>
        {[0, 1, 2, 3, 4].map((level) => (
          <Box
            key={level}
            w={3}
            h={3}
            borderRadius="sm"
            bg={getColor(level)}
          />
        ))}
        <Text fontSize="xs" color="gray.400">多</Text>
      </HStack>
    </VStack>
  )
})

CalendarHeatmap.displayName = 'CalendarHeatmap'

// 主进度页面
const ProgressPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useBreakpointValue({ base: true, md: false })

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // 词汇掌握度分布数据
  const vocabularyData = [
    { name: '已掌握', value: userProgress.masteredWords, color: '#38A169' },
    { name: '学习中', value: userProgress.learningWords, color: '#3182CE' },
    { name: '未学习', value: userProgress.newWords, color: '#E2E8F0' },
  ]

  if (isLoading) {
    return (
      <VStack spacing={6} w="full">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} h="100px" borderRadius="xl" />
          ))}
        </SimpleGrid>
        <Skeleton h="300px" w="full" borderRadius="2xl" />
      </VStack>
    )
  }

  return (
    <VStack spacing={6} w="full" align="stretch">
      {/* 顶部统计 */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <StatCard
          icon={FiZap}
          label="连续学习"
          value={userProgress.streak}
          subValue="天"
          color="orange"
        />
        <StatCard
          icon={FiBook}
          label="已掌握单词"
          value={userProgress.masteredWords}
          trend={12}
          color="green"
        />
        <StatCard
          icon={FiClock}
          label="总学习时长"
          value={Math.floor(userProgress.totalMinutes / 60)}
          subValue="小时"
          color="purple"
        />
        <StatCard
          icon={FiTarget}
          label="平均正确率"
          value={`${userProgress.averageAccuracy}%`}
          trend={5}
          color="brand"
        />
      </SimpleGrid>

      {/* 数据可视化标签页 */}
      <Card bg="white" boxShadow="md" borderRadius="2xl">
        <Tabs colorScheme="brand" variant="soft-rounded">
          <CardHeader pb={0}>
            <TabList gap={2} flexWrap="wrap">
              <Tab borderRadius="full" fontSize="sm">周统计</Tab>
              <Tab borderRadius="full" fontSize="sm">词汇分布</Tab>
              <Tab borderRadius="full" fontSize="sm">学习日历</Tab>
            </TabList>
          </CardHeader>

          <CardBody>
            <TabPanels>
              {/* 周统计图表 */}
              <TabPanel p={0} pt={4}>
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" fontWeight="medium" color="gray.600">
                    本周学习情况
                  </Text>
                  <Box h="250px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userProgress.weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                        <Bar
                          dataKey="words"
                          fill="#3182CE"
                          radius={[8, 8, 0, 0]}
                          name="单词数"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>

                  <Divider />

                  <Text fontSize="sm" fontWeight="medium" color="gray.600">
                    学习时长趋势
                  </Text>
                  <Box h="200px">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userProgress.weeklyData}>
                        <defs>
                          <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38A169" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#38A169" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="minutes"
                          stroke="#38A169"
                          strokeWidth={2}
                          fill="url(#colorMinutes)"
                          name="分钟"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </VStack>
              </TabPanel>

              {/* 词汇分布饼图 */}
              <TabPanel p={0} pt={4}>
                <HStack spacing={8} align="center" justify="center" flexWrap="wrap">
                  <Box h="250px" w="250px">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vocabularyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {vocabularyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>

                  <VStack align="start" spacing={4}>
                    <Text fontSize="lg" fontWeight="bold">
                      总词汇量: {userProgress.totalWords}
                    </Text>
                    {vocabularyData.map((item) => (
                      <HStack key={item.name} spacing={3}>
                        <Box w={4} h={4} borderRadius="md" bg={item.color} />
                        <Text fontWeight="medium">{item.name}</Text>
                        <Badge colorScheme="gray">{item.value}</Badge>
                      </HStack>
                    ))}
                  </VStack>
                </HStack>
              </TabPanel>

              {/* 学习日历 */}
              <TabPanel p={0} pt={4}>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">
                      最近12周学习记录
                    </Text>
                    <Badge colorScheme="green">
                      🔥 连续 {userProgress.streak} 天
                    </Badge>
                  </HStack>
                  <CalendarHeatmap />
                </VStack>
              </TabPanel>
            </TabPanels>
          </CardBody>
        </Tabs>
      </Card>

      {/* 成就系统 */}
      <Card bg="white" boxShadow="md" borderRadius="2xl">
        <CardHeader>
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Icon as={FiAward} color="yellow.500" boxSize={5} />
              <Heading size="md">成就徽章</Heading>
            </HStack>
            <Badge colorScheme="yellow">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </Badge>
          </HStack>
        </CardHeader>
        <CardBody pt={0}>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* 月度进展 */}
      <Card bg="white" boxShadow="md" borderRadius="2xl">
        <CardHeader>
          <HStack spacing={2}>
            <Icon as={FiCalendar} color="brand.500" boxSize={5} />
            <Heading size="md">月度进展</Heading>
          </HStack>
        </CardHeader>
        <CardBody pt={0}>
          <Box h="200px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userProgress.monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                <Bar
                  dataKey="mastered"
                  fill="#38A169"
                  radius={[8, 8, 0, 0]}
                  name="掌握单词"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default memo(ProgressPage)
