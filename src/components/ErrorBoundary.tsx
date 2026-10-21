import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unexpected UI error', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center px-5">
          <div className="card max-w-md text-center">
            <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
            <p className="mt-3 text-sm text-slate-600">
              The page hit an unexpected error. Reloading usually fixes it.
            </p>
            <button className="btn-p mt-6" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
