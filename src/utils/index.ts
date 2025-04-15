import { ApiDebt, Debt, SortOrder } from "@/types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const parseApiDebt = (apiDebt: ApiDebt): Debt => ({
  id: apiDebt.Id,
  name: apiDebt.Name,
  nip: apiDebt.NIP,
  date: formatDate(apiDebt.Date),
  value: apiDebt.Value,
});

function parseStringToDate(dateString: string): Date {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-based
}

export const sortDebts = (
  debts: Debt[],
  column: keyof Debt = "name",
  order: SortOrder = "asc"
) => {
  const sortedDebts = [...debts].sort((a, b) => {
    if (column === "date") {
      const comparison =
        parseStringToDate(a[column]) > parseStringToDate(b[column]) ? 1 : -1;
      return order === "asc" ? -comparison : comparison;
    }

    if (column === "value") {
      const comparison = Number(a[column]) - Number(b[column]);
      return order === "asc" ? -comparison : comparison;
    }

    const comparison = String(a[column]).localeCompare(String(b[column]));
    return order === "asc" ? -comparison : comparison;
  });

  return sortedDebts;
};