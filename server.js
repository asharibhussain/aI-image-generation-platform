// import express from "express";
// import Replicate from "replicate";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import multer from "multer";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const port = 5000;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(__dirname, "public/uploads");
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// app.post("/api/generate", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Image file is required" });
//     }

//     const prompt = req.body.prompt;
//     const style = req.body.style || "default";

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const imageUrl = `https://da3c-103-59-216-42.ngrok-free.app/uploads/${req.file.filename}`;

//     const fullPrompt = `${prompt}, style: ${style}`;

//     // Call replicate with image URL and prompt
//     const output = await replicate.run(
//       "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
//       {
//         input: {
//             image: imageUrl,
//             prompt: fullPrompt,
//             guidance_scale: 15,
//             negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
//             prompt_strength: 0.8,
//             num_inference_steps: 50
//         }
//       }
//     );
    
//     res.json({ output: output.url() });
//   } catch (error) {
//     res.status(500).json({ error: error.message || "Failed to generate image" });
//   }
// });

// app.listen(port, () => {
//   console.log(`✅ Backend listening on http://localhost:${port}`);
// });
import express from "express";
import Replicate from "replicate";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "public/uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.post("/api/generate", upload.single("image"), async (req, res) => {
  try {
    // 🟢 Step 1: Get API key from headers
    const apiKey = req.headers["x-api-key"];
    console.log("🔑 Received API Key:", apiKey);

    if (!apiKey) {
      return res.status(401).json({ error: "Missing API key in headers" });
    }

    // 🟢 Step 2: Create a Replicate instance using the received API key
    const replicate = new Replicate({ auth: apiKey });

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const prompt = req.body.prompt;
    const style = req.body.style || "default";

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // const imageUrl = `https://3d62-103-59-216-42.ngrok-free.app/uploads/${req.file.filename}`;
      const imageUrl = `https://ai-image-1s0v.onrender.com/uploads/${req.file.filename}`;

    const fullPrompt = `${prompt}, style: ${style}`;

    // 🟢 Step 3: Run Replicate with the image and prompt
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      {
        input: {
          image: imageUrl,
          prompt: fullPrompt,
          guidance_scale: 15,
          negative_prompt:
            "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      }
    );

    res.json({ output: output.url() });
  } catch (error) {
    console.error("❌ Error generating image:", error);
    res.status(500).json({ error: error.message || "Failed to generate image" });
  }
});

app.listen(port, () => {
  // console.log(`✅ Backend listening on https://ai-image-1s0v.onrender.com:${port}`);
    console.log(`🌐 Live URL: https://ai-image-1s0v.onrender.com`);
});
