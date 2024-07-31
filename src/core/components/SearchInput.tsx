import { StyleSheet, View } from "react-native";
import { MyTextInput } from "./MyTextInput";
import { Ionicons } from "@expo/vector-icons";

export function SearchInput(props: any) {
    props.style = null;
    
    return (
        <View style={[styles.container, props.style]}>
            <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
            <MyTextInput placeholder="Pesquisar" {...props} style={[styles.input]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    searchIcon: {
        position: 'absolute',
        marginLeft: 7,
        padding: 10,
    },
    input: {
        borderRadius: 50,
        paddingLeft: 50,
    },
});