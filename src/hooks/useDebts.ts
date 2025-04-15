import { useEffect, useState } from "react";
import { Debt, ApiDebt, SortOrder } from "@/types";
import { parseApiDebt, sortDebts } from "@/utils";

const API_URL = "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment";

const API_PATHS = {
  GetTopDebts: "/GetTopDebts",
  GetFilteredDebts: "/GetFilteredDebts",
};

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [sortBy, setSortBy] = useState<{
    order: SortOrder;
    column: keyof Debt;
  }>({
    order: "asc",
    column: "name",
  });
  const [isError, setIsError] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchTopDebts = async () => {
    try {
      setIsError(false);
      setIsFetching(true);
      const response = await fetch(`${API_URL}${API_PATHS.GetTopDebts}`);
      const data: ApiDebt[] = await response.json();
      setDebts(sortDebts(data.map(parseApiDebt)));
    } catch (err) {
      setIsError(true);
      console.error("Failed to fetch top debts", err);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchFilteredDebts = async (phrase: string) => {
    try {
      setIsError(false);
      setIsFetching(true);
      const response = await fetch(`${API_URL}${API_PATHS.GetFilteredDebts}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase }),
      });
      const data: ApiDebt[] = await response.json();
      setDebts(sortDebts(data.map(parseApiDebt)));
    } catch (err) {
      setIsError(true);
      console.error("Failed to fetch top debts", err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDebtsSorting = (column: keyof Debt) => {
    const newOrder = sortBy.order === "asc" ? "desc" : "asc";
    setSortBy({
      order: newOrder,
      column,
    });
    const sorted = sortDebts(debts, column, newOrder);
    setDebts(sorted);
  };

  useEffect(() => {
    fetchTopDebts();
  }, []);

  return {
    debts,
    isError,
    sortBy,
    isFetching,
    fetchTopDebts,
    fetchFilteredDebts,
    handleDebtsSorting,
  };
};
