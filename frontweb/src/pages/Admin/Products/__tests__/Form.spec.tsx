import { render, screen, waitFor } from "@testing-library/react";
import { Router, useParams } from "react-router-dom";
import history from "util/history";
import Form from "../Form";
import userEvent from "@testing-library/user-event";
import { server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";


// Calling mocked server and not the real API
beforeAll(() => {
    server.listen();
})
afterEach(() => {
    server.restoreHandlers();
})
afterAll(() => {
    server.close()
})

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Product form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

    test('should show toast and redirect when submit form correctly', async () => {

        render(
            <Router history={history} >
                < ToastContainer />
                <Form />
            </Router>
        );

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias"); // Categories label

        const submitButton = screen.getByRole('button', { name: /salvar/i }) // selecting button

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg');
        userEvent.type(descriptionInput, 'Computador muito bom');

        userEvent.click(submitButton);

        await waitFor(() => {
            const toastElement = screen.getByText('Produto cadastrado com sucesso');
            expect(toastElement).toBeInTheDocument();
        })

        expect(history.location.pathname).toEqual('/admin/products');

    });

    test('should show 5 validation messages when just clicking submit', async () => {

        render(
            <Router history={history} >
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i }) // selecting button

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório') // getting all required fields messages
            expect(messages).toHaveLength(5) // this array need to be formed! 
        })
    });

    test('should clear validation messages when filling out the form correctly', async () => {

        render(
            <Router history={history} >
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i }) // selecting button

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório') // getting all required fields messages
            expect(messages).toHaveLength(5) // this array need to be formed! 
        })

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias"); // Categories label

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg');
        userEvent.type(descriptionInput, 'Computador muito bom');

        await waitFor(() => {
            const messages = screen.queryAllByText('Campo obrigatório') // getting all required fields messages
            expect(messages).toHaveLength(0) // this array need to be formed! 
        })

    });
});


