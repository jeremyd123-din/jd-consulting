"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoHeight from "embla-carousel-auto-height";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { FaLinkedin } from "react-icons/fa";
import { getCleanValue } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__testimonial__variant02 {
    &__logo {
      width: 100%;
      max-width: 230px;
      object-fit: contain;
    }
    &__avatar {
      width: 90px;
      height: 90px;
      border-radius: 100%;
    }
    &__embla {
      overflow: hidden;
    }
    &__embla__container {
      display: flex;
      transition: height 0.2s;
      align-items: flex-start;
    }
    &__embla__slide {
      flex: 0 0 100%;
      min-width: 0;
    }
    &__indicators {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
    &__indicator {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: background-color 0.2s ease;
      border: none;
      &:focus-visible {
        outline: 1px solid blue;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }
      &--active {
        background: var(--t-primary-branding-color) !important;
      }
    }
    &__linkedin-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #0077b5;
      text-decoration: none;
      transition: opacity 0.2s ease;
      &:hover {
        opacity: 0.8;
      }
      &:focus-visible {
        outline: 2px solid #0077b5;
        outline-offset: 2px;
        border-radius: 4px;
      }
    }
    &__person-title-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      @media (max-width: 576px) {
        flex-direction: column;
      }
    }
  }
`;

const TestimonialVariant02 = ({ data = {}, index }) => {
  const testimonials = data.testimonials || [];

  // Embla carousel setup
  const autoplayPlugin =
    data.enable_autoplay !== false
      ? Autoplay({
          delay: (data.autoplay_duration || 5) * 1000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        })
      : null;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: testimonials.length > 1,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    autoplayPlugin ? [autoplayPlugin, AutoHeight()] : [AutoHeight()]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (testimonials.length === 0) return null;

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__testimonial__variant02 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper>
        <div className="container relative u__z-index-1">
          <div className="b__testimonial__variant02__embla" ref={emblaRef}>
            <div className="b__testimonial__variant02__embla__container">
              {testimonials.map((testimonial, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`b__testimonial__variant02__embla__slide b__testimonial__variant02__embla__slide--index-${slideIndex}`}
                >
                  <blockquote className="text-center">
                    {testimonial?.logo?.asset && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0}
                      >
                        <div className="b__testimonial__variant02__logo-wrapper mb-8">
                          <Image
                            className="b__testimonial__variant02__logo mx-auto w-auto h-auto"
                            sizes="100vw"
                            width={500}
                            height={500}
                            src={urlFor(testimonial.logo).url()}
                            alt={testimonial.logo.alt ?? ""}
                          />
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {testimonial.heading && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.1}
                      >
                        <div className="c__heading-wrapper mb-12 max-w-4xl mx-auto">
                          <Heading tag={"span"} className={`u__h3 mb-0`}>
                            {testimonial.heading}
                          </Heading>
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {testimonial?.avatar?.asset && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.2}
                      >
                        <div className="b__testimonial__variant02__avatar-wrapper mb-4">
                          <Image
                            className="b__testimonial__variant02__avatar mx-auto w-auto h-auto u__object-fit-cover"
                            sizes="100vw"
                            width={500}
                            height={500}
                            src={urlFor(testimonial.avatar).url()}
                            alt={testimonial.avatar.alt ?? ""}
                          />
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {testimonial.person_name && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.3}
                      >
                        <div className="c__heading-wrapper mb-1">
                          <Heading tag={`span`} className={`u__h6 mb-0`}>
                            {testimonial.person_name}
                          </Heading>
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {testimonial.person_title && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.4}
                      >
                        <div className="c__heading-wrapper mb-0">
                          <div className="b__testimonial__variant02__person-title-wrapper">
                            <Heading
                              tag={`span`}
                              className={`u__small mb-0 u__f-400`}
                            >
                              {testimonial.person_title}
                            </Heading>
                            {getCleanValue(testimonial.person_linkedin_url) && (
                              <a
                                href={getCleanValue(
                                  testimonial.person_linkedin_url
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="b__testimonial__variant02__linkedin-link"
                                aria-label={`View ${getCleanValue(testimonial.person_name) || "person"}'s LinkedIn profile`}
                              >
                                <FaLinkedin size={20} color="#0470ae" />
                              </a>
                            )}
                          </div>
                        </div>
                      </ConditionalBlurFade>
                    )}
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          {testimonials.length > 1 && data.show_indicators !== false && (
            <div className="b__testimonial__variant02__indicators">
              {testimonials.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  className={cn(
                    "b__testimonial__variant02__indicator",
                    slideIndex === selectedIndex &&
                      "b__testimonial__variant02__indicator--active"
                  )}
                  onClick={() => scrollTo(slideIndex)}
                  aria-label={`Go to testimonial ${slideIndex + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default TestimonialVariant02;
