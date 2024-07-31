import { View, Text } from "react-native";
import MyScrollView from "../../../../core/components/MyScrollView";
import { styles } from "../../../../../styles";
import { listaServicosStyles } from "../styles/Styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { SearchInput } from "../../../../core/components/SearchInput";
import { useNavigation } from "@react-navigation/native";
import { IGrupoServico } from "../../models/IGrupoServico";
import { useEffect, useState } from "react";
import GrupoServicoService from "../../services/GrupoServicoService";
import { Card } from "react-native-paper";

export function Servicos() {
    const navigation = useNavigation<any>(),
        [grupo_servicos, setGrupoServicos] = useState<IGrupoServico[]>([]);

    const handleNavigation = (routeName: string) => {
        navigation.navigate(routeName);
    }

    const loadGrupoServicos = async () => {
        const grupoServicos = await GrupoServicoService.listar();
        setGrupoServicos(grupoServicos);
    }

    const renderGrupoServicos = () => {
        return grupo_servicos.map((grupo_servico) => {
            return (
                <Card key={grupo_servico.id} style={{ marginBottom: 20, shadowColor: 'transparent', backgroundColor: '#E6E6E6' }}>
                    <Card.Content>
                        <Text style={{ fontWeight: 'bold' }}>{grupo_servico.nome}</Text>
                    </Card.Content>
                </Card>
            )
        })
    }

    useEffect(() => {
        loadGrupoServicos();
    }, [])

    return (
        <MyScrollView hiddenHeader={true}>
            <View style={styles.container}>
                <View style={listaServicosStyles.headerServices}>
                    <Text style={listaServicosStyles.title}>Meus serviços</Text>
                    <FontAwesome6 name="add" size={24} color="black" onPress={() => handleNavigation('ListaTipoServico')} />
                </View>
                <SearchInput style={{ marginTop: 10 }}></SearchInput>

                <View style={{ flex: 1, marginTop: 20 }}>
                    {grupo_servicos.length > 0 ? renderGrupoServicos() : <Text>Nenhum serviço encontrado.</Text>}
                </View>
            </View>
        </MyScrollView>
    )
}