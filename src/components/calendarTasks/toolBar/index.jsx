/* eslint-disable react/prop-types */
import { Navigate } from "react-big-calendar";

import {
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  QuestionIcon,
} from "@chakra-ui/icons";

export default function Toobar({ label, onNavigate, onView, view }) {
  const goToWeekView = () => {
    onView("week");
  };
  const goToMonthView = () => {
    onView("month");
  };

  const goToBack = () => {
    onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    onNavigate(Navigate.NEXT);
  };

  return (
    <Flex
      p={4}
      pl={2}
      my="5"
      bg="white"
      borderRadius="2xl"
      borderWidth="thin"
      justifyContent="space-between"
      direction="row"
    >
      <Flex gap={2} alignItems="center">
        <IconButton
          aria-label="Voltar"
          bg="white"
          _hover={{ bg: "secondary.50" }}
          _active={{ bg: "secondary.20" }}
          size="sm"
          onClick={() => {
            goToBack();
          }}
        >
          <Icon as={ChevronLeftIcon} color="primary.500" fontSize="24px" />
        </IconButton>

        <Text casing="capitalize" fontWeight="bold" color="primary.500">
          {label}
        </Text>

        <IconButton
          aria-label="avançar"
          bg="white"
          _hover={{ bg: "secondary.50" }}
          _active={{ bg: "secondary.20" }}
          size="sm"
          onClick={() => {
            goToNext();
          }}
        >
          <Icon as={ChevronRightIcon} color="primary.500" fontSize="24px" />
        </IconButton>
      </Flex>
      <Flex gap={5}>
        <Tooltip
          label="Clique em semanal para visualizar todas as tarefas"
          aria-label="A tooltip"
        >
          <QuestionIcon />
        </Tooltip>
        <Button
          borderRadius={12}
          size="sm"
          colorScheme={view === "week" ? "orange" : "gray"}
          variant={view === "week" ? "solid" : "outline"}
          onClick={goToWeekView}
        >
          Semanal
        </Button>
        <Button
          borderRadius={12}
          size="sm"
          colorScheme={view === "month" ? "orange" : "gray"}
          variant={view === "month" ? "solid" : "outline"}
          onClick={goToMonthView}
        >
          Mensal
        </Button>
      </Flex>
    </Flex>
  );
}
