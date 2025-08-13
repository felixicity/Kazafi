import jwt from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

/* 
   This Code Uses the Multer Package to
   Store images locally in the working Directory
 */

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// This function will parse the flattened keys from req.body
// and rebuild the nested object structure.
const parseVariations = (body) => {
      const variations = [];
      const variationMap = {};

      for (const key in body) {
            // We only care about keys that start with 'variations['
            if (key.startsWith("variation-[")) {
                  // Use a regular expression to extract the index and field name
                  const match = key.match(/variation\-\[(\d+)\]\-\[(\w+)\]/);
                  if (match) {
                        const index = parseInt(match[1]);
                        const field = match[2];
                        const value = body[key];

                        // If this is the first time we see this index, create a new variation object
                        if (!variationMap[index]) {
                              variationMap[index] = {};
                              variations.push(variationMap[index]);
                        }

                        variationMap[index][field] = value;
                  }
            }
      }

      // Ensure variations are in the correct order based on their index
      return variations.sort((a, b) => a.index - b.index);
};

const parseImageVariations = async (files) => {
      const filesMap = {};

      try {
            // Processing the Uploaded files
            const uploadPromises = files.map((file) => {
                  const b64 = Buffer.from(file.buffer).toString("base64");
                  const dataURI = `data:${file.mimetype};base64,${b64}`;
                  return cloudinary.uploader.upload(dataURI, { folder: "kazafi-products" });
            });

            const cloudinaryResponses = await Promise.all(uploadPromises);

            files.forEach((file, index) => {
                  const match = file.fieldname.match(/variation\-\[(\d+)\]\-\[images\]/);
                  // console.log(match);
                  if (match) {
                        const variationIndex = parseInt(match[1]);
                        if (!filesMap[variationIndex]) {
                              filesMap[variationIndex] = [];
                        }
                        filesMap[variationIndex].push(cloudinaryResponses[index].secure_url);
                  }
            });
            return filesMap;
      } catch (error) {
            console.log(`Could not upload images: ${error}`);
      }
};

/* 
    This Code Uses the JWT Package f
    or generating Tokens to users
 */

// This helper function generates a new token
const generateToken = (user) => {
      return jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d", // Token expiration time
      });
};

export { generateToken, upload, parseVariations, parseImageVariations };
