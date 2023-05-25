import {
    Image, Box, Stack, Input, Button, Spacer, Flex, Table,
    Thead, Tbody, Tr, Th, TableContainer, Heading, useColorModeValue
} from '@chakra-ui/react'
import data from "../table_Temp_Data.json"
import ColorModeButton from "./colorModeButton";
import LeaderBoardEntry from './leaderboard_Entry_Component';
import LeftPlayer from './player_Left_Component';
import React, { useState } from 'react';
import RightPlayer from './player_Right_Component';
import ChatEntry from './chat_Entry_Component';

import "../Styles/misc_Stylesheet.css"


// Main window component.
function MainComponent() {

    // Color Mode Variables
    const backgroundColor = useColorModeValue("white", "#1A202C")
    const titleTextImage = useColorModeValue("kuick_Key_Title.png", "kuick_Key_Title_DM.png")

    // States - User
    const [username, setUsername] = useState("No One")
    const [color, setUserColor] = useState("Black")
    const [message, updateMessage] = useState("") 
    const [session, setSession] = useState("0000")

    // States - Lists
    const [messageList, setMessageList] = useState([])
    // const [userList, setuserList] = useState([])

    // States - Other
    const [menuHidden, setMenuHidden] = useState(false)
    const [gameHidden, setGameHidden] = useState(true)


    /**
     * This function will update the window states and display the game window.
     */
    function LoadGameScreen() {

        setGameHidden(false)
        setMenuHidden(true)
    }


    /**
     * This function will update the window states and display the main menu.
     */
    function LoadMainMenuScreen() {

        setGameHidden(true)
        setMenuHidden(false)
    }

    /**
     * This function will halt the program for x number miliseconds.
     * @param {*} time 
     * @returns 
     */
    // function waitTime(time) {
    //     return new Promise(r => setTimeout(r, time))
    // }


    /**
     * This function will append new messages to the messages list
     * @param {*} message 
     */
    function AppendMessage(message) {

        // Clear input box
        document.getElementById("chatBox").value = ""

        // If number of messages is greater than 50, will start to remove them.
        if (messageList.length > 50)
        {
            const newMessageList = messageList
            newMessageList.shift()
            setMessageList(newMessageList)
        }

        // Append new message to message list.
        setMessageList((list) => [...list, message])
    }

    return (
        <Box position={"relative"} overflow={"hidden"} id={"Main"}>
            
            {/* Main Screen */}
            <Flex hidden={menuHidden}
                  align={"center"} 
                  justifyContent={"center"} 
                  overflow={"hidden"} 
                  id={"mainScreen"}>
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
                    <Heading size={"md"} color={"tomato"}>Enter a username, colour, and image for the leaderboard!</Heading>
                    <Stack isInline >
                        <Input placeholder={"Username"}
                            color={"tomato"}
                            maxLength={14}
                            _placeholder={{color: "red.400"}}
                            w={"150px"}
                            onChange={(e) => {setUsername(e.target.value)}}
                            focusBorderColor={"red.400"} />
                        <Input type={"color"} 
                               w={"70px"}
                               onChange={(e) => {setUserColor(e.target.value)}} />
                        <Input type={"file"} w={"auto"} />
                    </Stack>
                    <Spacer/>
                    <Heading size={"md"} color={"tomato"}>Enter a 4 digit session number to join a session!</Heading>
                    <Stack isInline >
                        <Input placeholder={"0"}
                                color={"tomato"}
                                type={"text"}
                                maxLength={1}
                                id={"sessionOne"}
                                _placeholder={{color: "red.400"}}
                                w={"45px"}
                                focusBorderColor={"red.400"}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value !== "" && e.target.value !== " ")
                                    { setSession(e.target.value + session.substring(1)) } else 
                                    { setSession("0" + session.substring(1)) }
                                }}
                                />
                        <Input placeholder={"0"}
                                color={"tomato"}
                                type={"text"}
                                maxLength={1}
                                id={"sessionTwo"}
                                _placeholder={{color: "red.400"}}
                                w={"45px"}
                                focusBorderColor={"red.400"} 
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value !== "" && e.target.value !== " ")
                                    { setSession(session.substring(0, 1) + e.target.value + session.substring(2)) } else
                                    { setSession(session.substring(0, 1) + "0" + session.substring(2)) }
                                }}
                                />
                        <Input placeholder={"0"}
                                color={"tomato"}
                                type={"text"}
                                id={"sessionThree"}
                                maxLength={1}
                                _placeholder={{color: "red.400"}}
                                w={"45px"}
                                focusBorderColor={"red.400"} 
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value !== "" && e.target.value !== " ")
                                    { setSession(session.substring(0, 2) + e.target.value + session.substring(3)) } else
                                    { setSession(session.substring(0, 2) + "0" + session.substring(3)) }
                                }}
                                />
                        <Input placeholder={"0"}
                                color={"tomato"}
                                id={"sessionFour"}
                                type={"text"}
                                maxLength={1}
                                _placeholder={{color: "red.400"}}
                                w={"45px"}
                                focusBorderColor={"red.400"} 
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value !== "" && e.target.value !== " ")
                                    { setSession(session.substring(0, 3) + e.target.value) } else
                                    { setSession(session.substring(0, 3) + "0") }
                                }}
                                />
                    </Stack>
                    <Spacer/>
                    <Stack isInline>
                        <Button colorScheme={"red"} 
                                w={"2xs"}
                                onClick={() => 
                                    { LoadGameScreen() }}
                                >
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

            {/* Game Screen */}
            <Flex hidden={gameHidden}
                  justifyContent={"center"} 
                  w={"100%"}
                  h={"100vh"}
                  id={"gameScreen"}
                  border={"4px"}
                  overflow={"hidden"}
                  borderColor={"red.400"}
                  >
                <LeftPlayer username={username} />
                <Box flex={3} className={"MiddleArea"}>
                    <Flex>
                        <Flex flexDirection={"column"} className={"LeftDivider"}>
                            <Image src={"divider.png"} alt={"Background Image"} h={"100vh"} />
                            <Image src={"divider.png"} alt={"Background Image"} h={"100vh"} />
                        </Flex>
                        <Box boxShadow={"inner"}
                            bgImage={"game_Background2.png"} 
                            bgSize={"30em"}
                            p={"2%"}
                            w={"100%"}
                            >
                            <Stack align={"center"} 
                                textAlign={"center"}
                                h={"100%"}>
                                <Heading size={"4xl"} > Session ID: {session}</Heading>
                                <Box className={"PlayerList"}
                                    background={backgroundColor}
                                    w={"90%"}
                                    h={"auto"}
                                    p={"1"}
                                    mb={"auto"}
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
                                    w={"100%"}
                                    h={"45vh"}
                                    bottom={0}
                                    overflowY={"auto"}
                                    overflowX={"hidden"}
                                    boxShadow={"inner"}
                                    border={"4px"}
                                    borderColor={"tomato"}
                                    borderRadius={"12px"}
                                    bgImage={"game_Background.png"} 
                                    bgSize={"30em"}>
                                        <Box id={"MessageArea"}
                                            h={"77%"}>
                                                {messageList.map((entry) => 
                                                {
                                                    return <ChatEntry userColor={color} username={username} message={entry} />
                                                }
                                                )}
                                        </Box>
                                </Box>
                                <Stack isInline w={"100%"}>
                                    <Input placeholder={"Type chat message"}
                                        id={"chatBox"}
                                        color={"tomato"}
                                        type={"text"}
                                        maxLength={50}
                                        _placeholder={{color: "red.400"}}
                                        w={"xs"}
                                        backgroundColor={"white"}
                                        focusBorderColor={"red.400"} 
                                        onChange={(e) => (updateMessage(e.target.value))}
                                        on
                                        />
                                    <Button colorScheme={"red"}
                                            onClick={ () => {AppendMessage(message)}} >
                                        Enter
                                    </Button>
                                    <ColorModeButton />
                                    <Button colorScheme={"red"}
                                            onClick={() => 
                                                { LoadMainMenuScreen() }}
                                    >
                                        Main Menu
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                        <Flex flexDirection={"column-reverse"} className={"RightDivider"}>
                            <Image src={"divider.png"} alt={"Background Image"} h={"100vh"} />
                            <Image src={"divider.png"} alt={"Background Image"} h={"100vh"} />
                        </Flex>
                    </Flex>
                </Box>
                <RightPlayer username={"No One"} />
            </Flex>

            {/* Loading Screen */}
            {/* <Box hidden={true}
                 id={"loadingScreen"}
                 className={""}
                 opacity={0}
                 position={"relative"}
                 w={"100%"}
                 h={"100%"}
                 >
                <Image src={"loading_Screen.png"} 
                       alt={"Background Image"} 
                       position={"absolute"} 
                       top={0} 
                       left={0}
                       w={"100%"}
                       h={"100%"}
                />
            </Box> */}

            {/* Version Number */}
            <Box position={"fixed"}
                 m={1}
                 bottom={"0.5%"}
                 left={"0.5%"}>
                V0.1.0
            </Box>
        </Box>
    )}
export default MainComponent