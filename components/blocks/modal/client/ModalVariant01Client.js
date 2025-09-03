"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Form from "@/components/ui/Form";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import Modal from "@/components/ui/Modal";

const Wrapper = styled.div`
  .b__modal__variant01 {
    &__form-wrapper {
      form {
        .c__button {
          width: 100%;
        }
      }
    }
  }
`;

const ModelVariant01Client = ({ data = {}, index, siteSettings }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  const {
    form_fields = null,
    formspark_id = null,
    button_title: formButtonTitle,
    redirect_url,
    thankyou_message,
  } = data?.form || {};

  const { formMessage, payloadPosting, onSubmit } = useFormSubmission({
    formspark_id,
    thankyou_message,
    redirect_url,
    reset,
  });

  if (!data?.modal_id) {
    console.warn("ModelVariant01Client requires a modal_id in data");
    return null;
  }

  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__modal__variant01 overflow-hidden relative py-0"
    >
      <Wrapper>
        <Modal siteSettings={siteSettings} modalId={data?.modal_id}>
          <div className="b__modal__variant01__form-wrapper">
            <Form
              isValid={isValid}
              formFields={form_fields.code}
              register={register}
              errors={errors}
              control={control}
              onSubmit={handleSubmit(onSubmit)}
              payloadPosting={payloadPosting}
              formMessage={formMessage}
              buttonTitle={formButtonTitle ?? `Get Started`}
              includeHoneypot
            />
          </div>
        </Modal>
      </Wrapper>
    </Bounded>
  );
};

export default ModelVariant01Client;
