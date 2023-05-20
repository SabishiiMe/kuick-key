import { Tr, Td } from "@chakra-ui/react"


function LeaderBoardEntry(props) {

    const SX = props.Rank === 1 ? {
        textAlign: "center",
        fontWeight: "bold",
    }
    : {
        textAlign: "center",
        fontWeight: "normal",
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