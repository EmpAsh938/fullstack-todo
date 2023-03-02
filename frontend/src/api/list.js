import axios from "axios";

export const getSubtodosCount = async (filterby) => {
  const result = await axios.get(`/subtask/count?filterby=${filterby}`);
  return result.data;
}

export const getOneList = async ({id}) => {
  const result = await axios.get(`/subtask/one/${id}`);
  return result.data;
}

export const getAllList = async (id) => {
  const result = await axios.get(`/subtask/all?id=${id}`);
  return result.data;
}

export const createList = async ({id, title,link,url,icon,isCompleted}) => {
    const result = await axios.post(`/subtask/new`, {
      id,
      title,
      link,
      url,
      icon,
      isCompleted
    });
    return result.data;
};

export const deleteList = async ({id}) => {
    const result = await axios.delete(`/subtask/remove`, {
      id,
    });
    return result.data;
};

export const editList = async ({id,title,link,url,icon,isCompleted}) => {
    const result = await axios.delete(`/subtask/update`, {
      id,
      title,
      link,
      url,
      icon,
      isCompleted
    });
    return result.data;
};