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

it('поиск оставляет только подходящего игрока', () => {
    renderApp('/users')

    fireEvent.change(screen.getByRole('textbox', { name: 'Поиск по имени' }), {
        target: { value: 'ann' },
    })

    expect(screen.getByRole('article', { name: 'Игрок Anna' })).toBeVisible()
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.queryByRole('article', { name: 'Игрок Max' })).not.toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Игрок Kate' })).not.toBeInTheDocument()
})

it('фильтр Показать онлайн скрывает Max', () => {
    renderApp('/users')

    expect(screen.getByRole('article', { name: 'Игрок Max' })).toBeVisible()

    fireEvent.click(screen.getByRole('checkbox', { name: 'Показать онлайн' }))

    expect(screen.queryByRole('article', { name: 'Игрок Max' })).not.toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Игрок Anna' })).toBeVisible()
    expect(screen.getByRole('article', { name: 'Игрок Kate' })).toBeVisible()
    expect(screen.getAllByRole('article')).toHaveLength(2)
})

it('поиск без совпадений показывает сообщение и скрывает карточки', () => {
    renderApp('/users')

    fireEvent.change(screen.getByRole('textbox', { name: 'Поиск по имени' }), {
        target: { value: 'Nobody' },
    })

    expect(screen.getByText('Пользователи не найдены.')).toBeVisible()
    expect(screen.queryAllByRole('article')).toHaveLength(0)
})
