import { useState, useEffect } from "react";
import ListTasks from "./components/listTasks";
import {
  Button,
  Center,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import CalendarTasks from "./components/calendarTasks";
import { useAppSelector } from "./hooks";
import ModalTask from "./components/modals/modalTask";
import Logo from "../src/assets/logo.png";

function App() {
  const tasks = useAppSelector((state) => state.todo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idTask, setIdTask] = useState();
  const [nameFilter, setNameFilter] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const openAddTaskModal = () => {
    setIdTask(null);
    onOpen();
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isMobile) {
      setTabIndex(0);
    }
  }, [isMobile]);

  return (
    <Center w="100%" flexDirection="column">
      <Flex w="100%" bg="black" justify="center" py={4}>
        <Image src={Logo} />
      </Flex>
      <Text fontSize="40px">To-Do Challenge</Text>
      <Flex flexDirection="column" w="100%" maxW="1200px" mt={50} p={4}>
        <Flex mb={4} gap={4} flexDirection={["column", "row"]}>
          <Input
            placeholder="Filtrar por nome"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <Button colorScheme="orange" onClick={openAddTaskModal}>
            Adicionar Tarefa
          </Button>
        </Flex>
        <ModalTask isOpen={isOpen} onClose={onClose} idTask={idTask} />

        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList>
            {!isMobile && <Tab>Lista</Tab>}
            {!isMobile && <Tab>Calendário</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel>
              <ListTasks
                tasks={tasks}
                onOpen={onOpen}
                setIdTask={setIdTask}
                nameFilter={nameFilter}
              />
            </TabPanel>
            {!isMobile && (
              <TabPanel>
                <CalendarTasks
                  tasks={tasks}
                  setIdTask={setIdTask}
                  onOpen={onOpen}
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Flex>
    </Center>
  );
}

export default App;
