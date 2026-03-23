import * as React from "react"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-[#0a0c10] text-white shadow-sm ${className}`}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-black leading-none tracking-tight uppercase italic ${className}`}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}