import React, { useState, useCallback, useEffect } from 'react'
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  IconButton,
  Progress,
  Badge,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Divider,
} from '@chakra-ui/react'
import {
  FiHome,
  FiBook,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiBell,
  FiUser
} from 'react-icons/fi'
import HomePage from './components/HomePage'
import PracticePage from './components/PracticePage'
import ProgressPage from './components/ProgressPage'
import SettingsPage from './components/SettingsPage'
import { courses, userProgress } from './data/mockData'

const App = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [currentCourse, setCurrentCourse] = useState(courses[0])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('white', 'gray.800')
  const tabBarBg = useColorModeValue('white', 'gray.800')

  const isMobile = useBreakpointValue({ base: true, md: false })
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  // 保存学习进度到本地存储
  useEffect(() => {
    const savedProgress = localStorage.getItem('lingolearn_progress')
    if (savedProgress) {
      // 可以在这里恢复保存的进度
    }
  }, [])

  const saveProgress = useCallback(() => {
    localStorage.setItem('lingolearn_progress', JSON.stringify({
      lastActive: new Date().toISOString(),
      activeTab,
      currentCourse: currentCourse.id
    }))
  }, [activeTab, currentCourse])

  useEffect(() => {
    saveProgress()
  }, [saveProgress])

  const tabs = [
    { id: 'home', label: '首页', icon: FiHome },
    { id: 'practice', label: '练习', icon: FiBook },
    { id: 'progress', label: '进度', icon: FiBarChart2 },
    { id: 'settings', label: '设置', icon: FiSettings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage currentCourse={currentCourse} />
      case 'practice':
        return <PracticePage />
      case 'progress':
        return <ProgressPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage currentCourse={currentCourse} />
    }
  }

  // 侧边栏内容（平板和桌面）
  const SidebarContent = () => (
    <VStack spacing={0} align="stretch" h="full">
      <Flex p={4} align="center" gap={3}>
        <Box
          w={10}
          h={10}
          borderRadius="xl"
          bg="brand.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xl" fontWeight="bold" color="white">L</Text>
        </Box>
        <Text fontSize="xl" fontWeight="bold" color="brand.600">LingoLearn</Text>
      </Flex>

      <Divider />

      <VStack spacing={1} p={3} align="stretch" flex={1}>
        {tabs.map((tab) => (
          <Flex
            key={tab.id}
            align="center"
            gap={3}
            p={3}
            borderRadius="xl"
            cursor="pointer"
            bg={activeTab === tab.id ? 'brand.50' : 'transparent'}
            color={activeTab === tab.id ? 'brand.600' : 'gray.600'}
            fontWeight={activeTab === tab.id ? 'semibold' : 'normal'}
            _hover={{ bg: activeTab === tab.id ? 'brand.50' : 'gray.100' }}
            onClick={() => {
              setActiveTab(tab.id)
              onClose()
            }}
            transition="all 0.2s"
          >
            <Icon as={tab.icon} boxSize={5} />
            <Text>{tab.label}</Text>
            {tab.id === 'home' && (
              <Badge ml="auto" colorScheme="green" borderRadius="full">
                {userProgress.todayLearned}/{userProgress.todayGoal}
              </Badge>
            )}
          </Flex>
        ))}
      </VStack>

      <Divider />

      <Box p={4}>
        <Text fontSize="sm" color="gray.500" mb={2}>当前课程</Text>
        <Flex align="center" gap={3} p={3} bg="gray.50" borderRadius="xl">
          <Box w={8} h={8} borderRadius="lg" bg="accent.100" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="sm">📚</Text>
          </Box>
          <Box flex={1}>
            <Text fontSize="sm" fontWeight="medium">{currentCourse.name}</Text>
            <Text fontSize="xs" color="gray.500">{currentCourse.level}</Text>
          </Box>
          <Text fontSize="sm" fontWeight="bold" color="brand.500">{currentCourse.progress}%</Text>
        </Flex>
      </Box>

      <Divider />

      <Flex p={4} align="center" gap={3}>
        <Avatar size="sm" name="用户" bg="brand.500" />
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="medium">学习者</Text>
          <Text fontSize="xs" color="gray.500">已连续学习 {userProgress.streak} 天</Text>
        </Box>
      </Flex>
    </VStack>
  )

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* 移动端抽屉菜单 */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex>
        {/* 桌面端侧边栏 */}
        {isDesktop && (
          <Box
            w="280px"
            h="100vh"
            position="fixed"
            left={0}
            top={0}
            bg={headerBg}
            borderRightWidth="1px"
            borderColor="gray.200"
            overflowY="auto"
          >
            <SidebarContent />
          </Box>
        )}

        {/* 主内容区域 */}
        <Box
          flex={1}
          ml={isDesktop ? '280px' : 0}
          pb={isMobile ? '80px' : 0}
        >
          {/* 顶部导航栏 */}
          <Box
            as="header"
            position="sticky"
            top={0}
            zIndex={10}
            bg={headerBg}
            borderBottomWidth="1px"
            borderColor="gray.100"
            px={4}
            py={3}
          >
            <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
              <HStack spacing={3}>
                {!isDesktop && (
                  <IconButton
                    icon={<FiMenu />}
                    variant="ghost"
                    onClick={onOpen}
                    aria-label="菜单"
                    size="lg"
                  />
                )}
                {isMobile && (
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" color="brand.600">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {currentCourse.name} · {currentCourse.level}
                    </Text>
                  </Box>
                )}
              </HStack>

              <HStack spacing={2}>
                <Box
                  display={isMobile ? 'none' : 'block'}
                  w={{ md: '200px', lg: '300px' }}
                >
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    今日进度: {userProgress.todayLearned}/{userProgress.todayGoal} 个单词
                  </Text>
                  <Progress
                    value={(userProgress.todayLearned / userProgress.todayGoal) * 100}
                    size="sm"
                    colorScheme="brand"
                    borderRadius="full"
                  />
                </Box>
                <IconButton
                  icon={<FiBell />}
                  variant="ghost"
                  aria-label="通知"
                  size="lg"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={2}
                    right={2}
                    w={2}
                    h={2}
                    bg="red.500"
                    borderRadius="full"
                  />
                </IconButton>
                {!isMobile && (
                  <Avatar size="sm" name="用户" bg="brand.500" />
                )}
              </HStack>
            </Flex>
          </Box>

          {/* 页面内容 */}
          <Box
            maxW={isDesktop ? '1000px' : '100%'}
            mx="auto"
            p={{ base: 4, md: 6 }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Flex>

      {/* 移动端底部标签栏 */}
      {isMobile && (
        <Box
          as="nav"
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg={tabBarBg}
          borderTopWidth="1px"
          borderColor="gray.200"
          px={2}
          py={2}
          zIndex={10}
          boxShadow="0 -2px 10px rgba(0,0,0,0.05)"
        >
          <Flex justify="space-around" align="center">
            {tabs.map((tab) => (
              <Flex
                key={tab.id}
                direction="column"
                align="center"
                justify="center"
                flex={1}
                py={2}
                px={3}
                borderRadius="xl"
                cursor="pointer"
                bg={activeTab === tab.id ? 'brand.50' : 'transparent'}
                color={activeTab === tab.id ? 'brand.600' : 'gray.500'}
                transition="all 0.2s"
                _active={{ transform: 'scale(0.95)' }}
                onClick={() => setActiveTab(tab.id)}
                minH="56px"
              >
                <Icon
                  as={tab.icon}
                  boxSize={6}
                  mb={1}
                  transition="transform 0.2s"
                  transform={activeTab === tab.id ? 'scale(1.1)' : 'scale(1)'}
                />
                <Text
                  fontSize="xs"
                  fontWeight={activeTab === tab.id ? 'semibold' : 'normal'}
                >
                  {tab.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default App
