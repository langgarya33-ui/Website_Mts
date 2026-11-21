import { useEffect, useState } from "react";

export default function usePublishedContent(type) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.resolve()
      .then(() => fetch(`http://localhost:5000/api/content/${type}`, {
        credentials: "omit",
        cache: "no-store",
        headers: { Accept: "application/json" },
      }))
      .then(async (response) => {
        if (!response.ok) throw new Error("Gagal mengambil konten.");
        return response.json();
      })
      .then((data) => {
        if (active) setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [type]);

  return { items, isLoading };
}
