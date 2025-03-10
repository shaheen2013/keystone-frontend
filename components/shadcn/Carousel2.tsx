"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement>;
  api: EmblaCarouselType | undefined;
  opts: any;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  opts?: any;
  setApi?: (api: EmblaCarouselType) => void;
  plugins?: any;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: EmblaCarouselType) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

interface CarouselPreviousProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  variant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ReactNode;
  iconClass?: string;
}

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(
  (
    {
      className,
      variant = "outline",
      size = "icon",
      icon,
      iconClass,
      ...props
    },
    ref
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        {icon ? icon : <ChevronLeft className={cn("h-4 w-4", iconClass)} />}
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

interface CarouselNextProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ReactNode;
  iconClass?: string;
}

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  (
    {
      className,
      variant = "outline",
      size = "icon",
      icon,
      iconClass,
      ...props
    },
    ref
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        {icon ? icon : <ChevronRight className={cn("h-4 w-4", iconClass)} />}

        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  btnClass?: string;
  activeClass?: string;
}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  (props, ref) => {
    const { api } = useCarousel();
    const [, setUpdateState] = React.useState(false);
    const toggleUpdateState = React.useCallback(
      () => setUpdateState((prevState) => !prevState),
      []
    );

    React.useEffect(() => {
      if (api) {
        api.on("select", toggleUpdateState);
        api.on("reInit", toggleUpdateState);

        return () => {
          api.off("select", toggleUpdateState);
          api.off("reInit", toggleUpdateState);
        };
      }
    }, [api, toggleUpdateState]);

    const numberOfSlides = api?.scrollSnapList().length || 0;
    const currentSlide = api?.selectedScrollSnap() || 0;

    if (numberOfSlides > 1) {
      return (
        <div ref={ref} className={`flex justify-center ${props.className}`}>
          {Array.from({ length: numberOfSlides }, (_, i) => (
            <Button
              key={i}
              className={cn(
                "mx-4 w-12 md:w-16 h-4 rounded-full p-0 transition-all duration-300 ease-in-out",
                props.btnClass,
                i === currentSlide
                  ? "bg-secondary-6 hover:bg-secondary-6"
                  : "w-4 md:w-4 transform rounded-3xl bg-secondary-4 hover:bg-secondary-6",
                i === currentSlide && props.activeClass
              )}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      );
    } else {
      return <></>;
    }
  }
);
CarouselDots.displayName = "CarouselDots";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
