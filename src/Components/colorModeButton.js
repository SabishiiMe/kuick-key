import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function ToggleColorMode() {
    const { colorMode, toggleColorMode } = useColorMode()

    function GetColorMode() {
        return colorMode
    }

    return (
        <Button colorScheme={"red"} onClick={() => {toggleColorMode()}}>
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
)}

export default ToggleColorMode
