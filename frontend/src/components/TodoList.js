import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Flex,
  Checkbox,
  Image,
  Text,
  Tag,
  Link,
  Icon,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { getOneList, editList, deleteList } from "../api/list";

const TodoList = ({ _id, title, link, icon, isCompleted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [listItem, setListItem] = useState({
    title: title,
    icon: icon,
    link: link,
    isCompleted: isCompleted
  });

  const editMutation = useMutation(editList, {
    onSuccess: () => {},
  });
  const deleteMuation = useMutation(deleteList, {
    onSuccess: () => {},
  });
  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "isCompleted") {
      setListItem({ ...listItem, isCompleted: !listItem.isCompleted });
    } else {
      setListItem({ ...listItem, [name]: value });
    }
  };
  const handleEdit = (id) => {
    // get inputs
    const { title, icon, link, isCompleted } = listItem;
    if (id && title && icon && link) {
      editMutation.mutate({ id, title, icon, link, isCompleted });
      // reset inputs
      setListItem({title: title,
    icon: icon,
    link: link,
    isCompleted: isCompleted})
      onClose();
    }
  };
  const handleDelete = (id) => {
    if (id) {
      deleteMuation.mutate({ id });
    }
  };

  return (
    <Stack padding={2}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <Checkbox size="md" colorScheme="green" defaultChecked></Checkbox>
          <Image borderRadius="full" boxSize="30px" src={icon} alt={title} />
          <Text as="del">{title}</Text>
        </Flex>
        <Flex gap={1} align="center">
          <Popover>
            <PopoverTrigger>
              <Button>
                <Icon as={BsThreeDotsVertical} />
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="150px">
                <PopoverArrow />
                <PopoverHeader>Actions</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody display="flex" gap={2}>
                  <Button colorScheme="blue" fontSize="15px" onClick={onOpen}>
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    fontSize="15px"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit todo list</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    onChange={onChange}
                    placeholder="Title"
                    value={listItem.title}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Link</FormLabel>
                  <Input
                    name="link"
                    onChange={onChange}
                    value={listItem.link}
                    placeholder="Link"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Icon</FormLabel>
                  <Tag colorScheme="teal" mb={2}>
                    Note: Find best icons from here:{" "}
                    <Link
                      ml={2}
                      color="purple.500"
                      href="https://www.iconfinder.com/search?q=google&price=free"
                      isExternal
                    >
                      Iconsfinder
                    </Link>
                  </Tag>
                  <Input
                    name="icon"
                    onChange={onChange}
                    value={listItem.icon}
                    placeholder="Pase the icon url"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <Checkbox
                    name="isCompleted"
                    onChange={onChange}
                    checked={listItem.isCompleted}
                    colorScheme="green"
                  >
                    Mark as Completed
                  </Checkbox>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleEdit(_id)}
                >
                  Edit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button>
            <Icon as={MdOutlineDragIndicator} fontSize="20px" />
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default TodoList;
