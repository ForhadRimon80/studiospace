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
