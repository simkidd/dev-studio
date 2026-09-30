"use client";

import React from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { PortfolioPageView } from "../../views/public-portfolio-view";
import { ApexNavbar } from "./components/apex-navbar";
import { ApexFooter } from "./components/apex-footer";
import { ApexHomeView } from "./views/apex-home-view";
import { ApexProjectsView } from "./views/apex-projects-view";
import { ApexProjectDetailView } from "./views/apex-project-detail-view";
import { ApexAboutView } from "./views/apex-about-view";
import { ApexServicesView } from "./views/apex-services-view";
import { ApexBlogView } from "./views/apex-blog-view";
import { ApexBlogDetailView } from "./views/apex-blog-detail-view";
import { ApexContactView } from "./views/apex-contact-view";

interface ApexStudioShellProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
  subSlug?: string;
}

export function ApexStudioShell({
  bundle,
  view = "home",
  subSlug,
}: ApexStudioShellProps) {
  const renderCurrentView = () => {
    switch (view) {
      case "projects":
        return <ApexProjectsView bundle={bundle} />;
      case "project-detail":
        return <ApexProjectDetailView bundle={bundle} subSlug={subSlug} />;
      case "about":
        return <ApexAboutView bundle={bundle} />;
      case "services":
        return <ApexServicesView bundle={bundle} />;
      case "blog":
        return <ApexBlogView bundle={bundle} />;
      case "blog-detail":
        return <ApexBlogDetailView bundle={bundle} subSlug={subSlug} />;
      case "contact":
        return <ApexContactView bundle={bundle} />;
      case "home":
      default:
        return <ApexHomeView bundle={bundle} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#09090b] text-stone-900 dark:text-white selection:bg-amber-400 selection:text-black font-sans flex flex-col justify-between transition-colors duration-200">
      <ApexNavbar bundle={bundle} view={view} />
      <main className="flex-1 pt-28">{renderCurrentView()}</main>
      <ApexFooter bundle={bundle} />
    </div>
  );
}
