/* eslint-disable react/prop-types */
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChevronDownIcon } from "@chakra-ui/icons";
import RemoveModal from "../modals/removeModal";
import { getStatus } from "../../utils/getStatus";

const TaskTable = ({ tasks, setIdTask, onOpen, CompleteTask, isMobile }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Concluída":
        return "green";
      case "Pendente (Atrasada)":
        return "red";
      case "Pendente":
        return "orange";
      default:
        return "gray";
    }
  };

  const TaskDescription = ({ description }) => {
    if (description.length > 50) {
      return description.substring(0, 50) + "...";
    }
    return description;
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Status</Th>
          <Th>Nome</Th>
          <Th>Descrição</Th>
          {!isMobile && <Th>Data da tarefa</Th>}
          {!isMobile && <Th>Situação</Th>}
          {!isMobile && <Th>Ações</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => {
          const status = getStatus(task);
          const statusColor = getStatusColor(status);
          return (
            <Tr
              key={task.id}
              onClick={() => {
                if (isMobile) {
                  setIdTask(task.id);
                  onOpen();
                }
              }}
            >
              <Td>
                <Box
                  as="span"
                  display="inline-block"
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  bg={statusColor}
                />
              </Td>
              <Td>{task.name}</Td>
              <Td>
                <TaskDescription description={task.description} />
              </Td>
              {!isMobile && (
                <Td>{format(new Date(task.taskDate), "dd/MM/yyyy")}</Td>
              )}
              {!isMobile && <Td>{status}</Td>}
              {!isMobile && (
                <Td>
                  <Menu>
                    <MenuButton>
                      <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <RemoveModal id={task.id} />
                      </MenuItem>
                      <MenuItem>
                        <Button
                          variant="ghost"
                          w="100%"
                          onClick={() => [setIdTask(task.id), onOpen()]}
                        >
                          Editar
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          variant="ghost"
                          w="100%"
                          onClick={() => CompleteTask(task)}
                        >
                          Concluir
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              )}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TaskTable;
