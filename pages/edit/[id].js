import {useRouter} from "next/router";
import { Flex, Spacer, Text, Box, Button, Input  } from "@chakra-ui/react"
import service from "../../util/api";
import {error} from "next/dist/build/output/log";
import {useState} from "react";

export default function id() {
  const router = useRouter()

  const [name,setName] = useState('')

  const updateP = () => {
    service.post(`/api/edit_party?token=${router.query.id}`,{
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
        >编辑派对</Text>
        <Input
          borderColor='grey'
          marginBottom='30px'
          placeholder='派对名称'
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          w='100%'
          colorScheme="twitter"
          marginBottom='20px'
          onClick={updateP}
        >更新派對</Button>
      </Flex>
    </Flex>
  )
}