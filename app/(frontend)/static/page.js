import React from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";

const page = () => {
  return (
    <section className="pt-[10rem] pb-[4rem]">
      <div className="container">
        <div className="text-center">
          <div className="c__heading-wrapper mb-[1rem]">
            <Heading className={`u__d2`}>
              Proudly Serving{" "}
              <AuroraText
                colors={["#ffbe4eff", "#ffaa00ff", "#ff914e", "#ffd04eff"]}
              >
                Chicago
              </AuroraText>{" "}
              <br className="u__show-after-992" />
              and Surrounding Areas
            </Heading>
          </div>
          <div className="c__description-wrapper">
            <Description className="u__h5">
              We’re proud to be rooted in Chicago, delivering personalized
              services that <br className="u__show-after-992" />
              understand the unique needs of local businesses and communities.
            </Description>
          </div>
        </div>
      </div>
      <div className="container mt-[3rem]">
        <div className={`w-full`}>
          <iframe
            className="rounded-[1rem] shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.3942638222816!2d-87.6626888!3d41.8843773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2d57ab3e0dcb%3A0x6eb1fb4ef6bbaa41!2sJD%20Consulting!5e0!3m2!1sen!2sus!4v1758215480605!5m2!1sen!2sus"
            width={`100%`}
            height={`500px`}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="JD Consulting Location - Chicago"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
