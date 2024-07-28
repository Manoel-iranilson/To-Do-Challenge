/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  FormErrorMessage,
  FormControl,
  useToast,
  FormLabel,
  Switch,
  Text,
  Flex,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { add, update } from "../../../store";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import DateFilter from "../../dateFilter";
import RemoveModal from "../removeModal";

export default function ModalTask({ isOpen, onClose, idTask }) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const task = useAppSelector((state) =>
    state.todo.find((task) => task.id === idTask)
  );

  useEffect(() => {
    if (isOpen) {
      reset({
        id: task?.id || "",
        name: task?.name || "",
        description: task?.description || "",
        completed: task?.completed || false,
        taskDate: task?.taskDate ? new Date(task.taskDate) : new Date(),
      });
    }
  }, [isOpen, idTask, task, reset]);

  //Função de criar e atualizar tarefas
  const onSubmit = (data) => {
    if (idTask) {
      dispatch(
        update({
          id: idTask,
          name: data.name,
          description: data.description,
          completed: data.completed,
          taskDate: data.taskDate.toISOString(),
        })
      );
      toast({
        title: "Tarefa atualizada.",
        status: "success",
        duration: 1000,
        position: "top",
      });
    } else {
      dispatch(
        add({
          id: 4,
          name: data.name,
          description: data.description,
          completed: data.completed,
          taskDate: data.taskDate.toISOString(),
          createdAt: new Date(),
        })
      );
      toast({
        title: "Tarefa criada.",
        status: "success",
        duration: 1000,
        position: "top",
      });
    }
    reset();
    onClose();
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {idTask ? `Editar Tarefa - ${idTask}` : "Adicionar Tarefa"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.name} mb={4}>
              <Input
                placeholder="Nome"
                {...register("name", {
                  required: "Nome é obrigatório",
                  maxLength: 20,
                })}
              />
              {!!errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>

            <Textarea
              placeholder="Descrição"
              {...register("description")}
              mb={4}
            />
            <Flex gap={4} alignItems="center">
              <Text>Data: </Text>
              <Controller
                control={control}
                name="taskDate"
                render={({ field: { onChange, value } }) => (
                  <DateFilter selectedDate={value} setSelectedDate={onChange} />
                )}
              />
            </Flex>
            <Controller
              control={control}
              name="completed"
              render={({ field: { ref, onChange, name, value } }) => (
                <FormControl display="flex" alignItems="center">
                  <FormLabel>Concluída</FormLabel>
                  <Switch
                    ref={ref}
                    id="completed"
                    name={name}
                    onChange={(e) => onChange(e.target.checked)}
                    isChecked={value}
                  />
                </FormControl>
              )}
            />
          </ModalBody>

          <ModalFooter as={Flex} gap={4}>
            <Button onClick={() => [reset(), onClose()]}>Sair</Button>

            {idTask && isMobile && (
              <Box>
                <RemoveModal id={idTask} />
              </Box>
            )}

            <Button type="submit" colorScheme="orange">
              {idTask ? "Atualizar" : "Adicionar"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
