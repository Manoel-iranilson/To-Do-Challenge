/* eslint-disable react/prop-types */
import { Flex, Button } from "@chakra-ui/react";

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex justifyContent="center" mt={4}>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          mx={1}
          colorScheme={currentPage === number ? "blue" : "gray"}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default Pagination;
