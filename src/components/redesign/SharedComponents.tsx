import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import Button from "../atoms/Button";
import StarFill from "../../assets/icons/StarFill";
import StarHalf from "../../assets/icons/StarHalf";
import StarEmpty from "../../assets/icons/Star";
import ResponsiveTypography from "../atoms/ResponsiveTypography";
import { TypeScale } from "../atoms/TypeScale";
import { TextColor } from "../atoms/TextColor";
import { B2 } from "../atoms/Typography";
import { IconProps } from "../../assets/icons";
import useConfig from "../../hooks/useConfig";
import { Label, useProHasLabel } from "../../hooks/useProHasLabel";
import { useMatchingLink } from "../../hooks/useMatchingLink";
import { useAnalytics } from "../../context/analytics";
import { PageSection } from "./constants";

type PX = "16" | "40" | "80" | "120" | "156";
type PY = "40" | "64" | "80" | "120";

type Gap = "0" | "24" | "40" | "64";

const pxMobileClasses: Record<PX, string> = {
  "16": "px-4",
  "40": "px-10",
  "80": "px-20",
  "120": "px-[120px]",
  "156": "px-[156px]",
};

const pyMobileClasses: Record<PY, string> = {
  "40": "py-10",
  "64": "py-16",
  "80": "py-20",
  "120": "py-[120px]",
};

const gapMobileClasses: Record<Gap, string> = {
  "40": "gap-10",
  "64": "gap-16",
  "24": "gap-6",
  "0": "gap-none",
};

const pxSmallClasses: Record<PX, string> = {
  "16": "s:px-4",
  "40": "s:px-10",
  "80": "s:px-20",
  "120": "s:px-[120px",
  "156": "s:px-[156px]",
};

const pxMediumClasses: Record<PX, string> = {
  "16": "m:px-4",
  "40": "m:px-10",
  "80": "m:px-20",
  "120": "m:px-[120px]",
  "156": "m:px-[156px]",
};

const pxLargeClasses: Record<PX, string> = {
  "16": "l:px-4",
  "40": "l:px-10",
  "80": "l:px-20",
  "120": "l:px-[120px]",
  "156": "l:px-[156px]",
};

const pxExtraLargeClasses: Record<PX, string> = {
  "16": "xl:px-4",
  "40": "xl:px-10",
  "80": "xl:px-20",
  "120": "xl:px-[120px]",
  "156": "xl:px-[156px]",
};

const pyStationaryClasses: Record<PY, string> = {
  "40": "s:py-10",
  "64": "s:py-16",
  "80": "s:py-20",
  "120": "s:py-[120px]",
};

const gapStationaryClasses: Record<Gap, string> = {
  "40": "s:gap-10",
  "64": "s:gap-16",
  "24": "s:gap-6",
  "0": "s:gap-none",
};

type Props = React.ComponentPropsWithoutRef<"section"> & {
  id: PageSection;
  solidBg?: boolean;
  pxMobile?: PX;
  pxSmall?: PX;
  pxMedium?: PX;
  pxLarge?: PX;
  pxStationary?: PX;
  pyMobile?: PY;
  pyStationary?: PY;
  gapMobile?: Gap;
  gapStationary?: Gap;
};

const blueBg = `bg-blueberry0 s:rounded-[16px]`;

