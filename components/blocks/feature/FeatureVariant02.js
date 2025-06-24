"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import IconCard from "@/components/ui/IconCard";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__feature__variant02 {
    &__row {
      --bs-gutter-y: 1.5rem;
    }
  }
`;

const cardColumns = {
  2: "col-lg-6",
  3: "col-lg-4",
  4: "col-lg-3",
};

const FeatureVariant02 = ({ data = {}, index }) => {
  const dataCardColumns = getCleanValue(data.card_columns);
  const columnClassName = `col-md-6 ${dataCardColumns ? cardColumns[dataCardColumns] : `col-lg-4`}`;

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__feature__variant02 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper>
        <div className="container relative u__z-index-1">
          <div className="text-center mx-auto">
            {data.label && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__label-wrapper mb-[0.5rem]">
                  <Heading
                    tag={data.label_heading_tag || "span"}
                    className={`u__subtitle u__text-branding-primary u__f-500`}
                  >
                    {data.label}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data.heading_tag || "h2"} className={`u__h1`}>
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.description && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
                <div className="c__description-wrapper">
                  <Description className="u__h6">
                    {data.description}
                  </Description>
                </div>
              </ConditionalBlurFade>
            )}
          </div>
        </div>
        {data.repeater && (
          <div className="container relative u__z-index-1 mt-[3rem]">
            <div
              className={`row b__feature__variant02__row justify-${getCleanValue(data.justify_content)}`}
            >
              {data.repeater.map((elem, index) => {
                const {
                  icon_svg,
                  icon_type,
                  icon_color,
                  image,
                  heading,
                  description,
                  button_title,
                  button_destination,
                  button_open_in_new_tab,
                } = elem;

                const imageObj = {
                  src: image ? urlFor(image).url() : null,
                  alt: image ? image.alt : null,
                };
                return (
                  <div key={index} className={columnClassName}>
                    <ConditionalBlurFade
                      enabled={data.enable_animations}
                      delay={0.3 + index * 0.1}
                    >
                      <IconCard
                        style={getCleanValue(data.card_style)}
                        headingTag={getCleanValue(data.card_heading_tag)}
                        icon={imageObj}
                        iconSvg={icon_svg}
                        iconType={icon_type}
                        iconColor={icon_color}
                        heading={heading}
                        description={description}
                        buttonTitle={button_title}
                        buttonDestination={button_destination}
                        buttonTarget={button_open_in_new_tab}
                      />
                    </ConditionalBlurFade>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Wrapper>
    </Bounded>
  );
};

export default FeatureVariant02;
