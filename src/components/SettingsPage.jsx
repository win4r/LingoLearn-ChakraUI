import React, { useState, memo } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Avatar,
  Icon,
  IconButton,
  Heading,
  Divider,
  Badge,
  useColorMode,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Progress,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import {
  FiUser,
  FiBell,
  FiCheck,
  FiDroplet,
  FiMoon,
  FiSun,
  FiVolume2,
  FiGlobe,
  FiShield,
  FiTrash2,
  FiDownload,
  FiLogOut,
  FiChevronRight,
  FiEdit2,
  FiClock,
  FiTarget,
  FiBookOpen,
  FiInfo,
  FiHelpCircle,
  FiMail,
  FiStar,
} from 'react-icons/fi'
import { userProgress } from '../data/mockData'
import { useAppTheme } from '../AppThemeProvider'

// 设置项组件
const SettingItem = memo(({ icon, label, description, children, onClick }) => (
  <HStack
    py={4}
    spacing={4}
    cursor={onClick ? 'pointer' : 'default'}
    onClick={onClick}
    _hover={onClick ? { bg: 'app.hoverBg' } : {}}
    transition="all 0.2s"
    borderRadius="lg"
    px={2}
    mx={-2}
  >
    <Flex
      w={10}
      h={10}
      borderRadius="lg"
      bg="app.surfaceMuted"
      align="center"
      justify="center"
    >
      <Icon as={icon} boxSize={5} color="app.navText" />
    </Flex>
    <Box flex={1}>
      <Text fontWeight="medium">{label}</Text>
      {description && (
        <Text fontSize="sm" color="app.textMuted">{description}</Text>
      )}
    </Box>
    {children || (onClick && <Icon as={FiChevronRight} color="gray.400" />)}
  </HStack>
))

SettingItem.displayName = 'SettingItem'

const ThemeOptionCard = memo(({ option, isSelected, onSelect }) => (
  <Button
    type="button"
    h="auto"
    minH="76px"
    p={3}
    justifyContent="flex-start"
    variant="outline"
    borderRadius="lg"
    borderColor={isSelected ? 'brand.500' : 'app.border'}
    bg={isSelected ? 'app.activeBg' : 'app.surface'}
    whiteSpace="normal"
    aria-pressed={isSelected}
    onClick={() => onSelect(option.id)}
    _hover={{
      borderColor: 'brand.400',
      bg: isSelected ? 'app.activeBg' : 'app.hoverBg',
    }}
  >
    <HStack spacing={3} w="full" align="center">
      <HStack spacing={1} flexShrink={0}>
        {option.swatches.map((color) => (
          <Box
            key={color}
            w={4}
            h={4}
            borderRadius="full"
            bg={color}
            borderWidth="1px"
            borderColor="whiteAlpha.700"
            boxShadow="inset 0 0 0 1px rgba(0,0,0,0.08)"
          />
        ))}
      </HStack>
      <Box flex={1} textAlign="left">
        <Text fontSize="sm" fontWeight="bold" color="app.text">
          {option.name}
        </Text>
        <Text fontSize="xs" color="app.textMuted" noOfLines={2}>
          {option.description}
        </Text>
      </Box>
      {isSelected && (
        <Icon as={FiCheck} boxSize={5} color="brand.600" flexShrink={0} />
      )}
    </HStack>
  </Button>
))

ThemeOptionCard.displayName = 'ThemeOptionCard'

