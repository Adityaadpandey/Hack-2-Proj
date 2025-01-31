"use client";

import { cn } from "@/lib/utils";
import { generateChatResponse, processImage } from "@/prompts";
import { AnimatePresence, motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Chat({
  placeholders,
  onChange,
  onSubmit,
  setResult,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setResult: (setResult: string | ((prev: string) => string)) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [placeholders]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() && !image) return;

    const userMessage = value.trim();
    setIsLoading(true);

    try {
      // Add user message to result
      setResult((prev) =>
        `${prev ? "\n\n" : ""}User: ${userMessage}${image ? " [Attached Image]" : ""}`
      );

      // Add Assistant prefix
      setResult((prev) => prev + "\n\nAssistant: ");

      const formData = new FormData(formRef.current!);

      if (image) {
        // Convert base64 image back to file
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("image", blob, "image.jpg");

        // Process image with text
        const imageResult = await processImage(formData);
        if (imageResult.success) {
          setResult((prev) => prev + imageResult.response);
        } else {
          throw new Error(imageResult.error);
        }
      } else {
        // Handle text-only response
        const stream = await generateChatResponse(formData);
        const reader = stream.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setResult((prev) => prev + value);
        }
      }

      // Clear input and image after successful submission
      setValue("");
      setImage(null);
      formRef.current?.reset();
    } catch (error) {
      console.error("Error:", error);
      setResult((prev) => prev + "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      className={cn(
        "w-full relative max-w-xl mx-auto h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        value && "bg-gray-800"
      )}
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center w-full h-full">
        <input
          name="prompt"
          onChange={(e) => {
            setValue(e.target.value);
            onChange && onChange(e);
          }}
          ref={inputRef}
          value={value}
          type="text"
          className="w-full relative text-sm sm:text-base z-50 border-none text-white bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-12 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-700 transition duration-200 flex items-center justify-center"
        >
          <Camera className="h-4 w-4 text-gray-400" />
        </button>

        <button
          disabled={(!value.trim() && !image) || isLoading}
          type="submit"
          className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-800 bg-blue-500 transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white h-4 w-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Image preview */}
      {image && (
        <div className="absolute -top-20 right-2 w-16 h-16 rounded-lg overflow-hidden shadow-lg">
          <img
            src={image}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Placeholder animation */}
      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && !image && (
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="text-gray-400 text-sm sm:text-base font-normal pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
