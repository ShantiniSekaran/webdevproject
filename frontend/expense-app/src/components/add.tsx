import { Component, ChangeEvent } from "react";
import ExpenseDataService from "../services/expense.services";
import ExpenseData from "../types/expense.types"

type Props = {}

type State =  ExpenseData & {
    submitted: boolean
};

export default class Add extends Component<Props, State> {
    constructor(props : Props){
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.saveExpense = this.saveExpense.bind(this);
        this.newExpense = this.newExpense.bind(this);


        this.state = {
            id: null,
            date: "",
            item: "",
            amount: "",
            published: false,
            submitted: false
        };
    }

    onChangeDate(e: ChangeEvent<HTMLInputElement>){
      this.setState({
          date: e.target.value
      });
  }

    onChangeItem(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            item: e.target.value
        });
    }

    onChangeAmount(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            amount: e.target.value
        });
    }


    saveExpense(){
        const data: ExpenseData = {
            date:this.state.date,
            item: this.state.item,
            amount: this.state.amount
        };

    ExpenseDataService.create(data).then(response => {
        this.setState({
            id: response.data.id,
            date: response.data.date,
            item: response.data.item,
            amount: response.data.amount,
            published: response.data.published,
            submitted: true
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    })
    }

    newExpense(){
        this.setState({
          id: null,
          date: "",
          item: "",
          amount: "",
          published: false,
          submitted: false
        })
    }

  render() {
    const { submitted, date, item, amount } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You have submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newExpense}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
            <label htmlFor="date">Date</label>
              <input
                type="text"
                className="form-control"
                id="date"
                required
                value={date}
                onChange={this.onChangeDate}
                name="date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item">Item</label>
              <input
                type="text"
                className="form-control"
                id="item"
                required
                value={item}
                onChange={this.onChangeItem}
                name="item"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                required
                value={amount}
                onChange={this.onChangeAmount}
                name="amount"
              />
            </div>

            <button onClick={this.saveExpense} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}
