import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from '../src/App'
import { playerCard, searchInput, setOnlineFilter, visibleNames } from './helpers'

// Эти требования ещё не реализованы в main: красные тесты здесь ожидаемы.
// По мере работы над практикой они должны стать зелёными без изменения тестов.
describe('Результат новой практики', () => {
  test('игнорирует пробелы по краям поискового запроса', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(searchInput(), '  ANNA  ')
    expect(visibleNames()).toEqual(['Anna'])
  })

  test('позволяет выключить фильтр после отключения последнего видимого игрока', async () => {
    const user = userEvent.setup()
    render(<App />)
    await setOnlineFilter(user, true)
    for (const name of visibleNames()) {
      await user.click(playerCard(name).getByRole('button', { name: 'Изменить статус' }))
    }
    expect(visibleNames()).toEqual([])
    await setOnlineFilter(user, false)
    expect(visibleNames()).toEqual(expect.arrayContaining(['Anna', 'Max', 'Kate']))
  })

  test('умеет показывать только офлайн-игроков', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Статус' }), 'offline')
    expect(visibleNames()).toContain('Max')
    expect(visibleNames()).not.toContain('Anna')
    expect(visibleNames()).not.toContain('Kate')
  })

  test('сортирует по имени и восстанавливает исходный порядок', async () => {
    const user = userEvent.setup()
    render(<App />)
    const initial = visibleNames()
    const sorting = screen.getByRole('combobox', { name: 'Сортировка' })
    await user.selectOptions(sorting, 'name')
    expect(visibleNames()).toEqual([...initial].sort((a, b) => a.localeCompare(b)))
    await user.selectOptions(sorting, 'default')
    expect(visibleNames()).toEqual(initial)
  })

  test('применяет поиск, статус и сортировку вместе', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(searchInput(), 'a')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Статус' }), 'online')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Сортировка' }), 'name')
    expect(visibleNames()).toEqual(['Anna', 'Kate'])
  })

  test('сбрасывает фильтры, сохраняя изменённые статусы игроков', async () => {
    const user = userEvent.setup()
    render(<App />)
    const initial = visibleNames()
    expect(screen.getByRole('button', { name: 'Сбросить' })).toBeDisabled()
    await user.click(playerCard('Anna').getByRole('button', { name: 'Изменить статус' }))
    await user.type(searchInput(), 'Nobody123')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Статус' }), 'online')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Сортировка' }), 'name')
    await user.click(screen.getByRole('button', { name: 'Сбросить' }))
    expect(searchInput()).toHaveValue('')
    expect(screen.getByRole('combobox', { name: 'Статус' })).toHaveValue('all')
    expect(screen.getByRole('combobox', { name: 'Сортировка' })).toHaveValue('default')
    expect(visibleNames()).toEqual(initial)
    expect(playerCard('Anna').getByText(/^оф{1,2}лайн$/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'Сбросить' })).toBeDisabled()
  })
})
