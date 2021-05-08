import { useColorModeValue } from "@chakra-ui/react"

export default function useBorderColor() {
    return useColorModeValue("gray.400", "white");
}