import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../../../hooks";
import { remove } from "../../../store";

export default function RemoveModal({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  return (
    <>
      <Flex justify="center" w="100%">
        <IconButton
          w="100%"
          aria-label="delete"
          variant="outline"
          colorScheme="red"
          icon={<DeleteIcon />}
          onClick={onOpen}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Você tem certeza que deseja remover esta tarefa ?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Sair
            </Button>
            <Button colorScheme="red" onClick={() => dispatch(remove(id))}>
              Remover
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
