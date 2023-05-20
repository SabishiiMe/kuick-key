import {
    Image, Box, Stack, Input, Button, Spacer, Flex, Table,
    Thead, Tbody, Tr, Th, TableContainer, Heading, useColorModeValue
} from '@chakra-ui/react'
import data from "../table_Temp_Data.json"
// import { useEffect, useState } from "react"
import ColorModeButton from "./colorModeButton";
import LeaderBoardEntry from './leaderboard_Entry_Component';

// Title page component.
function MainComponent() {

    // Color Mode Variables
    const backgroundColor = useColorModeValue("white", "#1A202C")
    const titleTextImage = useColorModeValue("kuick_Key_Title.png", "kuick_Key_Title_DM.png")

    // const [leaderBoard, setUsers] = useState([])

    // useEffect(() => {
        
    // }, [])

    return (
        <Box className={"Main"} >
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
                              {data.map((entry) => <LeaderBoardEntry Rank={entry.Rank} Username={entry.Username} Score={entry.Score} />)}
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

export default MainComponent