export const Section: React.FC<PropsWithChildren<Props>> = ({
  children,
  solidBg = false,
  pxMobile = "16",
  pxSmall,
  pxMedium,
  pxLarge,
  pyMobile = "40",
  gapMobile = "40",
  pxStationary = "156",
  pyStationary = "80",
  gapStationary = "40",
  id,
  ...html
}) => {
  const className = [
    solidBg ? blueBg : "",
    pxMobileClasses[pxMobile],
    pxSmallClasses[pxSmall || pxMedium || pxLarge || pxStationary],
    pxMediumClasses[pxMedium || pxLarge || pxStationary],
    pxLargeClasses[pxLarge || pxStationary],
    pxExtraLargeClasses[pxStationary],
    pyMobileClasses[pyMobile],
    pyStationaryClasses[pyStationary],
    "flex flex-col",
    gapMobileClasses[gapMobile],
    gapStationaryClasses[gapStationary],
    "scroll-mt-20",
  ].join(" ");

  const ref = useRef<HTMLDivElement>(null);
  const analytics = useAnalytics();

  useEffect(() => {
    const elem = ref.current;
    if (!elem || !globalThis.IntersectionObserver) return;

    let options: IntersectionObserverInit = {
      threshold: 0.333,
    };

    let beaconed = false;

    const callback: IntersectionObserverCallback = (entries, self) => {
      const entry = entries[0];
      if (!entry || beaconed || !entry.isIntersecting) return;

      beaconed = true;
      analytics.track({
        action: "viewed",
        object: "section",
        uiAction: "viewed",
        uiObject: "section",
        uiObjectDetail: id || "section",
      });
      self.disconnect();
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(elem);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={className} {...html} id={id} ref={ref}>
      {children}
    </section>
  );
};

interface StationaryBookNowProps {
  section: PageSection;
}

export const StationaryBookNow: React.FC<StationaryBookNowProps> = (props) => {
  return (
    <MatchingCtaButton
      className={"hidden s:block self-start"}
      size={"large"}
      section={props.section}
    >
      Book a free call
    </MatchingCtaButton>
  );
};

type SpacerSize = "80";

interface SpacerProps {
  stationaryOnly?: boolean;
  size: SpacerSize;
}

const SpacerClasses: Record<SpacerSize, string> = {
  "80": "w-20 h-20",
};

export const Spacer: React.FC<SpacerProps> = (props) => {
  const className = SpacerClasses[props.size] + (props.stationaryOnly ? " hidden s:block" : "");
  return <div className={className} />;
};

interface ReviewsProps {
  showNote?: boolean;
}

export const Reviews: React.FC<ReviewsProps> = ({ showNote }) => {
  return (
    <div>
      <StarScale className={"flex gap-1 pb-1"} rating={3.5} />
      {showNote && (
        <B2 weight={"regular"}>
          Rated <span className={"font-semibold"}>4.5 of out 5</span> stars by my clients
        </B2>
      )}
      <ResponsiveTypography
        typescaleMobile={TypeScale.Body02}
        typescaleStationary={TypeScale.Body02}
        weightMobile={"demi"}
        weightStationary={"demi"}
        color={TextColor.blueberry80}
        as={"a"}
        href={"#reviews"}
        className={"pt-1"}
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("reviews");
          if (!target) return;
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      >
        160 reviews
      </ResponsiveTypography>
    </div>
  );
};

interface StarScaleProps {
  starClass?: string;
  className?: string;
  rating: number;
}

export const StarScale: React.FC<StarScaleProps> = (props) => {
  return (
    <div className={props.className}>
      <VariableStar className={props.starClass} rating={props.rating} />
      <VariableStar className={props.starClass} rating={props.rating - 1} />
      <VariableStar className={props.starClass} rating={props.rating - 2} />
      <VariableStar className={props.starClass} rating={props.rating - 3} />
      <VariableStar className={props.starClass} rating={props.rating - 4} />
    </div>
  );
};

const vsClassName = "text-honey40 h-6 w-6 s:h-10 s:w-10";
export const VariableStar: React.FC<{ rating: number; className?: string }> = ({
  rating,
  className = vsClassName,
}) => {
  if (rating < 0.25) return <StarEmpty className={className} />;
  if (rating < 0.75) return <StarHalf className={className} />;
  return <StarFill className={className} />;
};

interface MatchingCtaProps {
  size?: "medium" | "large";
  icon?: React.FC<IconProps>;
  children: string;
  className?: string;
  id?: string;
  section: PageSection;
}

export const MatchingCtaButton: React.FC<MatchingCtaProps> = (props) => {
  const config = useConfig();
  const matchingLink = useMatchingLink();
  const isOffboarding = useProHasLabel(Label.OffboardInProgress);
  const [dynamicMatchingLink, setDynamicMatchingLink] = useState('about:blank');

  const showCTAs = config.showMatchingCTAs && !isOffboarding;
  if (!showCTAs) return null;

  useEffect(() => {
    // The MatchingCtaButton won't have the correct matchingLink based on the url params
    // since the initial render is server side. We need to trigger a re-render that updates
    // the matchingLink based on the url params once we are on the client browser
    setTimeout(() => {setDynamicMatchingLink(matchingLink);}, 200);
  }, []);

  return (
    <Button
      as={"a"}
      id={props.id}
      iconBefore={props.icon ? <props.icon /> : undefined}
      href={dynamicMatchingLink}
      className={props.className}
      pageExperience={props.section}
      size={props.size || "large"}
    >
      {props.children}
    </Button>
  );
};
