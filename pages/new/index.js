import {useEffect, useState} from "react";
import service from '../../util/api'

import { Flex, Text, Box, Button, Input  } from "@chakra-ui/react"
import {useRouter} from "next/router";
import {error} from "next/dist/build/output/log";

export default function handler(req) {

  const [name,setName] = useState('')
  const router = useRouter()

  const returnIndex = ()=> {
    router.push('/')
  }

  const newP = () => {
    service.post('/api/create_party',{
      name,
    }).then(res => {
      router.push(`/party/${res.data.id}`)
    }).catch(err => {
      error(err)
    })
  }

  return (
    <Flex
      h='100vh'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
    >
      <Flex
        w='350px'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Text
          fontSize="5xl"
          fontWeight="400"
          marginBottom='30px'
        >獲取派對連結</Text>
        <Input
          borderColor='grey'
          marginBottom='30px'
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          w='100%'
          colorScheme="twitter"
          marginBottom='20px'
          onClick={newP}
        >新增派對</Button>
        <Button
          w='100%'
          color='#1DA1F2'
          background='#fff'
          border='2px solid #1DA1F2'
          onClick={returnIndex}
        >返回</Button>
      </Flex>
    </Flex>
  )
}