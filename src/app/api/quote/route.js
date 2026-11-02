import { NextResponse } from "next/server";

/**
 * Group Flight Quote API Handler
 * Validates request data and processes group flight quote applications.
 */
export async function POST(request) {
  try {
    const data = await request.json();

    const {
      fullName,
      email,
      phone,
      origin,
      destination,
      departureDate,
      travellers
    } = data;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!origin || typeof origin !== "string" || !origin.trim()) {
      return NextResponse.json(
        { success: false, error: "Departure origin is required." },
        { status: 400 }
      );
    }

    if (!destination || typeof destination !== "string" || !destination.trim()) {
      return NextResponse.json(
        { success: false, error: "Destination is required." },
        { status: 400 }
      );
    }

    if (!departureDate || typeof departureDate !== "string") {
      return NextResponse.json(
        { success: false, error: "Departure date is required." },
        { status: 400 }
      );
    }

    const travellersCount = parseInt(travellers, 10);
    if (isNaN(travellersCount) || travellersCount < 10) {
      return NextResponse.json(
        { success: false, error: "Group airline bookings require a minimum of 10 passengers." },
        { status: 400 }
      );
    }

    // Optional environment variable configuration
    const flightApiKey = process.env.FLIGHT_API_KEY;
    const emailServiceKey = process.env.EMAIL_SERVICE_KEY;

    /**
     * TODO: External Flight API Integration
     * 1. Send lead to GDS / Airline Direct Connect (Amadeus, Sabre, or Airline Group Desk API)
     *    using process.env.FLIGHT_API_KEY.
     * 2. Send automated notification to internal group flight desk agents.
     * 3. Send immediate confirmation receipt email to the client using process.env.EMAIL_SERVICE_KEY.
     */
    if (process.env.NODE_ENV !== "production") {
      console.log("[Quote Request Received]:", {
        fullName,
        email,
        phone,
        origin,
        destination,
        departureDate,
        returnDate: data.returnDate,
        travellers: travellersCount,
        flightClass: data.flightClass || "Economy",
        directPreferred: !!data.directPreferred,
        notes: data.notes || "",
        airlineContext: data.airlineContext || "General",
        hasFlightApiKey: Boolean(flightApiKey),
        hasEmailServiceKey: Boolean(emailServiceKey)
      });
    }

    return NextResponse.json(
      {
        success: true,
        referenceId: `GFB-${Date.now().toString(36).toUpperCase()}`,
        message: "Your group quote inquiry has been logged. Our air desk will reach out within 60 minutes."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/quote error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred while processing your quote request."
      },
      { status: 500 }
    );
  }
}
