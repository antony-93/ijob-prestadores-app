import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { DateInputController } from "../../../../core/components/Controller/DateInputController";
import { TextInputController } from "../../../../core/components/Controller/TextInputController";
import { useForm } from "react-hook-form";
import { MyButton } from "../../../../core/components/MyButton";
import { useNavigation } from "@react-navigation/native";
import MyScrollView from "../../../../core/components/MyScrollView";
import { registerStyle } from "../styles/Styles";
import { styles } from "../../../../../styles";
import { TextInputMaskController } from "../../../../core/components/Controller/TextInputMaskController";
import { IPrestador } from "../../Models/IPrestador";

export default function DadosPessoais() {
    const { control, formState: { errors }, handleSubmit } = useForm<IPrestador>();
    const navigation = useNavigation<any>();

    const onSubmit = async (data: IPrestador) => {
        data.cpf_cnpj = Number(String(data.cpf_cnpj).replace(/\D/g, ''));
        navigation.navigate('Senha', { prestador: data});
    }

    return (
        <MyScrollView>
            <View style={styles.container}>
                <Text style={registerStyle.title}>Dados pessoais</Text>
                <Text style={registerStyle.text}>Preencha o formulário com seus dados pessoais para completar o cadastro</Text>

                <View style={styles.inputConteiner}>
                    <TextInputController
                        name="razao_social"
                        control={control}
                        style={{ width: '100%' }}
                        rules={{ required: 'Razão social é obrigatório', minLenght: { value: 4, message: 'O nome deve conter pelo menos 4 caracteres' } }}
                        placeholder="Razão Social"
                    />
                    {errors.razao_social && <Text style={styles.error}>{errors.razao_social.message}</Text>}
                </View>

                <View style={styles.inputConteiner}>
                    <TextInputController
                        name="email"
                        control={control}
                        rules={{ required: 'E-mail é obrigatório' }}
                        placeholder="E-mail"
                    />
                    {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                </View>

                <View style={styles.inputConteiner}>
                    <TextInputMaskController
                        typeMask="cnpj"
                        name="cpf_cnpj"
                        control={control}
                        rules={{ required: 'CNPJ é obrigatório' }}
                        placeholder="CNPJ"
                    />
                    {errors.cpf_cnpj && <Text style={styles.error}>{errors.cpf_cnpj.message}</Text>}
                </View>

                <MyButton title="Continuar" style={registerStyle.button} onPress={handleSubmit(onSubmit)} />
            </View>
        </MyScrollView>
    );
};