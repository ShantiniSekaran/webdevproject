import http from "../http-common";
import ExpenseData from "../types/expense.types"

class ExpenseDataService {
  getAll() {
    return http.get("/expenses");
  }

  get(id: string) {
    return http.get(`/expenses/${id}`);
  }

  create(data: ExpenseData) {
    return http.post("/expenses", data);
  }

  update(data: ExpenseData, id: any) {
    return http.put(`/expenses/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/expenses/${id}`);
  }

  deleteAll() {
    return http.delete(`/expenses`);
  }

  findByItem(item: string) {
    return http.get(`/expenses?item=${item}`);
  }
}

export default new ExpenseDataService();
