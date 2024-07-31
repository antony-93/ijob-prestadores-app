import ApiIJob from "../../../core/infra/ApiIJob";
import { IGrupoServico } from "../models/IGrupoServico";

class GrupoServicoService {
    async criar(grupo_servico: IGrupoServico): Promise<IGrupoServico> {
        const response = await ApiIJob.post('/gruposervico', grupo_servico)
        return response.data.content;
    }

    async listar(): Promise<IGrupoServico[]> {
        const response = await ApiIJob.get('/gruposervico');
        return response.data.content;
    }
}

export default new GrupoServicoService();