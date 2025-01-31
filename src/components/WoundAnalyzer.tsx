"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Camera } from "lucide-react";
import React, { useState } from "react";

// Replace with your actual Gemini API Key
const GEMINI_API_KEY = "AIzaSyBOjzEBpLbC-qud_89vS5m_FAsnP9LBUXw";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const WoundAnalyzer = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyzeImage = async (file: File) => {
        try {
            setAnalyzing(true);
            setError(null);
            setAnalysis(null);

            // Validate file type
            if (!file.type.startsWith("image/")) {
                setError("Please upload a valid image file.");
                setAnalyzing(false);
                return;
            }

            // Convert image to Base64
            const base64String = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve(reader.result.toString().split(",")[1]); // Extract Base64 part
                    } else {
                        reject("Failed to read file");
                    }
                };
                reader.readAsDataURL(file);
            });

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // API request to Gemini AI
            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are a medical professional. Analyze this wound and provide a simple, clear explanation in normal English. Avoid any Markdown formatting.`,
                            },
                            {
                                inlineData: {
                                    mimeType: file.type, // Use correct MIME type dynamically
                                    data: base64String,
                                },
                            },
                        ],
                    },
                ],
            });

            // Extract AI-generated text & remove Markdown formatting
            const rawText =
                result.response?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join("\n") ||
                "No analysis provided.";

            // Remove unwanted Markdown symbols
            const cleanedText = rawText
                .replace(/\*\*/g, "") // Remove bold (**)
                .replace(/-/g, "") // Remove list bullets (-)
                .replace(/_/g, ""); // Remove italic (_)

            setAnalysis(cleanedText);
        } catch (err: any) {
            console.error("Analysis Error:", err);
            setError(`Failed to analyze image. ${err.message || "Please try again."}`);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Preview Image
        const reader = new FileReader();
        reader.onload = (e) => setSelectedImage(e.target?.result as string);
        reader.readAsDataURL(file);

        // Analyze Image
        analyzeImage(file);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Medical Disclaimer */}
                <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                    <p className="font-bold">⚕️ Medical Disclaimer</p>
                    <p>This is an AI-powered analysis tool for educational purposes only.
                        Always consult a healthcare professional for medical advice.</p>
                </div>

                {/* Upload Section */}
                <div className="mb-6">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-12 h-12 mb-4 text-gray-400" />
                            <p className="text-sm text-gray-500">Upload wound image for analysis</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                {/* Image Preview */}
                {selectedImage && (
                    <div className="mb-6">
                        <img src={selectedImage} alt="Wound preview" className="max-h-64 mx-auto object-contain rounded-lg" />
                    </div>
                )}

                {/* Loading State */}
                {analyzing && (
                    <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg">
                        <p className="font-bold">Analyzing Image...</p>
                        <p>Please wait while our AI analyzes the wound.</p>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Analysis Results */}
                {analysis && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
                        <p>{analysis}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoundAnalyzer;
