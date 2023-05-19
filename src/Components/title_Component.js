import {
    Image, Box, Stack, Input, Button, Spacer, Flex, Table,
    Thead, Tbody, Tr, Th, Td, TableContainer, Heading, useColorModeValue
} from '@chakra-ui/react'
import data from "../table_Temp_Data.json"
import { useEffect, useState } from "react"
import ColorModeButton from "./colorModeButton";

// Title page component.
function TitleComponent() {

    // Color Mode Variables
    const backgroundColor = useColorModeValue("white", "#1A202C")
    const titleTextImage = useColorModeValue("kuick_Key_Title.png", "kuick_Key_Title_DM.png")
    const darkmode = useColorModeValue(false, true)

    const topSX = !darkmode ? {
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
        textShadow: "1px 1px black"
    }
    : {
            textAlign: "center",
            fontWeight: "bold",
            color: "red",
    }

    const [leaderBoard, setUsers] = useState([])

    useEffect(() => {
        console.log(titleTextImage)
    }, [backgroundColor])

    return (
        <Box className={"Title"} >
            <Flex align={"center"} justifyContent={"center"} overflow={"hidden"}>
                <Spacer />
                <Box h={"100vh"}
                     overflow={"hidden"}>
                    <Image src={"title_Letters_Left.png"} alt={"Background Image"} h={"100%"} w={"855px"} />
                </Box>
                <Spacer/>
                <Stack align={"center"} >
                    <Box>
                        <Image src={titleTextImage} alt='Game Title Text' />
                    </Box>
                    <Spacer/>
                    <Heading size={"md"} color={"tomato"}>Enter a user name for the leaderboard!</Heading>
                    <Input placeholder={"Username"}
                           color={"tomato"}
                           _placeholder={{color: "red.400"}}
                           w={"sm"}
                           focusBorderColor={"red.400"} />
                    <Spacer/>
                    <Stack isInline>
                        <Button colorScheme={"red"} w={"2xs"}>
                            Find Game!
                        </Button>
                        <ColorModeButton />
                    </Stack>
                    <Spacer />
                    <TableContainer position={"absolute"}
                                    left={"20%"}
                                    top={"30%"}
                                    background={backgroundColor}
                                    border={"4px"}
                                    p={"5"}
                                    boxShadow={"dark-lg"}
                                    borderColor={"tomato"}
                                    borderRadius={"12px"}>
                        <Heading size={"lg"}
                                 textAlign={"center"}
                                 color={"tomato"}>Current Top Players</Heading>
                        <Table variant={"striped"}
                               size={"md"}
                               colorScheme={"red"}>
                            <Thead>
                                <Tr>
                                    <Th>Rank</Th>
                                    <Th>UserName</Th>
                                    <Th>Score</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <tr>
                                    <Td sx={topSX}>
                                        {data[0].Rank}
                                    </Td>
                                    <Td sx={topSX}>
                                        {data[0].Username}
                                    </Td>
                                    <Td sx={topSX}>
                                        {data[0].Score}
                                    </Td>
                                </tr>
                                <tr>
                                    <Td textAlign={"Center"}>
                                        {data[1].Rank}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[1].Username}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[1].Score}
                                    </Td>
                                </tr>
                                <tr>
                                    <Td textAlign={"Center"}>
                                        {data[2].Rank}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[2].Username}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[2].Score}
                                    </Td>
                                </tr>
                                <tr>
                                    <Td textAlign={"Center"}>
                                        {data[3].Rank}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[3].Username}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[3].Score}
                                    </Td>
                                </tr>
                                <tr>
                                    <Td textAlign={"Center"}>
                                        {data[4].Rank}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[4].Username}
                                    </Td>
                                    <Td textAlign={"Center"}>
                                        {data[4].Score}
                                    </Td>
                                </tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Spacer />
                <Spacer />
            </Flex>
            <Box position={"fixed"}
                 m={1}
                 bottom={0}
                 left={0}>
                V0.1.0
            </Box>
        </Box>
    )}

export default TitleComponent