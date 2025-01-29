import { useState, useEffect } from "react";
import { useAppState, useAppDispatch } from "./shared/context/useAppContext";
import { initState } from "./shared/context/initState";
import useFetchModels from "./shared/hooks/useFetchModels";

type Model = {
    productName: string;
    typeName: string;
    models: [{ uri: string }];
};

export function List() {
    const dispatch = useAppDispatch();
    const state = useAppState();

    const { models, loading, error } = useFetchModels(
        "http://localhost:8080/get-dimma-list"
    );

    console.log({ loading, error });

    return (
        <aside
            style={{ width: 240, overflowY: "scroll" }}
            className="flex p-xsmall flex-shrink"
        >
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    textAlign: "left",
                }}
            >
                {models.map((model, index) => {
                    const { productName, typeName, models } = model;

                    const { uri } = models[0] || { uri: initState.uri };
                    return (
                        <li key={index}>
                            <a
                                href="#"
                                onClick={() =>
                                    dispatch({
                                        type: "SET_MODEL_URI",
                                        payload: uri,
                                    })
                                }
                            >
                                <p>{productName}</p>
                                <p>{typeName}</p>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
