export interface Client {
  id: string;
  name: string;
  email: string;
}

export interface Info {
  isEdit: boolean;
  currentId: string;
}

export interface CurrentClient extends Client {
  adress: string;
  tel: string;
  cpf: string;
}

export interface CrudTableProps {
  clients: Client[];
  values: CurrentClient;
  info: Info;
  onOpen: () => void;
  setValues: (values: CurrentClient) => void;
  setModalInfo: (info: Info) => void;
  deleteFunction: (id: string) => void;
}
