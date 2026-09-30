"use client";

import React from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { PortfolioPageView } from "../../views/public-portfolio-view";
import { ClassicNavbar } from "./components/classic-navbar";
import { ClassicFooter } from "./components/classic-footer";
import { ClassicHomeView } from "./views/classic-home-view";
import { ClassicProjectsView } from "./views/classic-projects-view";
import { ClassicProjectDetailView } from "./views/classic-project-detail-view";
import { ClassicAboutView } from "./views/classic-about-view";
import { ClassicServicesView } from "./views/classic-services-view";
import { ClassicBlogView } from "./views/classic-blog-view";
import { ClassicBlogDetailView } from "./views/classic-blog-detail-view";
import { ClassicContactView } from "./views/classic-contact-view";

interface ClassicDevShellProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
  subSlug?: string;
}

export function ClassicDevShell({
  bundle,
  view = "home",
  subSlug,
}: ClassicDevShellProps) {
  const renderCurrentView = () => {
    switch (view) {
      case "projects":
        return <ClassicProjectsView bundle={bundle} />;
      case "project-detail":
        return <ClassicProjectDetailView bundle={bundle} subSlug={subSlug} />;
      case "about":
        return <ClassicAboutView bundle={bundle} />;
      case "services":
        return <ClassicServicesView bundle={bundle} />;
      case "blog":
        return <ClassicBlogView bundle={bundle} />;
      case "blog-detail":
        return <ClassicBlogDetailView bundle={bundle} subSlug={subSlug} />;
      case "contact":
        return <ClassicContactView bundle={bundle} />;
      case "home":
      default:
        return <ClassicHomeView bundle={bundle} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors flex flex-col justify-between">
      <ClassicNavbar bundle={bundle} view={view} />
      <main className="flex-1 pt-24 sm:pt-28">{renderCurrentView()}</main>
      <ClassicFooter bundle={bundle} />
    </div>
  );
}
