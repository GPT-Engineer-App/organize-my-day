import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isComplete: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task));
  };

  return (
    <Box p={8} maxW="500px" mx="auto">
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
        mb={4}
      />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addTask} w="full" mb={4}>
        Add Task
      </Button>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} as={motion.div} layout>
            <Box
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg={task.isComplete ? 'green.100' : 'gray.100'}
              borderRadius="md"
            >
              <IconButton
                icon={task.isComplete ? <FaCheckCircle /> : <FaRegCircle />}
                onClick={() => toggleTaskCompletion(task.id)}
                aria-label="Complete task"
                colorScheme={task.isComplete ? "green" : "gray"}
              />
              <Box flex="1" pl={4} isTruncated>
                {task.text}
              </Box>
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                colorScheme="red"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;