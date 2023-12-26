export interface IHotel {
  image: string;
  name: string;
  address: string;
  rate: string;
}

export interface IDateProps {
  timestamp: number;
  year: number;
  month: number;
  day: number;
  dateString: string;
}

export interface IBookingProps {
  userId: string;
  hotelData: IHotel;
  startDate: IDateProps;
  endDate: IDateProps;
}

export interface IOption {
  id?: string | number;
  title: string;
  value: any;
}

export interface ISectionProps {
  children?: any;
  style?: any;
  cardStyle?: any;
  title?: string;
  subTitleComp?: any;
}
