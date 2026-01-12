import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";


export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [apiKeyData, setApiKeyData] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchActiveKey = async () => {
      const q = query(collection(db, "api_config"), where("status", "==", "active"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const keyDoc = snapshot.docs[0];
        setApiKeyData({ id: keyDoc.id, ...keyDoc.data() });
      }
    };
    fetchActiveKey();
  }, []);

  const incrementUsage = async () => {
    if (apiKeyData?.id) {
      const keyRef = doc(db, "api_config", apiKeyData.id);
      await updateDoc(keyRef, {
        count: (apiKeyData.count || 0) + 1,
      });
      setApiKeyData((prev) => ({
        ...prev,
        count: (prev.count || 0) + 1,
      }));
    }
  };

  const handleGenerate = async () => {
    if (!prompt || prompt.trim().length < 5) {
      setError("Please enter a more descriptive prompt.");
      return;
    }

    if (!apiKeyData?.api_key || !apiKeyData?.api_host) {
      setError("No active API key is configured.");
      return;
    }

    if (apiKeyData?.count > 24) {
      setError("Limit reached for active API key.");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    const encodedParams = new URLSearchParams();
    encodedParams.set("prompt", prompt);
    encodedParams.set("width", "1024");
    encodedParams.set("height", "1024");
    encodedParams.set("seed", "918440");
    encodedParams.set("model", "flux");

    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php",
      headers: {
        "x-rapidapi-key": apiKeyData.api_key,
        "x-rapidapi-host": apiKeyData.api_host,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: encodedParams,
      responseType: "blob",
    };

    try {
      const response = await axios.request(options);
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectUrl);

      // Convert to base64
      const base64 = await convertBlobToBase64(imageBlob);

      // Save to Firestore
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "images"), {
          user_id: user.uid,
          prompt: prompt,
          image: base64,
          createdAt: new Date(),
        });
        // await incrementUsage();
        await incrementUsage();
      }
    } catch (err) {
      setError("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  const convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  return (
    <div className="w-full max-w-none mx-auto mt-10 p-4 border rounded">
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="5"
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-black opacity-80"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <p className="mb-2 font-semibold">Generated Image:</p>
          <img src={imageUrl} alt="Generated" className="w-full rounded border" />
        </div>
      )}
    </div>
  );
}
