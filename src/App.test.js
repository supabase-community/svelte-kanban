import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import App from '@/App.svelte'

describe('App.svelte', () => {
  it('renders Sign in form', () => {
    const { getByText } = render(App)
    const linkElement = getByText(/Sign in/i)
    expect(linkElement).toBeInTheDocument()
  })
})
