import type { NextPage } from "next";
import { gql, useMutation, useQuery } from "@apollo/client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Client } from "../@types/types";
import { CrudModal } from "../components/CrudModal";
import { CrudTable } from "../components/CrudTable";
import { client } from "../lib/apollo";

export const GET_CLIENT = gql`
  query {
    clients {
      id
      name
      email
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation DeleteClient($deleteClientId: String!) {
    deleteClient(id: $deleteClientId)
  }
`;

const Home: NextPage = () => {
  const getClients = useQuery<{ clients: Client[] }>(GET_CLIENT);
  const [deleteClient, deleteInfo] = useMutation<
    { deleteClient: string },
    { deleteClientId: string }
  >(DELETE_CLIENT);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInfo, setModalInfo] = useState({
    isEdit: false,
    currentId: "",
  });

  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    adress: "",
    tel: "",
    cpf: "",
  });

  function handleCloseModal() {
    onClose();
    setModalInfo({
      isEdit: false,
      currentId: "",
    });
    setValues({
      id: "",
      name: "",
      email: "",
      adress: "",
      tel: "",
      cpf: "",
    });
  }

  function handleDeletClient(id: string) {
    deleteClient({
      variables: {
        deleteClientId: id,
      },
      update: (cache, { data }) => {
        const clientResponse = client.readQuery<{ clients: Client[] }>({
          query: GET_CLIENT,
        });

        cache.writeQuery({
          query: GET_CLIENT,
          data: {
            clients: clientResponse?.clients.filter(
              (item: Client) => item.id !== id
            ),
          },
        });
      },
    });

    toast.success("Cliente deletado com sucesso!");
  }

  return (
    <Flex h="100vh">
      <Flex
        mx="auto"
        mt="150px"
        w="100%"
        maxWidth="800px"
        h="500px"
        borderRadius=".5rem"
        p="1rem"
        direction="column"
      >
        <Flex w="100%" justify="space-between" mb="2rem">
          <Button colorScheme="cyan" onClick={() => onOpen()}>
            <Text>CADASTRAR CLIENTE</Text>
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Flex>
        <CrudTable
          values={values}
          setValues={setValues}
          onOpen={onOpen}
          info={modalInfo}
          setModalInfo={setModalInfo}
          clients={getClients.data?.clients!}
          deleteFunction={handleDeletClient}
        />
      </Flex>

      <CrudModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        modalInfo={modalInfo}
        values={values}
        setValues={setValues}
      />
    </Flex>
  );
};

export default Home;
