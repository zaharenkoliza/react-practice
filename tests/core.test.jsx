import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from '../src/App'
import { playerCard, searchInput, setOnlineFilter, visibleNames } from './helpers'

describe('Функциональность с прошлой пары', () => {
  test('показывает исходных игроков', () => {
    render(<App />)
    expect(visibleNames()).toEqual(expect.arrayContaining(['Anna', 'Max', 'Kate']))
  })

  test('ищет по части имени без учёта регистра', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(searchInput(), 'aN')
    expect(visibleNames()).toEqual(['Anna'])
  })

  test('показывает пустую выдачу и восстанавливает список после очистки поиска', async () => {
    const user = userEvent.setup()
    render(<App />)
    const initial = visibleNames()
    await user.type(searchInput(), 'Nobody123')
    expect(visibleNames()).toEqual([])
    expect(screen.getByText(/никого нет|игроки не найдены/i)).toBeVisible()
    await user.clear(searchInput())
    expect(visibleNames()).toEqual(initial)
  })

  test('оставляет онлайн-игроков и возвращает всех', async () => {
    const user = userEvent.setup()
    render(<App />)
    await setOnlineFilter(user, true)
    expect(visibleNames()).toEqual(expect.arrayContaining(['Anna', 'Kate']))
    expect(visibleNames()).not.toContain('Max')
    await setOnlineFilter(user, false)
    expect(visibleNames()).toContain('Max')
  })

  test('применяет поиск и статус одновременно', async () => {
    const user = userEvent.setup()
    render(<App />)
    await setOnlineFilter(user, true)
    await user.type(searchInput(), 'max')
    expect(visibleNames()).toEqual([])
    await user.clear(searchInput())
    await user.type(searchInput(), 'kat')
    expect(visibleNames()).toEqual(['Kate'])
  })

  test('меняет статус только выбранного игрока и позволяет переключить обратно', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(playerCard('Anna').getByRole('button', { name: 'Изменить статус' }))
    expect(playerCard('Anna').getByText(/^оф{1,2}лайн$/i)).toBeVisible()
    expect(playerCard('Kate').getByText('Онлайн')).toBeVisible()
    await user.click(playerCard('Anna').getByRole('button', { name: 'Изменить статус' }))
    expect(playerCard('Anna').getByText('Онлайн')).toBeVisible()
  })

  test('убирает отключённого игрока из выдачи «Только онлайн»', async () => {
    const user = userEvent.setup()
    render(<App />)
    await setOnlineFilter(user, true)
    await user.click(playerCard('Anna').getByRole('button', { name: 'Изменить статус' }))
    expect(visibleNames()).not.toContain('Anna')
    expect(visibleNames()).toContain('Kate')
  })
})
