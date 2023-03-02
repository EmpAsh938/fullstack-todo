import React, { useRef } from "react";
import Todo from "./Todo";
import {
  Box,
  Heading,
  Grid,
  Button,
  Icon,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { getTodos, createTodo } from "../api/todo";

const TodoContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery('todos', getTodos); 


  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  });


  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleCreate = () => {
    let title = initialRef.current.value;
    if (title) {
      mutation.mutate({title});
      initialRef.current.value = "";
      onClose();
    }
  };

   if (isLoading) {
     return <span>Loading...</span>
   }
 
   if (isError) {
     return <span>Error: {error.message}</span>
   }
  return (
    <Box mt={4}>
      <Flex align="center" justify="space-between">
        <Heading as={"h1"} mb={4}>
          Todos
        </Heading>
        <Button onClick={onOpen}>
          <Icon as={GrAdd} />
        </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder="Title" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCreate}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, .7fr))"
        gap={4}
        justifyContent="center"
      >
        {data.body.length > 0 ? (
          data.body.map(item => {
          return <Todo key={item._id} {...item} />
        })
        ) : (<span>Nothing to show</span>)
      }
      </Grid>
    </Box>
  );
};

export default TodoContainer;
