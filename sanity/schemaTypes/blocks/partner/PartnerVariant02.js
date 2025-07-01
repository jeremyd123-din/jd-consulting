import { defineField, defineType } from "sanity";
import {
  scopedCss,
  generateHeadingTagField,
  generateHeadingSizeField,
  generateBackgroundPatternField,
  generateButtonField,
  generateRichtextField,
} from "../defaultFields";
const blockCategory = "partner";
const PartnerVariant02 = defineType({
  name: "PartnerVariant02",
  title: "Partner Variant 02",
  type: "object",
  _menuCategory: blockCategory,
  groups: [
    { name: "content", title: "Content" },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "block_category",
      title: "Block Category",
      type: "string",
      initialValue: blockCategory,
      readOnly: true,
      hidden: true,
    }),
    defineField(scopedCss),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Brands We Work With",
      group: "content",
    }),
    generateHeadingTagField({ name: `heading_tag`, title: `Heading Tag` }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: ``,
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "repeater_outer",
      title: "Repeater Outer",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
          ],
          preview: {
            select: { title: "image.alt", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Image", media: media };
            },
          },
        },
      ],
    }),
    defineField({
      name: "repeater_inner",
      title: "Repeater Inner",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
          ],
          preview: {
            select: { title: "image.alt", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Image", media: media };
            },
          },
        },
      ],
    }),
    defineField({
      name: "enable_animations",
      title: "Enable Animations",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    ...generateBackgroundPatternField(),
  ],
  preview: {
    select: { heading: "heading" },
    prepare(selection) {
      const { heading } = selection;
      return {
        title: heading || "Heading needs to be set",
        subtitle: "Partner Variant 02",
      };
    },
  },
});

export default PartnerVariant02;
