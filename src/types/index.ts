export interface IGetDocuemtnsParams {
  studentName?: string;
  isPaginating?: boolean;
  isSearching?: boolean;
  isRefreshing?: boolean;
}

export interface IStudent {
  id?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  rollNumber?: string;
  class?: string;
  isEnabled?: boolean;
}
