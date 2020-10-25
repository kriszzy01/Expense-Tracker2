import reducer, {
    initialState,
    addTransaction,
    removeTransaction,
    toggleTransaction,
} from "../../../../redux/slices/TransactionSlice";

const payload = {
    id: `Rice${new Date().getSeconds()}`,
    amount: "230",
    title: "Rice"
};

const previousState = {
    ...initialState,
    ids: [payload.id],
    entities: {
        [payload.id]: payload
    },
    isIncome: true
};

describe("Transaction Slice", () => {
    test("it should return initial state on first run", () => {
        const action = "@@INIT";
        const nextState = reducer(undefined, action);

        expect(initialState).toStrictEqual(nextState);
    });

    test("it should add a new transaction", () => {
        const expectedState = previousState;

        const nextState = reducer(initialState, addTransaction(payload.title, payload.amount));

        expect(expectedState).toStrictEqual(nextState);
    });

    test("it should remove selected transaction", () => {
        const expectedState = initialState;

        const nextState = reducer(previousState, removeTransaction(payload.id));

        expect(expectedState).toStrictEqual(nextState);
    });

    test("it should toggle transaction type", () => {
        const expectedState = { ...initialState, isIncome: false };
        
        const nextState = reducer(initialState, toggleTransaction());

        expect(expectedState).toStrictEqual(nextState);
    });
});