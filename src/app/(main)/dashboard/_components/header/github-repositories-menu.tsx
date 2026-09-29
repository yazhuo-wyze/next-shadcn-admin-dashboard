"use client";

import Link from "next/link";

import { siGithub } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n/i18n-provider";

// 仓库名（Radix UI / Base UI / React Aria / TanStack Start）是品牌名，保持英文原样。
const repositories = [
  {
    label: "Radix UI",
    href: "https://github.com/arhamkhnz/next-shadcn-admin-dashboard",
  },
  {
    label: "Base UI",
    href: "https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui",
  },
  {
    label: "React Aria",
    href: "https://github.com/arhamkhnz/next-shadcn-admin-dashboard-aria",
  },
  {
    label: "TanStack Start",
    href: "https://github.com/arhamkhnz/tanstack-shadcn-admin-dashboard",
  },
] as const;

export function GitHubRepositoriesMenu() {
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label={t("dashboard.shell.repositories.openMenu")}>
          <SimpleIcon icon={siGithub} className="fill-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("dashboard.shell.repositories.label")}</DropdownMenuLabel>
          {repositories.map((repository) => (
            <DropdownMenuItem key={repository.href} asChild>
              <Link prefetch={false} href={repository.href} target="_blank" rel="noreferrer">
                {repository.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
