import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

import AuthContext from '../../Context/AuthContext';

const SignOut = () => {
    const { removeToken, removeUserInfo } = React.useContext(AuthContext);
    const router = useRouter();
    removeToken();
    removeUserInfo();
    router.push("/");
    return;
}

export default SignOut