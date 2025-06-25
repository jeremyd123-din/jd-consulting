import { BlurFade } from "@/components/magicui/blur-fade";

export const ConditionalBlurFade = ({
  enabled,
  delay,
  children,
  inView,
  className,
}) =>
  enabled ? (
    <BlurFade className={className} inView={inView || true} delay={delay}>
      {children}
    </BlurFade>
  ) : (
    <>{children}</>
  );
