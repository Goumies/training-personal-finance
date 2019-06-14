import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { Operation } from "../Operation";
import nodeFetch from "node-fetch";
import { render } from "enzyme";

export interface OwnProps {}

export interface StateProps {
  operations: IOperation[];
}

export interface UpdateProps {
  onInitOperations(operations: IOperation[]): void;
}

export type Props = OwnProps & StateProps & UpdateProps;

export class OperationHistoryComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    nodeFetch('http://localhost:5000/operations')
    .then(res => res.json())
    .then(json => {
      const seriallizedOperations: { id: string, date: string, amount: number }[] = json;
      const deserializedOperations = seriallizedOperations
        .map(operation => ({
          ...operation,
          date: new Date(operation.date)
        }));
      this.props.onInitOperations(deserializedOperations);
    });
  }

  render() {
    return (
      <div>
        {this.props.operations.map((operation: IOperation) => (
          <Operation key={operation.id} id={operation.id} />
        ))}
      </div>
    );
  }
    
};
