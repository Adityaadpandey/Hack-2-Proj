'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import z from "zod";

const promptSchema = z.object({
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    gender: z.enum(["Male", "Female", "Other"]),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    weight: z.number().positive(),
    height: z.number().positive(),
    allergies: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    existing_condition: z.array(z.string()).optional(),
    ongoing_medication: z.array(z.string()).optional(),
    lifestyle_info: z.string().optional(),
    data_from_source: z.string().optional(),
});

interface PromptData {
  dob: string;
  gender: string;
  bloodGroup: string;
  weight: number;
  height: number;
  allergies: string[];
  medications: string[];
  existing_condition: string[];
  ongoing_medication: string[];
  lifestyle_info: string;
  data_from_source: string;
}

export async function createPrompt(data: PromptData) {
  const parsedData = promptSchema.parse(data);
 try {
     const {
         dob,
         gender,
         bloodGroup,
         weight,
         height,
         allergies,
         medications,
         existing_condition,
         ongoing_medication,
         lifestyle_info,
         data_from_source
     } = parsedData;

     const { userId } = await auth();
     if (!userId) {
         throw new Error("User not found");
     }
     return await db.report.create({
         data: {
             user: {
                 connect: {
                     id: userId,
                 }
             },
             dob,
             gender,
             bloodGroup,
             weight,
             height,
             allergies,
             medications,
             existing_condition,
             ongoing_medication,
             lifestyle_info,
             data_from_source
         },
     });

 } catch  {
    console.error("Error creating prompt");
 }



}