// 用户资料编辑模态框
const ProfileEditModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('学习者')
  const [email, setEmail] = useState('learner@example.com')
  const toast = useToast()

  const handleSave = () => {
    toast({
      title: '资料已更新',
      status: 'success',
      duration: 2000,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={4} borderRadius="2xl">
        <ModalHeader>编辑资料</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Flex justify="center" w="full">
              <Avatar size="xl" name={name} bg="brand.500" />
            </Flex>
            <FormControl>
              <FormLabel>昵称</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                borderRadius="xl"
              />
            </FormControl>
            <FormControl>
              <FormLabel>邮箱</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderRadius="xl"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button colorScheme="brand" onClick={handleSave} borderRadius="xl">
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// 主设置页面
const SettingsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { activeTheme, setThemeId, themeId, themeOptions } = useAppTheme()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose
  } = useDisclosure()
  const cancelRef = React.useRef()

  // 设置状态
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    vibration: true,
    autoPlay: false,
    dailyReminder: true,
    reminderTime: '09:00',
    dailyGoal: 20,
    language: 'zh-CN',
    voiceSpeed: 0.8,
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast({
      title: '设置已更新',
      status: 'success',
      duration: 1500,
      position: 'top',
    })
  }

  const handleThemeChange = (nextThemeId) => {
    if (nextThemeId === themeId) {
      return
    }

    const nextTheme = themeOptions.find((option) => option.id === nextThemeId)

    setThemeId(nextThemeId)
    toast({
      title: '主题已切换',
      description: nextTheme?.name,
      status: 'success',
      duration: 1500,
      position: 'top',
    })
  }

  const handleLogout = () => {
    toast({
      title: '已退出登录',
      status: 'info',
      duration: 2000,
    })
    onLogoutClose()
  }

  const handleExportData = () => {
    toast({
      title: '数据导出中...',
      description: '导出完成后会通知您',
      status: 'info',
      duration: 2000,
    })
  }

  const handleClearData = () => {
    toast({
      title: '请谨慎操作',
      description: '此操作将清除所有学习记录',
      status: 'warning',
      duration: 3000,
    })
  }

  return (
    <VStack spacing={6} w="full" align="stretch">
      <ProfileEditModal isOpen={isOpen} onClose={onClose} />

      {/* 退出确认对话框 */}
      <AlertDialog
        isOpen={isLogoutOpen}
        leastDestructiveRef={cancelRef}
        onClose={onLogoutClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={4} borderRadius="2xl">
            <AlertDialogHeader>退出登录</AlertDialogHeader>
            <AlertDialogBody>
              确定要退出登录吗？您的学习进度已自动保存。
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button ref={cancelRef} onClick={onLogoutClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={handleLogout}>
                退出
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* 用户信息卡片 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl" overflow="hidden">
        <Box
          h="80px"
          bgGradient="linear(to-r, brand.400, brand.600)"
        />
        <CardBody pt={0}>
          <VStack spacing={4} align="center" mt="-40px">
            <Avatar
              size="xl"
              name="学习者"
              bg="brand.500"
              borderWidth="4px"
              borderColor="app.surface"
              boxShadow="lg"
            />
            <VStack spacing={1}>
              <HStack>
                <Text fontSize="xl" fontWeight="bold">学习者</Text>
                <IconButton
                  icon={<FiEdit2 />}
                  variant="ghost"
                  size="sm"
                  onClick={onOpen}
                  aria-label="编辑资料"
                />
              </HStack>
              <Text fontSize="sm" color="app.textMuted">learner@example.com</Text>
            </VStack>

            <HStack spacing={6} pt={2}>
              <VStack spacing={0}>
                <Text fontSize="xl" fontWeight="bold" color="brand.500">
                  {userProgress.streak}
                </Text>
                <Text fontSize="xs" color="app.textMuted">连续天数</Text>
              </VStack>
              <Divider orientation="vertical" h="40px" />
              <VStack spacing={0}>
                <Text fontSize="xl" fontWeight="bold" color="accent.500">
                  {userProgress.masteredWords}
                </Text>
                <Text fontSize="xs" color="app.textMuted">已掌握</Text>
              </VStack>
              <Divider orientation="vertical" h="40px" />
              <VStack spacing={0}>
                <Text fontSize="xl" fontWeight="bold" color="warm.500">
                  {Math.floor(userProgress.totalMinutes / 60)}h
                </Text>
                <Text fontSize="xs" color="app.textMuted">学习时长</Text>
              </VStack>
            </HStack>

            <Badge colorScheme="warm" fontSize="sm" px={4} py={1} borderRadius="full">
              🏅 高级学习者
            </Badge>
          </VStack>
        </CardBody>
      </Card>

      {/* 学习设置 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading size="md">学习设置</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            <SettingItem
              icon={FiTarget}
              label="每日目标"
              description={`每天学习 ${settings.dailyGoal} 个单词`}
            >
              <HStack spacing={3} w="150px">
                <Slider
                  value={settings.dailyGoal}
                  min={5}
                  max={50}
                  step={5}
                  onChange={(v) => updateSetting('dailyGoal', v)}
                  colorScheme="brand"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
                <Text fontWeight="bold" minW="30px">{settings.dailyGoal}</Text>
              </HStack>
            </SettingItem>

            <SettingItem
              icon={FiClock}
              label="提醒时间"
              description="每日学习提醒"
            >
              <Input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => updateSetting('reminderTime', e.target.value)}
                w="120px"
                size="sm"
                borderRadius="lg"
              />
            </SettingItem>

            <SettingItem
              icon={FiVolume2}
              label="语音速度"
              description="单词发音播放速度"
            >
              <HStack spacing={3} w="150px">
                <Slider
                  value={settings.voiceSpeed}
                  min={0.5}
                  max={1.5}
                  step={0.1}
                  onChange={(v) => updateSetting('voiceSpeed', v)}
                  colorScheme="brand"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
                <Text fontWeight="bold" minW="40px">{settings.voiceSpeed}x</Text>
              </HStack>
            </SettingItem>

            <SettingItem
              icon={FiBookOpen}
              label="自动播放发音"
              description="翻看单词时自动播放"
            >
              <Switch
                aria-label="自动播放发音"
                colorScheme="brand"
                isChecked={settings.autoPlay}
                onChange={(e) => updateSetting('autoPlay', e.target.checked)}
                size="lg"
              />
            </SettingItem>
          </VStack>
        </CardBody>
      </Card>

      {/* 通知设置 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading size="md">通知设置</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            <SettingItem
              icon={FiBell}
              label="推送通知"
              description="接收学习提醒和更新"
            >
              <Switch
                aria-label="推送通知"
                colorScheme="brand"
                isChecked={settings.notifications}
                onChange={(e) => updateSetting('notifications', e.target.checked)}
                size="lg"
              />
            </SettingItem>

            <SettingItem
              icon={FiVolume2}
              label="声音"
              description="操作音效"
            >
              <Switch
                aria-label="声音"
                colorScheme="brand"
                isChecked={settings.sound}
                onChange={(e) => updateSetting('sound', e.target.checked)}
                size="lg"
              />
            </SettingItem>

            <SettingItem
              icon={FiClock}
              label="每日提醒"
              description="每天定时提醒学习"
            >
              <Switch
                aria-label="每日提醒"
                colorScheme="brand"
                isChecked={settings.dailyReminder}
                onChange={(e) => updateSetting('dailyReminder', e.target.checked)}
                size="lg"
              />
            </SettingItem>
          </VStack>
        </CardBody>
      </Card>

      {/* 外观设置 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading size="md">外观设置</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            <SettingItem
              icon={colorMode === 'dark' ? FiMoon : FiSun}
              label="深色模式"
              description="护眼夜间模式"
            >
              <Switch
                aria-label="深色模式"
                colorScheme="brand"
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
                size="lg"
              />
            </SettingItem>

            <Box py={4}>
              <HStack spacing={4} align="flex-start">
                <Flex
                  w={10}
                  h={10}
                  borderRadius="lg"
                  bg="app.surfaceMuted"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={FiDroplet} boxSize={5} color="app.navText" />
                </Flex>
                <Box flex={1}>
                  <Text fontWeight="medium">主题色</Text>
                  <Text fontSize="sm" color="app.textMuted">
                    当前：{activeTheme.name}
                  </Text>
                  <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={3} mt={4}>
                    {themeOptions.map((option) => (
                      <ThemeOptionCard
                        key={option.id}
                        option={option}
                        isSelected={option.id === themeId}
                        onSelect={handleThemeChange}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* 通用设置 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading size="md">通用设置</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            <SettingItem
              icon={FiGlobe}
              label="语言"
              description="应用显示语言"
            >
              <Select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                w="120px"
                size="sm"
                borderRadius="lg"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
                <option value="ja-JP">日本語</option>
              </Select>
            </SettingItem>
          </VStack>
        </CardBody>
      </Card>

      {/* 数据管理 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading size="md">数据管理</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            <SettingItem
              icon={FiDownload}
              label="导出学习数据"
              description="下载您的学习记录"
              onClick={handleExportData}
            />

            <SettingItem
              icon={FiShield}
              label="隐私设置"
              description="管理您的隐私偏好"
              onClick={() => {}}
            />

            <SettingItem
              icon={FiTrash2}
              label="清除学习记录"
              description="删除所有本地数据"
              onClick={handleClearData}
            />
          </VStack>
        </CardBody>
      </Card>

      {/* 关于与帮助 */}
      <Card bg="app.surface" boxShadow="md" borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading size="md">关于与帮助</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            <SettingItem
              icon={FiHelpCircle}
              label="帮助中心"
              description="常见问题解答"
              onClick={() => {}}
            />

            <SettingItem
              icon={FiMail}
              label="联系我们"
              description="反馈问题或建议"
              onClick={() => {}}
            />

            <SettingItem
              icon={FiStar}
              label="给我们评分"
              description="您的支持是我们前进的动力"
              onClick={() => {}}
            />

            <SettingItem
              icon={FiInfo}
              label="关于"
              description="版本 1.0.0"
              onClick={() => {}}
            />
          </VStack>
        </CardBody>
      </Card>

      {/* 退出登录 */}
      <Button
        leftIcon={<FiLogOut />}
        colorScheme="red"
        variant="outline"
        size="lg"
        borderRadius="xl"
        onClick={onLogoutOpen}
      >
        退出登录
      </Button>

      {/* 底部版权信息 */}
      <VStack spacing={1} py={4}>
        <Text fontSize="sm" color="gray.400">LingoLearn © 2024</Text>
        <Text fontSize="xs" color="gray.400">让语言学习更简单</Text>
      </VStack>
    </VStack>
  )
}

export default memo(SettingsPage)
