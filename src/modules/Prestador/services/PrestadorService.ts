import ApiIJob from "../../../core/infra/ApiIJob";
import { IPrestador } from "../Models/IPrestador";

class PrestadorService {
    async cadastrar(prestador: IPrestador): Promise<IPrestador> {
        const response = await ApiIJob.post('/prestadores', prestador)
        return response.data.content;
    }
}

export default new PrestadorService();