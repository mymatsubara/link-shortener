import {Heading, Link, Text} from "@chakra-ui/react"
import React from "react"

export default function MenuLogo() {
    return (
        <Link _hover={{textDecor: "none"}} href="/manage">
            <Heading fontSize="3xl" letterSpacing="3px">LINKU</Heading>
        </Link>
    )
}