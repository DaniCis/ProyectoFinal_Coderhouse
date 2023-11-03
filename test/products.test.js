import mongoose from 'mongoose'
import ProductDao from '../src/dao/dbManagers/products.js'
import Assert from 'assert'

mongoose.connect("mongodb+srv://cessarmart:390ljtiALsv7UcP8@cluster0.lr2zwx0.mongodb.net//test?retryWrites=true&w=majority");

const assert = Assert.strict;

describe("Testing de Product Dao", () => {
    before(function () {
        this.productDao = new ProductDao();
    });
    beforeEach(function () {
        //mongoose.connection.collections.products.drop();
        this.timeout(4000);
    });
    it("El dao debe traer un producto correctamente de la base de datos", async function () {
        const result = await this.productDao.getProducts();
        assert.strictEqual(Array.isArray(result.payload), true);
    });

    it("El dao debe modificar un producto correctamente de la base de datos", async function () {
        const _id = "64d39817e27e158bcf4e583c";
        let productUpdate = {
            title: "i9 12gen",
        };

        const result = await this.productDao.updateProduct(_id, productUpdate);

        const product = await this.productDao.getProductById(_id);
        console.log("editado", result);
        console.log("Traido", product);
        assert.strictEqual(product.title, productUpdate.title);
    });

    it("El dao debe borrar un producto correctamente de la base de datos", async function () {
        const _id = "64d39817e27e158bcf4e583c";

        const result = await this.productDao.deleteProduct(_id);

        const product = await this.productDao.getProductById(_id);
        assert.strictEqual(result.deletedCount, 1);
    });
});