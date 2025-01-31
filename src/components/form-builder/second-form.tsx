"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, X } from "lucide-react";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
    dob: Date | null;
    gender: string;
    height: string;
    weight: string;
}

interface MedicalData {
    conditions: string;
    medications: string;
    lifestyle: string;
}

interface DocumentUpload {
    medicalHistory: File | null;
    labReports: File | null;
    insuranceCard: File | null;
}

interface TextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    isSkipped: boolean;
    onSkip: () => void;
    id: string;
}

const TextAreaField: React.FC<TextAreaProps> = ({
    label,
    value,
    onChange,
    placeholder,
    isSkipped,
    onSkip,
    id,
}) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label htmlFor={id} className="text-lg font-medium text-white">
                {label}
            </label>
            {!isSkipped && (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onSkip}
                    className="text-zinc-400 hover:text-zinc-300"
                    aria-label={`Skip ${label}`}
                >
                    Skip <X className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
            )}
        </div>
        {!isSkipped ? (
            <textarea
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-32 p-2 bg-zinc-800 border border-zinc-700 text-white rounded-md
          focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                aria-label={label}
            />
        ) : (
            <div className="text-zinc-500 italic" aria-label={`${label} skipped`}>
                Skipped
            </div>
        )}
    </div>
);

export default function MedicalInformationForm() {
    const [formData, setFormData] = useState<FormData>({
        dob: null,
        gender: "",
        height: "",
        weight: "",
    });

    const [showMedicalForm, setShowMedicalForm] = useState(false);
    const [showDocumentUpload, setShowDocumentUpload] = useState(false);
    const [skipFields, setSkipFields] = useState({
        conditions: false,
        medications: false,
        lifestyle: false,
    });

    const [medicalData, setMedicalData] = useState<MedicalData>({
        conditions: "",
        medications: "",
        lifestyle: "",
    });

    const [documents, setDocuments] = useState<DocumentUpload>({
        medicalHistory: null,
        labReports: null,
        insuranceCard: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowMedicalForm(true);
    };

    const handleMedicalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Here you would typically send the data to your backend
            await submitMedicalData({ ...formData, ...medicalData });
            setShowMedicalForm(false);
            setShowDocumentUpload(true);
        } catch (error) {
            console.error("Failed to submit medical data:", error);
            // Handle error appropriately
        }
    };

    const handleSkip = (field: keyof typeof skipFields) => {
        setSkipFields((prev) => ({
            ...prev,
            [field]: true,
        }));
        setMedicalData((prev) => ({
            ...prev,
            [field]: "Skipped",
        }));
    };

    const textAreaFields: Array<{
        id: keyof MedicalData;
        label: string;
        placeholder: string;
    }> = [
            {
                id: "conditions",
                label: "Existing Conditions",
                placeholder: "Diabetes, hypertension, allergies, etc.",
            },
            {
                id: "medications",
                label: "Ongoing Medications",
                placeholder: "Drugs and dosage for compatibility with advice",
            },
            {
                id: "lifestyle",
                label: "Lifestyle Information",
                placeholder: "Smoking, alcohol consumption, sleep patterns, exercise routines",
            },
        ];

    return (
        <div className="min-h-screen bg-black p-6 flex items-center justify-center">
            <Dialog
                open={showMedicalForm}
                onOpenChange={setShowMedicalForm}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle id="dialog-title" className="text-2xl font-bold text-white">
                            Medical Information
                        </DialogTitle>
                        <DialogDescription
                            id="dialog-description"
                            className="text-zinc-400"
                        >
                            Please provide your medical information or skip if not applicable.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleMedicalSubmit} className="space-y-6 mt-4">
                        {textAreaFields.map(({ id, label, placeholder }) => (
                            <TextAreaField
                                key={id}
                                id={id}
                                label={label}
                                value={medicalData[id]}
                                onChange={(value) =>
                                    setMedicalData((prev) => ({ ...prev, [id]: value }))
                                }
                                placeholder={placeholder}
                                isSkipped={skipFields[id]}
                                onSkip={() => handleSkip(id)}
                            />
                        ))}

                        <Button
                            type="submit"
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white
                transition-colors duration-200 ease-in-out focus:ring-2
                focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                        >
                            Continue to Documents{" "}
                            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Mock function - replace with actual implementation
async function submitMedicalData(data: FormData & MedicalData): Promise<void> {
    // Implementation details
}
