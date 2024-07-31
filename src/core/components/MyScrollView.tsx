import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FC, ReactNode } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MyScrollViewProps {
    children: ReactNode;
    hiddenHeader?: boolean;
}

const MyScrollView: FC<MyScrollViewProps> = ({ children, hiddenHeader }) => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollviewContent}>
                {!hiddenHeader && (<View style={styles.header}>
                    <Ionicons name="chevron-back-sharp" size={24} color="#000" onPress={() => navigation.goBack()} />
                    <Feather name="info" size={24} color="black" />
                </View>)}
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 17,
        width: '100%',
    },

    topHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 37,
        backgroundColor: 'rgb(242, 242, 242)',
        zIndex: 1,
    },

    scrollviewContent: {
        flexGrow: 1
    },
});

export default MyScrollView;