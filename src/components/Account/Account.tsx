import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { OperationHistory } from "../OperationHistory";
import { Balance } from "../Balance";
import { AddOperation } from "../AddOperation";

interface Props {
  operations: IOperation[];
}

type State = Props;

export class Account extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      operations: props.operations
    };
  }

  private onNewOperation = (operation: IOperation): void => {
    this.setState({
      ...this.state,
      operations: [...this.state.operations, operation]
    });
  };

  render() {
    const balance: number = this.state.operations.map(extractAmount).reduce(sum, 0);
    return (
      <div>
        <AddOperation onNewOperation={this.onNewOperation} />
        <OperationHistory operations={this.state.operations} />
        <Balance amount={balance} />
      </div>
    );
  }
}

function extractAmount({ amount }: IOperation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}
