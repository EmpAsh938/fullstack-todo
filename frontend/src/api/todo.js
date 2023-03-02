import axios from "axios";

export const getTodosCount = async (filterby) => {
  const result = await axios.get(`/task/count?filterby=${filterby}`);
  return result.data;
}

export const getTodos = async () => {
  const result = await axios.get(`/task/all`);
  return result.data;
}

export const createTodo = async ({title}) => {
    const result = await axios.post(`/task/new`, {
      title,
    });
    return result.data;
};

export const deleteTodo = async ({id}) => {
    const result = await axios.delete(`/task/remove`,{
      data : {id}
    });
    return result.data;
};

export const editTodo = async ({id,title}) => {
    const result = await axios.put(`/task/update`, {
      id,
      title
    });
    return result.data;
};