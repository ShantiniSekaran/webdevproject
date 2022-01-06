import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import ExpenseDataService from "../services/expense.services";
import ExpenseData from '../types/expense.types';

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentExpense: ExpenseData;
  message: string;
}

export default class Expense extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.getExpense = this.getExpense.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = {
        currentExpense: {
            id: null,
            date: "",
            item: "",
            amount: "",
            published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getExpense(this.props.match.params.id);
  }

  onChangeDate(e: ChangeEvent<HTMLInputElement>) {
    const date = e.target.value;

    this.setState((prevState) => ({
        currentExpense: {
          ...prevState.currentExpense,
          date: date,
        },
    }));
  }

  onChangeItem(e: ChangeEvent<HTMLInputElement>) {
    const item = e.target.value;

    this.setState(function (prevState) {
      return {
        currentExpense: {
          ...prevState.currentExpense,
          item: item,
        },
      };
    });
  }

  onChangeAmount(e: ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value;

    this.setState((prevState) => ({
        currentExpense: {
        ...prevState.currentExpense,
        amount: amount,
      },
    }));
  }

  getExpense(id: string) {
    ExpenseDataService.get(id)
      .then((response) => {
        this.setState({
            currentExpense: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    const data: ExpenseData = {
      id: this.state.currentExpense.id,
      date: this.state.currentExpense.date,
      item: this.state.currentExpense.item,
      amount: this.state.currentExpense.amount,
      published: status,
    };

    ExpenseDataService.update(data, this.state.currentExpense.id)
      .then((response) => {
        this.setState((prevState) => ({
            currentExpense: {
            ...prevState.currentExpense,
            published: status,
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateExpense() {
    ExpenseDataService.update(
      this.state.currentExpense,
      this.state.currentExpense.id
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The expense was updated successfully!",
        });
      })
      .catch((e) => {
        this.setState({
          message: "There's an error",
        });
        console.log(e);
      });
  }

  deleteExpense() {
    ExpenseDataService.delete(this.state.currentExpense.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/expenses");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentExpense } = this.state;

    return (
      <div>
        {currentExpense? (
          <div className="edit-form">
            <h4>Expense</h4>
            <form>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentExpense.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item">Item</label>
                <input
                  type="text"
                  className="form-control"
                  id="item"
                  value={currentExpense.item}
                  onChange={this.onChangeItem}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={currentExpense.amount}
                  onChange={this.onChangeAmount}
                />
              </div>


            </form>


            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateExpense}
            >
              Update
            </button>

            <button
              className="m-1 btn btn-sm btn-danger"
              onClick={this.deleteExpense}
            >
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an expense list</p>
          </div>
        )}
      </div>
    );
  }
}
