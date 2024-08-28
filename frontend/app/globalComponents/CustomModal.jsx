import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
  } from "react-native";
import React from 'react'

import { styles } from './customModalStyles.js'

const CustomModal = ({
    animationType = "fade",
    transparent = true,
    isVisible,
    setIsVisible,
    questionTxt,
    actionHandler
}) => {
  return (
    <Modal
    animationType={animationType}
    transparent={transparent}
    visible={isVisible}
    onRequestClose={() => setIsVisible(false)}
    >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>{questionTxt}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginTop: 20 }}>
            <Button title="Да" onPress={actionHandler} color={"red"}/>
            <Button title="Не" onPress={() => setIsVisible(false)} />
            </View>
        </View>
        </View>
    </Modal>
  )
}



export default CustomModal