import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import debtsMock from "@/__mocks__/debts.json";
import { expect } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(debtsMock),
  })
);

test("should render render debt list order by name asc", async () => {
  render(<App />);
  expect(
    await screen.findByText(/podaj nip lub nazwę dłużnika/i)
  ).toBeInTheDocument();
  const firstTh = screen.getByRole("columnheader", { name: /dluznik/i });
  expect(firstTh).toHaveTextContent(/▲/i);
  const rows = screen.getAllByRole("row");
  expect(rows[3]).toHaveTextContent(/piotr szymański/i);
  expect(rows[4]).toHaveTextContent(/mieczysław zając/i);
  expect(rows[7]).toHaveTextContent(/małgorzata mazurek/i);
});

test("should show warning when less than 3 characters provided to search", async () => {
  render(<App />);
  fireEvent.click(await screen.findByRole("button", { name: /szukaj/i }));
  expect(await screen.findByRole("dialog")).toBeInTheDocument();
});

test("should order list by date desc", async () => {
  render(<App />);
  const dateTh = await screen.findByRole("columnheader", { name: /data/i });
  fireEvent.click(dateTh);
  expect(dateTh).toHaveTextContent(/▼/i);
  const rows = screen.getAllByRole("row");
  expect(rows[3]).toHaveTextContent(/30-03-2017/i);
  expect(rows[4]).toHaveTextContent(/15-04-2017/i);
  expect(rows[7]).toHaveTextContent(/01-06-2017/i);
});

test("should order list by value asc", async () => {
  render(<App />);
  const valueTh = await screen.findByRole("columnheader", { name: /kwota/i });
  fireEvent.click(valueTh);
  fireEvent.click(valueTh);
  expect(valueTh).toHaveTextContent(/▲/i);
  const rows = screen.getAllByRole("row");
  expect(rows[2]).toHaveTextContent(/32330/i);
  expect(rows[3]).toHaveTextContent(/10000/i);
  expect(rows[8]).toHaveTextContent(/2000/i);
});

test("should order list by nip desc", async () => {
  render(<App />);
  const nipTh = await screen.findByRole("columnheader", { name: /nip/i });
  fireEvent.click(nipTh);
  expect(nipTh).toHaveTextContent(/▼/i);
  const rows = screen.getAllByRole("row");
  expect(rows[1]).toHaveTextContent(/1112223301/i);
  expect(rows[7]).toHaveTextContent(/1112223307/i);
  expect(rows[9]).toHaveTextContent(/1112223309/i);
});
