import { gql, useLazyQuery } from "@apollo/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { CrudTableProps, CurrentClient } from "../@types/types";

const GET_CLIENT = gql`
  query Client($clientId: String!) {
    client(id: $clientId) {
      id
      name
      email
      cpf
      adress
      tel
    }
  }
`;

export function CrudTable({
  values,
  clients,
  onOpen,
  setValues,
  setModalInfo,
  deleteFunction,
  info,
}: CrudTableProps) {
  const [getClient, getClientInfo] = useLazyQuery<
    { client: CurrentClient },
    { clientId: string }
  >(GET_CLIENT);

  useEffect(() => {
    if (!info.isEdit) return;

    async function getValues() {
      const i = await getClient({
        variables: { clientId: info.currentId },
      });

      setValues({
        id: i.data?.client.id,
        adress: i.data?.client.adress,
        name: i.data?.client.name,
        cpf: i.data?.client.cpf,
        email: i.data?.client.email,
        tel: i.data?.client.tel,
      } as CurrentClient);
    }

    getValues();
  }, [info]);

  function handleEdit(id: string) {
    onOpen();
    setModalInfo({
      currentId: id,
      isEdit: true,
    });
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th fontSize="1.25rem" minW="200px">Nome</Th>
          <Th fontSize="1.25rem" minW="380px">
            Email
          </Th>
          <Th p={0}></Th>
          <Th p={0}></Th>
        </Tr>
      </Thead>

      <Tbody>
        {clients?.map((item) => (
          <Tr
            cursor="pointer"
            _hover={{ filter: "brightness(0.8) " }}
            key={item.id}
          >
            <Td fontSize="1.25rem">{item.name}</Td>
            <Td fontSize="1.25rem">{item.email}</Td>
            <Td>
              <EditIcon fontSize={20} onClick={() => handleEdit(item.id)} />
            </Td>
            <Td onClick={() => deleteFunction(item.id)}>
              <DeleteIcon fontSize={20} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
