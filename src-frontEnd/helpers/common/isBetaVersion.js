import StorageServices from "../../services/StorageServices";

export default  () => {
    return !!StorageServices.get('try-beta', false);
}