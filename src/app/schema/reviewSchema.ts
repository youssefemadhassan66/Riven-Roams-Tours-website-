export interface ReviewSchema {
  id: string;
  name: string;
  _id: Number;
  review: String;
  rating: Number;
  user: {
    _id: Number;
    name: String;
    photo: String;
  };
  tour: Number;
  createdAt: Date;
}
