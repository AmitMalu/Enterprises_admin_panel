import { isValidElement, ReactNode, useRef } from "react";
import { Carousel, CarouselProps } from "@mantine/carousel";
import { rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import classes from './CustomCarousel.module.css';

interface CustomCarouselProps extends Omit<CarouselProps, "children"> {
    children: ReactNode;
    indicatorColor?: string
    shouldAutoPlay?: boolean; // 👈 new prop
    autoplayDelay?: number;
}

export const CustomCarousel = ({
    children,
    slideSize = "25%",
    slideGap = "md",
    align = "start",
    loop = true,
    withIndicators = true,
    height = rem(200),
    indicatorColor,
    shouldAutoPlay = false, // 👈 default false
    autoplayDelay = 3000,
    classNames,
    styles,
    ...rest
}: CustomCarouselProps) => {

    const autoplay = useRef(Autoplay({ delay: autoplayDelay }));

    return (
        <Carousel
            slideSize={slideSize}
            slideGap={slideGap}
            align={align}
            loop={loop}
            withIndicators={withIndicators}
            height={height}
            nextControlIcon={<IconChevronRight color="red" size={18} />}
            previousControlIcon={<IconChevronLeft color="red" size={18} />}
            plugins={shouldAutoPlay ? [autoplay.current] : []}  // 👈 only if true
            onMouseEnter={shouldAutoPlay ? autoplay.current.stop : undefined}
            onMouseLeave={shouldAutoPlay ? () => autoplay.current.play() : undefined}
            getEmblaApi={(embla) => {
                embla.on("init", () => {
                    console.log("Embla initialized");
                });
            }}
            styles={{
                indicator: {
                    backgroundColor: indicatorColor || "gray",
                },
                ...styles,
            }}
            classNames={{
                ...classes,
                ...classNames,
            }}
            {...rest}
        >
            {Array.isArray(children)
                ? children.map((child, idx) =>
                    isValidElement(child) && child.type === Carousel.Slide ? (
                        child
                    ) : (
                        <Carousel.Slide key={idx}>{child}</Carousel.Slide>
                    )
                )
                : children}
        </Carousel>
    );
};
