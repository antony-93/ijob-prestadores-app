import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export function getIcon(nome: any, pacote: string, size: number, color?: string) {
    switch (pacote) {
        case 'FontAwesome6':
            return <FontAwesome6 name={nome} size={size} color={color ? color : 'black'} />;
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons name={nome} size={size} color="black" />;
        default:
            return null;
    }
}
