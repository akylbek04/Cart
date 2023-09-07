import { STATES } from "mongoose";

const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "DELETE":
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
      };
    case "INCREASE":
      let updated = state.cart.map((el) => {
        if (el.id === action.payload) {
          return { ...el, amount: el.amount + 1 };
        }
        return el;
      });
      return {
        ...state,
        cart: updated,
      };

    case "DECREASE":
      let decreased = state.cart
        .map((el) => {
          if (el.id === action.payload) {
            return { ...el, amount: el.amount - 1 };
          }
          return el;
        })
        .filter((el) => el.amount !== 0);

      return { ...state, cart: decreased };

    case "GET_TOTAL":
      let { total, amount } = state.cart.reduce(
        (obj, el) => {
          const { amount, price } = el;
          const totalEl = amount * price;
          obj.total += totalEl;
          obj.amount += amount;
          return obj;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return {
        ...state,
        total,
        amount,
      };

    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY":
      return { ...state, cart: action.payload, loading: false };
    case "TOGGLE":
      let tempCart = state.cart
        .map((el) => {
          if (el.id === action.payload.id) {
            if (action.payload.type === "INCREASE") {
              return { ...el, amount: el.amount + 1 };
            }
            if (action.payload.type === "DECREASE") {
              return { ...el, amount: el.amount - 1 };
            }
          }
          return el;
        })
        .filter((el) => el.amount !== 0);
      return {
        ...state,
        cart: tempCart,
      };
    default:
    throw new Error("no matching action type");
  }
};

export default reducer;
