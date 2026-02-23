"use client";
import { motion, AnimatePresence } from "framer-motion";

export function AuthSlider({ isLogin, children }: { isLogin: boolean, children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={isLogin ? "login" : "register"}
        initial={{ x: isLogin ? -40 : 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isLogin ? 40 : -40, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}