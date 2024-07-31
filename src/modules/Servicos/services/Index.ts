import ApiIJob from "../../../core/infra/ApiIJob";
import { IServico } from "../models/IServico";

class ServicoService {
    async criar(servico: IServico): Promise<IServico> {
        const response = await ApiIJob.post('/servico', servico)
        return response.data;
    }

    async listar(): Promise<IServico[]> {
        const response = await ApiIJob.get('/servico');
        return response.data;
    }

    async buscarPorId(id: string): Promise<IServico> {
        const response = await ApiIJob.get(`/servico/${id}`);
        return response.data;
    }
}

export default new ServicoService();