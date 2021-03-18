// our action will contain a type and could and a payload

import { useEffect, useReducer } from "react";

// in this case the payload could be either a data object or error object
function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(asyncCallback, initialState) {
  // useReducer returns a state and a dispatch that we can call to update the state
  const [state, dispatch] = useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    // spreading this inital state would override our current state
    ...initialState,
  });

  useEffect(() => {
    const promise = asyncCallback();
    // if asyncCallback returns nothing, meaning its undefined then we exit early
    if (!promise) {
      return;
    }

    dispatch({ type: "pending" });
    promise.then(
      (data) => {
        dispatch({ type: "resolved", data });
      },
      (error) => {
        dispatch({ type: "rejected", error });
      }
    );
  }, [asyncCallback]);

  return state;
}
