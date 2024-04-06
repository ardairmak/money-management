import { Fragment, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import FloatingActionButtonPopup from './FloatingActionButtonPopup'

export default function FloatingActionButton() {
    const [showPopup, setShowPopup] = useState(false)

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const closePopup = () => {
        setShowPopup(false)
    }

    const onButtonPress = () => {
        togglePopup()
        console.log('FAB pressed')
    }

    return (
        <Fragment>
            {showPopup && (
                <View style={styles.fabPopup}>
                    <FloatingActionButtonPopup />
                </View>
            )}
            <TouchableOpacity style={styles.fab} onPress={onButtonPress}>
                <Ionicons name='add-circle' size={70} color={'#083c5c'} />
            </TouchableOpacity>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 15,
        bottom: 80,
    },
    fabPopup: {
        backgroundColor: 'gray',
        position: 'absolute',
        right: 15,
        bottom: 160,
    },
})
