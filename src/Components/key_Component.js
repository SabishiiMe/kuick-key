import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"


function Key(props) {
   
    const textColor = useColorModeValue("white", "#1a202c")

    return (
    <Flex className={"KeyContainer"} 
         backgroundColor={"red.400"} 
         justifyContent={"center"}
         w={"75px"} 
         h={"75px"}
         mt={"5px"}
         >
        <Heading color={textColor}
                 size={"3xl"}
                 align={"center"}
                 textAlign={"center"} 
                 className={"KeyLetter"}>
            {props.letter}
        </Heading>
    </Flex>
)}

export default Key