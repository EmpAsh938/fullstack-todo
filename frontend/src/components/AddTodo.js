import { useState, useRef } from "react";
import {
  Center,
  Button,
  Checkbox,
  Link,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { GrFormAdd } from "react-icons/gr";
import { useMutation } from "react-query";
import { createList } from "../api/list";

const AddTodo = ({id}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);


  const [listItem, setListItem] = useState({title:"",icon:"",link:"",isCompleted:false});

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if(name === "isCompleted") {
      setListItem({...listItem, isCompleted: !listItem.isCompleted});
    } else {
      setListItem({...listItem, [name]:value});
    }
  }

  const addMutation = useMutation(createList, {
    onSuccess: () => {

    }
  })

  const handleAdd = () => {
    // get inputs
    const { title, link, icon, isCompleted } = listItem;
    if(id && link && title && icon) {
      addMutation.mutate({id,title,link,icon,isCompleted});
      //reset inputs
      setListItem({title:"",icon:"",link:"",isCompleted:false});
      onClose();
    }
  }
  return (
    <Center>
      <Button
        variant="outline"
        width="fit-content"
        leftIcon={<GrFormAdd />}
        onClick={onOpen}
      >
        Add new list
      </Button>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new list in your todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input onChange={onChange} name="title" value={listItem.title} placeholder="Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input onChange={onChange} name="link" value={listItem.link} placeholder="Link" />
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
              <Input onChange={onChange} name="icon" value={listItem.icon} placeholder="Pase the icon url" />
            </FormControl>

            <FormControl mt={4}>
              <Checkbox onChange={onChange} name="isCompleted" checked={listItem.isCompleted} colorScheme="green">Mark as Completed</Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="whatsapp" mr={3} onClick={handleAdd}>
              Create
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default AddTodo;
