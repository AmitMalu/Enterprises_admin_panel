import React from 'react';
import { Button } from '@mantine/core';

interface ButtonComponentProps {
    onClick?: () => void;
    variant?: 'filled' | 'outline' | 'light' | 'gradient';
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    radius?: number;
    bgColor?: string;
    textColor?: string;
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode; // Only this instead of `title`
    style?: React.CSSProperties; // Add this line for custom inline styles
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    children,
    onClick,
    variant = 'filled',
    className,
    leftIcon,
    rightIcon,
    disabled = false,
    loading = false,
    size = 'sm',
    fullWidth = false,
    radius,
    bgColor = 'transparent',
    textColor = '#000000',
    type = 'button',
    style = {}, // Default empty object for custom inline styles
}) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            variant={variant}
            leftSection={leftIcon}
            rightSection={rightIcon}
            disabled={disabled}
            loading={loading}
            radius={radius || 16}
            size={size}
            fullWidth={fullWidth}
            className={className || ''}
            styles={{
                root: {
                    backgroundColor: variant === 'filled' ? bgColor : 'transparent',
                    borderColor: bgColor,
                    '&:hover': {
                        backgroundColor: variant === 'filled' ? '#A30002' : 'transparent',
                        opacity: 0.8,
                    },
                    color: textColor,
                    height: '100%',
                    width: '100%',
                    opacity: disabled ? 0.6 : 1,
                    padding: 5,
                    ...style, // Apply custom styles passed from the parent component
                },
            }}
        >
            {children}
        </Button>
    );
};

export default ButtonComponent;
