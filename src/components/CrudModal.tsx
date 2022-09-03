import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Client, CurrentClient } from "../@types/types";
import { client } from "../lib/apollo";
import { GET_CLIENT } from "../pages";

interface CrudModalProps {
  values: CurrentClient;
  setValues: (values: CurrentClient) => void;
  isOpen: boolean;
  onClose: () => void;
  modalInfo: {
    isEdit: boolean;
    currentId: string;
  };
}

const CREATE_CLIENT = gql`
  mutation CreateClient($createClientObject: CreateClientInput!) {
    createClient(createClientObject: $createClientObject) {
      id
      name
      email
      cpf
      adress
      tel
    }
  }
`;

const EDIT_CLIENT = gql`
  mutation EditClient($editClientObject: EditClientInput!) {
    editClient(editClientObject: $editClientObject) {
      id
      name
      email
      cpf
      adress
      tel
    }
  }
`;

type ClientWithoutId = Omit<CurrentClient, "id">;

export function CrudModal({
  isOpen,
  onClose,
  modalInfo,
  values,
  setValues,
}: CrudModalProps) {
  const [createClient, createClientInfo] = useMutation<
    { createClient: CurrentClient },
    { createClientObject: ClientWithoutId }
  >(CREATE_CLIENT);

  const [editClient, editClientInfo] = useMutation<
    { editClient: CurrentClient },
    { editClientObject: CurrentClient }
  >(EDIT_CLIENT);

  function handleChangeValues(event: ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  }

  async function handleEditClient() {
    await editClient({
      variables: {
        editClientObject: values,
      },
    });

    onClose();

    setValues({
      id: "",
      name: "",
      email: "",
      adress: "",
      tel: "",
      cpf: "",
    });

    toast.success("Alterções salvas!");
  }

  async function handleAddNewClient() {
    await createClient({
      variables: {
        createClientObject: {
          tel: values.tel,
          email: values.email,
          name: values.name,
          adress: values.adress,
          cpf: values.cpf,
        },
      },
      update: (cache, { data }) => {
        const clientResponse = client.readQuery<{ clients: Client[] }>({
          query: GET_CLIENT,
        });
        cache.writeQuery({
          query: GET_CLIENT,
          data: {
            clients: [
              ...(clientResponse?.clients as any),
              {
                id: data?.createClient.id,
                name: data?.createClient.name,
                email: data?.createClient.email,
              },
            ],
          },
        });
      },
    });

    setValues({
      id: "",
      name: "",
      email: "",
      adress: "",
      tel: "",
      cpf: "",
    });

    onClose();

    toast.success("Cliente adicionado com sucesso!");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="10rem">
        <ModalHeader>Cadastrar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="grid" gap=".3rem">
          <Box>
            <FormLabel>Nome</FormLabel>
            <Input
              id="name"
              type="text"
              value={values.name}
              onChange={handleChangeValues}
            />
          </Box>
          <Box>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={handleChangeValues}
            />
          </Box>
          <Box>
            <FormLabel>Endereço</FormLabel>
            <Input
              id="adress"
              type="text"
              value={values.adress}
              onChange={handleChangeValues}
            />
          </Box>
          <Box>
            <FormLabel>CPF</FormLabel>
            <Input
              id="cpf"
              type="number"
              value={values.cpf}
              onChange={handleChangeValues}
            />
          </Box>

          <Box>
            <FormLabel>Telefone</FormLabel>
            <Input
              id="tel"
              type="tel"
              value={values.tel}
              onChange={handleChangeValues}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            CANCELAR
          </Button>
          <Button
            colorScheme="cyan"
            ml=".5rem"
            onClick={modalInfo.isEdit ? handleEditClient : handleAddNewClient}
          >
            {modalInfo.isEdit ? "EDITAR" : "CADASTRAR"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
