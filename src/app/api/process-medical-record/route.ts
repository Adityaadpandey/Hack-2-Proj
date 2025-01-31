// api/process-medical-record.ts
import { createPrompt } from "@/prompts/actions";
import axios from "axios";
import fs from "fs/promises";
import { NextResponse } from "next/server";

const OCR_API_KEY = process.env.OCR_API_KEY;
const OCR_API_URL = "https://api.ocr.space/parse/image";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file temporarily
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `./uploads/${fileName}`;
    await fs.writeFile(filePath, buffer);

    // Process with OCR.space
    const ocrFormData = new FormData();
    ocrFormData.append("file", new Blob([buffer]), fileName);
    ocrFormData.append("apikey", OCR_API_KEY!);
    ocrFormData.append("language", "eng");

    const ocrResponse = await axios.post(OCR_API_URL, ocrFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Clean up temporary file
    await fs.unlink(filePath);

    if (ocrResponse.data.OCRExitCode === 1) {
      const extractedText = ocrResponse.data.ParsedResults[0].ParsedText;

      // Process extracted text and map to schema fields
      const processedData = processExtractedText(extractedText);

      // Create prompt with processed data
      const result = await createPrompt({
        ...processedData,
        data_from_source: extractedText,
      });

      return NextResponse.json({ success: true, data: result });
    } else {
      return NextResponse.json(
        { error: ocrResponse.data.ErrorMessage || "OCR processing failed" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing medical record:", error);
    return NextResponse.json(
      { error: "Failed to process medical record" },
      { status: 500 },
    );
  }
}

// Helper function to process extracted text
function processExtractedText(text: string) {
  // Initialize default values
  const data = {
    dob: "",
    gender: "Other" as "Male" | "Female" | "Other",
    bloodGroup: "O+" as const,
    weight: 0,
    height: 0,
    allergies: [] as string[],
    medications: [] as string[],
    existing_condition: [] as string[],
    ongoing_medication: [] as string[],
    lifestyle_info: "",
  };

  // Split text into lines for processing
  const lines = text.split("\n");

  // Process each line and map to appropriate fields
  lines.forEach((line) => {
    const lowerLine = line.toLowerCase();

    // DOB detection
    if (lowerLine.includes("dob") || lowerLine.includes("date of birth")) {
      const dateMatch = line.match(/\d{2}[-/]\d{2}[-/]\d{4}/);
      if (dateMatch) data.dob = dateMatch[0];
    }

    // Gender detection
    if (lowerLine.includes("gender") || lowerLine.includes("sex")) {
      if (lowerLine.includes("male")) data.gender = "Male";
      if (lowerLine.includes("female")) data.gender = "Female";
    }

    // Blood group detection
    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    bloodGroups.forEach((group) => {
      if (line.includes(group)) data.bloodGroup = group as any;
    });

    // Weight detection
    const weightMatch = line.match(/(\d+(\.\d+)?)\s*(kg|pounds|lbs)/i);
    if (weightMatch) {
      let weight = parseFloat(weightMatch[1]);
      if (weightMatch[3].toLowerCase().includes("lb")) {
        weight = weight * 0.453592; // Convert lbs to kg
      }
      data.weight = weight;
    }

    // Height detection
    const heightMatch = line.match(/(\d+(\.\d+)?)\s*(cm|meters|m)/i);
    if (heightMatch) {
      let height = parseFloat(heightMatch[1]);
      if (heightMatch[3].toLowerCase() === "m") {
        height = height * 100; // Convert meters to cm
      }
      data.height = height;
    }

    // Allergies detection
    if (lowerLine.includes("allerg")) {
      const allergiesMatch = line.match(/:(.*)/);
      if (allergiesMatch) {
        data.allergies = allergiesMatch[1].split(",").map((a) => a.trim());
      }
    }

    // Medications detection
    if (lowerLine.includes("medic")) {
      const medsMatch = line.match(/:(.*)/);
      if (medsMatch) {
        data.medications = medsMatch[1].split(",").map((m) => m.trim());
      }
    }
  });

  return data;
}
