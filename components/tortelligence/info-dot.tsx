"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type InfoDotProps = {
  text: string
}

export function InfoDot({ text }: InfoDotProps) {
  return (
    <TooltipProvider delay={120}>
      <Tooltip>
        <TooltipTrigger
          aria-label="What is this?"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "1px solid var(--text-faint)",
            color: "var(--text-muted)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 10,
            lineHeight: 1,
            flexShrink: 0,
            background: "transparent",
            cursor: "pointer",
          }}
        >
          i
        </TooltipTrigger>
        <TooltipContent
          className="text-wrap"
          style={{
            background: "var(--navy-trough)",
            border: "1px solid var(--cyan-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            color: "var(--text-body)",
            fontFamily: "var(--font-open-sans)",
            fontSize: 11.5,
            lineHeight: 1.55,
            maxWidth: 244,
            padding: "11px 13px",
            fontWeight: 400,
          }}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
