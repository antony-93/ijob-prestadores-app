import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MyButton } from "../../../core/components/MyButton";
import { accessStyles } from "../styles/Styles";
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from "../../../core/context/Auth";

export default function Access() {
    const navigation = useNavigation<any>(),
        { autenticar } = useAuth();

    const handleEntrar = async () => {
        const prestadorData = await SecureStore.getItemAsync('prestador_data'),
            autenticacao_biometrica_data = await SecureStore.getItemAsync('autenticacao_biometrica');

        if (prestadorData && autenticacao_biometrica_data) {
            const prestador = JSON.parse(prestadorData),
                autenticacao_biometrica = JSON.parse(autenticacao_biometrica_data);
                
            if (autenticacao_biometrica) {
                const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

                if (!isBiometricEnrolled) {
                    return Alert.alert('Login', 'Biometria não encontrada');
                }

                const auth = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Login com biometria',
                    fallbackLabel: 'Biometria não reconhecida'
                })

                if (auth.success) {
                    await autenticar({ email: prestador.email, senha: prestador.senha });
                }
            }

            if (!autenticacao_biometrica) {
                navigation.navigate('SignIn');
            }
        } else {
            navigation.navigate('Introducao');
        }

    }

    return (
        <View style={[accessStyles.container]}>
            <View style={accessStyles.content}>
                <Text style={accessStyles.title}>IJOB</Text>
                <Text style={[accessStyles.title, { textAlign: 'center'}]}>PRESTADORES DE SERVIÇO</Text>
            </View>
            <MyButton title="Entrar" onPress={handleEntrar}></MyButton>
        </View>
    );
}