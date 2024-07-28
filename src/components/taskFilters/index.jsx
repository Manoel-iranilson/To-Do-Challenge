/* eslint-disable react/prop-types */
import { Select, Flex, Button, Tooltip } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import DateFilter from "../dateFilter";

const TaskFilters = ({
  setFilter,
  selectedDate,
  setSelectedDate,
  toggleOrder,
  orderAsc,
  clearDateFilter,
}) => {
  return (
    <Flex mb={4} gap={4} alignItems="center" flexDirection={["column", "row"]}>
      <Select
        placeholder="Filtrar por situação"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">Todas</option>
        <option value="Concluída">Concluída</option>
        <option value="Pendente">Pendente</option>
        <option value="Pendente (Atrasada)">Pendente (Atrasada)</option>
      </Select>
      <Flex gap={2}>
        <DateFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Button onClick={clearDateFilter} mx={2} px={8}>
          Limpar Data
        </Button>
      </Flex>

      <Tooltip
        label={orderAsc ? "Tarefas mais novas" : "Tarefas mais antigas"}
        aria-label="A tooltip"
        ml={2}
      >
        <Button onClick={toggleOrder}>
          {orderAsc ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default TaskFilters;
