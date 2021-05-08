import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

export const ErrorDisplay = ({errorMessage}: { errorMessage: string }) => (
    <Box my={4}>
        <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
    </Box>
)