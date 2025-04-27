import { createContext, useContext } from "react";
import { RootStore } from "stores";

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const store = new RootStore();

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useStore должен использоваться внутри StoreProvider");
    }
    return store;
};
