import React, {
  ReactElement,
  useContext,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface PendingPromise {
  type: "pending";
}

interface ResolvedPromise {
  type: "resolved";
  result: unknown;
}

interface RejectedPromise {
  type: "rejected";
  result: unknown;
}

type PromiseStatus = PendingPromise | ResolvedPromise | RejectedPromise;

const AwaitContext = createContext<PromiseStatus>({ type: "pending" });

interface AwaitProps {
  promise: Promise<unknown>;
}

interface ThenProps {
  children: (result: unknown) => ReactElement;
}

interface CatchProps {
  children: (result: unknown) => ReactElement;
}

export const Await: FunctionComponent<PropsWithChildren<AwaitProps>> = ({
  children,
  promise,
}) => {
  const [promiseStatus, setPromiseStatus] = useState<PromiseStatus>({
    type: "pending",
  });

  useEffect(() => {
    let mounted: boolean = true;
    setPromiseStatus({ type: "pending" });
    promise
      .then(
        (result) => mounted && setPromiseStatus({ type: "resolved", result })
      )
      .catch(
        (result) => mounted && setPromiseStatus({ type: "rejected", result })
      );

    return function () {
      mounted = false;
    };
  }, [promise]);

  return (
    <AwaitContext.Provider value={promiseStatus}>
      {children}
    </AwaitContext.Provider>
  );
};

export const Pending: FunctionComponent = ({ children }) => {
  const promiseStatus: PromiseStatus = useContext(AwaitContext);

  return promiseStatus.type === "pending" ? <>{children}</> : null;
};

export const Then: FunctionComponent<ThenProps> = ({ children }: ThenProps) => {
  const promiseStatus: PromiseStatus = useContext(AwaitContext);

  return promiseStatus.type === "resolved"
    ? children(promiseStatus.result)
    : null;
};

export const Catch: FunctionComponent<CatchProps> = ({
  children,
}: CatchProps) => {
  const promiseStatus: PromiseStatus = useContext(AwaitContext);

  return promiseStatus.type === "rejected"
    ? children(promiseStatus.result)
    : null;
};
