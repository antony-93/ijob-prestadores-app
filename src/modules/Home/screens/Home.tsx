import { useEffect, useState } from "react";
import { View, Text, Alert, TouchableHighlight } from "react-native";
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import MyScrollView from "../../../core/components/MyScrollView";
import { styles } from "../../../../styles";
import { homeStyles } from "../styles/Styles";
import { FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const [prestador, setPrestador] = useState<any>(),
        navigation = useNavigation<any>();

    const getDadosPrestador = async () => {
        const prestadorData = await SecureStore.getItemAsync('prestador_data');

        if (prestadorData) {
            setPrestador(JSON.parse(prestadorData));
        }
    }

    const verificaAutenticacaoBiometrica = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync(),
            autenticacao_biometrica_data = await SecureStore.getItemAsync('autenticacao_biometrica'),
            ja_perguntou_data = await SecureStore.getItemAsync('ja_perguntou'),
            autenticacao_biometrica = autenticacao_biometrica_data ? JSON.parse(autenticacao_biometrica_data) : null,
            ja_perguntou = ja_perguntou_data ? JSON.parse(ja_perguntou_data) : null,
            supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync(),
            isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!compatible || ja_perguntou || autenticacao_biometrica || !supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) return;

        const validaAutenticacaoBiometrica = async () => {
            if (!isBiometricEnrolled) {
                return Alert.alert('Login', 'Biometria não encontrada');
            }

            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login com biometria',
                fallbackLabel: 'Biometria não reconhecida'
            });

            if (auth.success) {
                await SecureStore.setItemAsync('autenticacao_biometrica', 'true');
            }
        }

        Alert.alert(
            'Autenticação biométrica',
            'Deseja adicionar autenticação por biometria?',
            [
                {
                    text: 'Não',
                    onPress: async () => await SecureStore.setItemAsync('ja_perguntou', JSON.stringify(true)),
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => await validaAutenticacaoBiometrica()
                },
            ],
            { cancelable: false }
        );
    }

    const initEffect = async () => {
        await getDadosPrestador();
        verificaAutenticacaoBiometrica();
    }

    useEffect(() => {
        initEffect()
    }, [])

    return (
        <MyScrollView hiddenHeader={true}>
            <View style={styles.container}>
                <View style={homeStyles.header}>
                    <FontAwesome5 name="user-circle" size={40} color="black" />
                    <MaterialIcons name="notifications-none" size={40} color="black" />
                </View>

                <Text style={homeStyles.textHello}>Olá, {(prestador?.nome) ? prestador?.nome : prestador?.razao_social}</Text>

                <View style={homeStyles.containerCards}>
                    <TouchableHighlight style={[homeStyles.highButtons, { marginRight: 7 }]} underlayColor="rgba(0, 0, 0, 0.07)" onPress={() => navigation.navigate('Servicos')}>
                        <View style={homeStyles.highButtonsContent}>
                            <Text style={homeStyles.highButtonsText}>Meus Serviços</Text>
                            <SimpleLineIcons name="wrench" size={32} color={'black'} />
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={[homeStyles.highButtons, { marginLeft: 7 }]} underlayColor="rgba(0, 0, 0, 0.07)" onPress={() => navigation.navigate('Agendamentos')}>
                        <View style={homeStyles.highButtonsContent}>
                            <Text style={homeStyles.highButtonsText}>Serviços agendados</Text>
                            <Ionicons name="calendar-clear-outline" size={32} color={'black'} />
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={homeStyles.servicos}>
                    <Text style={homeStyles.subTitle}>Serviços agendados para hoje</Text>
                    <Text style={{ fontSize: 16, marginTop: 5 }}>Nenhum serviço agendado para hoje</Text>
                </View>
            </View>
        </MyScrollView>
    )
}