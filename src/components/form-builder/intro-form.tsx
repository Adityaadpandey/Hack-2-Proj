"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Calendar,
  RotateCcw,
  Ruler,
  User,
  Weight,
} from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
  dob: Date | null;
  gender: string;
  height: string;
  weight: string;
}

interface DocumentUpload {
  medicalHistory: File | null;
  labReports: File | null;
  insuranceCard: File | null;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    dob: null,
    gender: "",
    height: "",
    weight: "",
  });
  const [dialog, setDialog] = useState(false);

  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [documents, setDocuments] = useState<DocumentUpload>({
    medicalHistory: null,
    labReports: null,
    insuranceCard: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDocumentUpload(true);
  };

  const handleReset = () => {
    setFormData({
      dob: null,
      gender: "",
      height: "",
      weight: "",
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: keyof DocumentUpload,
  ) => {
    const file = event.target.files?.[0] || null;
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Documents submitted:", documents);
    // Handle document submission here
    setShowDocumentUpload(false);
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl shadow-2xl shadow-purple-500/10 p-8 space-y-8 border border-zinc-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Health Profile
          </h1>
          <p className="text-zinc-400">
            Please provide your basic health information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            {/* Date of Birth */}
            <div className="relative">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5 z-10" />
                <DatePicker
                  selected={formData.dob}
                  onChange={(date) => setFormData({ ...formData, dob: date })}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select your date of birth"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-zinc-500"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Gender
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white appearance-none"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Height (inches)
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  placeholder="Enter height in inches"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-zinc-500"
                  required
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder="Enter weight in kg"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-zinc-500"
                  required
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handleReset}
            >
              Reset
              <RotateCcw className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={showDocumentUpload} onOpenChange={setShowDocumentUpload}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Health Documents</DialogTitle>
            <DialogDescription>
              Please upload the following documents to complete your health
              profile
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              handleDocumentSubmit(e);
              setDialog(true);
            }}
            className="space-y-6 mt-4"
          >
            <div className="space-y-6">
              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Existing Conditions
                </label>
                <div className="relative">
                  <textarea
                    className="w-full h-32 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-zinc-500"
                    placeholder="Enter your medical history"
                    value={documents.medicalHistory || ""}
                    onChange={(e) =>
                      setDocuments((prev) => ({
                        ...prev,
                        medicalHistory: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {[
                      "known allergies",
                      "Diabetic",
                      "Hypertension",
                      "Asthma",
                    ].map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className="px-2 py-1 text-white rounded-lg border border-zinc-700 bg-transparent hover:bg-zinc-700 transition-colors"
                        onClick={() =>
                          setDocuments((prev) => ({
                            ...prev,
                            medicalHistory: prev.medicalHistory
                              ? `${prev.medicalHistory}\n${item}`
                              : item,
                          }))
                        }
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="Ongo">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Ongoing Medications
                </label>
                <div className="relative">
                  <textarea
                    className="w-full h-32 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-zinc-500"
                    placeholder="Ongoing Medications"
                    value={documents.ongoinghistory || ""}
                    onChange={(e) =>
                      setDocuments((prev) => ({
                        ...prev,
                        ongoinghistory: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Lab Reports */}
              {/* <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Lab Reports</label>
                                <div className="relative">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Activity className="w-8 h-8 mb-3 text-zinc-500" />
                                                    <p className="text-sm text-zinc-400">
                                                        {documents.labReports ? documents.labReports.name : "Upload lab reports"}
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e, 'labReports')}
                                                    accept=".pdf,.jpg,.png"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

              {/* Current Lifestyle */}

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Lifestyle Information
                </label>
                <div className="relative">
                  <textarea
                    className="w-full h-32 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-zinc-500"
                    placeholder="Enter your medical history"
                    value={documents.lifestyle_info || ""}
                    onChange={(e) =>
                      setDocuments((prev) => ({
                        ...prev,
                        lifestyle_info: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {["Smoking", "Drinking", "Drugs", "Excercise"].map(
                      (item, index) => (
                        <button
                          key={index}
                          type="button"
                          className="px-2 py-1 text-white rounded-lg border border-zinc-700 bg-transparent hover:bg-zinc-700 transition-colors"
                          onClick={() =>
                            setDocuments((prev) => ({
                              ...prev,
                              lifestyle_info: prev.lifestyle_info
                                ? `${prev.lifestyle_info}\n${item}`
                                : item,
                            }))
                          }
                        >
                          {item}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Submit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={showDocumentUpload}
              >
                Reset
                <RotateCcw className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={dialog} onOpenChange={setShowDocumentUpload}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Your documents have been successfully uploaded.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
