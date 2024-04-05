import { View, StyleSheet, Button } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
    },
    button: {
        width: 50,
        height: 10,
    },
})

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
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title='button A' onPress={onButtonPressA} />
            </View>
            <View style={styles.button}>
                <Button title='button B' onPress={onButtonPressB} />
            </View>
            <View style={styles.button}>
                <Button title='button C' onPress={onButtonPressC} />
            </View>
        </View>
    )
}
