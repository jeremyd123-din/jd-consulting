"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import IconCard from "@/components/ui/IconCard";
import RichtextField from "@/components/ui/RichtextField";
import Description from "@/components/ui/Description";
import urlFor from "@/lib/imageUrlBuilder";
import TwoColumnTitleWithCTA from "@/components/ui/TwoColumnTitleWithCTA";
import Image from "next/image";

const Wrapper = styled.div`
  .b__content__variant06 {
    &__row {
      @media (min-width: 992px) {
        display: flex;
        margin-left: -12px;
        margin-right: -12px;
        flex-wrap: nowrap;
      }
    }
    &__column {
      width: 100%;
      @media (min-width: 992px) {
        padding-left: 12px;
        padding-right: 12px;
      }
      &--image {
        margin-bottom: 1.75rem;
        @media (min-width: 992px) {
          margin-bottom: 0;
          max-width: 35%;
          flex: 0 0 35%;
        }
        @media (min-width: 1200px) {
          max-width: 32%;
          flex: 0 0 32%;
        }
      }
      &--content {
        @media (min-width: 992px) {
          max-width: 65%;
          flex: 0 0 65%;
        }
        @media (min-width: 1200px) {
          max-width: 68%;
          flex: 0 0 68%;
        }
      }
    }
    &__image-wrapper {
      @media (min-width: 992px) {
        padding-right: 1rem;
        height: 100%;
      }
      figure {
        @media (min-width: 992px) and (max-width: 1200px) {
          height: 100%;
        }
      }
      img {
        border-radius: var(--t-global-image-border-radius);
        width: 100%;
        height: 100%;
        object-fit: cover;
        max-height: 275px;
        @media (min-width: 576px) {
          max-height: 330px;
        }
        @media (min-width: 768px) {
          max-height: 360px;
        }
        @media (min-width: 992px) and (max-width: 1200px) {
          min-height: 100%;
        }
        @media (min-width: 992px) {
          max-height: 420px;
        }
      }
    }
    &__content-wrapper {
      @media (min-width: 992px) {
        padding-left: 1rem;
      }
    }
    &__content-grid {
      margin-top: 2rem;
      @media (min-width: 992px) {
        margin-top: 4rem;
      }
      &__row {
        @media (min-width: 768px) {
          display: flex;
          flex-wrap: wrap;
          margin-left: -20px;
          margin-right: -20px;
        }
        @media (min-width: 992px) {
          margin-left: -20px;
          margin-right: -20px;
        }
        @media (min-width: 1200px) {
          margin-left: -33px;
          margin-right: -33px;
        }
      }
      &__column {
        width: 100%;
        margin-bottom: 1.75rem;
        @media (min-width: 768px) {
          max-width: 50%;
          flex: 0 0 50%;
          padding-left: 20px;
          padding-right: 20px;
        }
        @media (min-width: 992px) {
          padding-left: 20px;
          padding-right: 20px;
          max-width: 33.3333336%;
          flex: 0 0 33.3333336%;
        }
        @media (min-width: 1200px) {
          padding-left: 33px;
          padding-right: 33px;
        }
      }
    }
  }
  .c__stacked-icon-with-description {
    &__icon-wrapper {
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
  }
`;

const ContentVariant06 = ({ data }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      className="b__content__variant06"
    >
      <Wrapper>
        <div className="container">
          {data && (
            <TwoColumnTitleWithCTA
              heading={data.heading}
              description={data.description}
              buttonTitle={data.button_title}
              buttonDestination={data.button_destination}
              buttonTheme={data.button_theme}
            />
          )}
        </div>
        <div className="container mt-4 pt-4 pt-lg-5">
          <div className="b__content__variant06__row">
            {data.image && (
              <div className="b__content__variant06__column b__content__variant06__column--image">
                <div className="b__content__variant06__image-wrapper relative">
                  <figure className="m-0 d-inline">
                    <Image
                      placeholder="blur"
                      blurDataURL={data.image.asset.metadata.lqip}
                      src={urlFor(data.image).url()}
                      alt={data.image.alt ?? ""}
                      sizes="100vw"
                      width={500}
                      height={300}
                    />
                  </figure>
                </div>
              </div>
            )}
            <div className="b__content__variant06__column b__content__variant06__column--content">
              <div className="b__content__variant06__content-wrapper">
                {data.content && (
                  <RichtextField
                    className="u__subtitle"
                    content={data.content}
                  />
                )}
                {data.repeater && (
                  <div className="b__content__variant06__content-grid">
                    <div className="b__content__variant06__content-grid__row">
                      {data.repeater.map((elem, index) => {
                        const { image, heading, description } = elem;
                        const imageObj = {
                          src: image ? urlFor(image).url() : null,
                          alt: image ? image.alt : null,
                          blurDataURL: image
                            ? image.asset?.metadata?.lqip
                            : null,
                        };
                        return (
                          <div
                            key={index}
                            className="b__content__variant06__content-grid__column"
                          >
                            <div className="c__stacked-icon-with-description">
                              <div className="c__stacked-icon-with-description__icon-wrapper mb-3">
                                <figure className="m-0">
                                  <Image
                                    placeholder="empty"
                                    src={imageObj.src}
                                    alt={imageObj.alt ?? ""}
                                    width={500}
                                    height={500}
                                  />
                                </figure>
                              </div>
                              {heading && (
                                <Heading
                                  tag={data.card_heading_tag || `h3`}
                                  className="u__h5 mb-2"
                                >
                                  {heading}
                                </Heading>
                              )}
                              {description && (
                                <div className="c__stacked-icon-with-description__description-wrapper">
                                  <Description className="c__stacked-icon-with-description__description mb-0">
                                    {description}
                                  </Description>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant06;
