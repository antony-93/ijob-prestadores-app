import { View, Text } from "react-native";
import { MyButton } from "../../../../core/components/MyButton";
import { useNavigation } from "@react-navigation/native";
import MyScrollView from "../../../../core/components/MyScrollView";
import { registerStyle } from "../styles/Styles";
import { styles } from "../../../../../styles";

export default function Introducao() {
    const navigation = useNavigation<any>();

    return (
        <MyScrollView>
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={registerStyle.titleIntro}>Bem vindo ao IJOB para prestadores de serviço</Text>
                    <Text style={registerStyle.text}>
                        Este aplicativo foi desenvolvido especialmente para você, prestador de serviço.
                        Nossa plataforma oferece todas as ferramentas necessárias para gerenciar seu trabalho
                        e conectar-se com clientes de forma eficiente e prática. Vamos começar criando uma nova
                        conta para você e explorar todas as possibilidades que o IJOB tem a oferecer!
                    </Text>

                    <Text style={registerStyle.link} onPress={() => navigation.navigate('SignIn')}>Click aqui caso você já possua cadastro</Text>
                </View>

                <MyButton title="Começar" onPress={() => navigation.navigate('DadosPessoais')}></MyButton>
            </View>
        </MyScrollView>
    );
};