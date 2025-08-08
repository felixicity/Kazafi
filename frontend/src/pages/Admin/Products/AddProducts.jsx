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
                        discount: 0,
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
            // Map to clean format
            const formatted = {
                  name: product.name,
                  description: product.description,
                  category: product.category,
                  variations: product.variations.map((v) => ({
                        color: v.color,
                        hexCode: v.hexCode,
                        price: parseFloat(v.price),
                        stock: parseInt(v.stock),
                        images: v.imageFiles.map((file) => file.name), // Replace with actual upload names
                  })),
            };

            try {
                  const res = await createProduct(formatted).unwrap();
                  console.log(res);
            } catch (err) {
                  console.log(err?.data?.message || err.error);
            }

            // console.log("Submitted Product Object:", formatted);
            // alert("Product created. Check the console for the formatted output.");
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

// const AddProducts = () => {
//       const [isOpen, setIsOpen] = useState(false);
//       const [selectedFile, setSelectedFile] = useState(null);
//       const [choiceColors, setChoiceColors] = useState([]);

//       const [createProduct, { isLoading }] = useCreateProductMutation();

//       const commonColors = ["red", "white", "yellow", "gray", "blue", "green", "grey"];

//       const handleSubmit = async (e) => {
//             e.preventDefault();
//             e.preventDefault();
//             const formData = new FormData(e.currentTarget);
//             formData.append("image", selectedFile);

//             const values = [...formData.entries()];

//             const productMap = new Map(); // creating a map in order to compile colors into an array before sending
//             let color = [];

//             for (let val of values) {
//                   if (!val[0].includes("color") && val[1] !== "") {
//                         productMap.set(...val);
//                   } else if (val[0].includes("color-")) {
//                         color.push(val[1]);
//                   }
//             }

//             productMap.set("colors", color); // product is now in a map 😎 Thank God for Maps

//             const product = Object.fromEntries(productMap);

//             // Then you pick out the image manually
//             const imageFile = productMap.get("image");

//             // Now you rebuild the FormData for sending
//             const finalFormData = new FormData();

//             // Append everything from the object *except* image
//             for (const [key, value] of Object.entries(product)) {
//                   if (key !== "image") {
//                         finalFormData.append(key, value);
//                   }
//             }

//             // Append the image file separately
//             if (imageFile) {
//                   finalFormData.append("image", imageFile); // MUST match backend field name
//             }

//             // console.log(Object.fromEntries(finalFormData.entries()));
// const [createProduct, { isLoading }] = useCreateProductMutation();
//             try {
//                   const res = await createProduct(finalFormData).unwrap();
//                   console.log(res);
//             } catch (err) {
//                   console.log(err?.data?.message || err.error);
//             }
//       };

//       return (
//             <div className="add-product">
//                   <h2>Add new product</h2>
//                   <p>Basic product info</p>
//                   <form className="add-product-form" onSubmit={(e) => handleSubmit(e)} action="">
//                         <div className="form-input">
//                               <label htmlFor="">Product name</label>
//                               <input type="text" name="name" />
//                         </div>
//                         <div className="form-input">
//                               <label htmlFor="">Category</label>
//                               <select name="" id="">
//                                     <option value="chairs">chairs</option>
//                                     <option value="sofas">sofas</option>
//                                     <option value="tables">tables</option>
//                                     <option value="electronics">electronics and accesories</option>
//                                     <option value="wardrobes">wardrobes</option>
//                                     <option value="consoles">consoles</option>
//                               </select>
//                         </div>
//                         <div className="form-input">
//                               <label htmlFor="">Description</label>
//                               <textarea name="description"></textarea>
//                         </div>
//                         <RoundedBorderBtn icon={<FaPlus />} text="Add Product Variation" />

//                         <div className="form-input">
//                               <label htmlFor="">Price</label>
//                               <input type="number" name="price" />
//                         </div>
//                         <div className="form-input">
//                               <label htmlFor="">In-stock</label>
//                               <input type="number" name="stock" />
//                         </div>
//                         <div className="form-input">
//                               <div>
//                                     <label htmlFor="">Featured</label>
//                                     <input type="text" name="featured" />
//                               </div>
//                               <div>
//                                     <label htmlFor="">Pick a background color</label>
//                                     <input type="color" name="color" />
//                               </div>
//                         </div>
//                         <div className="form-input">
//                               <label htmlFor="">Discount</label>
//                               <input type="number" name="discount" />
//                         </div>
//                         <a className="add-image" onClick={() => setIsOpen(true)}>
//                               Add an Image
//                         </a>
//                         <ImageUploadModal
//                               isOpen={isOpen}
//                               onClose={() => setIsOpen(false)}
//                               selectedFile={selectedFile}
//                               setSelectedFile={setSelectedFile}
//                         />
//                         <button disabled={isLoading}>Add product</button>
//                   </form>
//             </div>
//       );
// };

// export default AddProducts;

{
      /* <div className="form-input">
                              <p>Pick colors</p>
                              <div>
                                    {commonColors.map((color) => (
                                          <div className={`color-${color}`} key={color}>
                                                <label htmlFor="">{color}</label>
                                                <input
                                                      type="checkbox"
                                                      name={`color-${color}`}
                                                      onChange={(e) =>
                                                            e.target.checked
                                                                  ? setChoiceColors([...choiceColors, e.target.value])
                                                                  : setChoiceColors(
                                                                          choiceColors.filter(
                                                                                (value) => value !== e.target.value
                                                                          )
                                                                    )
                                                      }
                                                      value={color}
                                                />
                                          </div>
                                    ))}
                              </div>
                        </div> */
}
