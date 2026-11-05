export interface IStudio {
  _id: string;
  hostName: string;
  hostEmail: string;
  hostId: string;
  CreatedAt: string;
  title: string;
  hourlyRate: string;
  maxCapacity: string;
  location: string;
  category: string;
  securityDeposit: string;
  imageUrl: string;
  overview: string;
  amenities: string[];
  views?: string;
}

export interface IBooking {
  _id: string;
  bookingUserName: string;
  bookingUserEmail: string;
  shootDate: string;
  startTime: string;
  endTime: string;
  crewCount: string;
  notes: string;
  status: string;
  hostName: string;
  hostEmail: string;
  hostId: string;
  CreatedAt: string;
  title: string;
  hourlyRate: string;
  maxCapacity: string;
  location: string;
  category: string;
  securityDeposit: string;
  imageUrl: string;
  overview: string;
  amenities: string[];
  views: string;
  totalCost: number;
  durationHours: number;
}