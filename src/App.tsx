import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsap";
import {
  finalizeScrollAfterNavigation,
  prepareScrollForNavigation,
  scrollToHash,
} from "@/lib/scroll";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { StoryPage } from "@/pages/StoryPage";
import { TestPage } from "@/pages/TestPage";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      prepareScrollForNavigation();
    }
  }, [pathname, hash]);

  useEffect(() => {
    const handleNavigationScroll = (): void => {
      if (hash) {
        ScrollTrigger.refresh();
        scrollToHash(hash, "auto");
      } else {
        finalizeScrollAfterNavigation();
      }
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(handleNavigationScroll);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  return null;
}

function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
