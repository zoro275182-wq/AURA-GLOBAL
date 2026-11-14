import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Class-based React Error Boundary for WebGL 3D Canvas.
 * Prevents WebGL context loss, shader compilation errors, or loader crashes
 * from propagating up the React component tree and blanking the UI.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'WebGL Context or Shader Error'
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CanvasErrorBoundary] Caught WebGL/Canvas error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#07080E]/90 to-[#0B0F19]/90 backdrop-blur-2xl">
          <div className="p-6 rounded-3xl bg-[#090D18]/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col items-center max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-3 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100 font-mono mb-1">
              3D WebGL Accelerator Safe-Mode
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4 leading-relaxed">
              Графический контекст переключен в режим защиты. Навигация, формуляр характеристик и оформление заказов полностью активны.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Перезапустить 3D-ядро
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
