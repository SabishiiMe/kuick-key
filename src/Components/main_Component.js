import {
    Image, Box, Stack, Input, Button, Spacer, Flex, Table,
    Thead, Tbody, Tr, Th, TableContainer, Heading, useColorModeValue, Grid, GridItem
} from '@chakra-ui/react'
import data from "../table_Temp_Data.json"
import ColorModeButton from "./colorModeButton"
import LeaderBoardEntry from './leaderboard_Entry_Component'
import LeftPlayer from './player_Left_Component'
import React, { useEffect, useState } from 'react'
import RightPlayer from './player_Right_Component'
import PlayerEntry from './player_Entry_Component'
import ChatEntry from './chat_Entry_Component'
import { io } from "socket.io-client"
import "../Styles/misc_Stylesheet.css" 

// Socket IO
// new socket for sicket IO
const serverURL = process.env.REACT_APP_SERVERURL
const socket = io(serverURL, {
    extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }
}).disconnect()

// Main window component.
function MainComponent() {

    // Color Mode Variables
    const backgroundColor = useColorModeValue("white", "#1A202C")
    const titleTextImage = useColorModeValue("kuick_Key_Title.png", "kuick_Key_Title_DM.png")

    // States - User
    const [username, setUsername] = useState("No One")
    const [color, setUserColor] = useState("")
    const [message, updateMessage] = useState("") 
    const [session, setSession] = useState("0000")

    // States - Lists
    const [messages, updateMessages] = useState([])
    const [players, setPlayerList] = useState([])

    // States - Other
    const [menuHidden, setMenuHidden] = useState(false)
    const [gameHidden, setGameHidden] = useState(true)
    const [leaderboard, setLeaderboard] = useState([])
    

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
     * This function will append new messages to the messages list
     * @param {*} message 
     */
    function CreateMessage(json) {

        // Clear input box
        document.getElementById("chatBox").value = ""

        updateMessages((list) => [...list, json])

        // Send message to socket server
        socket.emit("append-message", {username: json.username, color: json.color, message: json.message}, session)

        // Clear the message state
        updateMessage("")
    }

    /**
     * Is called when the player recieves a message from another player.
     * @param {*} json 
     */
    function ReceiveMessage(json) {

        // Append new message to message list.
        updateMessages((list) => [...list, json])
    }

    /**
     * This function is called when the player presses the find session button in the main menu.
     * It will join the player to the session defined on the menu screen.
     */
    function JoinSession() {
        socket.emit("join-session", session)
    }

    /**
     * This socket function will listen for message broadcasts from the client.
     * If it recieves one, updates the message list with the other users messages.
     */
    socket.off("broadcast-message").on("broadcast-message", json => {
        ReceiveMessage(json)
    })

    // Use effect when the component is first loaded
    useEffect(() => {
        fetch(serverURL + "/leaderboard", { mode: "cors", method: "GET"})
        .then((response) => response.json())
        .then((entries) => {
            entries.sort((a,b) => (a.rank - b.rank))
            setLeaderboard(entries)
        })
        

    }, [])

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
                                    { 
                                        socket.connect()
                                        // Clear any messages cached
                                        updateMessages([])

                                        // Join the player to the selected session
                                        JoinSession()

                                        // Switch to the game screen
                                        LoadGameScreen() 
                                    }}
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
                              {leaderboard.map((entry, index) => <LeaderBoardEntry userColor={entry.color} Rank={entry.rank} Username={entry.username} Score={entry.score} key={"leaderboardEntry" + index} />)}
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
                <LeftPlayer username={"No One"} />
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
                                    <Grid p={2}
                                          templateColumns={"repeat(3, 1fr)"} 
                                          templateRows={"repeat(3, 1fr)"} 
                                          gap={2}>
                                        <PlayerEntry id={"playerSlotOne"} />
                                        <PlayerEntry id={"playerSlotTwo"} />
                                        <PlayerEntry id={"playerSlotThree"} />
                                        <PlayerEntry id={"playerSlotFour"} />
                                        <PlayerEntry id={"playerSlotFive"} />
                                        <PlayerEntry id={"playerSlotSix"} />
                                        <PlayerEntry id={"playerSlotSeven"} />
                                        <PlayerEntry id={"playerSlotEight"} />
                                    </Grid>
                                </Box>
                                <Box className={"Chat"}
                                    background={backgroundColor}
                                    w={"33vw"}
                                    h={"45vh"}
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
                                               {
                                                messages.map((entry, index) => {
                                                    return <ChatEntry username={entry.username} userColor={entry.color} message={entry.message} pos={index} key={"message" + index} />
                                                })
                                               }
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
                                            onClick={ () => {
                                                if (message.length)
                                                {
                                                    CreateMessage({username: username, color: color, message: message})
                                                }
                                            }} >
                                        Enter
                                    </Button>
                                    <ColorModeButton />
                                    <Button colorScheme={"red"}
                                            onClick={() => 
                                                { 
                                                    // Disconnects the player from thier current session
                                                    socket.disconnect()

                                                    // Loads the main menu.
                                                    LoadMainMenuScreen() 
                                                }}
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