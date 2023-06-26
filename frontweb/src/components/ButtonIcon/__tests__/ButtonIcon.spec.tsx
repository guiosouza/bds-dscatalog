import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ButtonIcon from "..";


test('ButtonIcon should render button with given text', () => {
    // Arrange 
    const MockedText = "Fazer login";

    // Act (to render de component)
    render(
        <ButtonIcon text={MockedText} />
    );

    // screen.debug();

    // Assert - Using queries to find the element
    expect(screen.getByText(MockedText)).toBeInTheDocument();
});