import React, { useState } from "react";
import { Box, Flex, Heading, Select, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getSubtodosCount } from "../api/list";
import { getTodosCount } from "../api/todo";
import { useQuery } from "react-query";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Todos and subtodos Chart",
    },
  },
};


const Dashboard = () => {
  const [filterby, setFilterby] = useState("day");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const { data: todoData, isLoading: todoLoading, isError: todoError } = useQuery("todos-count", () => getTodosCount(filterby));
  // const {data: subtodoData, isLoading: subtodoLoading, isError: subtodoError} = useQuery("subtodos-count", () => getSubtodosCount(filterby));

  const onChange = (e) => {
    e.preventDefault();
    setFilterby(e.target.value);
  }
 
  if(todoLoading) {
    return <span>Loading...</span>
  }
  if(todoError) {
    return <span>Error...</span>
  }
  const todoLabel = todoData.body.map(item => item._id);
  const todos = todoData.body.map(item => item.count);
  // const subtodoLabel = subtodoData.body.map(item => item._id);
  // const subtodos = subtodoData.body.map(item => item.count);
  return (
    <Box>
      <Heading as={"h1"} mb={4} borderBottom="1px" borderColor="gray.300">
        Dashboard
      </Heading>
      <Flex align={"center"} justify={"space-between"}>
        <Text>Statistics of Todos</Text>
        <Flex alignItems="center" gap={2}>
          <Text>Filterby</Text>
          <Select maxWidth={"150px"} onChange={onChange}>
            <option value="day">
              Day
            </option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </Select>
        </Flex>
      </Flex>
      <Box>
        <Line
          options={options}
          data={{
            labels: [...todoLabel],
            datasets: [
              {
                id: 1,
                label: "Todos",
                data: todos,
                borderColor: "red",
              }
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
