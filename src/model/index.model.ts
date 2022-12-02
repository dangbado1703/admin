export interface IFormInitState<T> {
  dataSelect: { label: string; value: string }[] | undefined;
  dataSearch: T[];
  isLoading: boolean;
  total: number;
  isLoadingUpdate: boolean;
  isLoadingCreate: boolean;
  action: "create" | "update" | "view";
  dataDetail: any;
}

export interface FormTableProps<T> {
  page: number;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<Partial<T>>>;
  searchValue: Partial<T>;
}
