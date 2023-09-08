const types = {
    default: "Standard T-Shirt",
    standard: "Standard T-Shirt",
    premium: "Premium T-Shirt",
    longsleeve: "Long Sleeve T-Shirt",
    hoodie: "Pullover Hoodie",
    sweatshirt: "Sweatshirt",
    tanktop: "Tanktop T-Shirt",
    vneck: "V-Neck T-Shirt",
    raglan: "Raglan T-Shirt",
    merch: "Merch",
    "non-merch": "Non-Merch",
};

export default (key) => {
    return types[key] || types['default'];
}