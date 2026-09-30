"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { PortfolioPageView } from "../../views/public-portfolio-view";
import { NovaNavbar } from "./components/nova-navbar";
import { NovaFooter } from "./components/nova-footer";
import { NovaHomeView } from "./views/nova-home-view";
import { NovaProjectsView } from "./views/nova-projects-view";
import { NovaProjectDetailView } from "./views/nova-project-detail-view";
import { NovaAboutView } from "./views/nova-about-view";
import { NovaServicesView } from "./views/nova-services-view";
import { NovaBlogView } from "./views/nova-blog-view";
import { NovaBlogDetailView } from "./views/nova-blog-detail-view";
import { NovaContactView } from "./views/nova-contact-view";

interface NovaEngineShellProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
  subSlug?: string;
}

export function NovaEngineShell({
  bundle,
  view = "home",
  subSlug,
}: NovaEngineShellProps) {
  const renderCurrentView = () => {
    switch (view) {
      case "projects":
        return <NovaProjectsView bundle={bundle} />;
      case "project-detail":
        return <NovaProjectDetailView bundle={bundle} subSlug={subSlug} />;
      case "about":
        return <NovaAboutView bundle={bundle} />;
      case "services":
        return <NovaServicesView bundle={bundle} />;
      case "blog":
        return <NovaBlogView bundle={bundle} />;
      case "blog-detail":
        return <NovaBlogDetailView bundle={bundle} subSlug={subSlug} />;
      case "contact":
        return <NovaContactView bundle={bundle} />;
      case "home":
      default:
        return <NovaHomeView bundle={bundle} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-300 flex flex-col justify-between transition-colors duration-200">
      <NovaNavbar bundle={bundle} view={view} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (subSlug || "")}
            initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <NovaFooter bundle={bundle} />
    </div>
  );
}

