export type Hotel = {
  id: number;
  name: string;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  contact: {
    email: string;
    phoneNumber: string;
  };
  currency: string;
  gallery: string[];
  price: number;
  stars: number;
  userRating: number;
};
