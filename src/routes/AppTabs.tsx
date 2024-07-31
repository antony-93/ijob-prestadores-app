import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../modules/Home/screens/Home";
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Agendamento } from '../modules/Agendamentos/screens/Agendamento';
import { Configuracoes } from '../modules/Configuracoes/screens/Configuracoes';
import { View } from 'react-native';
import { Servicos } from '../modules/Servicos/Lista/screens/Servicos';

export function AppTabs() {
    const Tab = createBottomTabNavigator();

    const screenOptions = (options: any) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: (optionsTab: any) => {
            let icon

            if (options.route.name === 'Home') icon = <AntDesign name="home" size={26} color={optionsTab.focused ? 'white' : 'black'} />
            if (options.route.name === 'Servicos') icon = <SimpleLineIcons name="wrench" size={26} color={optionsTab.focused ? 'white' : 'black'} />
            if (options.route.name === 'Agendamentos') icon = <Ionicons name="calendar-clear-outline" size={26} color={optionsTab.focused ? 'white' : 'black'} />
            if (options.route.name === 'Configuracoes') icon = <Ionicons name="settings-outline" size={26} color={optionsTab.focused ? 'white' : 'black'} />

            return <View style={{
                backgroundColor: optionsTab.focused ? 'black' : 'transparent',
                borderRadius: 25,
                padding: 10,
            }}>
                {icon}
            </View>
        },
        tabBarStyle: {
            backgroundColor: 'rgb(242, 242, 242)',
            borderTopWidth: 0.2,
            borderTopColor: 'black',
            shadowColor: 'transparent',
            elevation: 0,
            height: 60
        },
    })

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Servicos" component={Servicos} />
            <Tab.Screen name="Agendamentos" component={Agendamento} />
            <Tab.Screen name="Configuracoes" component={Configuracoes} />
        </Tab.Navigator>
    );
}