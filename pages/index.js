import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

import service from '../util/api'

import { Flex, Text, Box, Button  } from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs";
import {useEffect, useState} from "react";

export default function Home() {
  const [parties, setParties] = useState([])
  const router = useRouter()
  useEffect(() => {
    service.get('/api/get_parties').then(res => {
      setParties(res.data)
    }).catch(err => {
      console.error(err)
    })
  },[])

  console.log(router)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Text
          fontSize="5xl"
          fontWeight="400"
          marginBottom='30px'
        >
          所有派對
        </Text>
        <Box
          marginBottom='23px'
        >
          {
            parties.map((item) => {
              return (
                <Flex
                  boxSize='border-box'
                  width='300px'
                  key={item.id}
                  border='2px solid #1DA1F2'
                  borderRadius='3px'
                  color='#1DA1F2'
                  padding='7px'
                  marginBottom='10px'
                  justifyContent='space-between'
                  alignItems='center'
                  onClick={()=> {
                    console.log(item.id)
                    router.push(`/party/${item.id}`)
                    }
                  }
                >
                  {item.name}<BsChevronRight/>
                </Flex>)
            })
          }
        </Box>

        <Flex
          flexDirection='column'
          justifyContent='space-evenly'
          alignItems='center'
          w='300px'
          h='140px'
          background='#eee'
        >
          <Text
            color='#1DA1F2'
          >新增一個派對</Text>
          <Button
            colorScheme="twitter"
            onClick={()=>{
              router.push('/new')
            }}
          >馬上新增</Button>
        </Flex>
      </Flex>
    </div>
  )
}