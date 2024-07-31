import { View, Text } from "react-native";
import { ITipoServico } from "../../models/ITipoServico";
import { useEffect, useState } from "react";
import TipoServicoService from "../../services/TipoServico";
import MyScrollView from "../../../../core/components/MyScrollView";
import { styles } from "../../../../../styles";
import { SearchInput } from "../../../../core/components/SearchInput";
import { getIcon } from "../../../../core/shared/utils/IconsFunctions";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ListaTipoServico() {
    const [lista_tipo_servicos, setTipoServicos] = useState<ITipoServico[]>([]),
        navigation = useNavigation<any>();

    const loadTipoServicos = async () => {
        const response = await TipoServicoService.listar();
        setTipoServicos(response);
    }

    const renderTipoServicos = () => {
        return lista_tipo_servicos.map((tipoServico) => {
            return (
                <TouchableHighlight key={tipoServico.id} underlayColor={'#E6E6E6'} style={{ height: 65, justifyContent: 'center' }} onPress={() => handleChoose(tipoServico.id)}>
                    <View style={{ marginHorizontal: 17, flexDirection: 'row', alignItems: 'center' }}>
                        {getIcon(tipoServico.icone, tipoServico.pacote_icone, 50)}
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>{tipoServico.nome}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
    }

    const handleChoose = (tipo_servico_id: string) => {
        navigation.navigate('CadastroGrupoServico', { tipo_servico_id: tipo_servico_id });
    }

    useEffect(() => {
        loadTipoServicos();
    }, [])

    return (
        <MyScrollView>
            <View style={styles.flex_1}>
                <View style={[styles.container, {flex: 0, paddingBottom: 0}]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 40 }}>Tipo de serviço</Text>
                    <Text style={{ lineHeight: 33, fontSize: 20 }}>Selecione o tipo do grupo de serviço</Text>
                    <SearchInput style={{ marginTop: 10 }}></SearchInput>
                </View>

                <View style={{ flex: 1, marginTop: 20 }}>
                    {lista_tipo_servicos && lista_tipo_servicos.length > 0 && renderTipoServicos()}
                </View>
            </View>
        </MyScrollView>
    );
}