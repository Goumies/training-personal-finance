import { connect, State, Updater } from "../../store";
import { OperationHistoryComponent, StateProps, UpdateProps, OwnProps } from "./OperationHistory";
import { Operation } from "../../interfaces/Operation";

function computeStateProps({ operations }: State): StateProps {
  return { operations };
}

function computeUpdateProps(updateState: (updater: Updater) => void): UpdateProps {
  function onInitOperations(operations: Operation[]) {
    const updater: Updater = (state: State) => {
      return {
        ...state, 
        operations
      }
    }
    updateState(updater);
  };
  return { onInitOperations };
}

export const OperationHistory = connect<OwnProps, StateProps, UpdateProps>(
  OperationHistoryComponent,
  { computeStateProps, computeUpdateProps }
);
