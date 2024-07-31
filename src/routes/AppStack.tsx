import CadastroGrupoServico from '../modules/Servicos/Cadastro/screens/CadastroGrupoServico';
import { createStackNavigator } from '@react-navigation/stack';
import { AppTabs } from './AppTabs';
import ListaTipoServico from '../modules/Servicos/Lista/screens/TipoServico';

export function AppStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="CadastroGrupoServico" component={CadastroGrupoServico} />
            <Stack.Screen name="ListaTipoServico" component={ListaTipoServico} />
        </Stack.Navigator>
    );
}