import { notifyLoaderStart, notifyLoaderStop } from "@/context/loaderBridge";

const jsonp = (url) =>
  new Promise((resolve, reject) => {
    const callback = `dzcb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Deezer tardó demasiado en responder"));
    }, 12000);

    const cleanup = () => {
      window.clearTimeout(timer);
      delete window[callback];
      script.remove();
    };

    window[callback] = (data) => {
      cleanup();
      if (data?.error) {
        reject(new Error(data.error.message || "Error de Deezer"));
        return;
      }
      resolve(data);
    };

    const separator = url.includes("?") ? "&" : "?";
    script.src = `${url}${separator}output=jsonp&callback=${callback}`;
    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo conectar con Deezer"));
    };
    document.body.appendChild(script);
  });

const fetchProxy = async (path) => {
  const response = await fetch(`/deezer${path}`);
  if (!response.ok) throw new Error("Proxy Deezer no disponible");
  const data = await response.json();
  if (data?.error) {
    throw new Error(data.error.message || "Error de Deezer");
  }
  return data;
};

export const deezerGet = async (path) => {
  notifyLoaderStart();
  try {
    if (import.meta.env.DEV) {
      try {
        return await fetchProxy(path);
      } catch {
        // Fallback if the Vite proxy cannot reach Deezer.
      }
    }

    return await jsonp(`https://api.deezer.com${path}`);
  } finally {
    notifyLoaderStop();
  }
};
