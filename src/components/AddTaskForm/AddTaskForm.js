// Libs
import React, { useState, useContext, Fragment } from "react";
import axios from "axios";
import { css, jsx } from "@emotion/core";

// Components
import InputSlider from "../atoms/inputs/InputSlider/InputSlider";
import FormButton from "../atoms/buttons/FormButton";
import CloseWindowButton from "../atoms/buttons/CloseWindowButton/CloseWindowButton";
import ToggleFormButton from "../atoms/buttons/ToggleFormButton";
import LoadingDefault from "../atoms/loadings/LoadingCircle";
import Checkbox from "../atoms/inputs/Checkbox/Checkbox";

// Authorization
import { tasksAPIUrl, httpHeader } from "../../auth/tasksAPISettings";

// Context
import { TasksContext } from "../../context/TasksContext";
import { AlertsContext } from "../../context/AlertsContext";

// Utils
import setFormChanges from "../../utils/setFormChanges";

// Styles
import { formWrapper, barFormStyle } from "./style/AddTaskFormStyle";

/** @jsx jsx */

const AddTaskForm = () => {
  const [isMobileFormToggled, setIsMobileFormToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { tasksState, setTasksState } = useContext(TasksContext);
  const { addAlert } = useContext(AlertsContext);

  const initialState = {
    title: "",
    description: "",
    done: false,
  };

  const [formState, setFormState] = useState(initialState);

  const postNewTaskCall = async (formState, tasksState) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(tasksAPIUrl, formState, httpHeader);
      setTasksState([...tasksState, data]);
    } catch (error) {
      addAlert(
        "danger",
        "Ups. Unable to add task. Check data and try again",
        3000
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    postNewTaskCall(formState, tasksState);
  };

  const onChangeHandler = (event) => {
    setFormChanges(event, setFormState, formState);
  };

  const toggleMobileFormHandler = (event) => {
    event.preventDefault();
    setIsMobileFormToggled(!isMobileFormToggled);
  };
  return (
    <div css={formWrapper} data-testid="add-task-form">
      <ToggleFormButton
        buttonText="New task"
        onClickHandler={toggleMobileFormHandler}
      />

      <form css={barFormStyle(isMobileFormToggled)} onSubmit={onSubmitHandler}>
        {isLoading ? (
          <LoadingDefault />
        ) : (
          <Fragment>
            <CloseWindowButton onClickHandler={toggleMobileFormHandler} />
            <Checkbox
              id="taskStatus"
              name="done"
              value={formState.done}
              onChange={onChangeHandler}
            />
            <InputSlider
              id="taskTitle"
              type="text"
              name="title"
              labelText="task title"
              value={formState.title}
              onChange={onChangeHandler}
              required={true}
            />
            <InputSlider
              id="taskDescription"
              type="text"
              name="description"
              labelText={"task description"}
              value={formState.description}
              onChange={onChangeHandler}
            />
            <FormButton btnText="Add task" data-testid="submit-btn" />{" "}
          </Fragment>
        )}
      </form>
    </div>
  );
};

export default AddTaskForm;
