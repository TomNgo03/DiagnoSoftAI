import { render, screen, fireEvent } from "@testing-library/react";
import ChatSystem from "../chatbot";

describe("ChatSystem", () => {
  // Test case to verify that role selection buttons (Doctor, Patient, Lab Technician) are rendered
  it("renders role selection buttons", () => {
    render(<ChatSystem />);
    expect(screen.getByText(/Doctor/i)).toBeInTheDocument();
    expect(screen.getByText(/Patient/i)).toBeInTheDocument();
    expect(screen.getByText(/Lab Technician/i)).toBeInTheDocument();
  });

  // Test case to verify that user options appear when a role is selected
  it("shows users when a role is selected", () => {
    render(<ChatSystem />);
    fireEvent.click(screen.getByText(/Doctor/i));
    expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
    expect(screen.getByText("Dr. Jane Smith")).toBeInTheDocument();
  });
  // Test case to verify that users can start a chat and send a message
  it("starts a chat and sends a message", () => {
    render(<ChatSystem />);
    fireEvent.click(screen.getByText(/Doctor/i));
    fireEvent.click(screen.getByText("Dr. John Doe"));

    const messageInput = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(messageInput, { target: { value: "Hello, Dr. Doe!" } });
    fireEvent.click(screen.getByText(/Send/i));

    expect(screen.getByText("Hello, Dr. Doe!")).toBeInTheDocument();
  });
});
