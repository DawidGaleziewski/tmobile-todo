import React, { useState, useContext } from "react";

// Custome Hooks
import useAxiosGetCall from "../../hooks/useAxiosGetCall";

// Context
import { TasksContext } from "../../context/TasksContext";

// Pages
import PageNotFoundView from "../PageNotFoundView/PageNotFoundView";

// Components
import Dashboard from "../../components/Dashboard/Dashboard";
import SectionHeader from "../../components/atoms/headers/SectionHeader";
import ToggleStatusBadge from "../../components/atoms/badges/ToggleStatusBadge";
import TaskDescriptionPar from "../../components/atoms/paragraphs/TaskDescriptionPar";
import DeleteButton from "../../components/atoms/buttons/DeleteButton/DeleteButton";
import EditTaskFormButton from "../../components/EditTaskFormButton/EditTaskFormButton";
import LoadingCircle from "../../components/atoms/loadings/LoadingCircle";

// Libraries
import { Redirect } from "react-router-dom";

// Authorization
import { tasksAPIUrl } from "../../auth/tasksAPISettings";

const SingleTaskView = ({ match }) => {
  const [taskData, setTaskData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [wasContentNotFound, setWasContentNotFound] = useState(false);
  const { removeTask } = useContext(TasksContext);
  const { tasksState } = useContext(TasksContext);
  const [shouldBeRedirected, setShouldBeRedirected] = useState(false);
  const {
    params: { id },
  } = match;

  const singleTaskAPIUrl = `${tasksAPIUrl}/${id}`;

  useAxiosGetCall(
    singleTaskAPIUrl,
    setIsloading,
    (data, error) => {
      if (error) {
        return setWasContentNotFound(true);
      }
      setTaskData(data);
    },
    [tasksState]
  );

  const { title, description } = taskData;

  const redirectBackToRoot = () => {
    setShouldBeRedirected(true);
    removeTask(id);
  };

  const [formState, setFormState] = useState({ ...taskData });

  const onEditFormChangeHandler = (event) => {
    const {
      target: { name },
    } = event;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const PageConditionalView = () => {
    if (shouldBeRedirected) {
      return <Redirect to="/" />;
    } 
    
    if (isLoading) {
      return <LoadingCircle />;
    } 
    
    if (wasContentNotFound) {
      return (
        <PageNotFoundView pageTitle={`Task with id #${id}, was not found`} />
      );
    }

    return (
      <Dashboard>
        <ToggleStatusBadge task={taskData} />
        <SectionHeader text={`#${id} ${title}`} />
        <TaskDescriptionPar>{description}</TaskDescriptionPar>
        <DeleteButton
          btnText="Delete task"
          modalText={`Are you sure you want to delete task #${id}`}
          id={id}
          onTaskDeletionHandler={redirectBackToRoot}
        />
        <EditTaskFormButton
          taskData={taskData}
          onEditFormChangeHandler={onEditFormChangeHandler}
        />
      </Dashboard>
    );
  };

  return PageConditionalView();
};
export default SingleTaskView;
