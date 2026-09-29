import { cn } from "cn";
import { siGoogle } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

export async function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  const t = await getT();

  return (
    <Button variant="secondary" className={cn(className)} {...props}>
      <SimpleIcon icon={siGoogle} className="size-4" />
      {t("auth.social.continueWithGoogle")}
    </Button>
  );
}
