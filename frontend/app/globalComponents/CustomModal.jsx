import {
    View,
    Text,
    Modal,

    TouchableOpacity
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 50, marginTop: 20 }}>
             <TouchableOpacity
                  style={styles.yesButton} 
                  onPress={actionHandler}
                >
                  <Text style={styles.buttonTextYes}>Да</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.noButton}
                  onPress={() => setIsVisible(false)}
                >
                  <Text style={styles.buttonTextNo}>Не</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    </Modal>
  )
}



export default CustomModal