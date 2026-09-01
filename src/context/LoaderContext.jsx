import { createContext, useContext, useMemo, useRef, useState } from "react";
import { bindLoader } from "@/context/loaderBridge";
import styles from "./GlobalLoader.module.css";

const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
  const [pending, setPending] = useState(0);
  const setPendingRef = useRef(setPending);
  setPendingRef.current = setPending;

  const api = useMemo(
    () => ({
      start: () => setPendingRef.current((count) => count + 1),
      stop: () => setPendingRef.current((count) => Math.max(0, count - 1)),
    }),
    [],
  );

  bindLoader(api);

  const value = useMemo(
    () => ({
      isLoading: pending > 0,
      start: api.start,
      stop: api.stop,
    }),
    [pending, api],
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}
      {pending > 0 && (
        <div className={styles.overlay} aria-busy="true" aria-live="polite">
          <div className={styles.box}>
            <div className={styles.loader} />
            <p>Cargando…</p>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader debe usarse dentro de LoaderProvider");
  }
  return context;
};
