import { View, Text } from "react-native";
import { styles } from "../../../../../styles";
import MyScrollView from "../../../../core/components/MyScrollView";
import { cadastroGrupoServicoStyles } from "../styles";
import { MyButton } from "../../../../core/components/MyButton";
import { IGrupoServico } from "../../models/IGrupoServico";
import { TextInputController } from "../../../../core/components/Controller/TextInputController";
import { useForm } from "react-hook-form";
import * as SecureStore from 'expo-secure-store';
import GrupoServicoService from "../../services/GrupoServicoService";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CadastroGrupoServico() {
    const { control, formState: { errors }, handleSubmit } = useForm<IGrupoServico>(),
        navigation = useNavigation<any>(),
        { params } = useRoute<any>();

    const handleAdicionar = async (data: IGrupoServico) => {
        const prestador_data = await SecureStore.getItemAsync('prestador_data'),
            prestador = prestador_data ? JSON.parse(prestador_data) : {};

        data.prestador_id = prestador.id;
        data.tipo_servico_id = params.tipo_servico_id;

        const grupoServico = await GrupoServicoService.criar(data);

        if (grupoServico) navigation.navigate('Servicos');
    }

    return (
        <MyScrollView>
            <View style={styles.container}>
                <Text style={cadastroGrupoServicoStyles.title}>Grupo de serviço</Text>
                <Text style={cadastroGrupoServicoStyles.text}>Informe o nome do novo grupo de serviço!</Text>

                <View style={styles.flex_1}>
                    <View style={styles.inputConteiner}>
                        <TextInputController
                            name="nome"
                            control={control}
                            style={cadastroGrupoServicoStyles.inputController}
                            rules={{ required: 'Nome é obrigatório' }}
                            placeholder="Nome"
                        />
                        {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}
                    </View>

                    <MyButton title="Adicionar" style={cadastroGrupoServicoStyles.button} onPress={handleSubmit(handleAdicionar)} />
                </View>
            </View>
        </MyScrollView>
    )
}