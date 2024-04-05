import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    FlatList,
    Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const iconPaths: { [key: string]: any } = {
    Netflix: require('../assets/netflix.jpg'),
    Spotify: require('../assets/spotify.png'),
}

const UpcomingPaymentScreen = () => {
    const data = [
        {
            id: '1',
            name: 'Netflix',
            date: 'April 15, 2024',
            price: '$15.99',
            icon: iconPaths['Netflix'],
        },
        {
            id: '2',
            name: 'Spotify',
            date: 'April 20, 2024',
            price: '$9.99',
            icon: iconPaths['Spotify'],
        },
        // Add more expense items here if needed
    ]

    const renderItem = ({
        item,
        index,
    }: {
        item: {
            id: string
            name: string
            date: string
            price: string
            icon: string
        }
        index: number
    }) => (
        <View
            style={[
                styles.item,
                index === data.length - 1 && styles.noBottomBorder,
            ]}
        >
            <Image source={iconPaths[item.name]} style={styles.itemIcon} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
    )

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* First Section (Header) */}
                <View style={styles.headerSection}>
                    <Ionicons
                        name='menu-outline'
                        size={50}
                        color='white'
                        style={styles.icon}
                    />
                    <Text style={styles.headerTitle}>Yaklaşan Ödemelerim</Text>
                    <Ionicons
                        name='person-circle-outline'
                        size={50}
                        color='white'
                        style={styles.icon}
                    />
                </View>

                {/* Second Section */}
                <View style={styles.middleSection}>
                    <Text style={styles.middleTitle}>
                        Bu ay planlanan ödemelerin toplamı
                    </Text>
                    <Text style={styles.amount}>120 TL</Text>
                </View>
                <View style={styles.upcomingSection}>
                    <View style={styles.searchSection}>
                        <Ionicons
                            name='search-outline'
                            size={24}
                            color='#083c5c'
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder='Ödeme Ara'
                            placeholderTextColor={'black'}
                        />
                    </View>
                    {/* Fourth Section (Upcoming Payments) */}
                    <View style={styles.upcomingContainer}>
                        <Text style={styles.upcomingTitle}>
                            Yaklaşan Ödemeler
                        </Text>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={
                                styles.flatListContentContainer
                            }
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#083c5c',
        paddingTop: 20,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#bfc3cc',
        backgroundColor: '#9094ac',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    itemDate: {
        fontSize: 14,
        color: '#ccc',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    itemIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
        backgroundColor: '#083c5c',
    },
    middleSection: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#083c5c',
        paddingBottom: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#bfc3cc',
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 10,
        borderRadius: 25,
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },
    middleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    icon: {
        marginHorizontal: 0,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#bfc3cc',
        color: 'black',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    upcomingSection: {
        backgroundColor: 'white',
        paddingTop: 15,
    },
    upcomingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 120,
        color: 'white',
        borderBottomColor: '#bfc3cc',
    },
    flatListContentContainer: {
        paddingBottom: 20, // Adjust the padding as needed
    },
    upcomingContainer: {
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#9094ac',
    },
    noBottomBorder: {
        borderBottomWidth: 0,
    },
})

export default UpcomingPaymentScreen
