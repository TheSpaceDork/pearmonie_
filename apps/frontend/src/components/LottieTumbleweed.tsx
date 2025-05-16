"use client";
import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

const LottieTumbleWeed = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: AnimationItem | undefined;

    if (animationContainer.current) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lotties/tumbleweed.json",
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={animationContainer}
        style={{ height: "300px", width: "250px" }}
        className="w-[300px] h-[250px]"
      />
    </div>
  );
};

export default LottieTumbleWeed;
