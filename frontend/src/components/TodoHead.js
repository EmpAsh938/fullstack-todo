import { useRef } from "react";

import {
  Flex,
  Heading,
  Popover,
  PopoverTrigger,
  Button,
  Icon,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { queryClient, useMutation } from "react-query";
import { editTodo, deleteTodo } from "../api/todo";

const TodoHead = ({id, title}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const editMutation = useMutation(editTodo, {
    onSuccess: () => {
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
    },
  });

  const handleEdit = (id) => {
    // get input
    const title = initialRef.current.value;
    if (title && id) {
      editMutation.mutate({title,id});
      onClose();
    }
  };

  const handleDelete = (id) => {
    if (id) {
      deleteMutation.mutate({id})
    }
  };
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Heading as={"h2"} fontSize={"20px"} flex="1" textAlign="center">
        {title}
      </Heading>
      <Popover>
        <PopoverTrigger>
          <Button fontSize={"10px"} variant="ghost">
            <Icon as={MdSettings} fontSize="15px" />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent width="150px">
            <PopoverArrow />
            <PopoverHeader>Actions</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Flex justify="center" gap={2}>
                <Button colorScheme="blue" fontSize="15px" onClick={onOpen}>
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  fontSize="15px"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input ref={initialRef} placeholder={title || "Title"}/>
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={()=>handleEdit(id)}>
                        Update
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Flex>
  );
};

export default TodoHead;
