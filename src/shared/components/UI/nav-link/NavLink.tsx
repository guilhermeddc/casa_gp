"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { Button } from "../button/Button";

interface IProps extends LinkProps {
  text: string;
  target?: string;
  variant?: "text" | "contained" | "outlined";
}

export const NavLink: React.FC<IProps> = ({
  text,
  target,
  variant = "text",
  ...props
}) => {
  const pathname = usePathname();

  const className = useMemo(
    () => (pathname === props.href ? " " : " "),
    [pathname, props.href]
  );

  return (
    <Button variant={variant} fullWidth color="secondary">
      <Link className={className} target={target} {...props}>
        {text}
      </Link>
    </Button>
  );
};
