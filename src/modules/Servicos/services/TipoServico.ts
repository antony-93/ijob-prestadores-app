import ApiIJob from "../../../core/infra/ApiIJob";
import { ITipoServico } from "../models/ITipoServico";

class TipoServicoService {
    async listar(): Promise<ITipoServico[]> {
        const response = await ApiIJob.get('/tiposervico');
        return response.data.content;
    }
}

export default new TipoServicoService();