export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nqj5p7gd";

export const organization =
  process.env.NEXT_PUBLIC_ORGANIZATION_NAME || "Rumi UI";

export const paginatedItemsPerPage = 12;

export const generateBlogHeroData = (options = {}) => {
  const {
    heading,
    description,
    heading_tag = `h1`,
    heading_size = `h1`,
    description_size = `subtitle`,
    background_theme = `secondary`,
    invert_text_color = false,
    scoped_css = {
      code: `padding: 32px 0 ;`,
    },
  } = options;

  return {
    heading: heading ? heading : heading === null ? `` : `Resource Library`,
    heading_tag,
    heading_size,
    description_size,
    background_theme,
    scoped_css,
    invert_text_color,
    description: description
      ? description
      : description === null
        ? ``
        : `Your single source for expert insights within the digital space.`,
  };
};

export const generateBlogMetaData = (
  meta_title,
  meta_description,
  featured_image
) => {
  return {
    _id: null,
    _type: `Blog`,
    meta_title: meta_title || `Latest Posts | ${organization}`,
    slug: `blog`,
    meta_description:
      meta_description ||
      `Your single source for expert insights within the digital space`,
    featured_image,
    seo_no_index: false,
  };
};

export const fallbackImageBlurDataUrl = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20260%2072'%3E%3C/svg%3E`;
