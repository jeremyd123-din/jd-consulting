import { BlurFade } from "@/components/magicui/blur-fade";

export const ConditionalBlurFade = ({ enabled, delay, children, inView }) =>
  enabled ? (
    <BlurFade inView={inView || true} delay={delay}>
      {children}
    </BlurFade>
  ) : (
    <>{children}</>
  );
