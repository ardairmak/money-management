import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import FloatingActionButtonPopup from './FloatingActionButtonPopup'

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 15,
        bottom: 80,
    },
})

const onButtonPress = () => {
    console.log('FAB pressed')
    FloatingActionButtonPopup()
}

export default function FloatingActionButton() {
    return (
        <TouchableOpacity style={styles.fab} onPress={onButtonPress}>
            <Ionicons name='add-circle' size={70} color={'#083c5c'} />
        </TouchableOpacity>
    )
}
