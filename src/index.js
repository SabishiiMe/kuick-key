import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainComponent from "./Components/main_Component";
import {ChakraProvider} from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/color-mode"
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <MainComponent />
    </ChakraProvider>
);
