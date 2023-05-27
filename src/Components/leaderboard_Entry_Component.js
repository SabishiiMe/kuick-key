import { Tr, Td } from "@chakra-ui/react"


function LeaderBoardEntry(props) {

    const SX = props.Rank === 1 ? {
        textAlign: "center",
        fontWeight: "bold",
        color: props.userColor,
        textShadow: "1px 1px black"
    }
    : {
        textAlign: "center",
        fontWeight: "normal",
        color: props.userColor,
        textShadow: "1px 1px black"
    }

    return (
        <Tr>
            <Td sx={SX}>
                {props.Rank}
            </Td>
            <Td sx={SX}>
                {props.Username}
            </Td>
            <Td sx={SX}>
                {props.Score}
            </Td>
        </Tr>
)}

export default LeaderBoardEntry