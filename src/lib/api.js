/**
 * Central API client for Group Flight Bookings
 */
export async function submitQuote(data) {
  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting quote request:", error);
    return {
      success: false,
      error: "Unable to connect to the flight quote service. Please try again or call our 24/7 air desk."
    };
  }
}

