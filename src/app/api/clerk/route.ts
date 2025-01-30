import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the necessary fields from the webhook payload
    if (!body?.data || !body.data.email_addresses || !body.data.email_addresses[0]?.email_address) {
      return new Response(JSON.stringify({ message: "Invalid webhook payload: Missing required fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const email = body.data.email_addresses[0].email_address;
    const firstName = body.data.first_name || "Unknown";
    const lastName = body.data.last_name || "";
    const Phone = body.data.phone || null; // Extract phone number (default to null if missing)
    const imageUrl = body.data.image_url || null;
    const id = body.data.id || crypto.randomUUID(); // Generate random ID if missing
    const name = `${firstName} ${lastName}`.trim();

    // Perform upsert operation (create or update user)
    const user = await db.user.upsert({
      where: { id },
      update: { email, name, Phone, imageUrl, updatedAt: new Date() },
      create: {
        id,
        email,
        name,
        Phone,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Respond with success message
    return new Response(
      JSON.stringify({ message: "Webhook processed successfully", user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);

    // Respond with error message
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
// thina ar e
