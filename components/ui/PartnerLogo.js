"use client";
import styled from "styled-components";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Component = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .c__partner-logo {
    &__image {
      width: 100%;
      height: 50px;
      max-width: 150px;
      object-fit: contain;
    }
  }
`;

const PartnerLogo = ({
  image = {
    src: `https://cdn.sanity.io/images/7wjp505t/production/557ef7e282bccc41055f6c13e8978d5baa76e576-239x43.svg`,
    alt: ``,
  },
  className,
}) => {
  return (
    <Component className={cn(`c__partner-logo relative`, className)}>
      {image && (
        <>
          <Image
            className="c__partner-logo__image w-auto h-auto"
            src={image.src}
            alt={image.alt || ``}
            width={800}
            height={800}
            sizes="100vw"
          />
        </>
      )}
    </Component>
  );
};

export default PartnerLogo;
