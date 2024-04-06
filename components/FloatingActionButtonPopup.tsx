import { Fragment } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const onButtonPressA = () => {
    console.log('Pressed A')
}

const onButtonPressB = () => {
    console.log('Pressed B')
}

const onButtonPressC = () => {
    console.log('Pressed C')
}

export default function FloatingActionButtonPopup() {
    return (
        <Fragment>
            <TouchableOpacity style={styles.button} onPress={onButtonPressA}>
                <Text style={styles.buttonText}>Gelir/Gider Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onButtonPressB}>
                <Text style={styles.buttonText}>Gelecek Ödeme Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onButtonPressC}>
                <Text style={styles.buttonText}>Etkinlik Ekle</Text>
            </TouchableOpacity>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 2,
        padding: 5,
        height: 35,
        width: 200,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: '#083c5c',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
})
