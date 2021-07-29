import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Flex, Spacer, Text, Box, Button, Input } from "@chakra-ui/react"
import service from "../../util/api";

export default function id () {
  const router = useRouter()
  const url = 'http://127.0.0.1:3000'
  const { id: pid = '' } = router.query

  const [party, setParty] = useState([])
  // const pid = useRouter().query.id
  const upEmo = (emoji, num) => {
    const data =
      service.post(`/api/edit_party?token=${party.token}`, { [emoji]: ++num }).then(res => {
        console.log(res)
        setParty(res.data)
      }).catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (pid) {
      let num = setInterval(() => {
        service.post(`/api/get_party?id=${pid}`).then(res => {
          setParty(res.data)

        }).catch(err => {
          clearInterval(num)
          console.error(err)
        })
      }, 1000)
    }
  }, [pid])

  return (
    <>
      {
        party && (
          <Flex
            h='100vh'
            justifyContent='center'
            alignItems='center'
            fontSize='40px'
            textAlign='center'
          >
            <Flex
              w='500px'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Text
                marginBottom='30px'
              >
                你的派對-{party.name}
              </Text>

              <Input
                aria-label='ceshi'
                isDisabled
                borderColor='grey'
                marginBottom='30px'
                value={url + router.asPath}
              />

              <Input
                aria-label='ceshi'
                isDisabled
                borderColor='grey'
                marginBottom='30px'
                value={url + `/edit/${party.token}`}
              />

              <Flex
                w='100%'
                justifyContent='space-evenly'
              >
                <Box
                  onClick={() => upEmo('happy', party.happy)}
                >
                  <Text>😊</Text>
                  <Text>{party.happy}</Text>
                </Box>
                <Box
                  onClick={() => upEmo('angry', party.angry)}
                >
                  <Text>😡</Text>
                  <Text>{party.angry}</Text>
                </Box>
                <Box
                  onClick={() => upEmo('sad', party.sad)}
                >
                  <Text>😰</Text>
                  <Text>{party.sad}</Text>
                </Box>
                <Box
                  onClick={() => upEmo('joy', party.joy)}
                >
                  <Text>😂</Text>
                  <Text>{party.joy}</Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        )
      }
    </>
  )
}