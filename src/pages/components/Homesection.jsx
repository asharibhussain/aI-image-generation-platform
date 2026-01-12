import React, { useState, useRef } from 'react';
import {
     Upload,
     Image,
     Sparkles,
     Download,
     RefreshCw,
     Palette,
     Wand2,
     Camera,
     Settings
} from 'lucide-react';

const HomeSection = () => {
     const [selectedImage, setSelectedImage] = useState(null);
     const [selectedStyle, setSelectedStyle] = useState('');
     const [isGenerating, setIsGenerating] = useState(false);
     const [generatedImage, setGeneratedImage] = useState(null);
     const fileInputRef = useRef(null);

     const styles = [
          { value: 'photorealistic', label: 'Photorealistic', color: 'from-blue-500 to-cyan-500' },
          { value: 'artistic', label: 'Artistic', color: 'from-purple-500 to-pink-500' },
          { value: 'anime', label: 'Anime Style', color: 'from-pink-500 to-rose-500' },
          { value: 'vintage', label: 'Vintage', color: 'from-amber-500 to-orange-500' },
          { value: 'futuristic', label: 'Futuristic', color: 'from-cyan-500 to-blue-500' },
          { value: 'watercolor', label: 'Watercolor', color: 'from-green-500 to-teal-500' },
          { value: 'oil-painting', label: 'Oil Painting', color: 'from-red-500 to-pink-500' },
          { value: 'digital-art', label: 'Digital Art', color: 'from-violet-500 to-purple-500' }
     ];

     const handleFileSelect = (event) => {
          const file = event.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onload = (e) => {
                    setSelectedImage(e.target.result);
               };
               reader.readAsDataURL(file);
          }
     };

     const handleGenerate = () => {
          if (!selectedImage || !selectedStyle) return;

          setIsGenerating(true);
          // Simulate AI generation process
          setTimeout(() => {
               setGeneratedImage(selectedImage); // In real app, this would be the AI-generated result
               setIsGenerating(false);
          }, 3000);
     };

     const resetForm = () => {
          setSelectedImage(null);
          setSelectedStyle('');
          setGeneratedImage(null);
          if (fileInputRef.current) {
               fileInputRef.current.value = '';
          }
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
               {/* Background Effects */}
               <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
               </div>

               <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                         <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium mb-6">
                              <Sparkles className="w-4 h-4 mr-2" />
                              AI-POWERED CREATION STUDIO
                         </div>

                         <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                              <span className="text-gray-300">Design Your </span>
                              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                   Dream Space
                              </span>
                         </h1>

                         <p className="text-slate-300 text-xl max-w-2xl mx-auto">
                              Smart Furnish helps you visualize and customize interiors with AI-powered tools. Start creating now!
                         </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                         {/* Upload Section */}
                         <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                              <div className="flex items-center mb-6">
                                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                                        <Upload className="w-6 h-6 text-white" />
                                   </div>
                                   <h2 className="text-2xl font-semibold text-black-300">Upload Your Image</h2>
                              </div>

                              <div
                                   className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group"
                                   onClick={() => fileInputRef.current?.click()}
                              >
                                   <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                   />

                                   {!selectedImage ? (
                                        <div className="space-y-4">
                                             <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                                  <Camera className="w-8 h-8 text-purple-400" />
                                             </div>
                                             <div>
                                                  <p className="text-gray-700 text-lg font-medium mb-2">Choose File</p>
                                                  <p className="text-slate-400 text-sm">Drop your image here or click to browse</p>
                                             </div>
                                        </div>
                                   ) : (
                                        <div className="space-y-4">
                                             <div className="relative inline-block">
                                                  <img
                                                       src={selectedImage}
                                                       alt="Selected"
                                                       className="w-full max-w-sm h-48 object-cover rounded-xl shadow-lg"
                                                  />
                                                  <button
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedImage(null);
                                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                                       }}
                                                       className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-black rounded-full flex items-center justify-center transition-colors"
                                                  >
                                                       ×
                                                  </button>
                                             </div>
                                             <p className="text-black-400 font-medium">Image uploaded successfully!</p>
                                        </div>
                                   )}
                              </div>

                              {selectedImage && (
                                   <div className="mt-6">
                                        <h3 className="text-gray-300 font-medium mb-2">Selected Image Preview</h3>
                                        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                                             <img
                                                  src={selectedImage}
                                                  alt="Preview"
                                                  className="w-full h-40 object-cover rounded-lg"
                                             />
                                        </div>
                                   </div>
                              )}
                         </div>

                         {/* Style Selection */}
                         <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                              <div className="flex items-center mb-6">
                                   <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                                        <Palette className="w-6 h-6 text-white" />
                                   </div>
                                   <h2 className="text-2xl font-semibold text-black-300">Choose a Style</h2>
                              </div>

                              <div className="grid grid-cols-2 gap-3 mb-6">
                                   {styles.map((style) => (
                                        <button
                                             key={style.value}
                                             onClick={() => setSelectedStyle(style.value)}
                                             className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedStyle === style.value
                                                  ? 'border-purple-500 bg-purple-500/20'
                                                  : 'border-slate-600/50 hover:border-purple-500/50 bg-slate-700/30'
                                                  }`}
                                        >
                                             <div className={`w-8 h-8 bg-gradient-to-r ${style.color} rounded-lg mb-2`}></div>
                                             <p className="text-black-300 font-medium text-sm">{style.label}</p>
                                        </button>
                                   ))}
                              </div>

                              {selectedStyle && (
                                   <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                                        <p className="text-purple-400 font-medium mb-1">Selected Style:</p>
                                        <p className="text-black-300">{styles.find(s => s.value === selectedStyle)?.label}</p>
                                   </div>
                              )}
                         </div>
                    </div>

                    {/* Generate Button */}
                    <div className="text-center mb-8">
                         <button
                              onClick={handleGenerate}
                              disabled={!selectedImage || !selectedStyle || isGenerating}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-700 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/30 transform hover:scale-105 disabled:scale-100 transition-all duration-300 flex items-center justify-center mx-auto min-w-64"
                         >
                              {isGenerating ? (
                                   <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Generating Styled Room...
                                   </>
                              ) : (
                                   <>
                                        <Wand2 className="w-5 h-5 mr-2" />
                                        Generate Styled Room
                                   </>
                              )}
                         </button>

                         {(!selectedImage || !selectedStyle) && (
                              <p className="text-slate-400 text-sm mt-2">
                                   Please upload an image and select a style to continue
                              </p>
                         )}
                    </div>

                    {/* Results Section */}
                    {(isGenerating || generatedImage) && (
                         <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                              <div className="flex items-center justify-between mb-6">
                                   <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                                             <Image className="w-6 h-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-semibold text-black-300">Generated Result</h2>
                                   </div>

                                   {generatedImage && (
                                        <div className="flex space-x-3">
                                             <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                                                  <Download className="w-4 h-4 mr-2" />
                                                  Download
                                             </button>
                                             <button
                                                  onClick={resetForm}
                                                  className="bg-slate-600 hover:bg-slate-700 text-black px-4 py-2 rounded-lg flex items-center transition-colors"
                                             >
                                                  <Settings className="w-4 h-4 mr-2" />
                                                  New Project
                                             </button>
                                        </div>
                                   )}
                              </div>

                              {isGenerating ? (
                                   <div className="text-center py-16">
                                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse">
                                             <Sparkles className="w-10 h-10 text-black animate-spin" />
                                        </div>
                                        <h3 className="text-gray-300 text-xl font-semibold mb-2">Creating Magic...</h3>
                                        <p className="text-slate-400">Our AI is transforming your image with the selected style</p>
                                        <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto mt-6">
                                             <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                                        </div>
                                   </div>
                              ) : generatedImage && (
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                             <h3 className="text-black-300 font-medium mb-3">Original Image</h3>
                                             <img
                                                  src={selectedImage}
                                                  alt="Original"
                                                  className="w-full h-64 object-cover rounded-xl border border-slate-600/30"
                                             />
                                        </div>
                                        <div>
                                             <h3 className="text-black-300 font-medium mb-3">AI Generated Result</h3>
                                             <img
                                                  src={generatedImage}
                                                  alt="Generated"
                                                  className="w-full h-64 object-cover rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20"
                                             />
                                        </div>
                                   </div>
                              )}
                         </div>
                    )}
               </div>
          </div>
     );
};

export default HomeSection;