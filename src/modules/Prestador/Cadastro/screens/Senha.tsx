import { View, Text } from "react-native";
import { TextInputController } from "../../../../core/components/Controller/TextInputController";
import { useForm } from "react-hook-form";
import { MyButton } from "../../../../core/components/MyButton";
import { useRoute } from "@react-navigation/native";
import MyScrollView from "../../../../core/components/MyScrollView";
import { styles } from "../../../../../styles";
import { registerStyle } from "../styles/Styles";
import { IPrestador } from "../../Models/IPrestador";
import * as SecureStore from 'expo-secure-store';
import { useAuth } from "../../../../core/context/Auth";
import PrestadorService from "../../services/PrestadorService";

export default function Senha() {
    const { control, formState: { errors }, handleSubmit } = useForm<IPrestador>(),
        { params } = useRoute<any>(),
        { autenticar } = useAuth();
    
    let prestador = params.prestador as IPrestador || {};;

    const handleSalvar = async (data: IPrestador) => {        
        const prestadorDto = { ...prestador, ...data }
        prestador = await PrestadorService.cadastrar(prestadorDto);

        if (prestador) {
            const authDto = { email: prestador.email, senha: prestador.senha };

            await SecureStore.setItemAsync(
                'prestador_data',
                JSON.stringify(authDto)
            );

            await autenticar(authDto);
        }
    
    }

    return (
        <MyScrollView>
            <View style={styles.container}>
                <Text style={registerStyle.title}>Senha</Text>
                <Text style={registerStyle.text}>
                    Crie uma senha segura para proteger sua conta. Sua senha deve conter pelo menos 8 caracteres, 
                    incluindo letras maiúsculas e minúsculas, números e símbolos. Evite utilizar senhas fáceis de adivinhar, 
                    como datas de nascimento ou sequências simples.
                </Text>

                <View style={styles.inputConteiner}>
                    <TextInputController
                        name="senha"
                        control={control}
                        style={{ width: '100%' }}
                        rules={{ required: 'Senha é obrigatório' }}
                        placeholder="Senha"
                        secureTextEntry={true}
                    />
                    {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}
                </View>

                <View style={styles.inputConteiner}>
                    <TextInputController
                        name="confirmarSenha"
                        control={control}
                        rules={{ required: 'Confirmar senha é obrigatório' }}
                        placeholder="Confirmar senha"
                        secureTextEntry={true}
                    />
                    {errors.confirmarSenha && <Text style={styles.error}>{errors.confirmarSenha.message}</Text>}
                </View>

                <MyButton title="Cadastrar" style={registerStyle.button} onPress={handleSubmit(handleSalvar)} />
            </View>
        </MyScrollView>
    );
};