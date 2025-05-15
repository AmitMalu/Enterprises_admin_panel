import { Text } from '@mantine/core';

interface TextComponentProps {
    children: React.ReactNode;
    fontSize?: number | string; // allow number or Tailwind classes
    fontWeight?: number;
    color?: string;
    fontFamily?: string;
    align?: 'left' | 'center' | 'right';
    truncate?: boolean;
    lineClamp?: number;
    className?: string;
    onClick?: () => void;
    [key: string]: any
}

const TextComponent: React.FC<TextComponentProps> = ({
    children,
    fontSize,
    fontWeight,
    color,
    fontFamily,
    align,
    truncate,
    lineClamp,
    className,
    onClick,
    ...props
}) => {

    return (
        <Text
            style={{ fontSize, fontFamily }}  // Apply fontFamily and other styles dynamically
            fw={fontWeight}
            c={color}
            truncate={truncate}
            lineClamp={lineClamp}
            className={className}
            onClick={onClick}
            ta={align}
            {...props}  // Spread all additional props (like custom data attributes or styles)
        >
            {children}
        </Text>
    );
};

export default TextComponent;
