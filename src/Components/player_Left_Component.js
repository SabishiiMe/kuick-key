import {
    Image, Box, Stack, Heading
} from '@chakra-ui/react'
import Key from './key_Component';
import {useState } from 'react';

function LeftPlayer(props) {

    // States
    const [userName, setUsername] = useState(props.username ? props.username : "No One") 
    const [score, setscore] = useState(0) 

    return(
        <Box flex={2.5} 
             h={"100vh"} 
             className={"PlayerArea"} 
             pr={"5px"} 
             boxShadow={"inner"}
             bgImage={"game_Background.png"} 
             bgSize={"30em"}>
            <Stack isInline 
                   mt={"5%"} 
                   ml={"5%"} >
                <Box className={"PlayerStrikeArea"} h={"auto"}>
                        <Stack justifyContent={"center"}>
                            <Heading size={"2xl"} textAlign={"Center"}>Strikes</Heading>
                        <Image src={"strike_Empty.png"} 
                                alt={"Player First Strike"}
                                h={"15vh"}
                                w={"auto"}
                                pr={"10px"}
                                />
                        <Image src={"strike_Empty.png"} 
                                alt={"Player Second Strike"} 
                                h={"15vh"}
                                w={"auto"}
                                pr={"10px"}
                                />
                        <Image src={"strike_Empty.png"} 
                                alt={"Player Third Strike"}
                                h={"15vh"}
                                w={"auto"}
                                />
                        </Stack>
                </Box>
                <Stack m="auto" h={"auto"} overflow={"hidden"} mt={"5%"} align={"center"}>
                    <Box overflow={"hidden"} h={"59vh"} className={"Keys"} >
                        <Key letter={"Z"} />
                        <Key letter={"G"} />
                        <Key letter={"S"} />
                        <Key letter={"B"} />
                        <Key letter={"Q"} />
                        <Key letter={"O"} />  
                        <Key letter={"K"} />  
                    </Box>
                    <Box className={"CurrentKeyContainer"}>
                        <Image src={"current_Key_Box.png"} 
                                alt={"Current Key Container"} />
                    </Box>
                    <Box className={"PlayerInfoArea"}>
                        <Heading textAlign={"center"} 
                                    className={"PlayerUsername"}>
                            {userName}
                        </Heading>
                        <Heading textAlign={"center"} 
                                    className="PlayerScore">
                            {score}
                        </Heading>
                    </Box>
                </Stack>
            </Stack>
        </Box>
)}

export default LeftPlayer