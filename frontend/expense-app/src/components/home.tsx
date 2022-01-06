import { Component, ChangeEvent } from "react";
import ExpenseDataService from "../services/expense.services";
import { Link } from "react-router-dom";
import ExpenseData from '../types/expense.types';

type Props = {};

type State = {
  expenses: Array<ExpenseData>,
  currentExpense: ExpenseData | null,
  currentIndex: number,
  searchItem: string
};

export default class ExpenseList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.retrieveExpenses = this.retrieveExpenses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExpense = this.setActiveExpense.bind(this);
    this.removeAllExpenses = this.removeAllExpenses.bind(this);
    this.searchItem = this.searchItem.bind(this);

    this.state = {
      expenses: [],
      currentExpense: null,
      currentIndex: -1,
      searchItem: ""
    };
  }

  componentDidMount() {
    this.retrieveExpenses();
  }

  onChangeSearchItem(e: ChangeEvent<HTMLInputElement>) {
    const searchItem = e.target.value;

    this.setState({
      searchItem: searchItem
    });
  }

  retrieveExpenses() {
    ExpenseDataService.getAll()
      .then(response => {
        this.setState({
          expenses: response.data
        });
        console.log(response.data); //development
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveExpenses();
    this.setState({
      currentExpense: null,
      currentIndex: -1
    });
  }

  setActiveExpense(expense: ExpenseData, index: number) {
    this.setState({
      currentExpense: expense,
      currentIndex: index
    });
  }

  removeAllExpenses() {
    ExpenseDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchItem() {
    this.setState({
      currentExpense: null,
      currentIndex: -1
    });

    ExpenseDataService.findByItem(this.state.searchItem)
      .then(response => {
        this.setState({
          expenses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchItem, expenses, currentExpense, currentIndex } = this.state;

    return (
      <div className="list row d-flex p-2">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by item"
              value={searchItem}
              onChange={this.onChangeSearchItem}
            />
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchItem}
                >
                    Search
                </button>
                </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Expense List</h4>

          <ul className="list-group">
            {expenses &&
              expenses.map((expense: ExpenseData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExpense(expense, index)}
                  key={index}
                >
                  {expense.item}
                </li>
              ))}
          </ul>

          <button
            className="mt-3 btn btn-sm btn-danger"
            onClick={this.removeAllExpenses}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentExpense ? (
            <div>
              <h4>Information</h4>
              <div>
                <label>
                  <strong>Date:</strong>
                </label>{" "}
                {currentExpense.date}
              </div>
              <div>
                <label>
                  <strong>Item:</strong>
                </label>{" "}
                {currentExpense.item}
              </div>
              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentExpense.amount}
              </div>

              <Link
                to={"/expenses/" + currentExpense.id}
                className="btn btn-sm btn-success"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on the expense to see more information!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
