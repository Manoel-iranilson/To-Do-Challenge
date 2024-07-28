/* eslint-disable react/prop-types */
import {
  TableContainer,
  Text,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks";
import { isSameDay } from "date-fns";
import { useState } from "react";
import { update } from "../../store";
import TaskFilters from "../taskFilters";
import TaskTable from "../table";
import Pagination from "../table/pagination";
import { getStatus } from "../../utils/getStatus";

export default function ListTasks({ onOpen, setIdTask, nameFilter, tasks }) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [filter, setFilter] = useState("All");
  const [orderAsc, setOrderAsc] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const isMobile = useBreakpointValue({ base: true, md: false });

  //função para completar tarefa
  const CompleteTask = (task) => {
    dispatch(
      update({
        ...task,
        completed: !task.completed,
      })
    );
    toast({
      title: "Tarefa atualizada.",
      status: "success",
      duration: 1000,
      position: "top",
    });
  };

  //filtros
  const filteredTasks = tasks
    .filter((task) => {
      const status = getStatus(task);
      if (filter === "All") {
        return true;
      }
      return status === filter;
    })
    .filter((task) => {
      return task.name.toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((task) => {
      if (!selectedDate) {
        return true;
      }
      return isSameDay(new Date(task.taskDate), selectedDate);
    });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (orderAsc) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const toggleOrder = () => {
    setOrderAsc(!orderAsc);
  };

  //função para limpar data
  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  //paginação
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        toggleOrder={toggleOrder}
        orderAsc={orderAsc}
        clearDateFilter={clearDateFilter}
      />
      {sortedTasks.length === 0 ? (
        <Text textAlign="center">Sem tarefas</Text>
      ) : (
        <>
          <TaskTable
            tasks={currentTasks}
            setIdTask={setIdTask}
            onOpen={onOpen}
            CompleteTask={CompleteTask}
            isMobile={isMobile}
          />
          <Pagination
            tasksPerPage={tasksPerPage}
            totalTasks={sortedTasks.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </TableContainer>
  );
}
