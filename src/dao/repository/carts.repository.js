export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCarts = () => {
        let result = this.dao.getCarts();
        return result;
    };

    getCartById = (cid) => {
        let result = this.dao.getCartById(cid);
        return result;
    };

    createCart = () => {
        let result = this.dao.createCart();
        return result;
    };

    addProductToCart = (cid, pid) => {
        let result = this.dao.addProductToCart(cid, pid);
        return result;
    };

    deleteAllProductsInCart = (cid) => {
        let result = this.dao.deleteAllProductsInCart(cid);
        return result;
    };

    deleteProductInCart = (cid, pid) => {
        let result = this.dao.deleteProductInCart(cid, pid);
        return result;
    };

    updateCart = (cid, products) => {
        let result = this.dao.updateCart(cid, products);
        return result;
    };

    updateQuantity = (cid, pid, quantity) => {
        let result = this.dao.updateQuantity(cid, pid, quantity);
        return result;
    };

    purchaseCart = (cid) => {
        let result = this.dao.purchaseCart(cid);
        return result;
    }
}
