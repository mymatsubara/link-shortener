import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode, IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'

export const DarkModeSwitch = (props: Omit<IconButtonProps, "aria-label">) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      position="fixed"
      bottom="1rem"
      right="1rem"
      color={isDark ? "yellow.500" : "gray.600" }
      onClick={toggleColorMode}
      aria-label="Change color mode"
      {... props}
    />
  )
}
