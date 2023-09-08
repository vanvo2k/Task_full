import getEnv from "../../helpers/common/getEnv";
import AuthServices from "../../services/AuthServices";

const hostAPI = getEnv('hostAPI');
const token = AuthServices.getAccessToken();

export default (productId) => {
    return hostAPI + `/v2/products/${productId}/redirect?token=${token}`;
};