import type { CategorySlug } from "@/types/category";

export const servicesByCategory: Record<CategorySlug, string[]> = {
  plumber: [
    "Pipe Leak Repair",
    "Bathroom Fittings",
    "Geyser Installation",
    "Water Tank Line Work",
    "Tap & Mixer Repair",
  ],
  electrician: [
    "Wiring Installation",
    "Switchboard Repair",
    "Fan & Light Fitting",
    "Inverter Wiring",
    "Short Circuit Fix",
  ],
  carpenter: [
    "Door & Frame Work",
    "Furniture Repair",
    "Kitchen Cabinet Fitting",
    "Wooden Partition",
    "Window Frame Fix",
  ],
  "ac-repair": [
    "AC Gas Refill",
    "AC General Service",
    "Cooling Issue Repair",
    "Split AC Installation",
    "Fridge Cooling Repair",
  ],
  "auto-rental": [
    "Local Auto Hire",
    "Market Pick & Drop",
    "Daily Auto Rental",
    "Outstation Auto Trip",
    "Hourly Auto Booking",
  ],
  "car-rental": [
    "Self Drive Car Rental",
    "Local City Trips",
    "Family Outstation Trip",
    "Airport Pick & Drop",
    "Wedding Car Rental",
  ],
  painter: [
    "Interior Painting",
    "Exterior Wall Paint",
    "Waterproof Coating",
    "Texture & Putty Work",
    "Old Paint Removal",
  ],
  welder: [
    "Gate & Grill Fabrication",
    "Iron Railing Work",
    "Metal Door Repair",
    "Window Grill Fitting",
    "On-site Welding",
  ],
  mason: [
    "Brick Masonry Work",
    "Wall Plastering",
    "Floor Tiling Support",
    "Compound Wall Work",
    "Renovation Masonry",
  ],
};
