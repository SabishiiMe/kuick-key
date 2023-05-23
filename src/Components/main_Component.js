import {
    Image, Box, Stack, Input, Button, Spacer, Flex, Table,
    Thead, Tbody, Tr, Th, TableContainer, Heading, useColorModeValue, InputGroup, InputLeftAddon
} from '@chakra-ui/react'
import data from "../table_Temp_Data.json"
import ColorModeButton from "./colorModeButton";
import LeaderBoardEntry from './leaderboard_Entry_Component';
import LeftPlayer from './player_Left_Component';
import { useState } from 'react';
import RightPlayer from './player_Right_Component';

// Title page component.
function MainComponent() {

    // Color Mode Variables
    const backgroundColor = useColorModeValue("white", "#1A202C")
    const titleTextImage = useColorModeValue("kuick_Key_Title.png", "kuick_Key_Title_DM.png")

    const sessionID = "5J1X"

    // States
    const [username, setUsername] = useState("No One")

    return (
        <Box className={"Main"} >
            {/* <Flex justifyContent={"center"} 
                  h={"100vh"}
                  border={"4px"}
                  overflow={"hidden"}
                  borderColor={"red.400"}>
                <LeftPlayer username={username} />
                <Box flex={3} className={"MiddleArea"}>
                    <Flex >
                    <Image src={"divider.png"} alt={"Background Image"} h={"100vh"} />
                    <Box boxShadow={"inner"}
                         bgImage={"game_Background2.png"} 
                         bgSize={"30em"}
                         p={"2%"}
                         w={"100%"}
                         >
                        <Stack align={"center"} textAlign={"center"}>
                            <Heading size={"4xl"} > Session ID: {sessionID}</Heading>
                            <Box className={"PlayerList"}
                                 background={backgroundColor}
                                 w={"90%"}
                                 h={"auto"}
                                 p={"1"}
                                 boxShadow={"inner"}
                                 border={"4px"}
                                 borderColor={"tomato"}
                                 borderRadius={"12px"}
                                 bgImage={"game_Background.png"} 
                                 bgSize={"30em"}
                                 >
                                <Heading textAlign={"left"}>
                                    Players
                                </Heading>
                            </Box>
                            <Box className={"Chat"}
                                 background={backgroundColor}
                                 w={"32%"}
                                 p={"1"}
                                 boxShadow={"inner"}
                                 border={"4px"}
                                 borderColor={"tomato"}
                                 borderRadius={"12px"}
                                 bgImage={"game_Background.png"} 
                                 bgSize={"30em"}>
                                    <Heading textAlign={"left"}>
                                        Chat
                                    </Heading>
                                    <Box className={"MessageArea"}>
                                        
                                    </Box>
                            </Box>
                        </Stack>
                    </Box>
                    <Image ml={"auto"} src={"divider.png"} alt={"Background Image"} h={"100vh"} />
                    </Flex>
                </Box>
                <RightPlayer username={"No One"} />
            </Flex> */}

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
                           maxLength={14}
                           _placeholder={{color: "red.400"}}
                           w={"sm"}
                           focusBorderColor={"red.400"} />
                    <Spacer/>
                    <Heading size={"md"} color={"tomato"}>Enter a 4 digit session number to join a session!</Heading>
                    <Input placeholder={"Session Number"}
                            color={"tomato"}
                            type={"text"}
                            pattern={"\d*"}
                            maxLength={4}
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