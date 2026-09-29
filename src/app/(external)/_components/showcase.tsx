import { Card } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";

import defaultDarkImage from "../../../../media/default/default-dark.webp";
import defaultLightImage from "../../../../media/default/default-light.webp";

export async function Showcase() {
  const t = await getT();

  return (
    <section aria-label={t("landing.showcase.sectionLabel")}>
      <Card className="rounded-lg py-0" data-landing-dashboard-preview>
        {/* biome-ignore lint/performance/noImgElement: These landing images are optimized separately. */}
        <img
          alt={t("landing.showcase.imageAlt")}
          className="h-auto w-full rounded-lg! dark:hidden"
          height={defaultLightImage.height}
          src={defaultLightImage.src}
          width={defaultLightImage.width}
        />
        {/* biome-ignore lint/performance/noImgElement: These landing images are optimized separately. */}
        <img
          alt={t("landing.showcase.imageAlt")}
          className="hidden h-auto w-full rounded-lg! dark:block"
          height={defaultDarkImage.height}
          src={defaultDarkImage.src}
          width={defaultDarkImage.width}
        />
      </Card>
    </section>
  );
}
