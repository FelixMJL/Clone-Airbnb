import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorState from "@/app/error"; // 确保这个路径匹配你的项目结构
import { useRouter } from "next/navigation";

// Mock next/router 的 useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// 设置 useRouter mock 的默认实现
(useRouter as jest.Mock).mockImplementation(() => ({
  push: jest.fn(),
}));

describe("ErrorState Component Tests", () => {
  // Mock console.error
  const mockConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("displays the correct title and subtitle", () => {
    render(<ErrorState error={new Error("Test Error")} />);

    expect(screen.getByText("Uh Oh")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("calls console.error with the error", () => {
    const testError = new Error("Test Error");
    render(<ErrorState error={testError} />);

    expect(mockConsoleError).toHaveBeenCalledWith(testError);
  });
});
