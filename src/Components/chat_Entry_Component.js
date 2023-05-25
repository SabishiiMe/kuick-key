import { Stack, Text, useColorModeValue } from "@chakra-ui/react"


function ChatEntry(props) {
    const backgroundColor = useColorModeValue("white", "#1A202C")
    const defaultTextColor = useColorModeValue("#1A202C", "white")

    return (
        <Stack isInline className={"ChatEntry"}
             backgroundColor={backgroundColor}
             opacity={"0.8"}
             textAlign={"left"}
             pl={"1%"}
             >
            <Text color={props.userColor ? props.userColor : defaultTextColor} 
                fontWeight={"bold"}>{props.username ? props.username : "No One"}:
            </Text>
            <Text>{props.message}</Text>
        </Stack>
)}

export default ChatEntry