import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="fixed inset-0 pointer-events-none bg-spidey-dark z-0 flex items-center justify-center overflow-hidden">
          {/* CSS Only Web Fallback */}
          <div className="absolute inset-0 opacity-10" style={{
            background: 'radial-gradient(circle at center, rgba(227,28,28,0.4) 0%, transparent 60%)'
          }} />
          <div className="w-[1px] h-[200vh] bg-white/5 absolute rotate-45" />
          <div className="w-[1px] h-[200vh] bg-white/5 absolute -rotate-45" />
          <div className="w-[200vw] h-[1px] bg-white/5 absolute" />
          <div className="w-[1px] h-[200vh] bg-white/5 absolute" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
