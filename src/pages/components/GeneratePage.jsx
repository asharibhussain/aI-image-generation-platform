import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
     getDocs,
     query,
     where,
     collection,
     addDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const styles = [
     "Modern",
     "Rustic",
     "Bohemian",
     "Minimalist",
     "Industrial",
     "Scandinavian",
];

const GeneratePage = () => {
     const [loading, setLoading] = useState(false);
     const [outputUrl, setOutputUrl] = useState(null);
     const [error, setError] = useState(null);
     const [file, setFile] = useState(null);
     const [prompt, setPrompt] = useState("");
     const [style, setStyle] = useState(styles[0]);
     const auth = getAuth();
     const db = getFirestore();

     const generateImage = async () => {
          if (!file) return setError("Please select an image to upload.");
          if (file.size > 3 * 1024 * 1024) return setError("Image size must be less than 1 MB.");
          if (!style) return setError("Please select a style.");
          if (!prompt || prompt.trim().length < 5) return setError("Please enter a more descriptive prompt.");

          setLoading(true);
          setError(null);
          setOutputUrl(null);

          try {
               const keySnapshot = await getDocs(
                    query(collection(db, "replicate_keys"), where("status", "==", "active"))
               );

               if (keySnapshot.empty) {
                    throw new Error("No active API key found.");
               }

               const apiKey = keySnapshot.docs[0].data().api_key;

               const formData = new FormData();
               formData.append("image", file);
               formData.append("prompt", prompt);
               formData.append("style", style);

               // const response = await axios.post("http://localhost:5000/api/generate", formData, {
               const response = await axios.post("https://ai-image-1s0v.onrender.com/api/generate", formData, {
                    headers: {
                         "Content-Type": "multipart/form-data",
                         "x-api-key": apiKey,
                    },
               });

               // ✅ Step 4: Convert and save image
               const imageResponse = await fetch(response.data.output);

               let imageBlob = await imageResponse.blob();
               if (imageBlob.size > 1024 * 1024) {
                    // Try compressing
                    const compressedBlob = await compressImageBlob(imageBlob, 0.7);
                    if (compressedBlob && compressedBlob.size <= 1024 * 1024) {
                         imageBlob = compressedBlob;
                    } else {
                         setOutputUrl(response.data.output);
                         setError("Generated image is too large to store in database (over 1MB) even after compression.");
                         return;
                    }
               }

               const base64 = await convertBlobToBase64(imageBlob);
               const user = auth.currentUser;
               if (user) {
                    await addDoc(collection(db, "images"), {
                         user_id: user.uid,
                         prompt: prompt,
                         image: base64,
                         type: style,
                         createdAt: new Date(),
                    });
               }

               setOutputUrl(response.data.output);
          } catch (err) {
               console.error(err);
               setError("Failed to generate image.");
          }

          setLoading(false);
     };

     const convertBlobToBase64 = (blob) =>
          new Promise((resolve, reject) => {
               const reader = new FileReader();
               reader.onloadend = () => resolve(reader.result);
               reader.onerror = reject;
               reader.readAsDataURL(blob);
          });

     const compressImageBlob = (blob, quality = 0.7) => {
          return new Promise((resolve) => {
               const img = new Image();
               img.onload = () => {
               const canvas = document.createElement("canvas");
               canvas.width = img.width;
               canvas.height = img.height;
               const ctx = canvas.getContext("2d");
               ctx.drawImage(img, 0, 0);
               canvas.toBlob((compressedBlob) => {
                    resolve(compressedBlob);
               }, "image/jpeg", quality); // convert to JPEG
               };
               img.src = URL.createObjectURL(blob);
          });
     };

     return (
          // <div className="min-h-screen  to-black py-12 px-4 sm:px-6 lg:px-8">
          //      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-10">
          //           <h1 className="text-4xl font-extrabold text-white mb-12 text-center tracking-wide">
          //                Image to Image Generator
          //           </h1>

          //           <div className="grid grid-cols-12 gap-8">
          //                {/* Upload */}
          //                <div className="col-span-12 md:col-span-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
          //                     <label className="text-white font-semibold mb-2">Upload Image</label>
          //                     <input
          //                          type="file"
          //                          accept="image/*"
          //                          onChange={(e) => setFile(e.target.files[0])}
          //                          className="block w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          //                     />
          //                </div>

          //                {/* Style Select */}
          //                <div className="col-span-12 md:col-span-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
          //                     <label className="text-white font-semibold mb-2">Select Style</label>
          //                     <select
          //                          value={style}
          //                          onChange={(e) => setStyle(e.target.value)}
          //                          className="w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          //                     >
          //                          {styles.map((styleOption) => (
          //                               <option key={styleOption} value={styleOption} className="text-black">
          //                                    {styleOption}
          //                               </option>
          //                          ))}
          //                     </select>
          //                </div>

          //                {/* Prompt */}
          //                <div className="col-span-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
          //                     <label className="text-white font-semibold mb-2">Prompt Description</label>
          //                     <textarea
          //                          rows={4}
          //                          value={prompt}
          //                          onChange={(e) => setPrompt(e.target.value)}
          //                          placeholder="Enter your detailed prompt description..."
          //                          className="resize-none w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          //                     />
          //                </div>

          //                {/* Generate Button */}
          //                <div className="col-span-12 text-center">
          //                     <button
          //                          onClick={generateImage}
          //                          disabled={loading}
          //                          className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 px-12 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          //                     >
          //                          {loading ? "Generating..." : "Generate Image"}
          //                     </button>
          //                </div>

          //                {/* Error Message */}
          //                {error && (
          //                     <div className="col-span-12">
          //                          <div className="rounded-lg bg-red-700/80 text-red-100 px-5 py-3 border border-red-300/50 shadow-sm">
          //                               {error}
          //                          </div>
          //                     </div>
          //                )}

          //                {/* Input Image */}
          //                {file && (
          //                     <div className="col-span-12 md:col-span-6">
          //                          <h2 className="text-white font-semibold mb-4 text-lg">Input Image</h2>
          //                          <div className="rounded-xl overflow-hidden border border-white/30 shadow-lg">
          //                               <img
          //                                    src={URL.createObjectURL(file)}
          //                                    alt="Input Preview"
          //                                    className="w-full object-cover max-h-80"
          //                               />
          //                          </div>
          //                     </div>
          //                )}

          //                {/* Output Image */}
          //                {outputUrl && (
          //                     <div className="col-span-12 md:col-span-6">
          //                          <h2 className="text-white font-semibold mb-4 text-lg">Generated Image</h2>
          //                          <div className="rounded-xl overflow-hidden border border-white/30 shadow-lg">
          //                               <img
          //                                    src={outputUrl}
          //                                    alt="Generated Output"
          //                                    className="w-full object-cover max-h-80"
          //                               />
          //                          </div>
          //                     </div>
          //                )}
          //           </div>
          //      </div>
          // </div>
          <div className="min-h-screen overflow-x-hidden bg-gradient-to-b  py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 md:p-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 sm:mb-12 text-center tracking-wide">
                         Image to Image Generator
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                         {/* Upload */}
                         <div className="col-span-12 lg:col-span-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
                              <label className="text-white font-semibold mb-2">Upload Image</label>
                              <input
                                   type="file"
                                   accept="image/*"
                                   onChange={(e) => setFile(e.target.files[0])}
                                   className="block w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                              />
                         </div>

                         {/* Style Select */}
                         <div className="col-span-12 lg:col-span-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
                              <label className="text-white font-semibold mb-2">Select Style</label>
                              <select
                                   value={style}
                                   onChange={(e) => setStyle(e.target.value)}
                                   className="w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                              >
                                   {styles.map((styleOption) => (
                                        <option key={styleOption} value={styleOption} className="text-black">
                                             {styleOption}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         {/* Prompt */}
                         <div className="col-span-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
                              <label className="text-white font-semibold mb-2">Prompt Description</label>
                              <textarea
                                   rows={4}
                                   value={prompt}
                                   onChange={(e) => setPrompt(e.target.value)}
                                   placeholder="Enter your detailed prompt description..."
                                   className="resize-none w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                              />
                         </div>

                         {/* Generate Button */}
                         <div className="col-span-12 text-center">
                              <button
                                   onClick={generateImage}
                                   disabled={loading}
                                   className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 px-8 sm:px-12 py-3 sm:py-4 font-semibold text-white shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                   {loading ? "Generating..." : "Generate Image"}
                              </button>
                         </div>

                         {/* Error Message */}
                         {error && (
                              <div className="col-span-12">
                                   <div className="rounded-lg bg-red-700/80 text-red-100 px-5 py-3 border border-red-300/50 shadow-sm">
                                        {error}
                                   </div>
                              </div>
                         )}

                         {/* Input Image */}
                         {file && (
                              <div className="col-span-12 lg:col-span-6">
                                   <h2 className="text-white font-semibold mb-4 text-lg">Input Image</h2>
                                   <div className="rounded-xl overflow-hidden border border-white/30 shadow-lg">
                                        <img
                                             src={URL.createObjectURL(file)}
                                             alt="Input Preview"
                                             className="w-full max-w-full object-cover max-h-80"
                                        />
                                   </div>
                              </div>
                         )}

                         {/* Output Image */}
                         {outputUrl && (
                              <div className="col-span-12 lg:col-span-6">
                                   <h2 className="text-white font-semibold mb-4 text-lg">Generated Image</h2>
                                   <div className="rounded-xl overflow-hidden border border-white/30 shadow-lg">
                                        <img
                                             src={outputUrl}
                                             alt="Generated Output"
                                             className="w-full max-w-full object-cover max-h-80"
                                        />
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default GeneratePage;
