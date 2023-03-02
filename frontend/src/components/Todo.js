import { Stack } from "@chakra-ui/react";

import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

import { useQuery } from "react-query";

import { getAllList } from "../api/list";

const Todo = ({title,_id}) => {

 const { data, isLoading, isError } = useQuery("subtodos", () => getAllList(_id));

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) return <span>Error...</span>;
  return (
    <Stack
      border="1px"
      padding="4px"
      borderColor="#CBD5E0"
      borderRadius="5px"
      boxShadow="md"
    >
      <TodoHead title={title} id={_id} />
      {data.body && data.body.length > 0 ? (data.body.map((item) => {
        return <TodoList key={item._id} {...item} />;
      })) : (<span>No todolist to show</span>)}
      <AddTodo id={_id}/>
    </Stack>
  );
};

export default Todo;
