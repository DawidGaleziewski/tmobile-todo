import React, { useContext, useState } from "react";

// Pages
import PageNotFoundView from "../PageNotFoundView/PageNotFoundView";

// Components
import Dashbord from "../../components/Dashboard/Dashboard";
import TasksListing from "../../components/TasksListing/TasksListing";
import SectionHeader from "../../components/atoms/headers/SectionHeader";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import DoubleColumnGrid from "../../layout/DoubleColumnGrid";

// Context
import { TasksContext } from "../../context/TasksContext";

const LandingPageView = () => {
  const { tasksState } = useContext(TasksContext);
  const getInProgressTasks = (tasks) => tasks.filter((task) => !task.done);
  const getCompletedTasks = (tasks) => tasks.filter((task) => task.done);
  const { isServerUnreachable } = useContext(TasksContext);

  return isServerUnreachable ? (
    <PageNotFoundView
      pageTitle="There were issues contacting server. Try again later"
    />
  ) : (
    <Dashbord>
      <SectionHeader text="Add task" />
      <AddTaskForm />{" "}
      <DoubleColumnGrid>
        <TasksListing
          headerText="Tasks in progress"
          tasks={getInProgressTasks(tasksState)}
        />{" "}
        <TasksListing
          headerText="Completed tasks"
          tasks={getCompletedTasks(tasksState)}
        />
      </DoubleColumnGrid>
    </Dashbord>
  );
};

export default LandingPageView;
