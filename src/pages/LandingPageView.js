import React from "react";

// Components
import Dashbord from "../components/Dashboard/Dashboard";
import TasksListing from "../components/TasksListing/TasksListing";
import SectionHeader from "../components/atoms/headers/SectionHeader";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import DoubleColumnGrid from "../layout/DoubleColumnGrid";

const LandingPageView = ({
  addAlert,
  tasksState,
  setTasksState,
  taskUpdateHandler,
}) => {
  return (
    <Dashbord>
      <SectionHeader text={"Add task"} />
      <AddTaskForm
        addAlert={addAlert}
        tasksState={tasksState}
        setTasksState={setTasksState}
      />{" "}
      <DoubleColumnGrid>
        <TasksListing
          headerText={"Tasks in progress"}
          tasksState={tasksState.filter((task) => !task.done)}
          taskUpdateHandler={taskUpdateHandler}
        />{" "}
        <TasksListing
          headerText={"Completed tasks"}
          tasksState={tasksState.filter((task) => task.done)}
          taskUpdateHandler={taskUpdateHandler}
        />
      </DoubleColumnGrid>
    </Dashbord>
  );
};

export default LandingPageView;