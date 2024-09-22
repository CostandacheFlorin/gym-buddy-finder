"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, MessageSquare, X, Trophy } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Button } from "@/components/Button";

interface MatchModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onStartMessaging: () => void;
  matchName: string;
  matchAvatar: string;
  userAvatar: string;
}

export default function MatchModal({
  isOpen = true,
  onClose,
  onStartMessaging,
  matchName = "this user",
  matchAvatar = "/images/default-avatar.jpg",
  userAvatar = "/images/default-avatar.jpg",
}: Readonly<MatchModalProps>) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-5xl rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white shadow-xl border border-gray-700"
          >
            <div className="flex flex-col gap-4 items-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="flex items-center justify-center space-x-2"
              >
                <Dumbbell className="h-12 w-12 text-green-400" />
                <Trophy className="h-12 w-12 text-yellow-400" />
              </motion.div>
              <h2 className="text-3xl font-bold text-green-400">
                Gym Bro Match!
              </h2>
              <p className="text-center text-xl text-gray-300">
                You and {matchName} are ready to crush some sets!
              </p>
              <div className="flex justify-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Avatar className="!h-24 !w-24 border-2 border-green-400 shadow-lg">
                    <AvatarImage src={userAvatar} alt="Your avatar" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Avatar className="!h-24 !w-24 border-2 border-green-400 shadow-lg">
                    <AvatarImage
                      src={matchAvatar}
                      alt={`${matchName}'s avatar`}
                    />
                    <AvatarFallback>{matchName[0]}</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>
              <div className="flex w-full space-x-4">
                <Button
                  className="flex-1 bg-green-500 text-white hover:bg-green-600"
                  size="lg"
                  onClick={onStartMessaging}
                >
                  <MessageSquare className="mr-2 h-12 w-12 md:h-6 md:w-6" />
                  Send DM
                </Button>
                <Button
                  className="flex-1 bg-gray-700 text-white hover:bg-gray-600"
                  size="lg"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
