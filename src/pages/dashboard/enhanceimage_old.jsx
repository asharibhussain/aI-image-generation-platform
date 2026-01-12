import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function EnhanceImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [style, setStyle] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(URL.createObjectURL(file));
    }
  };
  
  const handleGenerate = async () => {
      if (!originalImage || !style) return alert("Please upload image and select style");

      setTimeout(() => {
          setEnhancedImage(originalImage);
          localStorage.setItem("enhanced-image", originalImage);

          // Save to gallery
          const gallery = JSON.parse(localStorage.getItem("gallery")) || [];
          gallery.push({ url: originalImage, style });
          localStorage.setItem("gallery", JSON.stringify(gallery));
      }, 1500);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="px-4 pb-4">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Enhance Your Room Image
          </Typography>

          {/* Upload Input & Style Select */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full"
            />

            <Select label="Select Style" value={style} onChange={(val) => setStyle(val)}>
              <Option value="modern">Modern</Option>
              <Option value="minimalist">Minimalist</Option>
              <Option value="rustic">Rustic</Option>
            </Select>

            <Button onClick={handleGenerate} className="w-[350px] px-0">Generate Image</Button>
          </div>

          {/* Image Preview */}
          {originalImage && enhancedImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <Typography variant="small" className="mb-2">Original Image</Typography>
                <img src={originalImage} alt="Original" className="rounded-lg shadow-md" />
              </div>
              <div>
                <Typography variant="small" className="mb-2">Enhanced Image ({style})</Typography>
                <img src={enhancedImage} alt="Enhanced" className="rounded-lg shadow-md" />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
