import Layout from "../../Layouts/Layout";

function AddProduct() {
    return (
        <Layout>
            <section className="py-12">
                <div className="max-w-md mx-auto mt-8 bg-white p-7">
                    <h2 className="mb-4 text-2xl font-semibold">
                        Add Product
                    </h2>
                    <form action="">
                        {/* Product Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="productName"
                                className="block text-sm font-medium text-gray-700">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                required
                                minLength={5}
                                maxLength={20}
                                className=" mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        </div>
                        {/* Product Description */}
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                required
                                minLength={5}
                                maxLength={50}
                                className=" mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        </div>
                        {/* Product Price */}
                        <div className="mb-4">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                required
                                maxLength={4}
                                className=" mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        </div>
                        {/* Product Quantity */}
                        <div className="mb-4">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-gray-700">
                                Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                required
                                className=" mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        </div>
                        {/* Product Category */}
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700">
                                Select Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                defaultValue=""
                                className=" text-lg mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                                <option value="" disabled>Select a category</option>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                                <option value="drinks">Soft drinks</option>
                                <option value="sides">Sides</option>
                            </select>
                        </div>
                        {/* Product Image */}
                        <div className="mb-4">
                            <label
                                htmlFor="productImage"
                                className="block text-sm font-medium text-gray-700">
                                Product Image <span className="text-red-600">( .jpg, .jpeg, .png )</span>
                            </label>
                            <input
                                type="file"
                                id="productImage"
                                name="productImage"
                                required
                                accept=".jpg, .jpeg, .png"
                                className=" mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        </div>
                        {/* Submit Button */}
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out duration-300">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
}

export default AddProduct;