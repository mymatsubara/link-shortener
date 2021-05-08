import { ColorModeScript, useColorMode } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html style={{height:"100%"}}>
        <Head />
        <body >
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode="dark"/>
          <Main/>
          <NextScript />
        </body>
      </Html>
    )
  }
}
