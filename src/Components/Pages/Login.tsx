//using radix UI create a login page that uses google sign in
//use a flex box to display the login page

import React from 'react';
import { GoogleSigning } from '../GoogleSigning';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    return (
        <Flex direction="column" gap="2">
            <GoogleSigning/>
        </Flex>
    )
}