import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },

    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    textHello: {
        fontSize: 36,
        marginTop: 20,
        fontWeight: 'bold' 
    },

    containerCards: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    highButtons: {
        flex: 1,
        padding: 10,
        shadowColor: 'transparent',
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    
    highButtonsContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    highButtonsText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },

    servicos: {
        marginTop: 20
    }
})