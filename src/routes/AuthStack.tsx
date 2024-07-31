import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Access from "../modules/Access/screens/Access";
import SignIn from "../modules/Access/screens/SignIn";
import Introducao from "../modules/Prestador/Cadastro/screens/Introdução";
import DadosPessoais from "../modules/Prestador/Cadastro/screens/DadosPessoais";
import Senha from "../modules/Prestador/Cadastro/screens/Senha";

export function AuthStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Access">
            <Stack.Screen name="Access" component={Access} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Introducao" component={Introducao} />
            <Stack.Screen name="DadosPessoais" component={DadosPessoais} />
            <Stack.Screen name="Senha" component={Senha} />
        </Stack.Navigator>
    );
}