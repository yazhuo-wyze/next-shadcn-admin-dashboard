import { Quote } from "lucide-react";

export function QuoteCard() {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-xs">
      <div className="flex items-start gap-4">
        <div className="grid size-8 shrink-0 place-items-center text-muted-foreground">
          <Quote className="size-6" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl leading-none tracking-tight">微小的持续行动，终会带来巨大的成果。</p>
          <p className="text-muted-foreground">继续坚持，你可以的。</p>
        </div>
      </div>
    </section>
  );
}
