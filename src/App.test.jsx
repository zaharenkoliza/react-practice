import { MemoryRouter } from "react-router"
import App from "./App"
import { fireEvent, render, screen } from "@testing-library/react"
import { expect, it } from "vitest"

function renderApp(path) {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>
    )
}

it('открывает профиль Max по прямому адресу', () => {
    renderApp('/users/2')

    expect(
        screen.getByRole('heading', { name: 'Профиль игрока', level: 1} ),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Max', level: 2 }),).toBeInTheDocument()
    expect(screen.getByText('Оффлайн')).toBeInTheDocument()
})

it('перехожит из списка в профиль Anna', () => {
    renderApp('/users')

    fireEvent.click(screen.getByRole('link', { name: 'Anna' }))

    expect(
        screen.getByRole('heading', { name: 'Профиль игрока', level: 1} ),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Anna', level: 2 }),).toBeInTheDocument()
    // expect(screen.getByText('Оффлайн')).toBeInTheDocument()
})

it('показывает сообщения для неизвестного игрока', () => {
    renderApp('/users/999')

    expect(
        screen.getByRole('heading', { name: 'Игрок не найден'} ),
    ).toBeInTheDocument()
     expect(
        screen.queryByRole('button', { name: 'Изменить статус'} ),
    ).not.toBeInTheDocument()
})