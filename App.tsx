import { StyleSheet, View } from 'react-native'

import Navigation from './navigation/Navigation'
import FloatingActionButton from './components/FloatingActionButton'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default function App() {
    return (
        <View style={styles.container}>
            <Navigation />
            <FloatingActionButton />
        </View>
    )
}
