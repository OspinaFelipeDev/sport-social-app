// src/pages/Home.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home"; // Ajusta la ruta si es necesario
import { vi } from "vitest";

// 👇 Mockea solo aquí, no arriba también
const mockNavigate = vi.fn();

// 👇 Hacemos el mock de useNavigate una vez
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

test("el botón 'Hagamos Deporte' navega a /login", () => {
  render(<Home />, { wrapper: MemoryRouter });

  const boton = screen.getByText(/Hagamos Deporte/i);
  fireEvent.click(boton);

  expect(mockNavigate).toHaveBeenCalledWith("/login");
});
