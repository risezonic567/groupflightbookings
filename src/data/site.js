export const siteConfig = {
  name: "Group Flight Bookings",
  domain: "groupflightbookings.com",
  phone: "+1-833-958-0151",
  email: "support@groupflightbookings.com",
  address: "750 Lexington Avenue, Suite 1400, New York, NY 10022",
  hours: "24/7 Global Air Desk Assistance",
  description: "Specialized group air travel management for 10+ passengers. Dedicated flight desks, negotiated group contracts, flexible deposits, and bespoke routing.",
  navigation: [
    {
      label: "How It Works",
      href: "/#how-it-works"
    },
    {
      label: "Group Types",
      href: "/contact?type=group",
      children: [
        { label: "Corporate Groups", href: "/contact?type=corporate", desc: "Executive summits, retreats & global team travel" },
        { label: "MICE & Events", href: "/contact?type=mice", desc: "Conferences, exhibitions & large convention air" },
        { label: "Educational Groups", href: "/contact?type=education", desc: "Universities, student tours & study abroad" },
        { label: "Sports Teams", href: "/contact?type=sports", desc: "Athletes, coaches, support crew & baggage pooling" },
        { label: "NGO & Humanitarian", href: "/contact?type=ngo", desc: "Relief missions, volunteer squads & NGO tariffs" },
        { label: "Pilgrimage & Faith Groups", href: "/contact?type=pilgrimage", desc: "Faith-based journeys, heritage tours & choir delegations" }
      ]
    },
    {
      label: "Destinations",
      href: "/airlines",
      children: [
        { label: "London Heathrow (LHR)", href: "/airlines/british-airways", desc: "Premier European & transatlantic gateway" },
        { label: "Dubai International (DXB)", href: "/airlines/emirates", desc: "Global transit hub connecting 6 continents" },
        { label: "New York (JFK / EWR)", href: "/airlines/delta-air-lines", desc: "North American financial & trade gateway" },
        { label: "Paris (CDG)", href: "/airlines/air-france", desc: "Continental European art, culture & enterprise hub" },
        { label: "Singapore Changi (SIN)", href: "/airlines/singapore-airlines", desc: "Southeast Asian & Australasian connection capital" },
        { label: "Tokyo (HND / NRT)", href: "/airlines/united-airlines", desc: "East Asia economic powerhouse and summit destination" }
      ]
    },
    {
      label: "Airlines",
      href: "/airlines",
      children: [
        { label: "British Airways", href: "/airlines/british-airways", desc: "OneWorld flagship transatlantic group desk" },
        { label: "Emirates", href: "/airlines/emirates", desc: "A380 luxury widebody long-haul allocations" },
        { label: "Lufthansa", href: "/airlines/lufthansa", desc: "Star Alliance precision via Frankfurt & Munich" },
        { label: "Qatar Airways", href: "/airlines/qatar-airways", desc: "Five-star service via Hamad International" },
        { label: "Delta Air Lines", href: "/airlines/delta-air-lines", desc: "SkyTeam on-time domestic & international travel" },
        { label: "United Airlines", href: "/airlines/united-airlines", desc: "Dense transpacific and continental US connectivity" },
        { label: "View All Partner Airlines →", href: "/airlines", desc: "Browse all 450+ contracted global commercial carriers" }
      ]
    },
    {
      label: "About Us",
      href: "/contact",
      children: [
        { label: "About Company", href: "/contact", desc: "Our 24/7 aviation desk and contracting authority" },
        { label: "Contact Us", href: "/contact", desc: "Speak directly with a senior group air broker" },
        { label: "Industry Blog & Guides", href: "/blog", desc: "Aviation contract insights, tariffs & booking advice" }
      ]
    }
  ],
  footerLinks: {
    destinations: [
      { label: "London Heathrow (LHR)", href: "/airlines/british-airways" },
      { label: "Paris Charles de Gaulle (CDG)", href: "/airlines/air-france" },
      { label: "Dubai International (DXB)", href: "/airlines/emirates" },
      { label: "Tokyo Haneda (HND)", href: "/airlines/united-airlines" },
      { label: "Frankfurt Airport (FRA)", href: "/airlines/lufthansa" },
      { label: "Singapore Changi (SIN)", href: "/airlines/singapore-airlines" }
    ],
    topAirlines: [
      { label: "British Airways Groups", href: "/airlines/british-airways" },
      { label: "Emirates Group Flights", href: "/airlines/emirates" },
      { label: "Lufthansa Group Travel", href: "/airlines/lufthansa" },
      { label: "Qatar Airways Groups", href: "/airlines/qatar-airways" },
      { label: "Delta Air Lines Groups", href: "/airlines/delta-air-lines" },
      { label: "United Airlines Groups", href: "/airlines/united-airlines" }
    ],
    groupTravel: [
      { label: "Corporate Delegations", href: "/contact?type=corporate" },
      { label: "Conferences & MICE Events", href: "/contact?type=mice" },
      { label: "Educational & University Tours", href: "/contact?type=education" },
      { label: "Sports Teams & Athletes", href: "/contact?type=sports" },
      { label: "NGOs & Humanitarian Missions", href: "/contact?type=ngo" },
      { label: "Pilgrimage & Faith Groups", href: "/contact?type=pilgrimage" }
    ],
    company: [
      { label: "About Group Flight Bookings", href: "/contact" },
      { label: "Global Partner Airlines", href: "/airlines" },
      { label: "Air Travel Industry Blog", href: "/blog" },
      { label: "24/7 Emergency Support", href: "/contact" },
      { label: "Terms & Conditions", href: "/contact" },
      { label: "Privacy Policy", href: "/contact" }
    ]
  }
};
