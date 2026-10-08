import { screen, within } from '@testing-library/react'

export const searchInput = () => screen.getByLabelText('Поиск по имени')

// Поддерживаем стартовую кнопку и два варианта фильтра после рефакторинга.
// Новая функциональность отдельно проверяет полноценный select «Статус».
export async function setOnlineFilter(user, enabled) {
  const select = screen.queryByRole('combobox', { name: 'Статус' })
  if (select) {
    await user.selectOptions(select, enabled ? 'online' : 'all')
    return
  }

  const checkbox = screen.queryByRole('checkbox', { name: 'Только онлайн' })
  if (checkbox) {
    if (checkbox.checked !== enabled) await user.click(checkbox)
    return
  }

  const button = screen.getByRole('button', {
    name: enabled ? 'Показать только online' : 'Показать всех',
  })
  await user.click(button)
}

export function playerCard(name) {
  const heading = screen.getByRole('heading', { name, exact: true })
  const card = heading.closest('article')
  if (!card) throw new Error(`Карточка ${name} должна быть элементом <article>`)
  return within(card)
}

export function visibleNames() {
  return screen.queryAllByRole('article').map(card =>
    within(card).getByRole('heading', { level: 2 }).textContent,
  )
}
