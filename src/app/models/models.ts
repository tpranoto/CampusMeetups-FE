export interface TripDetails {
  tripId: string;
  name: string;
  description: string;
  status: string;
  image: string;
  location: string;
  timestamp: Date;
  organizerId: string;
  organizerData: {
    fname: string;
    lname: string;
    image: string;
  };
  categoryId: string;
  categoryData: {
    name: string;
  };
  attendees: TripDetailsAttendee[];
}

export interface TripDetailsAttendee {
  studentId: string;
  fname: string;
  lname: string;
  image: string;
}

export interface Trips {
  data: TripsData;
  page: number;
  perPage: number;
  nextPage: string;
  prevPage: string;
}

export interface TripsData {
  tripId: string;
  name: string;
  description: string;
  status: string;
  image: string;
  location: string;
  timestamp: Date;
  organizerId: string;
  organizerData: {
    fname: string;
    lname: string;
  };
  categoryId: string;
  categoryData: {
    name: string;
  };
}

export interface CreateTrip {
  tripId: string;
  name: string;
  description: string;
  status: string;
  image: string;
  location: string;
  timestamp: Date;
  organizerId: string;
  categoryId: string;
}

export interface AttendedTrips {
  studentId: string;
  tripId: string;
  tripData: AttendedTripsData;
}

export interface AttendedTripsData {
  tripId: string;
  name: string;
  description: string;
  image: string;
  status: string;
  location: string;
  timestamp: string;
  categoryId: string;
  categoryData: {
    name: string;
  };
}

export interface StudentDetails {
  studentId: string;
  fname: string;
  lname: string;
  email: string;
  image: string;
  phoneNumber: string;
  verified: boolean;
  status: string;
}

export interface CategoryDetails {
  categoryId: string;
  name: string;
}
