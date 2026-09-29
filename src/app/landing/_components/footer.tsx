import { siGithub, siX } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

export async function Footer() {
  const t = await getT();

  return (
    <footer>
      <div className="flex flex-row items-center justify-between gap-6 text-muted-foreground text-sm">
        <p>
          {t("landing.footer.broughtToYouBy")}{" "}
          <a
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            href="https://x.com/arhamkhnz"
            target="_blank"
            rel="noreferrer"
          >
            @arhamkhnz
          </a>
        </p>
        <div className="flex items-center gap-3">
          <Button asChild size="icon-sm" variant="link">
            <a
              href="https://github.com/arhamkhnz"
              target="_blank"
              rel="noreferrer"
              aria-label={t("landing.footer.visitOnGithub")}
            >
              <SimpleIcon icon={siGithub} aria-hidden className="size-4.5 fill-current" />
            </a>
          </Button>
          <Button asChild size="icon-sm" variant="link">
            <a
              href="https://x.com/arhamkhnz"
              target="_blank"
              rel="noreferrer"
              aria-label={t("landing.footer.visitOnX")}
            >
              <SimpleIcon icon={siX} aria-hidden className="size-4 fill-current" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
