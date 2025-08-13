import { useState } from "react";
import RoundedBorderBtn from "../../../components/RoundedBorderBtn";
// import ImageUploadModal from "./ImageUploadModal";
import { useCreateProductMutation } from "../../../slices/productApiSlice";
import { FaPlus } from "react-icons/fa";

const AddProducts = () => {
      const [product, setProduct] = useState({
            name: "",
            description: "",
            category: "",
            variations: [
                  {
                        color: "",
                        hexCode: "#000000",
                        price: "",
                        stock: "",
                        imageFiles: [],
                        imagePreviews: [],
                  },
            ],
      });

      const [createProduct, { isLoading }] = useCreateProductMutation();

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setProduct((prev) => ({ ...prev, [name]: value }));
      };

      const handleVariationChange = (index, e) => {
            const { name, value, files } = e.target;

            const updatedVariations = [...product.variations];

            if (name === "images") {
                  const imageFiles = Array.from(files);
                  const previews = imageFiles.map((file) => URL.createObjectURL(file));
                  updatedVariations[index].imageFiles = imageFiles;
                  updatedVariations[index].imagePreviews = previews;
            } else {
                  updatedVariations[index][name] = value;
            }

            setProduct((prev) => ({ ...prev, variations: updatedVariations }));
      };

      const addVariation = () => {
            setProduct((prev) => ({
                  ...prev,
                  variations: [
                        ...prev.variations,
                        {
                              color: "",
                              hexCode: "#000000",
                              price: "",
                              stock: "",
                              imageFiles: [],
                              imagePreviews: [],
                        },
                  ],
            }));
      };

      const removeVariation = (index) => {
            if (product.variations.length === 1) return;
            const updated = product.variations.filter((_, i) => i !== index);
            setProduct((prev) => ({ ...prev, variations: updated }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData();

            // Append generic data
            formData.append("name", product.name);
            formData.append("category", product.category);
            formData.append("description", product.description);

            //Append variations data
            product.variations.forEach((variation, index) => {
                  formData.append(`variation-[${index + 1}]-[color]`, variation.color);
                  formData.append(`variation-[${index + 1}]-[hexCode]`, variation.hexCode);
                  formData.append(`variation-[${index + 1}]-[price]`, variation.price);
                  formData.append(`variation-[${index + 1}]-[stock]`, variation.stock);
                  variation.imageFiles.forEach((file) => {
                        formData.append(`variation-[${index + 1}]-[images]`, file);
                  });
            });

            try {
                  const res = await createProduct(formData).unwrap();
                  console.log(res);
            } catch (err) {
                  console.log(err?.data?.message || err.error);
            }
      };

      return (
            <div className="add-product">
                  <h2>Create Product</h2>
                  <form onSubmit={handleSubmit}>
                        <div className="form-group">
                              <label htmlFor="name">Product Name</label>
                              <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={product.name}
                                    onChange={handleInputChange}
                                    required
                              />
                        </div>

                        <div className="form-group">
                              <label htmlFor="category">Category</label>
                              <select
                                    name="category"
                                    id="category"
                                    value={product.category}
                                    onChange={handleInputChange}
                                    required
                              >
                                    <option value="chairs">chairs</option>
                                    <option value="sofas">sofas</option>
                                    <option value="tables">tables</option>
                                    <option value="electronics">electronics and accesories</option>
                                    <option value="wardrobes">wardrobes</option>
                                    <option value="consoles">consoles</option>
                              </select>
                        </div>

                        <div className="form-group">
                              <label htmlFor="description">Description</label>
                              <textarea
                                    name="description"
                                    id="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                    required
                              />
                        </div>
                        <div className="variations">
                              <h3>Variations (at least one required)</h3>
                              {product.variations.map((variation, index) => (
                                    <div key={index} className="variation">
                                          <h4>{`Variation ${index + 1}`}</h4>
                                          <div className="form-group">
                                                <label htmlFor={`color-${index}`}>Product color</label>
                                                <input
                                                      type="text"
                                                      name="color"
                                                      id={`color-${index}`}
                                                      value={variation.color}
                                                      onChange={(e) => handleVariationChange(index, e)}
                                                      required
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label htmlFor={`hexCode-${index}`}>Color Hex</label>
                                                <input
                                                      type="color"
                                                      name="hexCode"
                                                      id={`hexCode-${index}`}
                                                      value={variation.hexCode}
                                                      onChange={(e) => handleVariationChange(index, e)}
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label htmlFor="price">Price</label>
                                                <input
                                                      type="number"
                                                      name="price"
                                                      id="price"
                                                      min="0"
                                                      value={variation.price}
                                                      onChange={(e) => handleVariationChange(index, e)}
                                                      required
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label htmlFor={`stock-${index}`}>Stock</label>
                                                <input
                                                      type="number"
                                                      name="stock"
                                                      id={`stock-${index}`}
                                                      min="0"
                                                      value={variation.stock}
                                                      onChange={(e) => handleVariationChange(index, e)}
                                                      required
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label htmlFor={`images-${index}`}>Upload Images</label>

                                                <input
                                                      type="file"
                                                      name="images"
                                                      id={`images-${index}`}
                                                      accept="image/*"
                                                      multiple
                                                      onChange={(e) => handleVariationChange(index, e)}
                                                />

                                                <div className="preview">
                                                      {variation.imagePreviews.map((img, i) => (
                                                            <img key={i} src={img} alt={`Preview ${i}`} />
                                                      ))}
                                                </div>
                                          </div>
                                          {product.variations.length > 1 && (
                                                <button
                                                      type="button"
                                                      className="remove"
                                                      onClick={() => removeVariation(index)}
                                                >
                                                      Remove Variation
                                                </button>
                                          )}
                                    </div>
                              ))}

                              <RoundedBorderBtn icon={<FaPlus />} text="Add Variation" onclick={addVariation} />
                        </div>
                        <br />

                        <button type="submit" disabled={isLoading} className="submit">
                              Submit product
                        </button>
                  </form>
            </div>
      );
};

export default AddProducts;
