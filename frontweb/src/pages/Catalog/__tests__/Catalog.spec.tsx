import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import history from "util/history";
import Catalog from "..";

// Test is async because should wait for products rendering
test('should render Catalog with products', async () => {

    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();

    // wainting for results to get the element
    await waitFor(() => {
        expect(screen.getByText('Smart TV')).toBeInTheDocument();

    });


});
