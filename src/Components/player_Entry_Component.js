import {  Box, Stack, Text, useColorModeValue } from "@chakra-ui/react"


function PlayerEntry(props) {

    const backgroundColor = useColorModeValue("white", "#1A202C")
    const defaultTextColor = useColorModeValue("#1A202C", "white")

    // Check if the player slot has been filled
    const userPresent = props.username ? false : true

    return (
        <Box w='100%' 
             h='7'
             bg={backgroundColor}
             opacity={"0.8"}
             >
                <Stack hidden={userPresent} ml={"5px"} isInline >
                    <Box mt={"auto"} bg={props.userColor ? props.userColor : defaultTextColor} w={2} h={5}></Box>
                    <Text>{props.username}</Text>
                </Stack>
        </Box>
)}

export default PlayerEntry