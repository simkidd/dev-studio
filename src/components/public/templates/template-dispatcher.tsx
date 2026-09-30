"use client";

import React from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ClassicDevShell } from "./classic-dev/classic-dev-shell";
import { NovaEngineShell } from "./nova-engine/nova-engine-shell";
import { ApexStudioShell } from "./apex-studio/apex-studio-shell";
import { PortfolioPageView } from "../views/public-portfolio-view";

export interface TemplateDispatcherProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
  subSlug?: string;
}

export function TemplateDispatcher({
  bundle,
  view = "home",
  subSlug,
}: TemplateDispatcherProps) {
  const templateId = bundle.portfolio.templateId || "classic-dev";

  switch (templateId) {
    case "apex-studio":
      return <ApexStudioShell bundle={bundle} view={view} subSlug={subSlug} />;
    case "nova-engine":
      return <NovaEngineShell bundle={bundle} view={view} subSlug={subSlug} />;
    case "classic-dev":
    default:
      return <ClassicDevShell bundle={bundle} view={view} subSlug={subSlug} />;
  }
}
