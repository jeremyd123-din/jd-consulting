import { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import { stegaClean } from "@sanity/client/stega";

export const useFormSubmission = ({
  formspark_id,
  thankyou_message,
  redirect_url,
  reset,
}) => {
  const FORMSPARK_FORM_ID = stegaClean(formspark_id);
  const [formMessage, setFormMessage] = useState(null);
  const [payloadPosting, setPayloadPosting] = useState(false);
  const [submit] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const onSubmit = async (data) => {
    setPayloadPosting(true);
    setFormMessage(null);
    try {
      const payloadResponse = await submit(data);
      setPayloadPosting(false);
      reset();
      setFormMessage({
        type: `success`,
        message: thankyou_message || `Thanks for submitting the form!`,
      });
      if (redirect_url && typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = redirect_url;
        }, 100);
      }
    } catch (err) {
      console.log(err);
      setPayloadPosting(false);
      setFormMessage({
        type: `error`,
        message: `Oops, something went wrong. Please try again later`,
      });
    }
  };

  return {
    formMessage,
    payloadPosting,
    onSubmit,
  };
};
