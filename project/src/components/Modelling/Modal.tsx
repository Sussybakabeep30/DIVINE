import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Target, TargetAndTransition } from 'framer-motion';
import { X } from 'lucide-react';

export type ModalLayout = 'center' | 'sidebar-right' | 'sidebar-left' | 'bottom';
export type ModalTheme = 'light' | 'dark' | 'glass';

type AnimationConfig = Target & TargetAndTransition;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  layout?: ModalLayout;
  theme?: ModalTheme;
  closeIcon?: React.ReactNode;
  backdropImage?: string;
  blurIntensity?: number;
  animationSpeed?: number;
  className?: string;
  customAnimation?: {
    initial?: AnimationConfig;
    animate?: AnimationConfig;
    exit?: AnimationConfig;
  };
  backdropAnimation?: {
    initial?: AnimationConfig;
    animate?: AnimationConfig;
    exit?: AnimationConfig;
  };
}

const defaultThemes = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white',
  glass: 'bg-transparent',
};

const layoutVariants = {
  center: {
    container: 'flex items-center justify-center',
    content: 'w-11/12 max-w-2xl',
    animation: {
      initial: { opacity: 0, y: 10, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 10, scale: 0.95 },
    },
  },
  'sidebar-right': {
    container: 'flex items-stretch justify-end',
    content: 'w-full max-w-md h-full',
    animation: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 },
    },
  },
  'sidebar-left': {
    container: 'flex items-stretch justify-start',
    content: 'w-full max-w-md h-full',
    animation: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
    },
  },
  bottom: {
    container: 'flex items-end justify-center',
    content: 'w-full rounded-t-xl',
    animation: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 },
    },
  },
};

const defaultBackdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  layout = 'center',
  theme = 'light',
  closeIcon,
  animationSpeed = 0.2,
  className = '',
  customAnimation,
  backdropAnimation,
}) => {
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscapeKey]);

  const currentLayout = layoutVariants[layout];
  const themeClass = defaultThemes[theme];

  const modalAnimation = customAnimation || currentLayout.animation;
  const backdropVariants = backdropAnimation || defaultBackdropAnimation;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={backdropVariants.initial}
            animate={backdropVariants.animate}
            exit={backdropVariants.exit}
            transition={{ duration: animationSpeed }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className={`fixed inset-0 z-50 pointer-events-none ${currentLayout.container} p-4`}>
            <motion.div
              initial={modalAnimation.initial}
              animate={modalAnimation.animate}
              exit={modalAnimation.exit}
              transition={{ 
                duration: animationSpeed,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className={`
                ${currentLayout.content}
                ${themeClass}
                ${className}
                relative pointer-events-auto
                shadow-2xl
                overflow-hidden
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: animationSpeed }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors z-10"
                aria-label="Close modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {closeIcon || <X className="w-6 h-6 text-white" />}
              </motion.button>

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};